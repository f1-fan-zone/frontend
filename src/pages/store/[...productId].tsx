"use client";
import Header from "@/components/header/header";
import React, { Component, MouseEventHandler } from "react";
import {
  Button,
  Card,
  CardContent,
  Fab,
  Grid,
  IconButton,
  Link,
  Snackbar,
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
import { AddComment, AddShoppingCart, Remove } from "@mui/icons-material";
import { User } from "@/app/classes/user";
import { Product } from "@/app/classes/product";
import { ProductCategory } from "@/app/classes/product-category";
import { Thasadith } from "next/font/google";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  productCategory: ProductCategory;
  product: Product;
  showTooltip: boolean;
  tooltipMessage: string;
}

class PostPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      productCategory: {} as ProductCategory,
      product: {} as Product,
      showTooltip: false,
      tooltipMessage: "",
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
  }

  async getData() {
    if (this.state.showLoading && this.props.router.query.productId) {
      let productCategory = await F1FanZoneApi.getProductCategoryById(
        this.props.router.query.productId[0] ?? ("" as string),
      );
      let product = await F1FanZoneApi.getProductById(
        this.props.router.query.productId[2] as string,
      );
      this.setState({ productCategory, product });
      this.setState({ showLoading: false });
    }
  }

  addToCart() {
    let user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/sign-in";
      return;
    }

    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];
    let product = this.state.product;
    let productExists = false;

    cartItems.forEach((item: any) => {
      if (item._id === product._id) {
        productExists = true;
        item.count++;
      } else {
        cartItems.push({
          ...product,
          count: 1,
        });
      }
    });

    if (cartItems.length === 0) {
      cartItems.push({
        ...product,
        count: 1,
      });
    }

    if (!productExists) {
      this.setState({ showTooltip: true, tooltipMessage: "Added to cart!" });
    } else {
      this.setState({
        showTooltip: true,
        tooltipMessage: "Product count increased!",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }

  checkIfProductExistsInCart() {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];
    let product = this.state.product;
    let productExists = false;

    cartItems.forEach((item: any) => {
      if (item._id === product._id) {
        productExists = true;
      }
    });

    return productExists;
  }

  getProductCountInCart() {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];
    let product = this.state.product;
    let productCount = 0;

    cartItems.forEach((item: any) => {
      if (item._id === product._id) {
        productCount = item.count;
      }
    });

    return productCount;
  }

  removeProductFromCart() {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];
    let product = this.state.product;
    let productCount = 0;

    cartItems.forEach((item: any) => {
      if (item._id === product._id) {
        productCount = item.count;
      }
    });

    if (productCount === 1) {
      cartItems = cartItems.filter((item: any) => item._id !== product._id);
    } else {
      cartItems.forEach((item: any) => {
        if (item._id === product._id) {
          item.count--;
        }
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));

    this.setState({
      showTooltip: false,
    });
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12} my={2} mx={2}>
            <Image
              src={this.state.product.imageUrl}
              alt={this.state.product.name}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography variant="h4" gutterBottom>
              {this.state.product.name}
            </Typography>
            <Typography variant="caption">
              Category:{" "}
              <Link href={`/store/${this.state.productCategory._id}`}>
                {this.state.productCategory.name}
              </Link>
            </Typography>
            <br />
            <br />
            <Typography variant="subtitle1" gutterBottom>
              {this.state.product.description}
              <br />
              Price: <b>€{this.state.product.price}</b>
            </Typography>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.showTooltip}
          autoHideDuration={2500}
          message={this.state.tooltipMessage}
          onClose={() => this.setState({ showTooltip: false })}
          action={
            <React.Fragment>
              <Button
                color="secondary"
                size="small"
                onClick={this.removeProductFromCart}
              >
                Undo
              </Button>
            </React.Fragment>
          }
        />
        <Grid
          container
          spacing={2}
          direction="row-reverse"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Fab
            color="primary"
            aria-label="add"
            className="fab"
            onClick={this.addToCart}
          >
            {this.checkIfProductExistsInCart() ? (
              <>
                <AddShoppingCart></AddShoppingCart>
                <Typography variant="caption">
                  {this.getProductCountInCart()}
                </Typography>
              </>
            ) : (
              <AddShoppingCart></AddShoppingCart>
            )}
          </Fab>
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(PostPage);
