import * as React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";

class App extends React.Component {
  render() {
    return (
      <div className={styles.App}>
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
