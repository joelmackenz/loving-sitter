const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Convo = require("../models/convo");

// POST operation
module.exports.addMessage = async (req, res, next) => {
    const convoId = req.params.id;

    const newMessage = req.body.message;

    // Used to ensure posting user is a member of the conversation
    let convoUsers;

    Convo.findById(convoId, (err, convo) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            convoUsers = convo.users;
        }
    });

    Convo.updateOne(
        { _id: convoId },
        { $push: { messages: newMessage } },
        (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                if (convoUsers.includes(newMessage.user)) {
                    res.json({ success: true, msg: "Message added" });
                } else {
                    res.status(400);
                    res.send("Message sender not a conversation user!");
                }
            }
        }
    );
};

// PUT -- edit message

// module.exports.editMessage = async (req, res, next) => {
//     // Send the message id
//     const messageId = req.params.id
//     Message.updateOne
// }
