const Request = require("../models/Request");

exports.getRequestById = (req, res, next, requestId) => {
  Request
    .findById(requestId)
    .exec((error, request) => {
      if (error) {
        return res.status(400).json({
          error: "No request was found in DB"
        })
      }

      req.request = request;
      next();

    })
}

exports.getAllRequest = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Request
    .find()
    .sort([[sortBy, 'ascending']])
    .exec((error, requests) => {
      if (error) {
        return res.status(500).json({
          error: "Error in Fetching the request from DB"
        })
      }

      return res.status(200).json({ requests });

    })
}

exports.createRequest = (req, res) => {
  if (req.body.sitter_id === req.user.id) {
    return res.status(400).json({
      error: "User cann't create request for themselves."
    })
  }
  if (req.body.user_id !== req.user.id) {
    return res.status(401).json({
      error: "Please, only pass the user_id for the logged in user."
    });
  }
  const request = new Request(req.body);
  request.save((error, request) => {
    if (error) {
      return res.status(400).json({
        error: "Unable to save request in DB"
      })
    }

    return res.status(200).json({
      request
    })

  })
}

exports.updateRequest = (req, res) => {
  // A User cannot accept or decline it's own request
  if (req.request.user_id.toString() === req.user.id) {
    return res.status(401).json({
      error: "User is not authorized to accept or decline its own request."
    })
  }

  if (req.request.sitter_id.toString() !== req.user.id) {
    return res.status(401).json({
      error: "Logged In user id doesn't match with the sitter id."
    })
  }

  Request.updateOne(
    { _id: req.params.requestId },
    { $set: {
        "accepted": req.body.accepted,
        "declined": req.body.declined
      }
    },
    (error, request) => {
      if (error) {
        return res.status(400).json({
          error: "Cannot Update Request status."
        })
      }

      return res.status(204).json({
        success: "query updated successfully."
      })

    }
  )
}
