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

let walkSpeed = 0;

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

    //gravity velocity logic
    this.makeFall = function() {
        this.y += fallSpeed;
        switch ((this.x >= 100 && this.x < 200) || (this.x >= 300 && this.x < 400) || (this.x >= 500 && this.x < 600)) {
            case true:
                fallSpeed += 0.1;
                break;
            case false:
                fallSpeed += -0.1;
                break;
            default:
                fallSpeed += 0;
        }
        //collision function call
        this.stopPlayer();
        //
    }

    //player left/right movement
    this.movePlayer = function() {
        this.x += walkSpeed
        if (controller.right == true) {
            walkSpeed += 0.1;
            
        }
        if (controller.left == true) {
            walkSpeed += -0.1;
        }
    }

    //define ground and continually update player y position to screen edge when x/y attempts to pass
    this.stopPlayer = function() {
        let ground = canvasHeight - this.height;
        if (this.y > ground && Math.sign(fallSpeed) == 1) {
            this.y = ground;
        }

        let ceiling = 0;
        if (this.y < ceiling && Math.sign(fallSpeed) == -1) {
            this.y = ceiling;
        }

        let leftBorder = 0;
        if (this.x < leftBorder) {
            this.x = leftBorder;
        }

        let rightBorder = canvasWidth;
        if (this.x > canvasWidth) {
            this.x = rightBorder;
        }
    }
}

//keyboard associated keys - LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32
//event listeners for player control
let controller = {
    left: false,
    right: false,
    keyListener: function (event) {
      let key_state = (event.type == "keydown") ? true : false;
      switch (event.keyCode) {
        case 37: // left arrow
          controller.left = key_state;
          break;
        case 39: // right arrow
          controller.right = key_state;
          break;
      }
    }
  };

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);


//Canvas updates
let interval = setInterval(updateCanvas, 20);
function updateCanvas() {
    //clear canvas
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //run and draw updates to player/key physics logic
    player.makeFall();
    player.movePlayer();
    player.draw();
    key.draw();
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
////let audio = new Audio('key_get.mp3');

//keyGet function for key collision
////remove key, display victory message, log time to array and reset game

//create timer

//play music on loop?

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

//quit function that prints levels completed and the time each one took