const Imovel = require('../models/Imovel');
const Cliente = require('../models/Cliente');
const Favorito = require('../models/Favorito');
const Imagem = require('../models/Imagem');
const { detectarFormatoImagem } = require('../public/utils/imageUtils');

exports.renderHome = (req, res) => {
    const user = req.user; // Usuário logado

    //Função auxiliar para renderizar a página
    const renderizarPagina = (imoveisFavoritos = []) => {
        //console.log('Renderizando com favoritos:', imoveisFavoritos);
        Imovel.getCategoriasComImoveis()
            .then((categoriasComImoveis) => {
                categoriasComImoveis.forEach(item => {
                    item.imoveis.forEach(imovel => {
                        if(imovel.imagem_principal){
                            //imovel.imagemURL = `data:image/${detectarFormatoImagem(imovel.imagem_principal)};base64, ${imovel.imagem_principal.toString('base64')}`;
                            imovel.imagemURL = `data:image/jpeg;base64, ${imovel.imagem_principal.toString('base64')}`;
                        }else {
                            // URL padrão para quando não houver imagem
                            imovel.imagemURL = '../assets/images/imagem-padrao02.svg';
                        }
                    });
                });
                //console.log('Categorias com imóveis carregadas:', categoriasComImoveis);
                res.render('home', { categoriasComImoveis, imoveisFavoritos, user });
            })
            .catch((err) => {
                console.error('Erro ao buscar dados: ', err);
                res.status(500).send('Erro ao carregar imóveis.');
            });
    };

    //Se o usuáiro for cliente, busca os favoritos
    if(user && user.tipo === 'cliente'){
        console.log('Usuário cliente detectado.');
        Cliente.getIdClienteByUsuario(user.idUsuario, (err, idCliente) => {
            if(err){
                console.error('Erro ao buscar cliente: ', err);
                return res.status(500).send('Erro ao carregar imóveis.');
            } 
            console.log('ID do cliente encontrado: ', idCliente);
            Favorito.getFavoritosPorCliente(idCliente, (err, favoritos) => {
                if(err){
                    console.error('Erro ao buscar favoritos: ', err);
                    return res.status(500).send('Erro ao carregar imóveis.');
                }   
                console.log('Favoritos encontrados: ', favoritos);             
                renderizarPagina(favoritos);
            });
        });
    }else{
        console.log('Usuário não é cliente ou não está logado.');
        renderizarPagina();
    }
};
