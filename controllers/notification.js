const Notification = require("../models/Notification");

exports.createNotification = (req, res) => {
  if (req.user.id === req.body.userReceiverId) {
    return res.status(401).json({
      error: "User is not authorized for creating notifications for himself."
    })
  }

  if (req.user.id !== req.body.userCreatorId) {
    return res.status(401).json({
      error: "Please, only pass the userCreatorId for loggedIn user"
    })
  }
  console.log('req.body ', req.body);
  const notification = new Notification(req.body);
  notification.save((error, notification) => {
    if (error) {
      return res.status(400).json({
        error: "Error in Saving the notification",
        message: error.message
      })
    }

    return res.status(201).json({
      success: "Notification created successfully."
    })

  })
};

exports.updateReadNotification = (req, res) => {
  const operations = req.body.notifications.map((notification) => {
    if(notification.userReceiverId.toString() !== req.user.id) {
      return res.status(401).json({
        error: "User is not authorized to update read status."
      });
    };

    return {
      updateOne: {
        filter: { _id: notification._id },
        update: { $set: { readStatus: true } }
      }
    };
  });

  Notification.bulkWrite(operations, {}, (error, notification) => {
    if (error) {
      return res.status(400).json({
        error: "Unable to update the notification status.",
        message: error.message
      });
    }
    return res.status(204);
  })
};

exports.getAllNotification = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Notification
    .find({ userReceiverId: req.user.id })
    .sort([[sortBy, "ascending"]])
    .limit(limit)
    .exec((error, notification) => {
      if(error) {
        return  res.status(400).json({
          error: "Error in getting Notifications"
        })
      }

      return res.status(200).json({ 
        notifications: notification,
        success: "Retrieved successfully."
      })

    })
};

exports.getUnreadNotification = (req, res) => {
  Notification
    .find(
      { 
        readStatus: { $eq: false },
        userReceiverId: req.user.id,
      },
      {
        __v: 0,
        updatedAt: 0
      }
    )
    .select("-updatedAt")
    .populate("userCreatorId", "firstName lastName email")
    .exec((error, notification) => {
      if (error) {
        return res.status(400).json({
          error: "Error in getting Notifications"
        })
      }

      return res.status(200).json({
        notifications: notification,
        success: "Retrieved successfully."
      })
    })
};
