// require Request Model
const Request = {};

exports.getRequestById = (req, res, next, id) => {
  Request
    .findById(id)
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
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Request
    .find()
    .sort([[sortBy, 'ascending']])
    .limit(limit)
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
  Request.update(
    { _id: req.request._id },
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

      return res.status(200).json({
        success: "Request status updated successfully."
      })

    }
  )
}
