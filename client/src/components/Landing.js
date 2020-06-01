import React, { Component } from "react";
import { connect } from "react-redux";
import PollsList from "./Polls/PollsList";
import { Spinner } from "./common";
import { fetchAllPolls } from "../actions";
import { Link } from "react-router-dom";

class Landing extends Component {
  componentWillMount() {
    this.props.fetchAllPolls();
  }

  renderText = () => {
    if (this.props.auth.user) {
      return (
        <p>
          Select a poll to see the results and vote, or{" "}
          <Link to="/polls/new" className='link'>make a new poll!</Link>
        </p>
      );
    }
    return (
      <p>
        Select a poll to see the results and vote, or sign-in to make a new
        poll.
      </p>
    );
  };

  render() {
    const { polls } = this.props.polls;
    return (
      <div className="container center">
        <h4>fcc-voting</h4>
        <h5>Below are polls hosted by fcc-voting.</h5>
        {this.renderText()}

        {/* 
          The length of polls array has to be greater than 0 before it can be rendered
          otherwise a spinner will be shown in place
        */}
        {polls.length > 0 ? (
          <PollsList polls={polls} />
        ) : (
          <Spinner size="big" />
        )}
      </div>
    );
  }
}

//this function allows us to access our state object from redux store
// whatever is returned from here will be available as props
const mapStateToProps = ({ polls, auth }) => ({ polls, auth });

//connecting our component to the redux store
export default connect(mapStateToProps, { fetchAllPolls })(Landing);
