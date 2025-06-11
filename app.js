/* 
Forma inicial de alterar valores
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do Numero Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número de 1 a 10';*/

// Alterar valores com funções

function exibirTextoTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate : 1.2}); Não funciona no Edge
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial () {
    exibirTextoTela ('h1', 'Jogo do Numero Secreto');
    exibirTextoTela ('p', 'Escolha um número de 1 a 50');
}

function verificarChute() {
    chute = document.querySelector('input').value;
    tentativa++;
    if (chute == numeroSecreto) {
        //console.log(numeroSecreto);
        //console.log(chute);
        //console.log(chute == numeroSecreto);
        exibirTextoTela('h1','Parabens você Acertou !');
        palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        mensagemTentativa = `Isso ai! Você descobriu o Numero Secreto com ${tentativa} ${palavraTentativa}.`;
        exibirTextoTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else {
        if (chute > numeroSecreto) {
            exibirTextoTela('p','O numero secreto é menor');
        }
        else {
            exibirTextoTela('p','O numero secreto é maior');
        }
        limparCampo (); // só limpa o campo quando eu erro o numero, no caso de acerto o numero permanece
    }
}

function gerarNumAleatorio () {
    numEscolhido = parseInt(Math.random() * numMaxJogo + 1);
    qtdElementosLista = listaNumSorteados.length; //.length == Verifica o tamanho da lista
    
    if (qtdElementosLista == numMaxJogo) {
        listaNumSorteados = [];
    }

    if (listaNumSorteados.includes(numEscolhido)) { // .includes == Verifica se o numero/elemento está ou nao dentro da lista
        return gerarNumAleatorio();
        
    }
    else {
        listaNumSorteados.push(numEscolhido); // .push == Adiciona o numero/elemento dentro da lista
        //console.log(listaNumSorteados);
        return numEscolhido;
    }
    
}

function limparCampo () {
    chute = document.querySelector('input');
    chute.value = null;
}

function reiniciaJogo() {
    numeroSecreto = gerarNumAleatorio ();
    limparCampo();
    tentativa = 0;
    exibirMensagemInicial ();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

let listaNumSorteados = [];
let numMaxJogo = 50;
let tentativa = 0;
let numeroSecreto = gerarNumAleatorio ();
exibirMensagemInicial ();

