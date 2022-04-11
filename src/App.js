import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/index";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Routes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <StoreProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </LocalizationProvider>
      </StoreProvider>
    </div>
  );
}

export default App;
