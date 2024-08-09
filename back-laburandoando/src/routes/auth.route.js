const authRouter = require('express').Router()
const passport = require('passport');
const User = require('../models/user.model');
const { cryptPassword } = require('../common/functions');
const Worker = require('../models/worker.model');
const jwt = require('jsonwebtoken');

authRouter.get('/needs-login', (req, res) => {
    res.json({ data: null, error: 'Necesita iniciar sesion' })
})

// Local Auth for Client
authRouter.post('/local/register/', async (req, res) => {
    const { 
        fullname,
        mail,
        password,
     } = req.body
    try {
        const exist = await User.findOne({ mail })

        if (exist && exist?.mail) return res.json({
          data: null,
          error: 'Ya existe un usuario con ese correo',
        })

        const client = await User.create({
            fullname,
            mail,
            password: cryptPassword(password),
            local: true,
        })

        
        res.status(201).json({
          data: client,
          error: null,
        })
    } catch (err) {
        console.log(err)
        res.json({ data: null, error: 'No se pudo crear el usuario' })
    }
})

authRouter.post('/local/register/worker', async (req, res) => {
  const { 
      fullname,
      mail,
      password,
      phone,
      adress,
   } = req.body

  try {
      const exist = await User.findOne({ mail })

      if (exist && exist?.mail) return res.status(400).json({
        data: null,
        error: 'Ya existe un trabajador con ese correo',
      })

      const worker = await User.create({
          fullname,
          mail,
          password: cryptPassword(password),
          adress,
          phone,
          local: true,
      })

      res.status(201).json({
        data: worker,
        error: null,
      })
  } catch (err) {
      res.json({ data: null, error: 'No se pudo crear el trabajador' })
  }
})

authRouter.get('/local/failure', (req, res) => res.status(400).json({ data: null, error: 'El inicio de sesión fallo - LOCAL' }));
authRouter.get('/local/success', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ data: req.user, error: null });
    } else {
        res.status(401).json({ data: null, error: 'Usuario no autenticado' });
    }
}
);

authRouter.post('/local/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(404).json({ data: null, error: 'Usuario no encontrado' });
        }
        
        req.login(user, { session: false }, async (err) => {
            if (err) return next(err);

            const client = await User.findById(user._id).lean()
            const { password, ...clientWithoutPassword } = client;
            return res.json({ data: clientWithoutPassword, error: null });
        });
    })(req, res, next);
});

authRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.json({ data: null, error: 'No se pudo cerrar la sesion' })
            } else {
                res.json({ data: 'Cierre de sesion exitoso', error: null })
            }
        });
    } else {
        res.json({ data: null, error: 'No hay una sesion activa' })
    }
})

module.exports = authRouter