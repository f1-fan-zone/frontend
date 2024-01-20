"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { NextRouter, withRouter } from "next/router";
import React from "react";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  cart: any;
}

class ShoppingCartPage extends Component<IProps, IState> {
  fileInputRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      cart: {} as any,
    };
  }

  removeFromCart(productId: string) {
    let cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
    let cartProduct = Object.values(cart).find(
      (product: any) => product._id === productId,
    ) as any;
    // Check if product exists in cart
    if (cartProduct.count > 1) {
      // Decrement product count
      cartProduct.count--;
      // Update cart in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      // Update state
      this.setState({ cart });
    } else {
      // Remove product from cart
      cart = Object.values(cart).filter(
        (product: any) => product._id !== productId,
      );
      // Update cart in local storage
      localStorage.setItem("cart", JSON.stringify(cart));
      // Update state
      this.setState({ cart });
    }
  }

  async getData() {
    if (this.state.showLoading && typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart") ?? "{}");
      this.setState({ cart, showLoading: false });
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <div className="shopping-cart-page">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    Shopping Cart
                  </Typography>
                  <br />
                  <Grid container spacing={2}>
                    {Object.keys(this.state.cart).length > 0 ? (
                      Object.keys(this.state.cart).map((key) => {
                        let product = this.state.cart[key];
                        return (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            key={key}
                          >
                            <Card>
                              <CardContent>
                                <Grid
                                  container
                                  spacing={2}
                                  alignItems="center"
                                  justifyContent="center"
                                >
                                  <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <CardMedia
                                      component="img"
                                      src={`${product.imageUrl}?t=${product._id}`}
                                      alt="Uploaded"
                                      width="0"
                                      height="0"
                                      sizes="100vw"
                                      style={{ width: "100%", height: "auto" }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <Typography variant="h5" component="h2">
                                      {product.name}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                      {product.description}
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                      <b>€{product.price.toFixed(2)}</b>
                                    </Typography>
                                    <Typography variant="body1" component="p">
                                      Quantity: {product.count}
                                    </Typography>
                                    <br />
                                    <Fab
                                      variant="extended"
                                      color="primary"
                                      aria-label="add"
                                      onClick={() =>
                                        this.removeFromCart(product._id)
                                      }
                                    >
                                      Remove from cart
                                    </Fab>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })
                    ) : (
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Typography variant="body1" component="p">
                          Your shopping cart is empty.
                        </Typography>
                      </Grid>
                    )}

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Typography variant="body1" component="p">
                        Total:{" "}
                        <b>
                          €
                          {Object.keys(this.state.cart).length > 0
                            ? Object.keys(this.state.cart).reduce(
                                (total, key) =>
                                  total +
                                  this.state.cart[key].price *
                                    this.state.cart[key].count,
                                0,
                              )
                            : Number(0).toFixed(2)}
                        </b>
                      </Typography>
                      {Object.keys(this.state.cart).length > 0 ? (
                        <>
                          <br />
                          <Fab
                            variant="extended"
                            color="primary"
                            aria-label="add"
                            onClick={() => this.props.router.push("/checkout")}
                          >
                            Checkout
                          </Fab>
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(ShoppingCartPage);
