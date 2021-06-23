const ObjectId = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile/:id
// @descr Given a user ID and profile parameters, create a profile
exports.createProfile = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const profileData = new Profile(req.body);

    // Needs check to ensure that info sender owns the profile,
    // and that there is no profile already there
    await profileData.save().then(() => {
        User.updateOne(
            { _id: userId },
            { $set: { profile: profileData._id } },
            (err) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.json({ success: true, msg: "Message added" });
                }
            }
        );
    });
});

// @route PUT /profile/:id
// @Given an ID and new parameters, update the profile
const updatedProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const profileId = req.profileId;
  const profileData = req.body;

  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "User ID is invalid."
    })
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      profileData,
      {
        new: true,
      }
    ).select('-_id -__v -userId');
    res.status(200).json({
      success: 'Profile Updated Successfully.',
      profile: updatedProfile
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

exports.createProfile = asyncHandler(async (req, res, next) => {
  const profileExists = await Profile.findOne({ userId: req.user.id });

  if (profileExists) {
    req.profileId = profileExists._id;
    return updatedProfile(req, res);
  }



  const profile = new Profile({
    userId: req.user.id,
    ...req.body
  });
  profile.save((error, profile) => {
    if (error) {
      return res.status(400).json({
        error: "Error in Saving the Profile",
      })
    }

    // Add profile id to User Schema
    User.updateOne(
      { _id: req.user.id },
      { $set: { profileId: profile._id } },
      { upsert: true }
    ).exec((error, user) => {
      if (error) {
        return res.status(400).json({
          error: "Error in saving profile id to User"
        })
      };
    })


    profile.__v = undefined;
    profile.userId = undefined;

    return res.status(201).json({
      success: "Profile created successfully.",
      profile
    });

  })

})

exports.getOneFullUserProfile = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).send(Error("User ID is invalid."));
  };

  try {
    const user = await User.findOne({
      _id: userId,
      isDogSitter: { $eq: true },
      profileId: {
          $exists: true,
      },
  })
      .select("firstName lastName email isDogSitter")
      .populate({
          path: "profileId",
          select: "-__v -availableDays"
      });

      return res.status(400).json({
        success: 'Retrieved successfully',
        user
      })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }

})


// @route GET /profile/
exports.getOneProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

    // validate id
    if (!ObjectId.isValid(userId)) {
        return res.status(400).send(Error("User ID is invalid."));
    }

  try {
    const profile = await Profile.findOne({ userId }, { userId: 0, __v: 0, _id: 0 });
    if (profile) {
      return res.status(200).json({
        profile
      });
    } else {
      return res.status(400).json({ error: 'Unable to Fetch User Profile' })
    }
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

exports.addImageUrls = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).send(Error("User ID is invalid."));
  }

  try {
    Profile.updateOne(
      { userId },
      { $set: { profileImg: req.body.profileImg, coverImg: req.body.coverImg } },
      { upsert: true },
      (error, profile) => {
        if (error) {
          return res.status(500).json({
            error: error.message
          })
        }

        return res.status(200).json({
          success: 'Files are saved successfully.',
          images: {
            profileImg: req.body.profileImg,
            coverImg: req.body.coverImg
          }
        })

      }
    )
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }

})

// @route GET /profile
// @descr Gets an array of users who have profiles, option to limit number returned (returns 100 by default)
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
    const numberOfUsers = req.body.numberOfUsers
        ? req.body.numberOfUsers + 1
        : 100;
    try {
        const allUsers = await User.find({
            _id: { $ne: req.user.id },
            isDogSitter: { $eq: true },
            profileId: {
                $exists: true,
            },
        })
            .select("firstName lastName email isDogSitter")
            .limit(numberOfUsers)
            .populate({
                path: "profileId",
                select: "-__v -availableDays"
            });
        // Returns only users with profiles
        res.status(200).json({
            success: "Retrieved Successfully",
            allUsers
        });
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});

// @route GET /profile/search/city/:search
// @descr Gets an array of users who have profiles based on a search for their city
exports.getProfilesBySearch = asyncHandler(async (req, res, next) => {
    const search = req.params.search;
    try {
        const allUsers = await User.find({
            _id: { $ne: req.user.id },
            isDogSitter: { $eq: true },
            profileId: {
                $exists: true,
            },
        })
          .select("firstName lastName email isDogSitter")
          .populate({
              path: "profileId",
              select: "-__v -availableDays",
              match: {
                city: search
              }
          });

        // Returns only users with profiles
        res.status(200).json({
          allUsers,
        });
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});

// @route GET /profile/search/day/:search
// @descr Gets an array of users who have profiles based on given availability days
exports.getProfilesByDay = asyncHandler(async (req, res, next) => {
    const search = req.params.search;
    try {
        const allUsers = await User.find({
            _id: { $ne: req.user.id },
            isDogSitter: { $eq: true },
            profileId: {
              $exists: true,
            },
        })
          .select("firstName lastName email isDogSitter")
          .populate({
            path: "profileId",
            select: "-__v",
            match: {
              availableDays: { $in: search }
            }
        });

        // Returns only users with profiles
        res.status(200).json({
          allUsers
        });
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});
