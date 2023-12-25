"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  Fab,
  Grid,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { PostCategory } from "@/app/classes/post-category";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";
import { Post } from "@/app/classes/post";
import Image from "next/image";
import { NextRouter, withRouter } from "next/router";
import moment from "moment";
import { AddComment } from "@mui/icons-material";
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
      if (this.state.showLoading) {
        let user = localStorage.getItem("user") as string;

        if (!user) {
          this.props.router.push("/login");
          return;
        }

        let userObject = JSON.parse(user);

        this.setState({
          user: userObject as User,
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
                  Profile
                </Typography>
                <br />
                <Typography variant="h5" component="h5">
                  {this.state.user.firstName} {this.state.user.lastName}
                </Typography>
                <Typography variant="subtitle1">
                  {this.state.user.email}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h5">
                  Orders
                </Typography>
                {this.state.user.orders.length > 0 ? (
                  this.state.user.orders.map((order: any) => {
                    return (
                      <Card key={order._id}>
                        <CardContent>
                          <Typography variant="h6" component="h6">
                            {order.orderDate}
                          </Typography>
                          <Typography variant="h6" component="h6">
                            {order.totalPrice}
                          </Typography>
                          <Typography variant="h6" component="h6">
                            {order.status}
                          </Typography>
                          <Typography variant="h6" component="h6">
                            {order.paymentMethod}
                          </Typography>
                          <Typography variant="h6" component="h6">
                            {order.deliveryMethod}
                          </Typography>
                          <Typography variant="h6" component="h6">
                            {order.deliveryAddress}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Typography variant="subtitle1">No orders</Typography>
                )}
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
