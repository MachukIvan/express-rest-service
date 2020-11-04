const router = require('express').Router();
const { catchErrors } = require('../../common/utils');
const loginService = require('./login.service');

router.route('/').post(
  catchErrors(async (req, res) => {
    const { login, password } = req.body;

    const token = await loginService.signToken(login, password);

    if (token) {
      res.status(200).json({ token });
    } else {
      res.status(403).send('Wrong login/password combination');
    }
  })
);

module.exports = router;
