const Usuario = require('./Usuario');

class Admin extends Usuario{
    constructor(id, email, senha, nome, data_admissao){
        super(id, email, senha, 'cliente', nome);
        this.data_admissao = data_admissao;
    } 
}

module.exports = Admin;