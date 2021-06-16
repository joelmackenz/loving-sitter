const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Convo = require("../models/convo");
const ObjectId = require("mongodb").ObjectId;

// @route POST /convo
// @desc Create convo
// @access Private
module.exports.createConvo = async (req, res, next) => {
    const { users } = req.body;
    const alreadyExists = await Convo.findOne({
        users: users,
    });
    if (users.length >= 1) {
        if (!alreadyExists) {
            const newConvo = new Convo({
                users: users,
            });
            try {
                newConvo.save().then((err) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        res.send(201);
                        res.json(newConvo._id);
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
    const userId = ObjectId(req.user.id);
    try {
        const foundConvos = await Convo.find({
            users: userId,
        });
        if (!foundConvos) {
            res.status(200).send("No conversations found.");
        } else {
            res.status(200).send(foundConvos);
        }
    } catch (err) {
        res.send(err);
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
        const convoId = req.params.id;
        Convo.findById(convoId, (err, convo) => {
            if (convo) {
                res.json(convo.messages);
            } else {
                res.send("No conversation found!");
            }
        });
    } catch (err) {
        res.send(err);
    }
};
