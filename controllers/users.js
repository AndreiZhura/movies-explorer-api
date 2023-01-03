
const user = require('../models/user');

module.exports.createUser = ( req, res, next) => {
  const { email, password, name} = req.body;
  user.create({email, password, name})
  .then((users) =>{ res.send(users)})
  .catch((err) => { res.send(err)})
}

module.exports.getUserMe = (req, res, next) => {

  user.findById(req.user)
    .then((user) => {
      if (!user) {
        res.send('данного пользователя не существует')
      }
      return res.status(200).send({ data: user });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.updateUserMe = (req, res, next) => {

  const { name, email } = req.body;

  user.findByIdAndUpdate(req.params._id, { name, email }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then(user => res.send({ data: user }))
    .catch(err => res.send({ message: err }));
}

module.exports.getUsers = ( req,res, next) => {

    user.find({"_id": "63aea22378a036beff3dcab3"})
    .then((users) => {
      console.log(users);
      res.send(users)})
}