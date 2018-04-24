// initialize canvas
var cvs = document.querySelector("canvas");
var ctx = cvs.getContext("2d");

// load images
var ship = new Image();
var bg = new Image();
var fg = new Image();
var astroidNorth = new Image();
var astroidSouth = new Image();

ship.src = "images/ship.png";
bg.src = "images/bg.png";
astroidNorth.src = "images/astroids-north.png";
astroidSouth.src = "images/astroids-south.png";


// some variables
var gap = 110;
var constant;

var bX = 10;
var bY = 150;

var gravity = 2;

var score = 0;

// audio files
var scor = new Audio();
scor.src = "sounds/score.mp3";

// on key down
function moveUp(){
    bY -= 45;
}

document.addEventListener("keydown",moveUp);

// astroid coordinates
var astroid = [];

astroid[0] = {
    x : cvs.width,
    y : 0
};

// draw images

function draw(){
    ctx.drawImage(bg,0,0);
    for(var i = 0; i < astroid.length; i++){
        constant = astroidNorth.height+gap;
        ctx.drawImage(astroidNorth,astroid[i].x,astroid[i].y);
        ctx.drawImage(astroidSouth,astroid[i].x,astroid[i].y+constant);
        astroid[i].x--;
        if( astroid[i].x == 125 ){
            astroid.push({
                x : cvs.width,
                y : Math.floor(Math.random()*astroidNorth.height)-astroidNorth.height
            });
        }

        // detect collision
        if( bX + ship.width >= astroid[i].x && bX <= astroid[i].x + astroidNorth.width && (bY <= astroid[i].y + astroidNorth.height || bY+ship.height >= astroid[i].y+constant) || bY + ship.height >=  cvs.height){
            location.reload(); // reload the page
        }

        if(astroid[i].x == 5){
            score++;
            scor.play();
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(ship,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#fff";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);
}

draw();
