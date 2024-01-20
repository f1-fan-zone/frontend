"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  Grid,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import { Season } from "@/app/classes/season";
import { ErgastApi } from "@/app/api/ergast/ergast-api";
import Loading from "@/components/loading/loading";

interface IProps {}

interface IState {
  showLoading: boolean;
  seasons: Season[];
}

export default class PreviousSeasonsPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      seasons: [] as Season[],
    };
  }

  async componentDidMount() {
    let seasons = await ErgastApi.getAllSeasons();
    this.setState({ seasons });
    this.setState({ showLoading: false });
  }

  render() {
    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <Grid container spacing={2}>
          {this.state.seasons.map((season) => (
            <Grid item xs={12} my={2} mx={2} key={season.season}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Season {season.season}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Driver Winner: {season.driverWinner}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Constructor Winner: {season.constructorWinner}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}
