const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Convo = require("../models/convo");
const ObjectId = require("mongodb").ObjectId;

// @route POST /message
// @desc Add message
// @access Private
module.exports.addMessage = async (req, res, next) => {
    const convoId = req.params.convoId;

    try {
        const convos = await Convo.findById(convoId);
        const convoUsers = convos.users;
        
        if (convoUsers.includes(req.body.author)) {
            convos.messages.push(req.body);
            convos.save((error, convo) => {
                if (error) {
                    return res.status(400).json({
                        error: error.message
                    })
                }
                return res.json({ success: true, msg: "Message added" });
            });
        } else {
            res.status(400).send("Message sender not a conversation user!");
        }
    } catch (err) {
        res.status(400).send(err);
    }
};

// @route PUT /message/:convoId/:messageId
// @desc Edit message
// @access Private
module.exports.editMessage = async (req, res, next) => {
    const { convoId, messageId } = req.params;
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

// @route DELETE /message/:convoId/:messageId
// @desc Delete message
// @access Private
module.exports.deleteMessage = async (req, res, next) => {
    const { convoId, messageId } = req.params;
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
