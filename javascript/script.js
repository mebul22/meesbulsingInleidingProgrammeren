const gaten = document.querySelectorAll("img");
const scoreTekst = document.querySelector("#score");
const tijdTekst = document.querySelector("#tijd");
const highscoreTekst = document.querySelector("span");
const startKnop = document.querySelector("button");
const point = new Audio("audio/point.mp3");

let score = 0;
let highscore = 0;
let tijd = 60;
let spelBezig = false;

// mollen springen uit gaten
function springMol() {
    // alle mollen naar beneden
    gaten.forEach(gat => {
        gat.src = "images/gat.png";
    })

    // willekeurige plaats in array wordt een mol
    let random = Math.floor(Math.random() * gaten.length);
    let gekozenGat = gaten[random];
    gekozenGat.src = "images/pip.png";
}

// check of de mollen uit het gat geraakt worden
function checkHit() {
    gaten.forEach(gat => {
        gat.addEventListener("click", () => {
            if (gat.src.includes("images/pip.png")) {
                score++;
                scoreTekst.textContent = "Score: " + score;
                gat.src = "images/gat.png";
                point.play();
            }
        })
    })
}

// zorg dat de mollen omhoog springen per seconde
function start() {
    // kan niet start knop meerdere keren indrukken
    if (spelBezig == false) {
        let startSpel = setInterval(springMol, 1000);
        
        let timer = setInterval(() => {
            tijd--;
            tijdTekst.textContent = "Tijd: " + tijd;
            
            // na 60 seconden stopt het spel en wordt alles gerest
            if (tijd <= 0) {
                clearInterval(timer);
                clearInterval(startSpel);
                alert("Stop de tijd! Je score is: " + score);

                // houd highscore bij
                if (score > highscore){
                    highscore = score;
                    highscoreTekst.textContent = "Highscore: " + highscore;
                }

                tijd = 60;
                score = 0;
                scoreTekst.textContent = "Score: " + score;
                spelBezig = false;
            }
        }, 1000);
    }
    spelBezig = true;
}

checkHit();
startKnop.addEventListener("click", start);