const router = require("express").Router({ mergeParams: true });
const { requireLogin } = require("../controllers/authControllers");
const {
  fetchPoll,
  fetchAllPolls,
  createPoll,
  voteOnPoll,
  fetchMyPolls,
  deletePoll,
  deleteAllPolls
} = require("../controllers/pollcontrollers");

// get all polls
router.get("/polls", fetchAllPolls);
//  create a new poll
router.post("/polls", requireLogin, createPoll);
// get all polls by the currently loggedin user
router.get("/polls/me", requireLogin, fetchMyPolls);
//  get a specific poll 
router.get("/poll/:id", fetchPoll);
// delete a specific poll
router.delete('/poll/:id',requireLogin,deletePoll)
// delete all polls
router.get("/polls/deleteAll", requireLogin, deleteAllPolls);
// create a custom option on a poll
router.post("/poll/:id/vote/:option", voteOnPoll);

module.exports = router;
