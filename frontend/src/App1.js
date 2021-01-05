import React from "react";
import Galary from "./components/Galary";
import Header from "./components/Header";
import Insert from "./components/Insert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import EgasDetails from "./components/egasdetails";
import "./App.css";
import Sidebar from "./components/sidebar";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <Sidebar />
              </div>
              <div className="col-lg-10">
                  <Header />
                  <Switch>
                    <Route path="/galary" exact component={Galary} />
                    <Route path="/Insert" exact component={Insert} />
                    <Route path="/details/:id" component={Details} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
