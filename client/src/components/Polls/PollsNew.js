import React, { Component } from "react";
import { connect } from "react-redux";
import { createPoll } from "../../actions";


// this component  is used to create a new poll

class PollsNew extends Component {
  state = { title: "", options: "", error: "" };

  // submit the form
  handleSubmit = e => {
    e.preventDefault(); // prevent the default form behavior
    const { title, options } = this.state;
    // the history object is available on any component registered with react-router
    const { history } = this.props;
    // a bit of form validation
    if (!this.state.title || !this.state.options) {
      this.setState({ error: "Complete Required fields" });
      return;
    }
    // some logic to conform/match  the about to be created poll to our Database Schema
    const poll = {
      title,
      options: options.split(",").map(option => ({ option }))
    };
    // we dispatch the action that creates the poll
    this.props.createPoll(poll,history);
  };

  //this will handle change on any of the input and reset the error fields
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  render() {
    const { title, options, error } = this.state;
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <h1 className="header">Make a new poll</h1>
        {error ? (
          <div className="container">
            <h5 className="red-text">{this.state.error}</h5>
          </div>
        ) : (
          ""
        )}
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="title">
            {" "}
            <span className="red-text">*</span> title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="options">
            {" "}
            <span className="red-text">*</span> Options (Separated by a comma)
          </label>
          <textarea
            value={options}
            style={{ marginTop: 20 }}
            name="options"
            cols="20"
            onChange={this.handleChange}
            rows="20"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <button style={{ backgroundColor: "#e67e22" }} className="btn">
            SUBMIT
          </button>
        </div>
      </form>
    );
  }
}

// we also need to `connect` to this component to the redux store
// although we do not need any piece of state from the store in this component,
// however, this component must be able to trigger an action that will eventually update the state.
export default connect(null, { createPoll })(PollsNew);
