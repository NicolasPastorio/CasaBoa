exports.ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'Você precisa estar logado para acessar esta página.');
    res.redirect('/login');
}

exports.ensureRole = (role) => {
    return (req, res, next) => {
        if(req.isAuthenticated() && req.user.tipo === role){
            return next();
        }
        req.flash('error', 'Acesso negado.');
        res.redirect('/login');
    }
}