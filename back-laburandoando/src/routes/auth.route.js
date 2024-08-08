const authRouter = require('express').Router()
const passport = require('passport');
const User = require('../models/user.model');
const { cryptPassword } = require('../common/functions');
const Worker = require('../models/worker.model');

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

        if (exist && exist.fullname) return res.json({
          data: null,
          error: 'Ya existe un usuario con ese correo',
        })

        await User.create({
            fullname,
            mail,
            password: cryptPassword(password),
            local: true,
        })

        
        res.status(201).json({
          data: "Usuario creado exitosamente.",
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
      const exist = await Worker.findOne({ mail })

      if (exist && exist.fullname) return res.json({
        data: null,
        error: 'Ya existe un trabajador con ese correo',
      })

      await User.create({
          fullname,
          mail,
          password: cryptPassword(password),
          adress,
          phone,
          local: true,
      })

      res.status(201).json({
        data: "Trabajador creado exitosamente.",
        error: null,
      })
  } catch (err) {
      console.log(err)
      res.json({ data: null, error: 'No se pudo crear el trabajador' })
  }
})

authRouter.get('/local/failure', (req, res) => res.status(400).json({ data: null, error: 'El inicio de sesión fallo - LOCAL' }));
authRouter.get('/local/success', (req, res) => res.status(200).json({ data: null, error: 'El inicio de sesión fue exitoso - LOCAL' }));

authRouter.post('/local/login', passport.authenticate('local', {
    successRedirect: '/auth/local/success',
    failureRedirect: '/auth/local/failure'
}));

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