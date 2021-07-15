const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, isDogSitter } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    isDogSitter
  });

  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(201).json({
      success: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isDogSitter: user.isDogSitter,
        }
      }
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = 
    await User.findOne({ email })
    .populate({
      path: "profileId",
      select: "profileImg"
    });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000
    });

    res.status(200).json({
      success: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isDogSitter: user.isDogSitter,
          profileImg: user.profileId?.profileImg
        }
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

exports.updateUser = asyncHandler(async  (req, res, next) => {
  User.updateOne(
    { _id: req.user.id },
    { $set: { isDogSitter: true } },
    { runValidators: true }
  ).exec((error, user) => {
    if (error) {
      return res.status(400).json({
        error: "Error in updating your request. Please, try again!!"
      })
    }
    
    return res.status(200).json({
      success: "Auth User Updated Succssfully.",
      isDogSitter: true,
    })
  })
})

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user =
    await User.findById(req.user.id)
      .select("firstName lastName email isDogSitter")
      .populate({
        path: "profileId",
        select: "profileImg"
      });

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  
  res.status(200).json({
    success: {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isDogSitter: user.isDogSitter,
        profileImg: user.profileId?.profileImg
      }
    }
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");

  res.send("You have successfully logged out");
});

exports.updateUserFields = asyncHandler(async (req, res, next) => {
  const { firstName, lastName } = req.body;

  User.findOneAndUpdate(
    { _id: req.user.id },
    { $set: 
      {
        firstName,
        lastName
      },
    },
    (error, user) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to update the User Auth Fields"
        })
      }

      return res.status(200).json({
        success: "Profile Updated Successfully."
      })

    }
  )

})
