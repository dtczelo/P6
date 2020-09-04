const express = require('express');

const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
        .catch(error => res.status(400).json({ error }));
};
/* User like la sauce et envoi une requête
    le server va chercher la sauce avec son ID
    Si le like = 1 envoi {
        On récupère le nombre total de like de la sauce et on lui ajoute 1
        On envoi une requête (uptadeOne) avec le nouveau décompte + push de l'ID au tableau de likes (sauce.likes.push(req.body.userId))
    }
    Si le like = -1 idem inversé

    Si le like = 0 {
        
    }
        
*/
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        if (!sauce) {
            return res.status(404).json({ error });
        }
        var userWhoJustLiked = req.body.userId;
        var user
        return console.log(sauce);
    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
    console.log(req.params.id)
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
    .catch(error => res.status(404).json({ error }));
};

exports.findOneSauce = (req, res ,next) => {
    Sauce.findOne({ _id: req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.findSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};