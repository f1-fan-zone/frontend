"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { NextRouter, withRouter } from "next/router";
import React from "react";
import { Order } from "@/app/classes/order";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  cart: any;
  order: Order;
  submittingForm: boolean;
}

class CheckoutPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      cart: {} as any,
      order: {} as Order,
      submittingForm: false,
    };

    this.createOrder = this.createOrder.bind(this);
  }

  async getData() {
    if (this.state.showLoading && typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
      this.setState({ cart, showLoading: false });
    }
  }

  async createOrder(details: any) {
    this.setState({ submittingForm: true });

    let user = JSON.parse(localStorage.getItem("user") ?? "{}");

    let order = this.state.order;

    order.isPaid = true;
    order.orderDate = new Date();
    order.paymentMethod = "PayPal";
    order.products = Object.values(this.state.cart);
    order.totalPrice = Object.values(this.state.cart).reduce(
      (total: number, product: any) => total + product.price * product.count,
      0,
    );
    order.user = user._id;

    try {
      await F1FanZoneApi.createOrder(order);
      localStorage.setItem("cart", "[]");
      this.props.router.push("/store");
    } catch (error) {
      console.log(error);
      this.setState({ submittingForm: false });
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <PayPalScriptProvider options={{ clientId: "test", currency: "EUR" }}>
          <Grid container spacing={1}>
            <Grid item xs={12} my={2} mx={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Checkout
                  </Typography>
                  {Object.values(this.state.cart).map((product: any) => (
                    <Typography
                      key={product._id}
                      variant="body1"
                      color="text.secondary"
                    >
                      {product.name} x {product.count} - €
                      {product.price * product.count}
                    </Typography>
                  ))}
                  <Typography variant="h6" component="div">
                    Total:{" "}
                    <b>
                      €
                      {Object.values(this.state.cart).reduce(
                        (total: number, product: any) =>
                          total + product.price * product.count,
                        0,
                      )}
                    </b>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} my={2} mx={2}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Shipping Details
                  </Typography>
                  <form>
                    <TextField
                      label="Shipping Address"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      required
                      value={this.state.order.shippingAddress}
                      onChange={(e) => {
                        let order = this.state.order;
                        order.shippingAddress = e.target.value;
                        this.setState({ order });
                      }}
                      disabled={this.state.submittingForm}
                    />
                    <TextField
                      label="City"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      required
                      value={this.state.order.shippingCity}
                      onChange={(e) => {
                        let order = this.state.order;
                        order.shippingCity = e.target.value;
                        this.setState({ order });
                      }}
                      disabled={this.state.submittingForm}
                    />
                    <TextField
                      label="State"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      required
                      value={this.state.order.shippingState}
                      onChange={(e) => {
                        let order = this.state.order;
                        order.shippingState = e.target.value;
                        this.setState({ order });
                      }}
                      disabled={this.state.submittingForm}
                    />
                    <TextField
                      label="Zip"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      required
                      value={this.state.order.shippingZipCode}
                      onChange={(e) => {
                        let order = this.state.order;
                        order.shippingZipCode = e.target.value;
                        this.setState({ order });
                      }}
                      disabled={this.state.submittingForm}
                    />
                    <TextField
                      label="Country"
                      variant="standard"
                      fullWidth
                      margin="normal"
                      required
                      value={this.state.order.shippingCountry}
                      onChange={(e) => {
                        let order = this.state.order;
                        order.shippingCountry = e.target.value;
                        this.setState({ order });
                      }}
                      disabled={this.state.submittingForm}
                    />
                  </form>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} my={2} mx={2}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Payment
                  </Typography>
                  <PayPalButtons
                    style={{ layout: "horizontal" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: Object.values(this.state.cart)
                                .reduce(
                                  (total: number, product: any) =>
                                    total + product.price * product.count,
                                  0,
                                )
                                .toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        this.createOrder(details);
                      });
                    }}
                  ></PayPalButtons>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </PayPalScriptProvider>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(CheckoutPage);
