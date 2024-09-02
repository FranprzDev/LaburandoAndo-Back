const authRouter = require('express').Router()
const passport = require('passport');
const { jwtLogin, jwtRegisterClient, jwtRegisterWorker } = require('../controllers/auth.controller');


authRouter.post('/jwt/register/', jwtRegisterClient);
authRouter.post('/jwt/register/Worker', jwtRegisterWorker);
authRouter.post('/jwt/login', jwtLogin);

authRouter.get('/jwt/ping', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send(req.user)
});

module.exports = authRouter