const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const ObjectId = require("mongodb").ObjectId;

const Convo = require("../models/convo");
const onlineUsers = require("../onlineUsers");

// @route POST /convo
// @desc Create convo
// @access Private
module.exports.createConvo = async (req, res, next) => {
    const { users } = req.body;
    const alreadyExists = await Convo.findOne({
        users
    });
    if (users.length >= 1) {
        if (!alreadyExists) {
            const newConvo = new Convo({
                users
            });
            try {
                newConvo.save((err, convo) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({
                            error: err.message
                        });
                    } else {
                        res.status(201).json({
                            _id: convo._id,
                            success: "Created successfully."
                        });
                    }
                });
            } catch (err) {
                res.status(400).send(err);
            }
        } else {
            res.status(400).send(
                "Conversation between these users already exists."
            );
        }
    } else {
        res.status(400).send(
            "Conversation must include more than one user in user array."
        );
    }
};

// @route GET /convo
// @desc Fetch all convos that user is a member of
// @access Private
module.exports.getAllConvos = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const foundConvos = await Convo.find(
            { users: userId },
            { messages: { $slice: -1 } },
        )
        .select("-__v ")
        .populate({
            path: "users",
            match: {  _id: {$ne: userId} },
            select: "firstName lastName email",
            populate: {
                path: "profileId",
                select: "profileImg"
            }
        })
        if (!foundConvos) {
            return res.status(200).json({
                error: "No conversations found."
            });
        } else {
            let conversations = [];
            for (let index = 0; index < foundConvos.length; index++) {
                const element = foundConvos[index];
                const latestMessage = {
                    latestMessageText: element.messages[0]?.text,
                    createdAt: element.messages[0]?.createdAt
                };
                let online;
                // set property for online status of the other user
                if (onlineUsers[element.users[0]._id]) {
                    online = true;
                } else {
                    online = false;
                }
                const recipientUser = {
                    fullName: `${element.users[0].firstName} ${element.users[0].lastName}`,
                    email: element.users[0].email,
                    recipientUserId: element.users[0]._id,
                    profileImg: element.users[0]?.profileId?.profileImg,
                    online
                }
                const conversationId = element._id;
                conversations.push({ conversationId, latestMessage, recipientUser })

                if (conversations.length === foundConvos.length) {
                    return res.status(200).json({
                        success: "Retrieved successfully",
                        conversations: conversations
                    });
                }
            }
        }
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

// @route GET /convo/:convoId
// @desc Fetch single convo
// @access Private
module.exports.getSingleConvo = async (req, res, next) => {
    const userId = ObjectId(req.user.id);
    const convoId = req.params.convoId;
    try {
        const foundConvo = await Convo.findOne({
            _id: convoId,
            users: userId,
        });
        if (!foundConvo) {
            res.status(200).send(
                "User must be a member of the conversation to view messages"
            );
        } else {
            res.status(200).json(foundConvo);
        }
    } catch (err) {
        res.send(err);
    }
};

// @route GET /convo/messages/:id
// @desc Fetch all messages from a single convo
// @access Private
module.exports.getConvoMessages = async (req, res, next) => {
    try {
        const convoId = req.params.convoId;
        Convo.findById(convoId, (err, convo) => {
            if (err) {
                return res.status(400).json({
                    error: "Error in getting the messages",
                    message: err.message
                })
            }
            return res.status(200).json({
                success: "Retrieved successfully",
                messages: convo.messages
            });
        });
    } catch (err) {
        return res.status(500),json({
            error: err.message
        });
    }
};
