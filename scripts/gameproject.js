//fetch website to check if up or down

//create game window and maze (30x30)
let canvasWidth = 600;
let canvasHeight = 400;

function startGame() {
    gameCanvas.start();

    player = new createPlayer(30, 30);

    key = new createKey(30, 30)
}

let gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }
}

//key counter
let keyCounter = []

//create player instance and attributes
let player;

//position stuff
let playerYPosition = 300;

let playerXPosition = 100;

let fallSpeed = 0;

//jump stuff
let isJumping = false;

let jumpSpeed = 0;

function resetJump() {

}

function createPlayer(width, height) {
    this.width = width;
    this.height = height;
    this.x = playerXPosition;
    this.y = playerYPosition;

    //player draw event
    this.draw = function() {
        ctx = gameCanvas.context;
    ctx.fillStyle = "#87eb93";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //fall velocity logic
    this.makeFall = function() {
        this.y += fallSpeed;
        fallSpeed += 0.1;
        //collision function call
        this.stopPlayer();
        //
    }

    //define ground and continually update player y position to screen bottom when collision is active
    this.stopPlayer = function() {
        let ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }

    this.jump = function() {
        if (isJumping == true) {
            this.y += 0.1;
        }
    }
}

//player movement (erase and redraw canvas)
let interval = setInterval(updateCanvas, 20);
function updateCanvas() {
    //clear canvas
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //run player physics logic
    player.makeFall();
    player.draw();
    player.jump();
    key.draw();
}

//input config
//jump
document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, )}, true);
document.addEventListener('keyUP', onkeyup, true);

let KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32
}

function onkey(ev, key, pressed) {
    switch(key) {
        case KEY.LEFT : player.input.left = pressed; ev.preventDefaut();
    }
}

//collision detection
function detectCollision() {
    let playerLeft = player.x;
    let playerRight = player.x + player.width;
    let keyLeft = key.x;
    let keyRight = key.x + key.width;

    let playerBottom = player.y + player.height;
    let keyTop = key.y;

    if (playerRight > keyLeft && playerLeft < keyLeft && playerBottom > keyTop) {
        audio.play();
        keyCounter.unshift("test")
    }
}

//create key object (random)
let key;

let keyYPosition = Math.floor(Math.random() * 400);

let keyXPosition = Math.floor(Math.random() * 600);

function createKey(width, height) {
    this.width = width;
    this.height = height;
    this.x = keyXPosition;
    this.y = keyYPosition;

    //key draw event
    this.draw = function() {
        ctx = gameCanvas.context;
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//key audio
let audio = new Audio('key_get.mp3');

//keyGet function for key collision
function keyGet() {
    audio.play();

}

//create timer

//play music on loop?

//create collision event (sfx, new level, append elapsed time to array)

//quit function that prints levels completed and the time each one took