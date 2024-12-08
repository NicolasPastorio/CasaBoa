const db = require('../config/database');
const Usuario = require('./Usuario');

class Cliente extends Usuario{
    constructor(id, email, senha, nome, dataNascimento, endereco, telefone){
        super(id, email, senha, 'cliente', nome);
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.telefone = telefone;
    }
    
    static createCliente(email, senha, nome, dataNascimento, endereco, telefone, callback){
        Usuario.createUser(email, senha, 'cliente', nome, (userResult) => {
            console.log('Usuário cadastrado com sucesso!');
            const idUsuario = userResult.insertId;
            console.log('id do usuario: ', idUsuario);

            const query = 'INSERT INTO Clientes (idUsuario, dataNascimento, endereco, telefone) VALUES (?, ?, ?, ?);';

            db.query(query, [idUsuario, dataNascimento, endereco, telefone], (err, results) => {
                if(err) throw err;
                console.log('Cliente criado: ', results);
                callback(results);
            });
        });
    }

    static getIdClienteByUsuario(idUsuario, callback){
        const query = 'SELECT idCliente FROM Clientes WHERE idUsuario = ?;';
        console.log('Executando query para getIdClienteByUsuario:', query);
        db.query(query, [idUsuario], (err, results) => {
            if(err){
                console.error('Erro na query getIdClienteByUsuario:', err); 
                return callback(err, null);
            }
            if(results.length === 0){
                console.log('Nenhum cliente encontrado para idUsuario: ', idUsuario);
                return callback(new Error('Cliente não encontrado'), null);
            }
            console.log('Cliente encontrado: ', results[0]);
            callback(null, results[0].idCliente);
        });
    }
}

module.exports = Cliente;