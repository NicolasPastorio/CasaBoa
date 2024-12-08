const fs = require('fs');
const path = require('path');
const Imovel = require('../models/Imovel');
const Imagem = require('../models/Imagem');

exports.renderImovelDetalhes = (req, res) => {
    const idImovel = parseInt(req.params.idImovel);
    const previousUrl = req.headers.referer || '/';

    if(isNaN(idImovel)){
        return res.status(400).send('ID do imóvel inválido.');
    }

    Imovel.getById(idImovel, (err, imovel) => {
        if(err){
            console.error('Erro ao buscar imóvel: ', err);
            return res.status(500).send('Erro ao buscar imóvel.');
        }

        if(!imovel){
            return res.status(404).send('Imóvel não encontrado.');
        }

        Imagem.getByImovelId(idImovel, (err, imagens) => {
            if(err){
                console.error('Erro ao buscar imagens do imóvel: ', err);
                return res.status(500).send('Erro ao carregar imagens do imóvel.');
            }

            imagens = imagens.map((imagem) => {
                const filePath = path.resolve(imagem.Caminho); // Caminho da imagem no sistema
                let base64Data = '';

                try {
                    const fileBuffer = fs.readFileSync(filePath);
                    base64Data = fileBuffer.toString('base64');
                } catch (readErr) {
                    console.log(`Erro ao ler a imagem: ${filePath}`, readErr);
                }

                return{
                    url: `data:image/jpeg;base64,${base64Data}`,
                    descricao: imagem.descricao || '',
                };
            });

            console.log('Imagens do imóvel:', imagens);
            res.render('visitar', { imovel, imagens, previousUrl });
        });
    });
}
