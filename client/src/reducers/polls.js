import {
  FETCH_ALL_POLLS,
  FETCH_POLL,
  DELETE_POLL,
  CLEAR_CURRENT_POLL
} from "../actions/types";
const INITIAL_STATE = { polls: [], poll: {} };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_POLLS:
      return { ...state, polls: action.payload };
    case FETCH_POLL:
      return { ...state, poll: action.payload };
    case DELETE_POLL:
      const polls = state.polls.filter(poll => poll._id !== action.payload);
      return {
        ...state,
        polls
      };
    case CLEAR_CURRENT_POLL:
      return {
        ...state,
        poll: {}
      };
    default:
      return state;
  }
}
