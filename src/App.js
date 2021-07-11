import "./App.css";
import React, { useEffect, useState } from "react";
import Routers from "./pages";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import Splash from "./containers/Splash/Splash";
import withModal from "./hoc/withModal";
import withToast from "./hoc/withToast";
import { getServiceAvailable } from "./http";
import Loading from "./components/Loading/Loading";

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
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    getServiceAvailable()
      .then(res => {})
      .catch(e => {
        console.error(e);
        setAvailable(false);
      });
  }, []);
  if (!available) {
    return <h1>죄송합니다, 현재 서비스 점검 중 입니다</h1>;
  }
  return <Routers />;
}

export default withModal(withToast(App));
