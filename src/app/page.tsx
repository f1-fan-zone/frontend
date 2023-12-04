"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import { Driver } from "./classes/driver";
import { ErgastApi } from "./api/ergast/ergast-api";
import ReactLoading from "react-loading";
import { Race } from "./classes/race";

interface IProps {}

interface IState {
  currentDriver: number;
  podium: Driver[];
  lastRace: Race;
  showLoading: boolean;
}

export default class HomePage extends Component<IProps, IState> {
  getDriverPositionString(position: number) {
    switch (position) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  }

  constructor(props: IProps) {
    super(props);
    this.state = {
      currentDriver: 0,
      podium: [] as Driver[],
      lastRace: {} as Race,
      showLoading: true,
    };
  }

  async componentDidMount() {
    let podium = await ErgastApi.getDriverStandings();
    let lastRace = await ErgastApi.getlastRace();
    this.setState({ podium, lastRace, showLoading: false });
  }

  render() {
    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12} my={2} mx={2}>
            <Card
              sx={{ p: 3 }}
              className="podium-card"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.0) 40%, rgba(0, 0, 0, 1)), url(${
                  this.state.podium[this.state.currentDriver].imageUrl
                })`,
              }}
            >
              <CardContent className="card-content">
                <Typography gutterBottom variant="h3" color="white">
                  {this.getDriverPositionString(this.state.currentDriver)}
                </Typography>
                <br></br>
                <br></br>
                <div className="podium-card-actions">
                  {this.state.currentDriver > 0 ? (
                    <Typography
                      variant="h4"
                      color="white"
                      onClick={() =>
                        this.setState({
                          currentDriver: this.state.currentDriver - 1,
                        })
                      }
                    >
                      {"<"}
                    </Typography>
                  ) : (
                    <Typography variant="h4" color="white">
                      {""}
                    </Typography>
                  )}
                  {this.state.currentDriver < 2 ? (
                    <Typography
                      variant="h4"
                      color="white"
                      onClick={() =>
                        this.setState({
                          currentDriver: this.state.currentDriver + 1,
                        })
                      }
                    >
                      {">"}
                    </Typography>
                  ) : (
                    <Typography variant="h4" color="white">
                      {""}
                    </Typography>
                  )}
                </div>
                <br></br>
                <br></br>
                <div className="podium-card-bottom-text">
                  <div className="podium-card-bottom-text-left">
                    <Typography variant="h6" color="white">
                      {this.state.podium[this.state.currentDriver].firstName}
                    </Typography>
                    <Typography variant="h5" color="white">
                      {this.state.podium[this.state.currentDriver].lastName}
                    </Typography>
                  </div>
                  <div className="podium-card-bottom-text-right">
                    <Typography
                      variant="body2"
                      color="white"
                      style={{
                        alignSelf: "flex-end",
                      }}
                    >
                      {this.state.podium[this.state.currentDriver].points} PTS
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} my={1} mx={2}>
            <Card sx={{ p: 2 }} className="races-card">
              <CardContent>
                <Typography gutterBottom variant="h2">
                  LAST RACE
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {this.state.lastRace.raceName}
                </Typography>
                <Typography color="text.secondary">
                  {this.state.lastRace.date} - {this.state.lastRace.time}
                </Typography>
                <Typography color="text.secondary">
                  {this.state.lastRace.circuitName}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    ) : (
      <div className="centered">
        <ReactLoading type="spin" color="red" />
      </div>
    );
  }
}
