const bcrypt = require("bcrypt");
const User = require("../models/User");
const City = require("../models/City");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const city = await City.findOne({ name: req.body.city });
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        mail: req.body.mail,
        password: hash,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        city: city ? city._id : undefined,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = async (req, res, next) => {
  User.findOne({ mail: req.body.mail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

