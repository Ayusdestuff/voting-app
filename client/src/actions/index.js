import axios from "axios";
import {
  FETCH_USER,
  FETCH_ALL_POLLS,
  FETCH_POLL,
  DELETE_POLL,
  CLEAR_CURRENT_POLL
} from "./types";

/*===========================================================
  WHATEVER IS DISPATCHED FROM HERE GETS SENT TO THE REDUCERS
============================================================*/

// this action fetches the user and sends it off to the reducers
export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// this action fetches all polls
export const fetchAllPolls = () => async dispatch => {
  try {
    const res = await axios.get("/api/polls");
    dispatch({ type: FETCH_ALL_POLLS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

//  this action fetches all the polls by the currently logged in user
export const fetchMyPolls = () => async dispatch => {
  try {
    const res = await axios.get("/api/polls/me");
    dispatch({ type: FETCH_ALL_POLLS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// this action fetches a specific poll by id
export const fetchPoll = id => async dispatch => {
  try {
    const res = await axios.get(`/api/poll/${id}`);
    dispatch({ type: FETCH_POLL, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

// this action creates a new poll on the server/database
export const createPoll = (poll, history) => {
  return async dispatch => {
    try {
      await axios.post("/api/polls", poll);
      history.push("/polls");
    } catch (error) {
      console.log(error.response.data);
      // todo, dispatch an action when poll creation fails
      history.push("/polls");
    }
  };
};

// this action votes on a poll
export const votePoll = (pollId, choice) => {
  return async dispatch => {
    try {
      //send our option to the api
      const vote = await axios.post(`/api/poll/${pollId}/vote/${choice}`);
      alert(vote.data);
      // then fetch the updated version of that poll
      const res = await axios.get(`/api/poll/${pollId}`);
      dispatch({ type: FETCH_POLL, payload: res.data });
    } catch (error) {
      console.log({ error });
    }
  };
};

// this action deletes a poll
export const deletePoll = pollId => {
  return async dispatch => {
    try {
      //the request to delete the poll,
      //firstly the we make a request to delete the poll on the server
      await axios.delete(`/api/poll/${pollId}`);
      // then we dispatch an action to delete it on the client
      dispatch({ type: DELETE_POLL, payload: pollId });
    } catch (error) {
      console.log(error);
    }
  };
};

/*
 this action clears the currently viewed poll from the application state when the PollShow component is unmounted, 
 so the previous Poll data will not interfere with the next Poll data during rendering

*/
export const clearCurrentPoll = () => {
  return {
    type: CLEAR_CURRENT_POLL
  };
};
