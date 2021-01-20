var container = document.querySelector('#container-tabuleiro')
var cartasCheck = []
var escolhas = []
var pares = []
var modalBg = document.querySelector('#modal-bg')

container.addEventListener("click", selecionar)
modalBg.addEventListener("click", restart)

//Função de selecionar as cartas, virando suas escolhas
function selecionar(e){
    var escolha = e.target
    if(escolha.classList[0] === "cartas"){
        var cartaEscolhida = escolha.parentElement
        escolha.style.opacity = "0"
        escolhas.push(escolha)
        cartasCheck.push(cartaEscolhida.classList[0])
        if (cartasCheck.length === 2){
            setTimeout(checkMatch, 100)
        }
    }
}

//Função de checar o match das cartas escolhidas (e desvirar elas caso não batam)
function checkMatch(){
    var latido = new Audio()
    latido.src = "latido.mp3"
    var ohno = new Audio()
    ohno.src = "ohno.mp3"
    if(cartasCheck[0] === cartasCheck[1]){
        pares.push(cartasCheck)
        latido.play()
        window.alert("Deu boa!")
    } else {
        escolhas[0].style.opacity = "1"
        escolhas[1].style.opacity = "1"
        ohno.play()
        window.alert("Deu ruim!")
    }
    //Limpando os arrays de seleção das cartas após a 2ª escolha
    cartasCheck = []
    escolhas = []
    if(pares.length == 6){
        modalBg.style.display = 'flex'
        //Criar o modal
        var criarModal = document.createElement('div')
        criarModal.classList.add('modal')
        modalBg.appendChild(criarModal)
        //Criar o h1 com a msg de won
        var criarH1Modal = document.createElement('h1')
        criarModal.appendChild(criarH1Modal)
        criarH1Modal.innerHTML = 'Parabéns!<br>'
        //Criar o botão de play again
        var criarBtnModal = document.createElement('button')
        criarBtnModal.classList.add('botao-modal')
        criarModal.appendChild(criarBtnModal)
        criarBtnModal.innerHTML = 'Jogar Novamente'
    }
}

//Função de reload depois de terminar o jogo
function restart(e){
    var botão = e.target
    if(botão.classList[0] === "botao-modal"){
        location.reload()
        return false
    }
}