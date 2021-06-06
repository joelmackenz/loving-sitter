const Notification = require("../models/Notification");

exports.createNotification = (req, res) => {
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
  Notification.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { readStatus: true } },
    (error, notification) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to update the notification status"
        })
      }

      return res.status(204)

    }
  )
};

exports.getAllNotification = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 8;
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Notification
    .find()
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
      user: req.body.userId 
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
