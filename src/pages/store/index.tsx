"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  Grid,
  Link,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import "./style.css";
import theme from "@/app/theme";
import Loading from "@/components/loading/loading";
import { F1FanZoneApi } from "@/app/api/f1-fan-zone/f1-fan-zone-api";
import { ProductCategory } from "@/app/classes/product-category";

interface IProps {}

interface IState {
  showLoading: boolean;
  productCategories: ProductCategory[];
}

export default class StorePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      productCategories: [] as ProductCategory[],
    };
  }

  async componentDidMount() {
    let productCategories = await F1FanZoneApi.getProductCategories();
    this.setState({ productCategories });
    this.setState({ showLoading: false });
  }

  render() {
    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12} my={2} mx={2}>
            <Typography variant="h4" gutterBottom>
              Store
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Purchase merchandise officially licensed by the FIA
            </Typography>
          </Grid>
          {this.state.productCategories.map((productCategory) => (
            <Grid item xs={12} my={1} mx={2} key={productCategory._id}>
              <Link
                href={`/store/${productCategory._id}`}
                key={productCategory._id}
              >
                <Card key={productCategory._id}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {productCategory.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {productCategory.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}
