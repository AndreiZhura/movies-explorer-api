const user = require('../models/user');
const users = require('../models/user');

module.exports.getUserMe = (req , res , next) => {

  users.findById(req.user)
  .then((user)=>{
    console.log('Test Users')
  })
  .catch((err)=>{
    console.log('error');
  })
}

module.exports.createUsers = ( req, res, next) => {
   const { email, password, name } = req.body;

   user.create({ email, password, name })
   .then((user) => res.send({ data: user }))
   .catch((err) => {
     if (err.name === 'ValidationError') {
       return res
         .status(ERROR_CODE)
         .send({ message: 'Ошибка обработки данных' });
     }

     return res
       .status(INTERNAL_SERVER_ERROR)
       .send({ message: 'Ошибка по умолчанию.' });
   });
}