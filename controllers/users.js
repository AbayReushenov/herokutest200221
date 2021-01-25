const bcrypt = require('bcrypt');
const User = require('../models/modelUser');

function renderZero(req, res) {
  return res.render('zero', { title: 'Вы зарегистрированы в системе ?' });
}

function userAuth(req, res) {
  return res.render('auth', { title: 'Авторизация в системе' });
}

function userReg(req, res) {
  return res.render('reg', { title: 'Регистрация в системе' });
}

function userOut(req, res) {
  return res.render('out', { title: 'До свидания' });
}

// const userSignin = async (req, res) => {
//   const { email, pass } = req.body;
//   if (email && pass) {
//     try {
//       const currentUser = await User.findOne({ email });
//       if (currentUser) {
//         if (await bcrypt.compare(pass, currentUser.pass)) {
//           req.session.user = {
//             id: currentUser._id,
//           };
//           return res.redirect('/secret');
//         }
//       }
//     } catch (error) {
//       return res.redirect('/');
//     }
//   }
//   return res.status(401).redirect('/users/signin');
// };

module.exports = {
  userAuth,
  userReg,
  userOut,
  renderZero,
};
