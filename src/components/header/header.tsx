import React, { Component } from "react";
import "./style.css";
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";
import Link from "next/link";

const pages = [
  {
    name: "Previous Seasons",
    href: "/previous-seasons",
  },
  {
    name: "Community",
    href: "/community",
  },
  {
    name: "Store",
    href: "/store",
  },
];
const settings = [
  {
    name: "Profile",
    href: "/profile",
    requireAuth: true,
  },
  {
    name: "Settings",
    href: "/settings",
    requireAuth: true,
  },
  {
    name: "Sign Out",
    href: "#",
    requireAuth: true,
    onClick: () => {
      localStorage.removeItem("user");
      window.location.href = "/";
    },
  },
  {
    name: "Sign In",
    href: "/sign-in",
    requireAuth: false,
  },
  {
    name: "Sign Up",
    href: "/sign-up",
    requireAuth: false,
  },
];

export default class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isMobile: false,
      anchorElNav: null,
      anchorElUser: null,
      loggedIn: false,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleOpenNavMenu = this.handleOpenNavMenu.bind(this);
    this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
    this.handleCloseNavMenu = this.handleCloseNavMenu.bind(this);
    this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
  }

  updateWindowDimensions() {
    this.setState({ isMobile: window.screen.availWidth < 768 });
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);

    let user = localStorage.getItem("user");
    if (user) {
      this.setState({ loggedIn: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  handleOpenNavMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({ anchorElNav: event.currentTarget });
  }

  handleOpenUserMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({ anchorElUser: event.currentTarget });
  }

  handleCloseNavMenu() {
    this.setState({ anchorElNav: null });
  }

  handleCloseUserMenu() {
    this.setState({ anchorElUser: null });
  }

  render() {
    return (
      <AppBar color="secondary" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={Boolean(this.state.anchorElNav)}
                onClose={this.handleCloseNavMenu}
              >
                <Link href="/">
                  <Image
                    src="/f1-fan-zone.png"
                    alt="logo"
                    width={90}
                    height={68.2}
                  />
                </Link>
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={this.handleCloseNavMenu}>
                    <Link href={page.href}>
                      <Typography textAlign="center" color="primary">
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Drawer>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                alignContent: "center",
              }}
            >
              <Link href="/">
                <Image
                  src="/f1-fan-zone.png"
                  alt="logo"
                  width={90}
                  height={68.2}
                />
              </Link>
              {pages.map((page) => (
                <Link href={page.href} key={page.name}>
                  <Button
                    key={page.name}
                    onClick={this.handleCloseNavMenu}
                    sx={{ my: 2, color: "primary", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              {this.state.loggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User" />
                    </IconButton>
                  </Tooltip>
                  <Drawer
                    anchor="right"
                    open={Boolean(this.state.anchorElUser)}
                    onClose={this.handleCloseUserMenu}
                  >
                    {settings.map((setting) => {
                      if (
                        (setting.requireAuth && this.state.loggedIn) ||
                        (!setting.requireAuth && !this.state.loggedIn)
                      ) {
                        return (
                          <MenuItem
                            key={setting.name}
                            onClick={this.handleCloseUserMenu}
                          >
                            <Link
                              href={setting.href}
                              onClick={
                                setting.onClick ? setting.onClick : () => {}
                              }
                            >
                              <Typography textAlign="center" color="primary">
                                {setting.name}
                              </Typography>
                            </Link>
                          </MenuItem>
                        );
                      }
                    })}
                  </Drawer>
                </>
              ) : (
                <Tooltip title="Sign In">
                  <IconButton
                    onClick={() => {
                      window.location.href = "/sign-in";
                    }}
                    sx={{ color: "primary" }}
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
