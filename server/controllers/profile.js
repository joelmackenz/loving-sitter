const ObjectId = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route PUT /profile/:id
// @Given an ID and new parameters, update the profile
exports.updatedProfile = asyncHandler(async (req, res, next) => {
  const userId = req.body.id;
  const profileId = req.params.id;
  const profileData = req.body.profile;

  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).send(Error("User ID is invalid."));
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      profileData,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: {
        profile: updatedProfile,
      },
    });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @route GET /profile/:id
// @Given an ID, return profile with that ID
exports.getOneProfile = asyncHandler(async (res, res, next) => {
  const userId = req.body.id;
  const profileId = req.params.id;

  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).send(Error("User ID is invalid."));
  }

  try {
    const user = await User.findById(userId).populate("profile");
    res.status(200).json(user.profile);
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @route GET /profile
// @A list of profiles
exports.getAllProfile = asyncHandler(async (res, res, next) => {
  try {
    const sitterList = await User.find({ _id: { $ne: req.user.id } }).populate({
      path: "profile",
      match: { isDogSitter: { $eq: true } },
    });
    res.status(200).json({
      success: {
        sitterList,
      },
    });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});
