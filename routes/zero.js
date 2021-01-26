const express = require('express');

const router = express.Router();
const controllerUsers = require('../controllers/users');

router.route('/')
  .get(controllerUsers.renderZero);

router.route('/auth')
  .get(controllerUsers.userAuth)
  .post(controllerUsers.authToBase);

router.route('/reg')
  .get(controllerUsers.userReg)
  .post(controllerUsers.regToBase);

router.route('/out')
  .get(controllerUsers.userOut);

router.route('/logout')
  .get(controllerUsers.logout);

module.exports = router;
