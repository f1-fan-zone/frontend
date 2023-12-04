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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
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
const settings = ["Profile", "My Orders", "Logout"];

export default class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { isMobile: false, anchorElNav: null, anchorElUser: null };
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
            <Link href="/">
              <Image
                src="/f1-fan-zone.png"
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
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
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(this.state.anchorElNav)}
                onClose={this.handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={this.handleCloseNavMenu}>
                    <Link href={page.href}>
                      <Typography textAlign="center" color="primary">
                        {page.name}
                      </Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
              <Tooltip title="Open settings">
                <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={this.state.anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(this.state.anchorElUser)}
                onClose={this.handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={this.handleCloseUserMenu}>
                    <Typography textAlign="center" color="primary">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
