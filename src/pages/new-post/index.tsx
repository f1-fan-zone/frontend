"use client";
import Header from "@/components/header/header";
import { ChangeEventHandler, Component } from "react";
import {
  Card,
  CardContent,
  Fab,
  Grid,
  Link,
  TextField,
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
import { AddComment, PhotoCamera } from "@mui/icons-material";
import React from "react";

interface WithRouterProps {
  router: NextRouter;
}

interface IProps extends WithRouterProps {}

interface IState {
  showLoading: boolean;
  submittingForm: boolean;
  postCategory: PostCategory;
  replyTo: Post | null;
  image: string;
  title: string;
  content: string;
}

class NewPostPage extends Component<IProps, IState> {
  fileInputRef: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      submittingForm: false,
      postCategory: {} as PostCategory,
      replyTo: null,
      image: "",
      title: "",
      content: "",
    };

    this.fileInputRef = React.createRef();

    this.getData = this.getData.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  fileToBase64(file: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(((reader.result ?? "") as string).split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  handleUploadClick = () => {
    this.fileInputRef.current.click();
  };

  handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      this.fileToBase64(selectedFile).then((base64) => {
        this.setState({ image: base64 as string });
      });
    }
  };

  async getData() {
    // Get URLSearchParams
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      if (this.state.showLoading && params.get("postCategoryId") !== null) {
        let postCategory = await F1FanZoneApi.getPostCategoryById(
          params.get("postCategoryId") ?? ("" as string)
        );
        this.setState({ postCategory });

        if (params.get("replyTo") !== null) {
          let post = await F1FanZoneApi.getPostById(
            params.get("replyTo") as string
          );
          this.setState({ replyTo: post });
        }

        this.setState({ showLoading: false });
      }
    }
  }

  async createPost() {
    this.setState({ submittingForm: true });

    let user = localStorage.getItem("user");

    if (!user) {
      this.props.router.push("/login");
      return;
    }

    let post = {
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.image ?? null,
      postCategory: this.state.postCategory._id,
      post: this.state.replyTo?._id ?? null,
      user: JSON.parse(user)._id,
    } as unknown as Post;

    try {
      let createdPost = await F1FanZoneApi.createPost(post);

      createdPost = createdPost as Post;

      this.props.router.push(
        `/community/${this.state.postCategory._id}/post/${
          this.state.replyTo ? this.state.replyTo._id : createdPost._id
        }`
      );
    } catch (error) {
      console.log(error);
      this.setState({ submittingForm: false });
    }
  }

  render() {
    this.getData();

    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>

        <Grid container className="new-post-page">
          <Grid item xs={12} md={8} className="new-post-page__content">
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  New Post
                </Typography>
                <Typography variant="caption">
                  Posting in{" "}
                  <Link href={`/community/${this.state.postCategory._id}`}>
                    {this.state.postCategory.name}
                  </Link>
                </Typography>
                <br />
                {this.state.replyTo !== null ? (
                  <>
                    <Typography variant="caption">
                      Replying to{" "}
                      <Link
                        href={`/community/${this.state.postCategory._id}/post/${this.state.replyTo._id}`}
                      >
                        {this.state.replyTo.title}
                      </Link>
                    </Typography>
                    <br />
                  </>
                ) : (
                  ""
                )}
                <br />
                <form>
                  <div className="new-post-page__content__form__title">
                    <TextField
                      id="title"
                      label="Title"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={(e) => {
                        this.setState({ title: e.target.value });
                      }}
                    />
                  </div>
                  <br />
                  <div className="new-post-page__content__form__content">
                    <TextField
                      id="content"
                      label="Content"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      required
                      onChange={(e) => {
                        this.setState({ content: e.target.value });
                      }}
                    />
                  </div>
                  <br />
                  {this.state.image ? (
                    <div className="imageDiv">
                      <Image
                        src={`data:image/*;base64,${this.state.image}`}
                        alt="Uploaded"
                        width="0"
                        height="0"
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <br />
                  <div className="new-post-page__content__form__image">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={this.fileInputRef}
                      onChange={this.handleFileChange}
                    />
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      aria-label="add"
                      onClick={this.handleUploadClick}
                    >
                      <PhotoCamera sx={{ mr: 1 }} />
                      Upload image
                    </Fab>
                  </div>
                  <br />
                  <div className="new-post-page__content__form__submit">
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      aria-label="add"
                      onClick={this.createPost}
                    >
                      <AddComment sx={{ mr: 1 }} />
                      Submit
                    </Fab>
                  </div>
                </form>
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

export default withRouter(NewPostPage);
