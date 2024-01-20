import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#C00300",
    },
    secondary: {
      main: "#FFDAD4",
    },
    warning: {
      main: "#ff5722",
    },
    success: {
      main: "#4caf50",
    },
    info: {
      main: "#2196f3",
    },
    error: {
      main: "#f44336",
    },
    text: {
      primary: "#410000",
      secondary: "#410000",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

let isDarkTheme = () => {
  if (typeof window !== "undefined") {
    let settings = localStorage.getItem("settings");
    if (settings) {
      let parsedSettings = JSON.parse(settings);
      return parsedSettings.darkMode ? darkTheme : theme;
    } else {
      return theme;
    }
  }
  return theme;
};

export default isDarkTheme;
