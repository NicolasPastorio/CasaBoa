const path = require('path');
const fs = require('fs');
const Categoria = require('../models/Categoria');
const Imovel = require('../models/Imovel');
const Imagem = require('../models/Imagem');

exports.dashboard = (req, res) => {
    if(!req.user || req.user.tipo !== 'vendedor'){
        return res.redirect('/login');
    }
    console.log('Usuário vendedor autenticado:', req.user); 
    //if(req.user && req.user.tipo === 'vendedor'){
        //res.render('vendedor');
    //}
    Categoria.getAllCategorias((categorias) => {
        res.render('vendedor', { categorias });
    })
}

exports.createCategoria = (req, res) => {
    const { nome } = req.body;
    if(!nome || nome.trim() === ''){
        req.flash('error_msg', 'O nome da categoria é obrigatório.');
        return res.redirect('/vendedor');
    }

    Categoria.createCategoria(nome, (err) => {
        if(err){
            req.flash('error_msg', 'Erro ao criar categoria.');
        }else{
            req.flash('success_msg', 'Categoria criada com sucesso!');
        }
        res.redirect('/vendedor');
    })
}

exports.addImovel = (req, res) => {
    const { descricaoPrevia, idCategorias, preco, endereco, descricaoDetelhada } = req.body;
    
    if(!req.files || !req.files.imagemPrincipal || req.files.imagemPrincipal.length === 0){
        req.flash('error_msg', 'É necessário enviar uma imagem principal.');
        return res.redirect('/vendedor');
    }
    
    const imagemPrincipal = req.files.imagemPrincipal.data; // Principal em base64
    //const imagemPrincipal = req.files.imagemPrincipal[0].data; // Principal em base64
    //const imagens = req.files.imagens.map(img => img.name);
    const imagens = Array.isArray(req.files.imagens)
        ? req.files.imagens.map(img => img.name)
        : [req.files.imagens.name]; 

    // Criar imóvel
    Imovel.addImovelByCategoria({ descricaoPrevia, idCategorias, preco, endereco, imagemPrincipal, descricaoDetelhada }, (err, idImovel) => {
        if(err){
            req.flash('error_msg', 'Erro ao salvar imóvel.');
            return res.redirect('/vendedor');
        }
        // Criar diretório para armazenar imagens
        const dirPath = path.join(__dirname, '../uploads', `node-dovendedor-imoveis`, `${idImovel}`);
        fs.mkdirSync(dirPath, { recursive: true });

        // Salvar imagens no sistema de arquivos
        req.files.imagens.forEach(img => {
            const filePath = path.join(dirPath, img.name);
            fs.writeFileSync(filePath, img.data);
        });

        // Salvar caminhos das imagens no banco
        const imagePaths = imagens.map(img => path.join(dirPath, img));
        Imagem.addImagens(idImovel, imagePaths, (err) => {
            if(err){
                req.flash('error_msg', 'Erro ao salvar imagens do imóvel.');
                return res.redirect('/vendedor');
            }
            req.flash('success_msg', 'Imóvel adicionado com sucesso!');
            res.redirect('/vendedor');
        })
    })
}