//require in the poll schema
const Poll = require("../models/Poll");

//  create a new Poll
exports.createPoll = async (req, res) => {
  const { title, options } = req.body;
  const poll = new Poll({
    title,
    options,
    _author: req.user._id
  });
  console.log(poll);
  await poll.save();
  res.send(poll);
};

// Fetch all Polls
exports.fetchAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find({}).select("-options");
    res.send(polls);
  } catch (error) {
    console.log(error);
  }
};

// fetch all the polls created by the currently logged in user
exports.fetchMyPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ _author: req.user._id });
    res.send(polls);
  } catch (error) {
    console.log(error);
  }
};
// fetch a specific poll
exports.fetchPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    res.send(poll);
  } catch (error) {
    console.log(error);
  }
};

//vote on a specific poll
exports.voteOnPoll = async (req, res) => {
  //we get the ip of that user, if he is not logged in.
  const ip = req.ip || req.connection.remoteAddress;
  let respondee;
  if (req.user) {
    //if the user object exits, we assign the respondee as that user's id
    respondee = req.user._id;
  } else {
    // else we assign the respondee as that user's ip
    respondee = ip;
  }
  // before a vote is casted, we ensure that that user or ip-address has not voted
  const { id, option } = req.params;
  const hasVoted = await Poll.find({
    _id: id,
    respondees: respondee
  });

  if (hasVoted && hasVoted.length > 0) {
    return res.status(200).send("You have already voted on this poll");
  }

  // firstly we find that poll and the option;
  const poll = await Poll.findOneAndUpdate(
    {
      _id: id,
      options: { $elemMatch: { option } }
    },
    {
      $inc: { ["options.$.votesCount"]: 1 }, //we increment the vote count by 1
      $addToSet: { respondees: respondee } //we add that respondee to the array of respondees
    }
  ).exec(); // we execute the query

  //if that option does not exist, we create it and increment the voteCount by 1
  // also, we add that respondee to the respondees array
  if (!poll) {
    const poll = await Poll.findByIdAndUpdate(id, {
      $addToSet: {
        options: { option, votesCount: 1 },
        respondees: respondee
      }
    }).exec();
  }
  res.status(200).send("Your vote has been placed");
};

// delete a specific poll
exports.deletePoll = async (req, res) => {
  //verify if the currently logged in user created that poll
  const poll = await Poll.findById(req.params.id);
  if (poll._author.equals(req.user._id)) {
    await poll.remove();
    return res.send({ message: "Deleted" });
  }
  res.status(403).send({ error: "You are not authorized to do that" });
};

// delete all Polls
exports.deleteAllPolls = async (req, res) => {
  await Poll.remove();
  console.log("removed all polls successfully");
};
