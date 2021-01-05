import React from "react";
import Header from "./components/Header";
import Insert from "./components/Insert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import EgasDetails from "./components/EgasDetails";
import "./App.css";
import Sidebar from "./components/sidebar";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import Galary from "./components/Galary";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="wrapper">
              
              <div className="box" id="one">
                <Header />
              </div>

              <div className="box" id="two">
                <Sidebar />
              </div>

              <Switch>
                <div className="box" id="three">
                  <Route path="/Galary" exact component={Galary} />
                  <Route path="/insert" exact component={Insert} />
                  <Route path="/egasdetails/:id" component={EgasDetails} />
                  </div>
              </Switch>
            </div>
          </div>

          {/* </div> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
