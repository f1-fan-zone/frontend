"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import ReactLoading from "react-loading";
import { Season } from "@/app/classes/season";
import { ErgastApi } from "@/app/api/ergast/ergast-api";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";

interface IProps {}

interface IState {
  showLoading: boolean;
  submittingForm: boolean;
  username: string;
  email: string;
  password: string;
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

    let result = await F1FanZoneApi.registerUser(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.firstName,
      this.state.lastName
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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <Card>
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
                <Grid container justifyContent="center" my={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="button"
                      onClick={this.handleRegister}
                      disabled={this.state.submittingForm}
                    >
                      Sign Up
                    </Button>
                  </Grid>
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
