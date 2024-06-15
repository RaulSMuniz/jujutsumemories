
const gojo = './img/gojo.jpg'
const itadori = './img/itadori.jpg'
const sukuna = './img/sukuna.webp'
const megumi = './img/megumi.jpg'
const nanami = './img/nanami.webp'
let contador = 0;
let cont = 0;
var start = 0

var cartas = [
    [gojo, itadori, sukuna, megumi, nanami],
    [gojo, itadori, sukuna, megumi, nanami]
]

window.onload = function () { // deixa o visual inicial do site mostrando as cartas
    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j <= 4; j++) {
            capa = document.getElementById('capa' + (cont + 1))
            contracapa = document.getElementById('contracapa' + (cont + 1))
            const img = document.createElement('img')
            img.src = cartas[i][j]
            capa.appendChild(img)
            capa.style.display = 'block'
            contracapa.style.display = 'none'
            cont++
        }
    }
}

function startgame() { // remove o visual inicial do site, randomiza os índices e esconde as cartas.
    const inicio = document.getElementById('comeco')
    inicio.style.display = 'none'
    contador = 0;
    cont = 0;
    start = 1

    for (let i = 0; i <= 1; i++) { // remove a carta anterior (visual inicial do site)
        for (let j = 0; j <= 4; j++) {
            capa = document.getElementById('capa' + (cont + 1))
            while (capa.firstChild) {
                capa.removeChild(capa.firstChild)
            }
            cont++
        }
    }

    cont = 0
    for (let i = 0; i < cartas.length; i++) { // randomiza os índices
        for (let k = 0; k < 5; k++) {
            for (let j = cartas[i].length - 1; j > 0; j--) {
                let k = Math.floor(Math.random() * (j + 1)) // variável K randomiza o índice j + 1
                let temp = cartas[i][j] // variável temp guarda temporariamente o valor de cartas[i][j]
                cartas[i][j] = cartas[i][k] // cartas[i][j] recebe o valor de cartas[i][k] (K randomizado)
                cartas[i][k] = temp // cartas[i][k] recebe o valor inicial de [i][j]
            }
        }

    }

    for (let i = 0; i <= 1; i++) { // esconde as cartas
        for (let j = 0; j <= 4; j++) {
            capa = document.getElementById('capa' + (cont + 1))
            contracapa = document.getElementById('contracapa' + (cont + 1))

            const img = document.createElement('img')
            const contraimg = document.createElement('img')

            img.src = cartas[i][j]
            contraimg.src = './img/jujutsu.jpg'

            contracapa.appendChild(contraimg)
            capa.appendChild(img)

            contracapa.style.display = 'block'
            capa.style.display = 'none'
            cont++
        }
    }
}

let firstCardIndex = null;
let secondCardIndex = null;
let matched = []

function jogo(cardIndex) {
    if (start != 0 && secondCardIndex === null) {
        if (matched.includes(cardIndex)){
            return ;
        }
        if (firstCardIndex === null) {
            firstCardIndex = cardIndex;
            // reveal the first card
            document.getElementById('capa' + cardIndex).style.display = 'block';
            document.getElementById('contracapa' + cardIndex).style.display = 'none';
        } else {
            secondCardIndex = cardIndex;
            // reveal the second card
            document.getElementById('capa' + cardIndex).style.display = 'block';
            document.getElementById('contracapa' + cardIndex).style.display = 'none';

            // check if the cards match
            const firstCardValue = cartas[Math.floor((firstCardIndex - 1) / 5)][(firstCardIndex - 1) % 5];
            const secondCardValue = cartas[Math.floor((secondCardIndex - 1) / 5)][(secondCardIndex - 1) % 5];

            if (firstCardValue === secondCardValue) {
                document.getElementById('capa' + firstCardIndex).style.display = 'block';
                document.getElementById('capa' + secondCardIndex).style.display = 'block'
                document.getElementById('contracapa' + firstCardIndex).style.display = 'none'
                document.getElementById('contracapa' + secondCardIndex).style.display = 'none'
                matched.push(firstCardIndex)
                matched.push(secondCardIndex)
                firstCardIndex = null
                secondCardIndex = null
            } else {
                // cards don't match, hide them again after 1.5 seconds
                setTimeout(() => {
                    document.getElementById('capa' + firstCardIndex).style.display = 'none';
                    document.getElementById('contracapa' + firstCardIndex).style.display = 'block';
                    document.getElementById('capa' + secondCardIndex).style.display = 'none';
                    document.getElementById('contracapa' + secondCardIndex).style.display = 'block';
                    firstCardIndex = null;
                    secondCardIndex = null;
                }, 500);
            }
        }
    }
    if (matched.length == 10){
        setTimeout(() => {
            console.log('O jogo acabou!')
        }, 500) 
    }
}