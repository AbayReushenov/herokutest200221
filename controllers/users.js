const bcrypt = require('bcrypt');
const User = require('../models/modelUser');

const saltRounds = 10;

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

async function regToBase(req, res) {
  const { name, email, pass } = req.body;
  if (name && email && pass) {
    try {
      const hash = await bcrypt.hash(pass, saltRounds);
      const user = new User({
        name,
        pass: hash,
        email,
      });
      await user.save();
      req.session.user = {
        id: user._id,
      };
      return res.redirect('/main');
    } catch (err) {
      return res.redirect('/');
    }
  }
  return res.status(401).redirect('/reg');
}

async function authToBase(req, res) {
  const { email, pass } = req.body;
  if (email && pass) {
    try {
      const currentUser = await User.findOne({ email });
      if (currentUser) {
        if (await bcrypt.compare(pass, currentUser.pass)) {
          req.session.user = {
            id: currentUser._id,
          };
          return res.redirect('/main');
        }
      }
    } catch (error) {
      return res.redirect('/');
    }
  }
  return res.status(401).redirect('/auth');
}

async function logout(req, res) {
  req.session.destroy((err) => {
    if (err) return res.redirect('error', { error: err });
    res.clearCookie('sid');
    return res.redirect('/');
  });
}

module.exports = {
  userAuth,
  userReg,
  userOut,
  renderZero,
  regToBase,
  authToBase,
  logout,
};
