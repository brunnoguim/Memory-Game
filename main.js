var container = document.querySelector('#container-tabuleiro')
var cartasCheck = []
var escolhas = []
var pares = []

container.addEventListener("click", selecionar)

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
    cartasCheck = []
    escolhas = []
    if(pares.length == 6){
        window.alert('PARABÉNS!')
    }
}