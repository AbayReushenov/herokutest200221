const express = require('express');

const router = express.Router();
const controllerUsers = require('../controllers/users');

router.route('/')
  .get(controllerUsers.renderZero);

router.route('/auth')
  .get(controllerUsers.userAuth);

router.route('/reg')
  .get(controllerUsers.userReg);

router.route('/out')
  .get(controllerUsers.userOut);



module.exports = router;
