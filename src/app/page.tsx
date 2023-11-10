"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import theme from "./theme";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";

export default class HomePage extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={6} my={2} mx={2}>
            <Card sx={{ p: 2 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/f1-fan-zone.png"
                title="F1 Fan Zone"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  P1
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  MAX VERSTAPPEN - ORACLE RED BULL RACING HONDA
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  400 PTS
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
