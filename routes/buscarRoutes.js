const express = require('express');
const router = express.Router();
const Imovel = require('../models/Imovel');

router.get('/api/buscar', (req, res) => {
    const termo = req.query.termo;
    if(!termo){
        return res.status(400).json({ erro: 'Termo de busca é obrigatório.' });
    }

    Imovel.buscarImoveisPorTermo(termo, (err, resultados) => {
        if(err){
            console.error('Erro ao buscar imóveis: ', err);
            return res.status(500).json({ erro: 'Erro ao buscar imóveis. '});
        }
        res.json({ imoveis: resultados });
    });
});

module.exports = router;