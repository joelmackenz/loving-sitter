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
      User.aggregate(
        [
          { 
            $match: { 
            _id: { $ne: req.user.id },
            isDogSitter: { $eq: true },
            profileId: { $exists: true }
          }},
          {
            $project: {
              firstName: 1,
              lastName: 1,
              email: 1,
              isDogSitter: 1,
              profileId: 1,
          }},
          {
            $lookup: {
              from: "profiles",
              let: { id: "$profileId" },
              pipeline: [
                {
                  $project: {
                    __v: 0,
                    availableDays: 0,
                }},
                {
                  $match: {
                    $expr: {$eq: ["$_id", {"$toObjectId": "$$id"}]},
                }}
              ],
              as: "profileId",
          }},
          {
            $match: {
              "profileId": {"$ne": []}
          }},
        ],
        (error, result) => {
          if (error || !result.length) {
            return res.status(400).json({
              error: "No Search Result Found"
            })
          }
          return res.status(200).json({
            allUsers: result
          })
        }
      );
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
        User.aggregate(
          [
            { 
              $match: { 
              _id: { $ne: req.user.id },
              isDogSitter: { $eq: true },
              profileId: { $exists: true }
            }},
            {
              $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                isDogSitter: 1,
                profileId: 1,
            }},
            {
              $lookup: {
                from: "profiles",
                let: { id: "$profileId" },
                pipeline: [
                  {
                    $project: {
                      __v: 0,
                      availableDays: 0,
                  }},
                  {
                    $match: {
                      $expr: {$eq: ["$_id", {"$toObjectId": "$$id"}]},
                      city: search
                  }}
                ],
                as: "profileId",
            }},
            {
              $match: {
                "profileId": {"$ne": []}
            }},
          ],
          (error, result) => {
            if (error || !result.length) {
              return res.status(400).json({
                error: "No Search Result Found"
              })
            }
            return res.status(200).json({
              allUsers: result
            })
          }
        );
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});

// @route GET /profile/search/day/:search
// @descr Gets an array of users who have profiles based on given availability days
exports.getProfilesByDay = asyncHandler(async (req, res, next) => {
    const search = req.params.search.split(",");

    try {
        User.aggregate(
          [
            { 
              $match: { 
              _id: { $ne: req.user.id },
              isDogSitter: { $eq: true },
              profileId: { $exists: true }
            }},
            {
              $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                isDogSitter: 1,
                profileId: 1,
            }},
            {
              $lookup: {
                from: "profiles",
                let: { id: "$profileId" },
                pipeline: [
                  {
                    $project: {
                      __v: 0,
                  }},
                  {
                    $match: {
                      $expr: {$eq: ["$_id", {"$toObjectId": "$$id"}]},
                      availableDays: { $in: search }
                  }}
                ],
                as: "profileId",
            }},
            {
              $match: {
                "profileId": {"$ne": []}
            }},
          ],
          (error, result) => {
            if (error || !result.length) {
              return res.status(400).json({
                error: "No Search Result Found"
              })
            }
            return res.status(200).json({
              allUsers: result
            })
          }
        );

    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});
