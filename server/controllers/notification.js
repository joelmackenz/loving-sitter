const Notification = require("../models/Notification");

exports.createNotification = (req, res) => {
  if (req.user.id === req.body.user) {
    return res.status(401).json({
      error: "User is not authorized for creating notifications for himself."
    })
  }

  const notification = new Notification(req.body);
  notification.save((error, notification) => {
    if (error) {
      return res.status(400).json({
        error: "Error in Saving the notification",
      })
    }

    return res.status(201).json({
      success: "Notification created successfully."
    })

  })
};

exports.updateReadNotification = (req, res) => {
  const operations = req.body.notifications.map((notification) => {
    if(notification.user.toString() !== req.user.id) {
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
    .find({ user: req.user.id })
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
        user: req.user.id,
      },
      {
        __v: 0,
        updatedAt: 0
      }
    )
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
