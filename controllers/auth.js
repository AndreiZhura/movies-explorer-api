const user = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return users.findUserByCredentials(email, password)
    .then((user) => {
      // напишите код здесь
      const token = jwt.sign({ _id: user._id }, SECRET_KEY_JWT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
