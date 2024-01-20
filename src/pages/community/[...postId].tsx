"use client";
import Header from "@/components/header/header";
import { Component } from "react";
import {
  Card,
  CardContent,
  Fab,
  Grid,
  CssBaseline,
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
  postCategory: PostCategory;
  post: Post;
  postAuthor: any;
  postComments: Post[];
  users: User[];
}

class PostPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      postCategory: {} as PostCategory,
      post: {} as Post,
      postAuthor: {} as any,
      postComments: [] as Post[],
      users: [] as User[],
    };
  }

  async getData() {
    if (this.state.showLoading && this.props.router.query.postId) {
      let postCategory = await F1FanZoneApi.getPostCategoryById(
        this.props.router.query.postId[0] ?? ("" as string),
      );
      let post = await F1FanZoneApi.getPostById(
        this.props.router.query.postId[2] as string,
      );
      let postAuthor = await F1FanZoneApi.getUserById(post.user);
      let postComments = await F1FanZoneApi.getPostCommentsByPostId(
        this.props.router.query.postId[2] as string,
      );
      let users = await F1FanZoneApi.getUsers();
      this.setState({ postCategory, post, postAuthor, postComments, users });
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
              {this.state.post.title}
            </Typography>
            <Typography variant="caption">
              Posted in{" "}
              <Link href={`/community/${this.state.postCategory._id}`}>
                {this.state.postCategory.name}
              </Link>
            </Typography>
            <br />
            <br />
            <Typography
              variant="body1"
              gutterBottom
              style={{ whiteSpace: "pre-line" }}
            >
              {this.state.post.content}
            </Typography>
            {this.state.post.imageUrl ? (
              <Image
                src={`data:image/*;base64,${this.state.post.imageUrl}`}
                alt="Uploaded"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              ""
            )}
            <Typography variant="caption" color="text.secondary">
              Posted by{" "}
              <Link href={`/profile/${this.state.postAuthor.username}`}>
                <b>
                  {this.state.postAuthor.firstName}{" "}
                  {this.state.postAuthor.lastName} (@
                  {this.state.postAuthor.username}){" "}
                </b>
              </Link>
              {moment(
                this.state.post.publicationDate.toLocaleString(),
              ).fromNow()}
            </Typography>
          </Grid>

          <Grid item xs={12} my={2} mx={2}>
            <Typography variant="h6" gutterBottom>
              Comments ({this.state.postComments.length})
            </Typography>
            {this.state.postComments.map((comment) => {
              const author = this.state.users.find(
                (user) => user._id === comment.user,
              ) as User;

              return (
                <Card variant="outlined" sx={{ mb: 2 }} key={comment._id}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {comment.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {comment.content}
                    </Typography>
                    {comment.imageUrl ? (
                      <Image
                        src={`data:image/*;base64,${comment.imageUrl}`}
                        alt="Uploaded"
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    ) : (
                      ""
                    )}
                    <Typography variant="caption" color="text.secondary">
                      Posted by{" "}
                      <Link href={`/profile/${author.username}`}>
                        <b>
                          {author.firstName} {author.lastName} (@
                          {author.username}){" "}
                        </b>
                      </Link>
                      {moment(
                        comment.publicationDate.toLocaleString(),
                      ).fromNow()}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          direction="row-reverse"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <Link
            href={`/new-post?postCategoryId=${this.state.postCategory._id}&replyTo=${this.state.post._id}`}
            underline="none"
            className="fab"
          >
            <Fab color="primary" aria-label="add">
              <AddComment />
            </Fab>
          </Link>
        </Grid>
      </ThemeProvider>
    ) : (
      <Loading></Loading>
    );
  }
}

export default withRouter(PostPage);
