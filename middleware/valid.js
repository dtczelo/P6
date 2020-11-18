const passwordPolicy = require("password-policy");

module.exports = (req, res, next) => {
    try {
        if (
            passwordPolicy.hasUpperCase(req.body.password, (times = 1)) &&
            passwordPolicy.hasNumber(req.body.password, (times = 1)) &&
            passwordPolicy.hasSpecialCharacter(req.body.password, (times = 1))
        ) {
            next();
        } else {
            res.status(401).json({
                message: "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spéciale !",
            });
        }
    } catch {
        res.status(401).json({ error });
    }
};
