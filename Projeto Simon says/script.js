let order = [];
let clickedOrder = [];
let score = 0;
let highscore = 0;
let flag = false;
document.getElementById("Score").innerHTML = 0;
document.getElementById("High").innerHTML = 0;


/* 
0 - verde
1 - vermelho
2 - amarelo
3 - azul
*/

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

// Cria ordem aleatória de cores
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {

        let elementColor = createColorElement(order[i]);
        setTimeout(() => {
            lightColor(elementColor, Number(i) + 1);
        }, 500 * i);
    };
};

// Acende a próxima cor
let lightColor = (element) => {
    element.classList.add('selected');
    setTimeout(() => {
        element.classList.remove('selected');
    }, 200);
};

// Checa se os botões clicados são os mesmos da ordem
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        };
    };
    if (clickedOrder.length == order.length) {
        score++;
        document.getElementById("Score").innerHTML = score;
        if (highscore < score) {
            highscore = score;
            document.getElementById("High").innerHTML = highscore;
            flag = true;
        };
        alert(`Pontuação: ${score}\nPontuação mais alta: ${highscore}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

// Função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 100)
};

// Função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else {
        return blue;
    }
}

// Função para próximo nível
let nextLevel = () => {
    shuffleOrder();
};

// Função de perdedor
let gameOver = () => {
    if (flag === true) {
        alert(`Pontuação: ${score}\nPontuação mais alta: ${highscore}\nVocê perdeu, mas parabéns, bateu o recorde!\nClique em ok para iniciar um novo jogo!`);
        flag = false;
    } else {
        alert(`Pontuação: ${score}\nPontuação mais alta: ${highscore}\nVocê perdeu!\nClique em ok para iniciar um novo jogo!`);
    }
    order = [];
    clickedOrder = [];
    playGame();
}

// Função de iniciar o jogo
let playGame = () => {
    alert('Vamos jogar um jogo!');
    score = 0;
    document.getElementById("Score").innerHTML = score;
    nextLevel();
}

/* green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));
 */



// Evento de clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


// Inicia o jogo
playGame();