const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Convo = require("../models/convo");

// POST operation
module.exports.createConvo = async (req, res, next) => {
    const { users } = req.body;
    const alreadyExists = await Convo.findOne({
        users: users,
    });
    try {
        if (users[1]) {
            if (!alreadyExists) {
                const newConvo = new Convo({
                    users: users,
                });

                newConvo.save().then((err) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        res.send(201);
                        res.json(newConvo._id);
                    }
                });
            } else {
                res.status(400);
                res.send("Conversation between these users already exists.");
            }
        } else {
            res.status(400);
            res.send(
                "Conversation must include more than one user in user array."
            );
        }
    } catch (err) {
        res.send(err);
    }
};

// GET single convo
module.exports.getSingleConvo = async (req, res, next) => {
    const users = req.body.users;

    const foundConvo = await Convo.findOne({
        users: users,
    });

    res.status(200).json(foundConvo);
};

// GET messages from single convo using convo ID
module.exports.getConvoMessages = async (req, res, next) => {
    const convoId = req.params.id;

    Convo.findById(convoId, (err, convo) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            if (convo) {
                res.json(convo.messages);
            } else {
                res.send("No conversation found!");
            }
        }
    });
};
