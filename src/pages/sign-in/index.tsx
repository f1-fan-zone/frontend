"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  CssBaseline,
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
  usernameOrEmail: string;
  password: string;
}

export default class SignInPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      submittingForm: false,
      usernameOrEmail: "",
      password: "",
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentDidMount() {
    this.setState({ showLoading: false });
  }

  async handleLogin() {
    this.setState({ submittingForm: true });

    if (this.state.usernameOrEmail === "") {
      alert("Please enter an username or email address.");
      this.setState({ submittingForm: false });
      return;
    }

    if (this.state.password === "") {
      alert("Please enter a password.");
      this.setState({ submittingForm: false });
      return;
    }

    let result = await F1FanZoneApi.loginUser(
      this.state.usernameOrEmail,
      this.state.password,
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
        <CssBaseline />
        <Header></Header>
        <Grid
          container
          display="flex"
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
                Sign In
              </Typography>
              <form>
                <TextField
                  label="Username or Email"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={this.state.usernameOrEmail}
                  onChange={(e) => {
                    this.setState({ usernameOrEmail: e.target.value });
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
                    onClick={this.handleLogin}
                    disabled={this.state.submittingForm}
                  >
                    Sign In
                  </Button>
                  <br />
                  <Typography variant="caption">
                    {"Don't have an account? "}
                    <Link href="/sign-up">Sign Up</Link>!
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
