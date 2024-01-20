"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Switch,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";
import { NextRouter, withRouter } from "next/router";
import moment from "moment";
import { User } from "@/app/classes/user";
import { Order } from "@/app/classes/order";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  settings: any;
}

class SettingsPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      settings: {},
    };
  }

  async getData() {
    if (typeof window !== "undefined") {
      if (this.state.showLoading) {
        let settings = localStorage.getItem("settings");

        if (!settings) {
          localStorage.setItem("settings", JSON.stringify({}));
          this.setState({
            settings: {},
            showLoading: false,
          });
        } else {
          this.setState({
            settings: JSON.parse(settings),
            showLoading: false,
          });
        }
      }
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Settings
                </Typography>
                <br />
                <Typography variant="h6" component="h6">
                  Dark mode
                </Typography>
                <Switch
                  checked={this.state.settings.darkMode}
                  onChange={(e) => {
                    let settings = this.state.settings;
                    settings.darkMode = e.target.checked;
                    localStorage.setItem("settings", JSON.stringify(settings));
                    this.setState({ settings });
                    window.location.reload();
                  }}
                />
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

export default withRouter(SettingsPage);
