const passport = require('passport');

exports.showLogin = (req, res) => {
    res.render('login');
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return next(err);
        if(!user){
            req.flash('error', info ? info.message : 'Erro ao fazer login.');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if(err) return next(err);
            // Redireciona com base no tipo de usuário
            switch(user.tipo){
                case 'admin':
                    return res.redirect('/admin');
                case 'cliente':
                    return res.redirect('/cliente');
                case 'vendedor':
                    return res.redirect('/vendedor');
                default:
                    req.flash('error', 'Tipo de usuário inválido.');
                    return res.redirect('/login');
            }
        });
    })(req, res, next);
};
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){ return next(err); }
        res.redirect('/');
    });
};
