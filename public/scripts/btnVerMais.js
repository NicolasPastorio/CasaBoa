function verMais(categoriaId){
    const container = document.getElementById('conteudo-' + categoriaId);
    const items = [...container.querySelectorAll('.card-categorias')];
    const button = document.querySelector(`[onclick="verMais(${categoriaId})"]`);

    const isExpanded = items.slice(3).every(item => !item.classList.contains('hidden'));

    if(isExpanded){
        items.slice(3).forEach(item => item.classList.add('hidden'));
        button.textContent = 'Ver mais';
    }else{
        items.forEach(item => item.classList.remove('hidden'));
        button.textContent = 'Ver menos';
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.conteudo-categorias').forEach(container => {
        const items = container.querySelectorAll('.card-categorias');
        console.log(items);
        items.forEach((item, index) => {
            if(index >= 3){
                item.classList.add('hidden');
            }
        }); 
    });
});