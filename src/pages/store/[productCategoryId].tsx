"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  CssBaseline,
  Grid,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Image from "next/image";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";
import { NextRouter, withRouter } from "next/router";
import { ProductCategory } from "@/app/classes/product-category";
import { User } from "@/app/classes/user";
import { Product } from "@/app/classes/product";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  productCategory: ProductCategory;
  products: Product[];
  users: User[];
}

class StoreProductCategoryPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      productCategory: {} as ProductCategory,
      products: [] as Product[],
      users: [] as User[],
    };
  }

  async getData() {
    if (this.state.showLoading && this.props.router.query.productCategoryId) {
      let productCategory = await F1FanZoneApi.getProductCategoryById(
        this.props.router.query.productCategoryId as string,
      );

      let products = await F1FanZoneApi.getProductsByProductCategoryId(
        this.props.router.query.productCategoryId as string,
      );

      this.setState({ productCategory, products });
      this.setState({ showLoading: false });
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12} my={2} mx={2}>
            <Typography variant="h4" gutterBottom>
              {this.state.productCategory.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {this.state.productCategory.description}
            </Typography>
          </Grid>
          {this.state.products.length > 0 ? (
            this.state.products.map((product) => {
              return (
                <Grid item xs={12} my={1} mx={2} key={product._id}>
                  <Link
                    href={`/store/${this.state.productCategory._id}/product/${product._id}`}
                    key={product._id}
                  >
                    <Card key={product._id}>
                      <CardContent>
                        {product.imageUrl ? (
                          <Image
                            src={`${product.imageUrl}?t=${product._id}`}
                            alt="Uploaded"
                            width="0"
                            height="0"
                            sizes="100vw"
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          ""
                        )}
                        <Typography gutterBottom variant="h5" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {product.description}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          €{product.price.toFixed(2)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12} my={1} mx={2}>
              <Typography variant="body2" color="text.secondary">
                No products yet.
              </Typography>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(StoreProductCategoryPage);
