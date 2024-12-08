exports.detectarFormatoImagem = (buffer) => {
    const magicNumbers = buffer.toString('hex', 0, 4).toUpperCase();
    switch (magicNumbers) {
        case 'FFD8FFE0':
        case 'FFD8FFE1':
        case 'FFD8FFE2':
        case 'FFD8FFE3':
            return 'jpeg';
        case '89504E47':
            return 'png';
        default:
            console.warn('Formato de imagem desconhecio. Assumindo JPEG como padrão.');
            return 'jpeg';
    }
}