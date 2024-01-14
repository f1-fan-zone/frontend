"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";
import { NextRouter, withRouter } from "next/router";
import { User } from "@/app/classes/user";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  user: User;
}

class ProfilePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      user: {} as User,
    };
  }

  async getData() {
    if (typeof window !== "undefined") {
      if (this.state.showLoading && this.props.router.query.username) {
        let user = await F1FanZoneApi.getUserByUsername(
          this.props.router.query.username as string,
        );

        if (user.message) {
          this.props.router.push("/");
          return;
        }

        this.setState({
          user,
          showLoading: false,
        });
      }
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h4">
                  {"@" + this.state.user.username + "'s profile"}
                </Typography>
                <br />
                <Typography variant="h5" component="h5">
                  {this.state.user.firstName} {this.state.user.lastName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(ProfilePage);
