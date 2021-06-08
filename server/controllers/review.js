const ObjectId = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Review = require("../models/Review");

// @route POST /review/:id
// @Given parameters passed in, create a review.
exports.createReview = asyncHandler(async (req, res, next) => {
  const userId = req.body.id;
  const profileId = req.params.id;
  const reviewData = req.body;

  if (!ObjectId(userId)) {
    return res.status(400).send(Error("User id is invalid"));
  }

  try {
    const { firstName, lastName, profileImg } = await User.findById(
      userId
    ).populate("profile");
    const sitterProfile = await Profile.findById(profileId);
    const newReview = new Review({
      ...reviewData,
      user: {
        firstName: firstName,
        lastName: lastName,
        profileImg: profileImg,
      },
    });
    res.status(200).jason({
      success: {
        review: [...sitterProfile.review, newReview],
      },
    });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @route GET /review/:id
// @Given profile id, get all reviews
exports.getAllReviews = asyncHandler(async (req, res, next) => {
  const profileId = req.params.id;
  const userId = req.body.id;

  if (!ObjectId(userId)) {
    return res.status(400).send(Error("User id is invalid"));
  }

  try {
    const sitterProfile = await Profile.findById(profileId).populate("review");
    res.status(200).jason({
      success: {
        reviews: sitterProfile.review,
      },
    });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});
