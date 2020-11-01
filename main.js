const cardBoard =document.querySelector("#cardboard") ;
const imgs =[
    "guara.svg",
    "tamandua.svg",
    "bugio.svg",
    "onca.svg",
    "jacare.svg",
    "tucano.svg",
    "preguiça.svg",
    "tuiuiu.svg"
  
] ;
let  cardHTML  =  "" ;

imgs.forEach(img =>{
  cardHTML += `
    <div class= "memory-card" data-card="${img}">
    <img class="front-face" src="img/${img}">
    <img class="back-face" src="img/save.svg"/>
   </div> ` ;
} ) ;

cardBoard.innerHTML=cardHTML + cardHTML;

const cards= document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let lockCard=false;
let scoreBoard= document.querySelector('#score')
let score =0

function flipCard(){
    if(lockCard) return false;

    this.classList.add('flip')
    if(!firstCard){
        firstCard=this;

        return false;
    }
    secondCard= this; 
    checkForMatch();
}
function checkForMatch(){
    let isMatch= firstCard.dataset.card === secondCard.dataset.card
    !isMatch?disableCard():resetCards(isMatch);
}

function winner(){
        if(score >= 8){
            swal('Ajude a preservar a Natureza, pra que ela não esteja apenas em nossa memória!!!',{
                icon:"img/save.svg",
                buttons:false,
                })
        setTimeout(()=>{
           window.location.reload();
        },4000)
    }
}
function disableCard(){
    lockCard=true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    },1000)
}
   
(function shuffle(){
    cards.forEach(card =>{
        let rand = Math.floor(Math.random() * 16);
        card.style.order = rand;
    })
})(); 
function resetCards(isMatch = false){
    if(isMatch){
        firstCard.removeEventListener("click",flipCard);
        secondCard.removeEventListener("click",flipCard);
        score ++;
        scoreBoard.value=score;
        winner();
    }
    [firstCard,secondCard,lockCard] = [null,null,false];
}
cards.forEach(card => card.addEventListener('click',flipCard));