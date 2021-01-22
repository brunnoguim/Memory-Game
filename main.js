var container = document.querySelector('#container-tabuleiro')
var cartasCheck = []
var escolhas = []
var pares = []
var modalBg = document.querySelector('#modal-bg')
var pontos = 5000
var escolha = ''
var shuffle = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]
var imagens = container.children

container.addEventListener("click", selecionar)
modalBg.addEventListener("click", restart)

//Embaralhar as imagens e montar elas no tabuleiro
function montar(){
    shuffle.sort((a,b) => 0.5 - Math.random())
    for (c = 0; c < shuffle.length; c++){
        imagens[c].classList.add(`imagens${shuffle[c]}`)
    }
}

//Selecionar as cartas, virando as escolhidas
function selecionar(e){
    escolha = e.target
    if(escolha.classList[0] === "cartas"){
        var cartaEscolhida = escolha.parentElement
        escolha.style.opacity = "0"
        escolhas.push(escolha)
        escolha.classList.remove("cartas")
        cartasCheck.push(cartaEscolhida.classList[0])
        if (cartasCheck.length === 2){
            setTimeout(checkMatch, 0)
        }
    }
}

//Checar o match das cartas escolhidas (e desvirar elas caso não batam)
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
        escolhas[0].classList.add("cartas")
        escolhas[1].classList.add("cartas")
        ohno.play()
        window.alert("Deu ruim!")
    }
    //Limpando os arrays de seleção das cartas a cada par de escolha
    cartasCheck = []
    escolhas = []
    //Victory screen
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
        //Criar o display do score
        var criarScore = document.createElement('h4')
        criarModal.appendChild(criarScore)
        criarScore.innerHTML = `Score: ${pontos}`
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

//Função do score
function score(){
    pontos--
    if(pontos < 0){
        pontos = 0
    }
}
window.setInterval(score, 10)