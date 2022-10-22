//fetch website to check if up or down

//create game window variables (600x400)
let canvasWidth = 600;
let canvasHeight = 400;

//start new game session function, create player and key objects
function startGame() {
    gameCanvas.start();

    reset();
}

//define gameCanvas according to canvas rules and specifications
let gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }
}

//create timer
let timeElapsed = 0;

//create array for level timestamps
let timestamps = [0]

//create player variable
let player;

//position stuff
let playerYPosition = 200;

let playerXPosition = 135;

let fallSpeed = 0;

let walkSpeed = 0;


function createPlayer(width, height) {
    //player size specifications
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

        let inGravityDownColumn = (this.x >= 100 && this.x < 200) || (this.x >= 300 && this.x < 400) || (this.x >= 500 && this.x < 600)

        switch (inGravityDownColumn) {
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

    }

    //player left/right movement
    this.movePlayer = function() {
        this.x += walkSpeed;
        if (controller.right == true) {
            walkSpeed += 0.3;
        }
        if (controller.left == true) {
            walkSpeed += -0.3;
        }
        walkSpeed *= 0.95;
    }

    //define ground and continually update player y position to screen edge when x/y attempts to pass
    this.stopPlayer = function() {
        let ground = canvasHeight - this.height;
        //gravity down
        if (this.y > ground && Math.sign(fallSpeed) == 1) {
            this.y = ground;
            fallSpeed = 0;
        }
        //gravity up
        let ceiling = 0;
        if (this.y < ceiling && Math.sign(fallSpeed) == -1) {
            this.y = ceiling;
            fallSpeed = 0;
        }

        let leftBorder = 0;
        if (this.x < leftBorder && Math.sign(walkSpeed) == -1) {
            this.x = leftBorder;
            walkSpeed = 0;
        }
        
        let rightBorder = canvasWidth - this.width;
        if (this.x > rightBorder && Math.sign(walkSpeed) == 1) {
            this.x = rightBorder;
            walkSpeed = 0;
        }
    }
    
}

detectCollision = function() {
    let playerCenterX = player.x + (player.width / 2);
    let playerCenterY = player.y + (player.height / 2);
    let keyLeft = key.x;
    let keyRight = key.x + key.width;

    let keyTop = key.y;
    let keyBottom = key.y + key.height;

    if ((playerCenterX > keyLeft && playerCenterX < keyRight) && (playerCenterY > keyTop && playerCenterY < keyBottom)) {
        keyGet();
        console.log("Success")
    }
}

//keyboard associated keys - LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32

//create controller as an object
let controller = {
    left: false,
    right: false,
    keyListener: function (event) {
        //event.type set to keydown to detect key press as boolean
      let key_state = (event.type == "keydown") ? true : false;
      //event.keycode will be the key that was pressed
      switch (event.keyCode) {
        case 37: // left arrow
            controller.left = key_state;
            break;
        case 39: // right arrow
            controller.right = key_state;
            break;
        case 27: //esc button
            controller.esc = key_state;
            break;
        case 13: //enter button
            controller.enter = key_state;
            break;
      }
    }
  };
//add event listeners to detect when a key is down/up, then call the keyListener function in the controller object with the key pressed as variable 'event'
window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);


//updateCanvas function will run every 20 milliseconds
let interval = setInterval(updateCanvas, 20);
function updateCanvas() {
    //clear old canvas
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    //run and draw updates to player/key physics logic
    player.makeFall();
    player.movePlayer();
    player.draw();
    key.draw();
    detectCollision();
    //timer add time (interval will run 50x a second, so timeElapsed should accurately count seconds since 50 * 0.02 == 1)
    timeElapsed += 0.02
}

//create key object (in random position)
let key;

//random start coordinate function for key
function keyPositionRandom() {
    
let keyXPosition = Math.floor(Math.random() * 600);
let keyYPosition = Math.floor(Math.random() * 400);

return {
    x : keyXPosition,
    y : keyYPosition
}
}

function createKey(width, height) {
    this.width = width;
    this.height = height;
    this.x = keyPositionRandom().x;
    this.y = keyPositionRandom().y;

    //key draw event
    this.draw = function() {
        ctx = gameCanvas.context;
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//keyGet function for key collision
////remove key, display victory message, push time to timestamps array and get new level
let totalKeys = 0;
//for totalling array
function getSum(total, num){
    return total + num;
};

//silly graphics for victory screens
function sillyGraphics() {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("square get", canvas.width/2, canvas.height/2);
    async function boom() {
        let myPromise = new Promise(function(resolve) {
          setTimeout(function() {resolve(drawImage(image, dx, dy));}, 60);
        });
        document.getElementById("demo").innerHTML = await myPromise;
    boom();
}

function keyGet() {
    sillyGraphics();
    totalKeys += 1;
    //total time spent playing as of last level completion
    timeElapsedTillNow = timestamps.reduce(getSum);
    //pushes record of total time spent on this level to array beginning
    timestamps.unshift(timeElapsed - timeElapsedTillNow);
    console.log(totalKeys);
    //update scores
    updateHTMLScores(totalKeys, skipsTotal);
    //reset key
    reset();
}

function updateHTMLScores(keyTotal, skipsTotal) {
    document.getElementById("keyTotal").innerText = "Total Squares: " + keyTotal;
    document.getElementById("skipsTotal").innerText = "Total Skips Used: " + skipsTotal;
}

//Skip button function
let skipsTotal = 0;
function skipLevel() {
    skipsTotal += 1;
    //reset key
    reset();
}

function reset () { 
    key = new createKey(30, 30);
    player = new createPlayer(30,30);
    updateHTMLScores(totalKeys, skipsTotal);
}

//"-Skip Level Button-"
let button = document.getElementById("skip");
button.addEventListener("click", skipLevel);

//quit function that prints levels completed and the time each one took
function quit() {
    clearInterval();
}