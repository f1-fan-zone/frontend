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

interface IProps {}

interface IState {
  showLoading: boolean;
  postCategories: PostCategory[];
}

export default class CommunityPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showLoading: true,
      postCategories: [] as PostCategory[],
    };
  }

  async componentDidMount() {
    let postCategories = await F1FanZoneApi.getPostCategories();
    /**
     * {
    "name": "News",
    "description": "News about F1"
},
{
    "name": "Rumors",
    "description": "Rumors about F1"
},
{
    "name": "Opinions",
    "description": "Opinions about F1"
},
{
    "name": "Other",
    "description": "Other about F1"
}

     */
    this.setState({ postCategories });
    this.setState({ showLoading: false });
  }

  render() {
    return !this.state.showLoading ? (
      <ThemeProvider theme={theme}>
        <Header></Header>
        <Grid container spacing={2}>
          {this.state.postCategories.map((postCategory) => (
            <Grid item xs={12} my={2} mx={2} key={postCategory._id}>
              <Link
                href={`/community/${postCategory._id}`}
                key={postCategory._id}
              >
                <Card key={postCategory._id}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {postCategory.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {postCategory.description}
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
