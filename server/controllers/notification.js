const Notification = require("../models/Notification");

exports.getNotificationById = (req, res, next, notificationId) => {
  Notification
    .findById(notificationId)
    .exec((error, notification) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to get Notification from DB"
        })
      }

      req.notification = notification;
      next();

    })
}

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
  if (req.notification.user.toString() !== req.user.id) {
    return res.status(401).json({
      error: "User is not authorized to update read request."
    })
  }

  Notification.findOneAndUpdate(
    { _id: req.params.notificationId },
    { $set: { readStatus: true } },
    (error, notification) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to update the notification status"
        })
      }

      return res.status(204).json({
        success: "Read Status updated successfully."
      })

    }
  )
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

      return res.status(200).json({ notifications: notification })

    })
};

exports.getUnreadNotification = (req, res) => {
  Notification
    .find({ 
      readStatus: { $eq: false },
      user: req.user.id
    })
    .exec((error, notification) => {
      if (error) {
        return res.status(400).json({
          error: "Error in getting Notifications"
        })
      }

      return res.status(200).json({
        notifications: notification
      })
    })
};