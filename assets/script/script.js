const front = "front";
const back = "back";
const card = "card";
const icon = "icon";
var count = 0;
start();

function start(){
    initCard(game.createCard()); 
}

function initCard(cards){

    let board = document.getElementById("board");
    board.innerHTML = "";

    for (let i of game.cards){

        let elementCard = document.createElement("div");
        elementCard.id = i.id;
        elementCard.classList.add(card);
        elementCard.dataset.icon = i.icon;
        createContent(i, elementCard);
        elementCard.addEventListener("click", flipCard);
        board.appendChild(elementCard);

    }
}

function createContent(card, elementCard){

    createFB(front, card, elementCard);
    createFB(back, card, elementCard);

}

function createFB(face, card, element){

    let elementFace = document.createElement("div");
    elementFace.classList.add(face);

    if(face == front){
        let elementIcon = document.createElement("img");
        elementIcon.classList.add(icon);
        elementIcon.src = "./assets/img/" + card.icon + ".png";
        elementFace.appendChild(elementIcon);
    }
    else{
        let elementIcon = document.createElement("img");
        elementIcon.src = "./assets/img/desc.png"
        elementFace.appendChild(elementIcon);
    }
    element.appendChild(elementFace);

}
function flipCard(){
    if(game.setCard(this.id)){

        this.classList.add("flip");
        
        if(game.second){
            moveCount();
            if(game.check()){
                game.clear();
                if(game.checkGameOver()){
                    let gameover = document.getElementById("gameOver");
                    gameover.style.display = "flex";

                }
            }

            else {
                setTimeout(() => {
                    let firstView = document.getElementById(game.first.id);
                    let secondView = document.getElementById(game.second.id);
                    
                    firstView.classList.remove("flip");
                    secondView.classList.remove("flip");

                    game.unflip();
                }, 1000);
            }
        }
    }
}
function restart(){
    
    let game = document.getElementById("gameOver");
    let moveCount = document.getElementById("moveCount");
    game.style.display = "none";
    count=0;
    moveCount.innerHTML = "<p>Move Count: </p>";
    start();
    
}

function moveCount(){
    count++;
    let moveCount = document.getElementById("moveCount");
    moveCount.innerHTML = "";
    if(count > 0){
        let aux = document.createElement("p");

        aux.innerHTML = `Move Count: ${count}`;

        moveCount.appendChild(aux);

        
    }
}