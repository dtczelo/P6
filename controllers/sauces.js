const express = require('express');

const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(() => res.status(201).status({ message: 'Sauce ajoutée !'}))
        .catch(() => res.status(400).json({ error }));
    next();
};

exports.modifySauce = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
    next();
};

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id})
    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
    .catch(() => res.status(400).json({ error }));
    next();
};

exports.findOneSauce = (req, res ,next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(() => res.status(200).json(sauce))
    .catch(() => res.status(400).json({ error }));
    next();
};

exports.findSauces = (req, res, next) => {
    Sauce.find()
        .then(() => res.status(200).json(sauces))
        .catch(() => res.status(400).json({ error }));
    next();
};