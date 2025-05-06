const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ mail: req.body.mail, password: hash });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé !' });
  } catch (error) {
    res.status(error.message === 'Hash failed' ? 500 : 400).json({ error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ mail: req.body.mail });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe incorrect !' });
    }

    const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
      expiresIn: '24h',
    });

    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

