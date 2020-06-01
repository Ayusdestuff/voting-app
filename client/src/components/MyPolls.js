import React, { Component } from "react";
import { connect } from "react-redux";
import PollsList from "./Polls/PollsList";
import { Spinner } from "./common";
import { fetchMyPolls } from "../actions/";

class MyPolls extends Component {
  componentWillMount() {
    this.props.fetchMyPolls();
  }
  render() {
    const { polls } = this.props.polls;

    return (
      <div className="container center">
        <h5>This is a list of polls created by you</h5>
        <div>
          {polls.length > 0 ? (
            <PollsList polls={polls} />
          ) : (
            <Spinner size="big" />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ polls }) => ({ polls });

export default connect(mapStateToProps, { fetchMyPolls })(MyPolls);
