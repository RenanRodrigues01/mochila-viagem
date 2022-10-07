const formulario = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach( (elemento) => {
    addItem(elemento)
});

formulario.addEventListener("submit", (evento) =>{
    evento.preventDefault()

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    const existe = itens.find( elemento => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    };

    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;

        addItem(itemAtual);

        itens.push(itemAtual);
    }

   
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
})

function addItem (item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id; 

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;
    
    novoItem.appendChild(botaoDelet(item.id));

    lista.appendChild(novoItem);
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDelet(id) {
    const botaoX = document.createElement('button');
    botaoX.innerText = 'X';

    botaoX.addEventListener('click', function() {
       deletaItem(this.parentNode, id);
    })

    return botaoX;
}

function deletaItem (elemento, id) {
    elemento.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id) ,1);
   
    localStorage.setItem("itens", JSON.stringify(itens));
}
