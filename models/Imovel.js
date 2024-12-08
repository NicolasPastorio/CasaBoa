const db = require('../config/database');

class Imovel {
    static getCategoriasComImoveis(){
        return new Promise((resolve, reject) => {
            //Busca todas as categorias
            const categoriasQuery = 'SELECT * FROM Categorias;';
            console.log('Executando query para getCategoriasComImoveis:', categoriasQuery);
            db.query(categoriasQuery, (err, categorias) => {
                if(err){ 
                    console.error('Erro na query getCategoriasComImoveis:', err);
                    return reject(err);
                }

                //Para cada categoria, busca os imóveis relacionados
                const promises = categorias.map(categoria => {
                    const imoveisQuery = `SELECT * FROM Imoveis WHERE idCategorias = ?;`;

                    return new Promise((resolve, reject) => {
                        db.query(imoveisQuery, [categoria.idCategorias], (err, imoveis) => {
                            if(err) return reject(err);
                            resolve({
                                categoria,
                                imoveis
                            });
                        });
                    });
                });
                Promise.all(promises).then(results => resolve(results)).catch(err => reject(err));
            });
        });
    }
    static getFavoritosPorCliente(idCliente, callback){
        const query = `
            SELECT Imoveis.* FROM Imoveis
            JOIN Favoritos ON Imoveis.idImovel = Favoritos.idImovel
            WHERE Favoritos.idCliente = ?;
        `;
        db.query(query, [idCliente], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results);
        });
    }
    static getById(idImovel, callback){
        const query = 'SELECT * FROM Imoveis WHERE idImovel = ?;';
        db.query(query, [idImovel], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results[0]);
        });
    }
    
    static buscarImoveisPorTermo(termo, callback){
        // Construir critérios de busca
        const criterios = [];
        const valores = [];
        
        // Verificar se o termo corresponde a uma categoria
        if(termo.match(/casa|apartamento|sitio/i)){
            criterios.push(`idCategorias IN (SELECT idCategorias FROM Categorias WHERE Nome LIKE ?);`);
            valores.push(`%${termo}%`);
        }
        // Verificar termos na descrição
        if(termo.match(/\b(quartos|banheiros|ampla)\b/i)){
            criterios.push(`Descricao_detalhada LIKE ?;`);
            valores.push(`%${termo}%`);
        }
        // Verificar termos para preço
        if(termo.match(/abaixo de (\d+)/i)){
            const valor = parseFloat(RegExp.$1);
            criterios.push(`Imoveis.Preco < ?`);
            valores.push(valor);
        }
        if(termo.match(/acima de (\d+)/i)){
            const valor = parseFloat(RegExp.$1);
            criterios.push(`Preco > ?`);
            valores.push(valor);
        }
        if(termo.match(/entre (\d+) e (\d+)/i)){
            const min = parseFloat(RegExp.$1);
            const max = parseFloat(RegExp.$2);
            criterios.push(`Preco BETWEEN ? AND ?`);
            valores.push(min, max);
        }

        // Caso nenhum critério tenha sido preenchido
        if(criterios.length === 0){
            return callback(null, []);
        }

        const query = `SELECT * FROM Imoveis WHERE ${criterios.join(' AND ')}`; 
        
        db.query(query, valores, (err, results) => {
            if(err){
                return callback(err, null);
            }
            const imoveisComImagens = results.map(imovel => ({
                ...imovel,
                imagemPrincipal: imovel.imagem_principal ? `data:image/jpeg;base64,${imovel.imagem_principal.toString('base64')}` : null
            }));
            callback(null, imoveisComImagens);
        });
    }

    // Método para adiconar um imóvel
    static addImovelByCategoria(data, callback){
        const { descricaoPrevia, idCategorias, preco, endereco, imagemPrincipal, descricaoDetalhada  } = data;
        const query = `INSERT INTO Imoveis (Descricao_previa, idCategorias, Preco, Endereco, imagem_principal, Descricao_detalhada) values (?, ?, ?, ?, ?, ?);`;
        db.query(query, [descricaoPrevia, idCategorias, preco, endereco, imagemPrincipal, descricaoDetalhada], (err, result) => {
            if(err) return callback(err, null);
            callback(null, result.insertId);
        });
    }
}

module.exports = Imovel;