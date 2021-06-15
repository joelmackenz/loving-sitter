const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Convo = require("../models/convo");
const Message = require("../models/message");
const ObjectId = require("mongodb").ObjectId;

// POST -- Add Message
module.exports.addMessage = async (req, res, next) => {
    const convoId = req.params.convoId;

    const newMessage = new Message(req.body);

    let convoUsers;

    // Gets users involved in conversation
    Convo.findById(convoId, (err, convo) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            convoUsers = convo.users;
        }
    }).exec((err) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            // Ensures author is a member of the conversation
            if (convoUsers.includes(newMessage.author)) {
                Convo.updateOne(
                    { _id: convoId },
                    { $push: { messages: newMessage } },
                    (err) => {
                        if (err) {
                            console.log(err);
                            res.send(err);
                        } else {
                            res.json({ success: true, msg: "Message added" });
                        }
                    }
                );
            } else {
                res.status(400);
                res.send("Message sender not a conversation user!");
            }
        }
    });
};

// PUT -- Edit Message
module.exports.editMessage = async (req, res, next) => {
    const { convoId, messageId } = req.params.convoId;
    newMessageBody = req.body.message.body;
    try {
        let result = await Convo.findByIdAndUpdate(
            convoId,
            {
                $set: {
                    "messages.$[i].body": newMessageBody,
                },
            },
            {
                arrayFilters: [{ "i._id": ObjectId(messageId) }],
                new: true,
            }
        );

        if (!result) return res.status(404);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Problem -- message not edited.");
    }
};

// DELETE -- Delete Message
module.exports.deleteMessage = async (req, res, next) => {
    const convoId = req.params.convoId;
    const messageId = req.params.messageId;
    try {
        let result = await Convo.findByIdAndUpdate(
            convoId,
            {
                $pull: { messages: { _id: ObjectId(messageId) } },
            },
            {
                new: true,
            }
        );
        if (!result) return res.status(404);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send("Problem -- message not erased.");
    }
};
