const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'senha'},
            (email, senha, done) => {
                if(!email || !senha){
                    return done(null, false, { message: 'Credenciais ausentes.'});
                }
                Usuario.findByEmail(email, (usuario) => {
                    if(!usuario) return done(null, false, { message: 'Usuário não encontrado.'});
                    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
                        if(err) return done(err);
                        if(isMatch){ 
                            //return done(null, false, { message: 'Tipo de usuário inválido.' });
                            return done(null, usuario);
                        }  else{
                            return done(null, false, { message: 'Senha incorreta!' });
                        }
                    });
                    // Comparar senha (se estiver usando bcrypt, ajuste a comparação para bcrypt.compare)
                    /*if (senha === usuario.senha) {
                        return done(null, usuario);
                    } else {
                        return done(null, false, { message: 'Senha incorreta!' });
                    }*/
                })
            }
        )
    );
    passport.serializeUser((user, done) => done(null, user.idUsuario));
    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, user) => {
            if(err) return done(err);
            return done(null, user);
        })
    });
};