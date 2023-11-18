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

interface IProps {}

interface IState {
  currentDriver: number;
}

export default class HomePage extends Component<IProps, IState> {
  podium = [
    {
      emoji: "🥇",
      firstName: "MAX",
      lastName: "VERSTAPPEN",
      points: 524,
      image:
        "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/verstappen.jpg.img.640.medium.jpg/1677069810695.jpg",
    },
    {
      emoji: "🥈",
      firstName: "SERGIO",
      lastName: "PEREZ",
      points: 258,
      image:
        "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/perez.jpg.img.640.medium.jpg/1677069810695.jpg",
    },
    {
      emoji: "🥉",
      firstName: "LEWIS",
      lastName: "HAMILTON",
      points: 226,
      image:
        "https://media.formula1.com/content/dam/fom-website/drivers/2023Drivers/hamilton.jpg.img.640.medium.jpg/1677069810695.jpg",
    },
  ];

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
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12} my={2} mx={2}>
            <Card
              sx={{ p: 3 }}
              className="podium-card"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.0) 40%, rgba(0, 0, 0, 1)), url(${
                  this.podium[this.state.currentDriver].image
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
                      {this.podium[this.state.currentDriver].firstName}
                    </Typography>
                    <Typography variant="h5" color="white">
                      {this.podium[this.state.currentDriver].lastName}
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
                      {this.podium[this.state.currentDriver].points} PTS
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} my={1} mx={2}>
            <Card sx={{ p: 2 }} className="races-card">
              <CardContent>
                <Typography gutterBottom variant="h4">
                  CURRENT RACE
                </Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Typography variant="subtitle1" color="text.secondary">
                  🇺🇸 LAS VEGAS GRAND PRIX
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
