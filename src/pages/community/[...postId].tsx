"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
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
import { NextRouter, withRouter } from "next/router";
import moment from "moment";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  postCategory: PostCategory;
  post: Post;
  postAuthor: any;
}

class PostPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      postCategory: {} as PostCategory,
      post: {} as Post,
      postAuthor: {} as any,
    };
  }

  async getData() {
    if (this.state.showLoading && this.props.router.query.postId) {
      let postCategory = await F1FanZoneApi.getPostCategoryById(
        this.props.router.query.postId[0] ?? ("" as string)
      );
      let post = await F1FanZoneApi.getPostById(
        this.props.router.query.postId[2] as string
      );
      let postAuthor = await F1FanZoneApi.getUserById(post.user);
      this.setState({ postCategory, post, postAuthor });
      this.setState({ showLoading: false });
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          <Grid item xs={12} my={2} mx={2}>
            <Typography variant="h3" gutterBottom>
              {this.state.post.title}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Posted by{" "}
              <b>
                {this.state.postAuthor.firstName}{" "}
                {this.state.postAuthor.lastName} (@
                {this.state.postAuthor.username}){" "}
              </b>
              {moment(
                this.state.post.publicationDate.toLocaleString()
              ).fromNow()}
            </Typography>
            <br />
            <Typography variant="body1" gutterBottom>
              {this.state.post.content}
            </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );

    return <Loading></Loading>;
  }
}

export default withRouter(PostPage);
