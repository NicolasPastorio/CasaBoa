const passport = require('passport');
const bcrypt = require('bcryptjs');

const Cliente = require('../models/Cliente');
const Imovel = require('../models/Imovel');
const Favorito = require('../models/Favorito');
const { detectarFormatoImagem } = require('../public/utils/imageUtils');

/*exports.login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/cliente',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};*/
exports.dashboard = (req, res) => {
    // Verifica se o usuário está autenticado e é do tipo 'cliente'
    if(!req.user || req.user.tipo !== 'cliente'){
        return res.redirect('/login');
    }
    const idUsuario = req.user.idUsuario;

    Cliente.getIdClienteByUsuario(idUsuario, (err, idCliente) => {
        if(err){
            //console.error('Erro ao buscar o cliente: ', err);
            return res.status(500).send('Erro ao buscar o cliente.');
        }

        Imovel.getFavoritosPorCliente(idCliente, (err, imoveisFavoritos) => {
            if(err){
                console.error('Erro ao buscar imóveis favoritos: ', err);
                return res.status(500).send('Erro ao carregar imóveis favoritos.');
            }
            //convertendo a imagem para base64
            imoveisFavoritos.forEach(imovel => {
                if(imovel.imagem_principal){
                    //imovel.imagemURL = `data:image/${detectarFormatoImagem(imovel.imagem_principal)};base64, ${imovel.imagem_principal.toString('base64')}`;
                    imovel.imagemURL = `data:image/jpeg;base64, ${imovel.imagem_principal.toString('base64')}`;
                }else{
                    //URL padrão para quando não tiver imagem
                    imovel.imagemURL = '../assets/images/imagem-padrao02.svg';
                }
            });
                res.render('cliente', { user: req.user, imoveisFavoritos });
        });
    });
};
/*exports.showLogin = (req, res) => {
    res.render('login');
};*/

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

exports.showRegister = (req, res) => {
    res.render('register');
}

exports.register = (req, res) => {
    //console.log('Cliente req.body: ', req.body);
    const { email, senha, nome, dataNascimento, endereco, telefone } = req.body;
    bcrypt.hash(senha, 10, (err, hashedPassword) => {
        if(err){
            console.error('Erro ao gerar hash da senha: ', err);
            return res.status(500).send('Erro ao cadastrar o usuario.');
        }

        Cliente.createCliente(email, hashedPassword, nome, dataNascimento, endereco, telefone, () => {
            res.send('Cliente cadastrado com sucesso!');
            //res.redirect('/cliente');
        });
    });
};

exports.favoritarImovel = (req, res) => {
    const idCliente = req.user.idUsuario;
    console.log('Dados recebidos: ', req.body);
    const { idImovel } = req.body;

    // Validação do valor de idImovel
    if (!idImovel || isNaN(parseInt(idImovel))) {
        return res.status(400).send('ID do imóvel inválido.');
    }

    Cliente.getIdClienteByUsuario(idCliente, (err, idCliente) => {
        if(err){
            console.error(err);
            return res.status(500).send('Erro ao buscar o cliente');
        }
        //validar se o card já foi favoritado
        Favorito.jaFavoritado(idCliente, parseInt(idImovel), (err, jaFavoritado) => {
            if(err) {
                console.error('Erro ao verificar favorito: ', err);
                return res.status(500).send('Erro ao verificar favorito.');
            }       
            if(jaFavoritado){
                console.log('O imóvel já está nos favoritos.');
                return res.redirect('/cliente?erro=ja-favoritado');
            }   
            //Adicionar o favorito com o idCliente
            Favorito.addFavorito(idCliente, parseInt(idImovel), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erro ao favoritar imóvel.');
                }
                const origem = req.headers.referer;
                res.redirect(origem);
            });  
        });
    });
};

exports.desfavoritarImovel = (req, res) => {
    const idUsuario = req.user.idUsuario;
    const { idImovel } = req.body;

    if(!idImovel || isNaN(parseInt(idImovel))){
        return res.status(400).send('ID do imóvel é inválido.');
    }

    Cliente.getIdClienteByUsuario(idUsuario, (err, idCliente) => {
        if(err){
            console.error('Erro ao buscar o cliente: ', err);
            return res.status(500).send('Erro ao buscar cliente.');
        }

        Favorito.removerFavorito(idCliente, parseInt(idImovel), (err) => {
            if(err){
                console.error('Erroao remover favorito: ', err);
                return res.status(500).send('Erro ao remover favorito.');
            }
            const origem = req.headers.referer;
            res.redirect(origem || '/cliente');
        });
    });
};

/*exports.renderCliente = (req, res) => {
    const idUsuario = req.user.idUsuario;
    //const previousUrl = req.headers.referer || '/cliente';

    Cliente.getIdClienteByUsuario(idUsuario, (err, idCliente) => {
        if(err){
            //console.error('Erro ao buscar o cliente: ', err);
            return res.status(500).send('Erro ao buscar o cliente.');
        }

        Imovel.getFavoritosPorCliente(idCliente, (err, imoveisFavoritos) => {
            if(err){
                //console.error('Erro ao buscar imóveis favoritos: ', err);
                return res.status(500).send('Erro ao carregar imóveis favoritos.');
            }
            //convertendo a imagem para base64
            imoveisFavoritos.forEach(imovel => {
                if(imovel.imagem_principal){
                    //imovel.imagemURL = `data:image/${detectarFormatoImagem(imovel.imagem_principal)};base64, ${imovel.imagem_principal.toString('base64')}`;
                    imovel.imagemURL = `data:image/jpeg;base64, ${imovel.imagem_principal.toString('base64')}`;
                }else{
                    //URL padrão para quando não tiver imagem
                    imovel.imagemURL = '../assets/images/imagem-padrao02.svg';
                }
            });
            res.render('cliente', { user: req.user, imoveisFavoritos });
        });
    });
};*/

