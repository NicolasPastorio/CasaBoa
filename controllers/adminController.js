const Vendedor = require('../models/Vendedor');

exports.dashboard = (req, res) => {
    if(req.user && req.user.tipo === 'admin'){
        return res.render('admin');
    }
    res.redirect('/login');
}
exports.adicionarVendedor = (req, res) => {
    // função para adicionar vendedor, puxar essa função de models/Vendedor.js
    const { email, senha, nome, dataNascimento, endereco, telefone } = req.body;

    Vendedor.createVendedor(email, senha, nome, dataNascimento, endereco, telefone, (err, results) => {
        if(err){
            console.error('Erro ao adicionar vendedor:', err);
            req.flash('error', 'Erro ao adicionar vendedor. Verifique os dados e tente novamente.');
            return res.redirect('/admin');
        }
        req.flash('success', 'Vendedor adicionado com sucesso!');
        res.redirect('/admin');
    })
};
