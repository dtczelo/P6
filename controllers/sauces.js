const express = require("express");

const Sauce = require("../models/sauce");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    sauce
        .save()
        .then(() =>
            res.status(201).json({
                message: "Sauce ajoutée !",
            })
        )
        .catch((error) => res.status(400).json({ error }));
};

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id,
    })
        .then((sauce) => {
            if (!sauce) {
                return res.status(404).json({ error });
            }
            if (req.body.like === 1) {
                sauce.usersLiked.push(req.body.userId);
                Sauce.updateOne(
                    {
                        _id: req.params.id,
                    },
                    {
                        likes: ++sauce.likes,
                        usersLiked: sauce.usersLiked,
                        _id: req.params.id,
                    }
                )
                    .then(() =>
                        res.status(200).json({
                            message: "Like ajoutée !",
                        })
                    )
                    .catch((error) =>
                        res.status(404).json({
                            error,
                        })
                    );
            }
            if (req.body.like === -1) {
                sauce.usersDisliked.push(req.body.userId);
                Sauce.updateOne(
                    {
                        _id: req.params.id,
                    },
                    {
                        dislikes: ++sauce.dislikes,
                        usersDisliked: sauce.usersDisliked,
                        _id: req.params.id,
                    }
                )
                    .then(() =>
                        res.status(200).json({
                            message: "Dislike ajoutée !",
                        })
                    )
                    .catch((error) =>
                        res.status(404).json({
                            error,
                        })
                    );
            }
            if (req.body.like === 0) {
                // Fonction suppression de l'user ID
                function removeElement(array, elem) {
                    var index = array.indexOf(elem);
                    if (index > -1) {
                        array.splice(index, 1);
                    }
                    return array;
                }
                if (sauce.usersLiked.find((id) => id == req.body.userId) != undefined) {
                    sauce.usersLiked = removeElement(sauce.usersLiked, req.body.userId);
                    if (sauce.usersLiked === undefined) {
                        sauce.usersLiked = [];
                    }
                    Sauce.updateOne(
                        {
                            _id: req.params.id,
                        },
                        {
                            likes: --sauce.likes,
                            usersLiked: sauce.usersLiked,
                            _id: req.params.id,
                        }
                    )
                        .then(() =>
                            res.status(200).json({
                                message: "Like supprimée !",
                            })
                        )
                        .catch((error) =>
                            res.status(404).json({
                                error,
                            })
                        );
                }
                if (sauce.usersDisliked.find((id) => id == req.body.userId) != undefined) {
                    sauce.usersDisliked = removeElement(sauce.usersDisliked, req.body.userId);
                    console.log(sauce.usersDisliked);
                    if (sauce.usersDisliked === undefined) {
                        sauce.usersDisliked = [];
                    }
                    console.log(sauce.usersDisliked);
                    Sauce.updateOne(
                        {
                            _id: req.params.id,
                        },
                        {
                            dislikes: --sauce.dislikes,
                            usersDisliked: sauce.usersDisliked,
                            _id: req.params.id,
                        }
                    )
                        .then(() =>
                            res.status(200).json({
                                message: "Dislike supprimée !",
                            })
                        )
                        .catch((error) =>
                            res.status(404).json({
                                error,
                            })
                        );
                }
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne(
        { _id: req.params.id },
        {
            ...req.body,
            _id: req.params.id,
        }
    )
        .then(() =>
            res.status(200).json({
                message: "Sauce modifié !",
            })
        )
        .catch((error) => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({
        _id: req.params.id,
    })
        .then(() =>
            res.status(200).json({
                message: "Sauce supprimée !",
            })
        )
        .catch((error) => res.status(404).json({ error }));
};

exports.findOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id,
    })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

exports.findSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(404).json({ error }));
};
