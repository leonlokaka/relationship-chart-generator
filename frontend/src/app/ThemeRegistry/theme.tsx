import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#055384",
      light: "#BAE8FF",
      contrastText: "#FFF",
    },
    secondary: {
      main: "#FFF",
      contrastText: "#000",
    },
  },
});

export default theme;
