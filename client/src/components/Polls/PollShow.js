import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchPoll,
  votePoll,
  deletePoll,
  clearCurrentPoll
} from "../../actions/";
import { Spinner, baseColor, Chart, generateRandomColor } from "../common";

//This component will be used to show details for a specific poll

class PollShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPoll(id);
  }

  componentWillUnmount() {
    this.props.clearCurrentPoll();
  }

  state = {
    option: "",
    isLoading: true,
    customField: false,
    customFieldValue: ""
  };

  //render the options on a poll
  renderOptions = () => {
    const { options } = this.props.poll.poll;
    return options.map(({ option }, index) => {
      return (
        <option key={index} value={option}>
          {option}
        </option>
      );
    });
  };

  //  the event is fired when the options in the select changes
  handleOptionChange = e => {
    if (e.target.value === "custom") {
      this.setState({ customField: true });
      return;
    }
    this.setState({ option: e.target.value, customField: false });
  };

  //  this event is fired when the custom input field is changed
  handleCustomInput = e => {
    const { value } = e.target;
    this.setState({ customFieldValue: value, option: value });
  };

  // when the form is submitted
  handleSubmit = async e => {
    e.preventDefault();
    if (!this.state.option) {
      alert("You must choose an option");
      return;
    }
    const { _id } = this.props.poll.poll;
    const { option } = this.state;
    try {
      await this.props.votePoll(_id, option);
    } catch (error) {
      console.log(error);
    }
  };

  //draw the chart for a poll
  renderChart = () => {
    const { options } = this.props.poll.poll;

    const data = options.map(({ option, votesCount }, index) => {
      return {
        value: votesCount,
        color: generateRandomColor(),
        highlight: "#eaeaea",
        label: option
      };
    });
    return <Chart chartData={data} />;
  };

  // show the deleteButton
  deleteButton = () => {
    const {
      poll: { poll },
      auth,
      history
    } = this.props;
    if (auth.user && poll._author === auth.user._id) {
      return (
        <div style={{ marginTop: 20 }}>
          <button
            className="btn red"
            onClick={() => {
              this.props.deletePoll(poll._id);
              history.push("/polls");
            }}
          >
            DELETE
          </button>
        </div>
      );
    }
  };

  render() {
    const { poll } = this.props.poll;
    const { customFieldValue, customField } = this.state;

    // if the poll is not available on the state
    // loadup a spinner
    if (Object.keys(poll).length < 1) {
      return (
        <div className="container">
          <Spinner />
        </div>
      );
    }
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="row">
          <form className="col s6">
            <h5>{poll.title}</h5>
            <div style={{ marginBottom: 20 }}>
              <label>I'd like to vote for: </label>
              <select
                className="browser-default"
                onChange={this.handleOptionChange}
              >
                <option value="" default>
                  Choose your option
                </option>
                {this.renderOptions()}
                {this.props.auth.user ? (
                  <option value="custom">I'd like a custom option</option>
                ) : (
                  ""
                )}
              </select>
              {this.props.auth.user ? (
                customField ? (
                  <input
                    type="text"
                    value={customFieldValue}
                    onChange={this.handleCustomInput}
                  />
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
            <button
              onClick={this.handleSubmit}
              className="btn"
              style={{ backgroundColor: baseColor }}
            >
              Submit
            </button>
            {this.deleteButton()}
          </form>
          <div className="col s6">{this.renderChart()}</div>
        </div>
      </div>
    );
  }
}

//this function allows us to access our state object from redux store
// whatever is returned from here will be available as props
const mapStateToProps = ({ polls, auth }) => ({ poll: polls, auth });

//connecting our component to the redux store
export default connect(mapStateToProps, {
  fetchPoll,
  votePoll,
  deletePoll,
  clearCurrentPoll
})(PollShow);
