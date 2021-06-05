const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile
// @Given parameters passed in, create a profile.
exports.createProfile = asyncHandler(async (req, res, next) => {
  let profileData = req.body;
  let profile = new Profile(profileData);

  try {
    const newProfile = await profile.save();
    res.status(200).json({
      success: {
        profile: newProfile,
      },
    });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @route PUT /profile/:id
// @Given an ID and new parameters, update the profile
exports.updatedProfile = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let profile = req.body;

  // validate id
  if (!ObjectId.isValid(id)) {
    return res.status(400).send(Error("Profile ID is invalid."));
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, profile, {
      new: true,
    });
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
  const id = req.params.id;

  // validate id
  if (!ObjectId.isValid(id)) {
    return res.status(400).send(Error("Profile ID is invalid."));
  }

  try {
    const profile = await Profile.findById(id);
    res.status(200).json({
      success: {
        profile,
      },
    });
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