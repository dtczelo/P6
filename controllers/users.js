const express = require("express");
const mongoMask = require("mongo-mask");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur ajoutée !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    // console.log(req)
    const emailMask = mongoMask([], { id: "_id" });
    User.findOne({ email: req.body.email }, ["password"])
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Utilisateur non trouvé" });
            }
            console.log(user)
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: "MDP" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
