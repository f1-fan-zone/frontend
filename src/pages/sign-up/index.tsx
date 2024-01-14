"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import ReactLoading from "react-loading";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";

interface IProps {}

interface IState {
  showLoading: boolean;
  submittingForm: boolean;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export default class SignUpPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      submittingForm: false,
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    };

    this.handleRegister = this.handleRegister.bind(this);
  }

  async componentDidMount() {
    this.setState({ showLoading: false });
  }

  async handleRegister() {
    this.setState({ submittingForm: true });

    if (
      !this.state.username ||
      !this.state.email ||
      !this.state.password ||
      !this.state.confirmPassword ||
      !this.state.firstName ||
      !this.state.lastName
    ) {
      alert("Please fill out all fields");
      this.setState({ submittingForm: false });
      return;
    }

    if (this.state.password.length < 8) {
      alert("Password must be at least 8 characters");
      this.setState({ submittingForm: false });
      return;
    }

    if (this.state.password !== this.state.confirmPassword) {
      alert("Passwords do not match");
      this.setState({ submittingForm: false });
      return;
    }

    let result = await F1FanZoneApi.registerUser(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.firstName,
      this.state.lastName,
    );

    if (result.message) {
      alert(result.message);
    } else {
      localStorage.setItem("user", JSON.stringify(result));
      window.location.href = "/";
    }

    this.setState({ submittingForm: false });
  }

  render() {
    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "85vh", padding: "0 10px" }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sign Up
              </Typography>
              <form>
                <TextField
                  label="First Name"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={this.state.firstName}
                  onChange={(e) => {
                    this.setState({ firstName: e.target.value });
                  }}
                  disabled={this.state.submittingForm}
                />
                <TextField
                  label="Last Name"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={this.state.lastName}
                  onChange={(e) => {
                    this.setState({ lastName: e.target.value });
                  }}
                  disabled={this.state.submittingForm}
                />
                <TextField
                  label="Username"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={this.state.username}
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                  disabled={this.state.submittingForm}
                />
                <TextField
                  label="Email"
                  variant="standard"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  disabled={this.state.submittingForm}
                />
                <TextField
                  label="Password"
                  variant="standard"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                  disabled={this.state.submittingForm}
                />
                <TextField
                  label="Confirm Password"
                  variant="standard"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.setState({ confirmPassword: e.target.value });
                  }}
                  disabled={this.state.submittingForm}
                />
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                  my={2}
                >
                  <Button
                    variant="contained"
                    type="button"
                    onClick={this.handleRegister}
                    disabled={this.state.submittingForm}
                  >
                    Sign Up
                  </Button>
                  <br />
                  <Typography variant="caption">
                    Already have an account?{" "}
                    <Link href="/sign-in">Sign In</Link>!
                  </Typography>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </ThemeProvider>
    ) : (
      <div className="centered">
        <ReactLoading type="spin" color="red" />
      </div>
    );
  }
}
