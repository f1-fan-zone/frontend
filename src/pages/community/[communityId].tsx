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
import { NextRouter, withRouter } from "next/router";
import moment from "moment";
import { Add } from "@mui/icons-material";
import { User } from "@/app/classes/user";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  postCategory: PostCategory;
  posts: Post[];
  users: User[];
}

class CommunityPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      postCategory: {} as PostCategory,
      posts: [] as Post[],
      users: [] as User[],
    };
  }

  async getData() {
    if (this.state.showLoading) {
      let postCategory = await F1FanZoneApi.getPostCategoryById(
        this.props.router.query.communityId as string,
      );
      let posts = await F1FanZoneApi.getPostsByPostCategoryId(
        this.props.router.query.communityId as string,
      );

      // filter out posts that are replies
      posts = posts.filter((p: Post) => {
        return p.post === undefined || p.post === null;
      });

      let users = await F1FanZoneApi.getUsers();
      this.setState({ postCategory, posts, users });
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
            <Typography variant="h4" gutterBottom>
              {this.state.postCategory.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {this.state.postCategory.description}
            </Typography>
          </Grid>
          {this.state.posts.length > 0 ? (
            this.state.posts.map((post) => {
              let postAuthor = this.state.users.find(
                (u) => u._id === post.user,
              ) as any;

              return (
                <Grid item xs={12} my={1} mx={2} key={post._id}>
                  <Link
                    href={`/community/${this.state.postCategory._id}/post/${post._id}`}
                    key={post._id}
                  >
                    <Card key={post._id}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {post.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Posted by{" "}
                          <Link href={`/profile/${postAuthor.username}`}>
                            <b>
                              {postAuthor.firstName} {postAuthor.lastName} (@
                              {postAuthor.username}){" "}
                            </b>
                          </Link>{" "}
                          {moment(
                            post.publicationDate.toLocaleString(),
                          ).fromNow()}
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
                No posts yet. Be the first one to post!
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row-reverse"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Link
            href={`/new-post?postCategoryId=${this.state.postCategory._id}`}
            underline="none"
            className="fab"
          >
            <Fab color="primary" aria-label="add">
              <Add />
            </Fab>
          </Link>
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(CommunityPage);
