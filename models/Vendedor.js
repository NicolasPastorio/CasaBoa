const Usuario = require('./Usuario');
const db = require('../config/database');

class Vendedor extends Usuario{
    constructor(id, email, senha, nome, dataNascimento, endereco, telefone){
        super(id, email, senha, 'vendedor', nome);
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.telefone = telefone;
    }

    //corrigir possíveis erros desta função
    static createVendedor(email, senha, nome, dataNascimento, endereco, telefone, callback){
        Usuario.createUser(email, senha, 'vendedor', nome, (err, userResult) => {
            if (err) {
                console.error('Erro ao criar usuário:', err);
                return callback(err, null);
            }

            const idUsuario = userResult.insertId;
            console.log('Usuário cadastrado com sucesso! ID: ', idUsuario);

            const query = 'INSERT INTO Vendedores (idUsuario, dataNascimento, endereco, telefone) VALUES (?, ?, ?, ?);';

            db.query(query, [idUsuario, dataNascimento, endereco, telefone], (err, results) => {
                if(err){ 
                    console.error('Erro ao criar vendedor:', err);
                    return callback(err, null);
                }
                console.log('Vendedor criado com sucesso: ', results);
                callback(null, results);
            });
        });
    }
}

module.exports = Vendedor;
