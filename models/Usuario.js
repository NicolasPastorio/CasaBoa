const bcrypt = require('bcryptjs');
const db = require('../config/database');

class Usuario {
    constructor(email, senha, tipo, nome){
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.nome = nome;
    }

    static findByEmail(email, callback){
        const query = 'SELECT * FROM Usuarios WHERE email = ?;';

        db.query(query, [email], (err, results) => {
            if(err) throw err;
            callback(results[0]);
        });
    }

    static findById(id, callback){
        const query = 'SELECT * FROM Usuarios WHERE idUsuario = ?;';
        db.query(query, [id], (err, results) => {
            if(err) return callback(err);
            callback(null, results[0]);
        });
    }

    static createUser(email, senha, tipo, nome, callback){
        bcrypt.hash(senha, 10, (err, hashedPassword) => {
            if (err) {
                console.error('Erro ao criptografar a senha:', err);
                return callback(err, null);
            }
            const query = 'INSERT INTO Usuarios (email, senha, tipo, nome) VALUES (?, ?, ?, ?);';
            db.query(query, [email, hashedPassword, tipo, nome], (err, results) => {
                //if(err) throw err;
                if (err) {
                    console.error('Erro ao inserir usuário no banco de dados:', err);
                    return callback(err, null);
                }
                console.log('Usuario criado com sucesso: ', results);
                callback(null, results);
            });
        })
    }
}

module.exports = Usuario;