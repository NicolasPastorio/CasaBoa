const db = require('../config/database');

class Imagem {
    static getByImovelId(idImovel, callback){
        const query = 'SELECT * FROM Imagens WHERE idImovel = ?;';
        db.query(query, [idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results);
        });
    }

    static addImagens(idImovel, imagens, callback){
        const query = `INSERT INTO Imagens (idImovel, Caminho) VALUES ?;`;
        const values = imagens.map(imagem => [idImovel, imagem]);

        db.query(query, [values], (err, result) => {
            if(err) return callback(err, null);
            callback(null, result);
        })
    }
}

module.exports = Imagem;