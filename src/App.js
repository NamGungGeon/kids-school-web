import "./App.css";
import React, { useEffect, useState } from "react";
import Routers from "./pages";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import Splash from "./containers/Splash/Splash";
import withModal from "./hoc/withModal";
import withToast from "./hoc/withToast";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#81c784"
    }
  }
});
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return <Routers />;
  return <div>{loading ? <Splash /> : <Routers />}</div>;
}

export default withModal(withToast(App));
