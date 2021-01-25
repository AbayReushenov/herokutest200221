const User = require('../models/modelUser');

const checkAuth = async (req, res, next) => {
  const userId = req.session?.user?.id;
  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      res.locals.name = user.name; /* res.locals.name =  локальная переменная ответа */
      req.app.locals.aaa = 'aaa'; /* req.app.locals = глобальные переменые */
      return next();
    }
    return res.status(401).redirect('/');
  }
  return res.status(401).redirect('/');
};

module.exports = {
  checkAuth,
};
