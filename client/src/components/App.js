import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Landing from "./Landing";
import PollsNew from "./Polls/PollsNew";
import PollShow from "./Polls/PollShow";
import MyPolls from "./MyPolls";
import { fetchUser } from "../actions";

// Todo => There should be two types of App
// App before login
// App after login

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/poll/:id" component={PollShow} />
            <Route path="/polls/new" component={PollsNew} />
            <Route path="/polls/me"  component={MyPolls} />
            <Route path="/polls" component={Landing} />
            <Route path="/" exact component={Landing} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
