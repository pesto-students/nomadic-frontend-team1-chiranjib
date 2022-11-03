import React, { Component } from "react";

import "./App.css";
import AllPages from "./pages";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "font-awesome/css/font-awesome.min.css";

//importing MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";

//Creating theme
const theme = createTheme({
  palette: {
    primary: {
      light: '#3c88f180',
      main: '#924bf8',
      dark: '#3c88f1',
      contrastText: '#fff',
    },
    danger: {
      light: '#f73f2f',
      main: '#ff0040',
      dark: '#dd043b',
      contrastText: '#fff',
    },
    success:{
      light: '#30CC7E',
      main: '#30CC7E',
      dark: '#30CC7E',
      contrastText: '#fff',
    }
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <AllPages />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
