/*
 * Name: Jeffrey Kedda
 * Description: This project is combination of Space Invaders and Pong.
 * The logo from project 0 is created and the space bar must be pressed to play the game.
 * Controls: 
 * Spacebar: shoot gun
 * Left Arrow Key: move left
 * Right Arrow Key: move right
 * Rules:
 * In order to win: every invader must be shot without dying
 * How to die: if the ball touches the bottom of the screen or the gun is hit by a bomb from a space invader
 * Other rules: the ball bounces off the paddle and space invaders without penalty.
 * - shooting the ball, spawns another ball from the middle of the screen.
 * - if the ball or balls touch a bomb, the bomb disappears
 * - the ball can bounce off the top and side walls
 */

class logoAnimation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.redJ = 0;
        this.greenJ = 255;
        this.blueJ = 255;

        this.redK = 255;
        this.greenK = 255;
        this.blueK = 0;
        this.counter = 0;
    }
    //draws the letter J
    drawJ() {
        fill(this.redJ, this.greenJ, this.blueJ);
        noStroke(); // no border
        rect(this.x - 25, this.y, 50, 10); // Top
        rect(this.x - 5, this.y, 10, 50); // body
        rect(this.x - 25, this.y + 50, 30, 10); // bottom  
    }
    //draws the letter K
    drawK() {
        fill(this.redK, this.greenK, this.blueK);
        noStroke(); // no border
        rect(this.x, this.y, 10, 60); // body
        quad(this.x + 40, this.y, this.x + 30, this.y, this.x, this.y + 30, this.x + 10, this.y + 30); //part
        quad(this.x + 40, this.y + 60, this.x + 30, this.y + 60, this.x, this.y + 20, this.x + 10, this.y + 20); //part 
    }
    //sets the color of the letter J
    setJColor(r, g, b) {
        this.redJ = r;
        this.greenJ = g;
        this.blueJ = b;
    }
    //sets the color of the letter K
    setKColor(r, g, b) {
        this.redK = r;
        this.greenK = g;
        this.blueK = b;
    }
    //moves the letter to the right
    moveRight() {
        this.x = this.x + 2;
        if (this.x > 420) {
            this.x = -20;
        }
    }
    moveLeft() {
        this.x = this.x - 2;
        if (this.x < -20) {
            this.x = 420;
        }
    }
    //moves the letter to the down
    moveDown() {
        this.y = this.y + 2;
        if (this.y > 400) {
            this.y = -70;
        }

    }
    //moves the letter up
    moveUp() {
        this.y = this.y - 2;
        if (this.y < -70) {
            this.y = 400;
        }

    }
}
class ballObj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.movingXdir = (random([-2, -3, 3, 2]));
        this.movingYdir = (random([-2, -3, 3, 2]));
        this.size = 20;
    }
    draw() {
        noStroke();
        //body of ball
        fill(255, 0, 255);
        ellipse(this.x, this.y, this.size, this.size);
        fill(255, 0, 0);
        ellipse(this.x, this.y, 10, 10);
    }
    move() {
        if (gameOver == 0) {
            this.x += this.movingXdir;
            this.y += this.movingYdir;

            //wall collision
            if ((this.x > (width - 10)) || (this.x < 10)) {
                this.movingXdir = -this.movingXdir;
            }
            if ((this.y > (height - 10)) || (this.y < 10)) {
                this.movingYdir = -this.movingYdir;
            }
            //paddle collision
            if (this.y > 370 && this.y < 385) {
                //top
                if (dist(this.x, this.y, paddle.x, 380) <= 20) {
                    this.movingYdir = -this.movingYdir;
                    this.movingXdir = -this.movingXdir * -1;
                }
                //bottom
                else if (dist(this.x, 0, paddle.x, 0) <= 45 && this.y >= 375) {
                    this.movingYdir = -this.movingYdir;
                    this.movingXdir = -this.movingXdir * -1;
                }
            }
            //gameover indicator
            if (this.y >= 390) {
                gameOver = 1;
            }
        }
    }
    checkInvaderHit(invaderIndex) {
        if (dist(this.x, this.y, invaders[invaderIndex].x, invaders[invaderIndex].y) <= 16) {
            this.movingYdir = -this.movingYdir;
            this.movingXdir = -this.movingXdir * -1;
        }
    }
    checkBombHit(bombIndex) {
        if (dist(this.x, this.y, bombs[bombIndex].x, bombs[bombIndex].y) < 10) {
            bombs[bombIndex].ballHit = 1;
        }
    }
}
class paddleGunObj {
    constructor(x) {
        this.x = x;
        this.size = 80;
        this.angle = 0;
    }
    draw() {
        //body
        fill(128, 128, 128);
        //top
        ellipse(this.x, 380, 20, 20);
        //bottom
        rect(this.x - 40, 380, this.size, 15);
        fill(0, 255, 0);
        rect(this.x - 40, 380, 5, 15);
        rect(this.x + 40, 380, 5, 15);

        //cosmetics
        fill(0, 0, 0);
        rect(this.x - 5, 373, 10, 5);
        stroke(0, 0, 0);
        line(this.x - 10, 380, this.x - 40, 395);
        line(this.x + 10, 380, this.x + 40, 395);
        noStroke();
        //flashing light on rocket
        if (second() % 2 == 0) {
            fill(255, 0, 0);
            rect(this.x - 5, 390, 10, 10);
        } else {
            fill(255, 180, 0);
            rect(this.x - 5, 390, 10, 10);
        }
    }
    move() {
        if (gameOver == 0) {
            if (keyArray[LEFT_ARROW] === 1 && this.x > 0) {
                this.x -= 5;
            }
            if (keyArray[RIGHT_ARROW] === 1 && this.x < 400) {
                this.x += 5;
            }
        } else if (gameOver == 2) {
            this.x = this.x + scalar * cos(this.angle);
            this.angle++; // increment angle for the next frame
        }
    }
}
class bulletObj {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.fire = 0;
        this.hitBall = 0;
    }
    draw() {
        fill(255, 255, 0);
        //bullet ellipse
        ellipse(this.x, this.y, 2, 6);
        if (gameOver == 0) {
            this.y -= 5;
        }
        if (this.y < 0) {
            this.fire = 0;
            this.hitBall = 0;
        }
    }
    //checks if it hits the ball
    checkHitBall(index) {
        if (dist(this.x, this.y, ballArray[index].x, ballArray[index].y) < 10) {
            this.hitBall = 1;
            ballArray.push(new ballObj(width / 2, height / 2));
            ballArraySize++;
            this.fire = 0;
        }
    }
    //checks if it hits the invader
    checkHitInvader(index) {
        if (dist(this.x, this.y, invaders[index].x, invaders[index].y) < 6 && invaders[index].dead == 0) {
            invaders[index].dead = 1;
            this.fire = 0;
        }
    }


}
class invaderObj {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dead = 0;
        this.bomb = 0;
        this.angle = 0;
    }
    draw() {
        fill(13, 100, 26);
        noStroke();
        //body
        rect(this.x - 6, this.y, 12, 12);
        //eyes
        fill(255, 255, 255);
        rect(this.x - 2, this.y + 8, 2, 2);
        rect(this.x + 2, this.y + 8, 2, 2);
        //wings
        triangle(this.x - 6, this.y + 3, this.x, this.y + 3, this.x - 6, this.y + 6);
        triangle(this.x + 6, this.y + 3, this.x, this.y + 3, this.x + 6, this.y + 6);
    }
    move() {
        //movement of invader
        if (gameOver == 0) {
            if (this.y > 388) {
                gameOver = 1;
            }
            this.x += globalInvDir;
            if ((this.x < 6) || (this.x > 394)) {
                globalInvDir = -globalInvDir;
                this.x += globalInvDir;
                lowerAllInvaders();
            }
            //movement in game over and you win screen
        } else {
            this.x = this.x + scalar * cos(this.angle);
            this.y = this.y + scalar * sin(this.angle);
            this.angle++; // increment angle for the next frame
        }
    }
}
class bombObj {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dropped = 0;
        this.ballHit = 0;
    }
    draw() {
        fill(255, 0, 21);
        //ellipse of the bullet
        ellipse(this.x, this.y, 3, 3);
        //game over indicator
        if (gameOver == 0) {
            this.y++;
        }
        //resets variable when off screen
        if (this.y > 400) {
            this.dropped = 0;
        }
        //collision of paddle
        if (this.y > 370) {
            if (this.x > (paddle.x - 10) && this.x < (paddle.x + 10)) {
                gameOver = 1;
            }
        }
        //collision of paddle
        if (this.y > 380) {
            if (this.x > (paddle.x - 40) && this.x < (paddle.x + 40)) {
                gameOver = 1;
            }
        }
    }

}

function keyPressed() {
    keyArray[keyCode] = 1;
}

function keyReleased() {
    keyArray[keyCode] = 0;
}

function checkFire() {
    //fire bullet with space bar
    if (keyArray[32] === 1) {
        if (currFrameCount < (frameCount - 10)) {
            currFrameCount = frameCount;
            bullets[bulletIndex].fire = 1;
            bullets[bulletIndex].x = paddle.x;
            bullets[bulletIndex].y = 370;
            bulletIndex++;
            if (bulletIndex > 6) {
                bulletIndex = 0;
            }
        }
    }
}

//Ball and Paddle Variables
var ballArray;
var ballArraySize = 1;
var currentBallIndex = 0;
var paddle;

//Bullet Variables
var keyArray = [];
var bullets;
var bulletIndex = 0;
var currFrameCount = 0;

//Invader Variables
var invaders = [];
var globalInvDir = 1;
var bombs = [];
var starsDrawn = 0;
var stars = [];
var lowerAllInvaders = function () {
    for (var i = 0; i < invaders.length; i++) {
        invaders[i].y += 5;
    }
}

//game start and game over
var gameOver = 0;
var invaderDeadCount = 0;
var gamestart = 0;
var Letters = [];
var invadersEndScreen = [];
var paddleEndScreen;

var scalar = 2; // set the radius of circle

function setup() {
    createCanvas(400, 400);
    frameRate(20);
    angleMode(DEGREES);
    //create objects
    paddle = new paddleGunObj(200);
    paddleEndScreen = new paddleGunObj(200);
    ballArray = [new ballObj(width / 2, height / 2)];
    bullets = [new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj(), new bulletObj()];
    var invaderXPosition = 100;
    var invaderYPosition = 20;
    //in game invader init
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 10; j++) {
            invaders.push(new invaderObj(invaderXPosition, invaderYPosition));
            bombs.push(new bombObj());
            invaderXPosition += 24;
        }
        invaderXPosition = 100;
        invaderYPosition += 20;
    }
    var invadersEndScreenX = 100;
    var invadersEndScreenY = 100;
    //game over screen invadr init
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 10; j++) {
            invadersEndScreen.push(new invaderObj(invadersEndScreenX, invadersEndScreenY));
            invadersEndScreenX += 24;
        }
        invadersEndScreenX = 100;
        invadersEndScreenY += 20;
    }
    // logo variables for game start screen
    var logoX = -20;
    var logoY = -70;
    for (var i = 0; i < 6; i++) { // for all planes
        for (var j = 0; j < 8; j++) {
            Letters.push(new logoAnimation(logoX, logoY));
            logoX = logoX + 55;
        }
        logoX = -20;
        logoY = logoY + 80;
    }
}
//draws stars for background effect
function drawStars() {
    if (starsDrawn == 0) {
        for (var i = 0; i < 400; i++) {
            var array = [];
            for (var j = 0; j < 400; j++) {
                if (random(0, 10000) < 10) {
                    fill(255, 255, 255);
                    rect(i, j, 1, 1);
                    array.push(1);
                } else {
                    array.push(0);
                }
            }
            stars.push(array);

        }
        starsDrawn = 1;
    } else {
        for (var i = 0; i < 400; i++) {
            for (var j = 0; j < 400; j++) {
                if (stars[i][j] == 1) {
                    fill(255, 255, 255);
                    rect(i, j, 1, 1);
                }
            }
        }

    }
}

function draw() {
    background(0, 0, 0);
    drawStars();
    //logo animation for game start screen
    if (gamestart == 0) {
        var seconds = second();
        //variables to randomly chose the color
        randomRed = random(255);
        randomGreen = random(255);
        randomBlue = random(255);
        //Animates movement of each letter based off seconds from the start of the program
        if (seconds % 3 == 0) {
            for (var i = 0; i < Letters.length; i++) {
                if (i % 2 == 0) {
                    Letters[i].drawJ();
                    Letters[i].moveLeft();
                    Letters[i].moveDown()
                    Letters[i].setJColor(randomRed, randomGreen, randomBlue);
                } else {
                    Letters[i].drawK();
                    Letters[i].moveLeft();
                    Letters[i].moveDown()
                    Letters[i].setKColor(randomRed, randomGreen, randomBlue);
                }
            }
        } else if (seconds % 2 == 0) {
            for (var i = 0; i < Letters.length; i++) {
                Letters[i].drawJ();
                Letters[i].moveRight();
                Letters[i].moveDown()
                Letters[i].setJColor(randomRed, randomGreen, randomBlue);
            }
        } else {
            for (var i = 0; i < Letters.length; i++) {
                if (i % 2 == 0) {
                    Letters[i].drawK();
                    Letters[i].moveUp();
                    Letters[i].setKColor(randomRed, randomGreen, randomBlue);
                } else {
                    Letters[i].drawK();
                    Letters[i].moveDown();
                    Letters[i].setKColor(randomRed, randomGreen, randomBlue);
                }
            }
        }
        fill(255, 255, 255);
        textSize(30);
        text('Press SPACE bar to START', 0, 200);
        if (keyArray[32] === 1) {
            gamestart = 1;
        }
    } else {
        // in game conditions and movement
        if (gameOver == 0) {
            paddle.draw();
            paddle.move();
            checkFire();
            //invader array
            for (var i = 0; i < invaders.length; i++) {
                if (invaders[i].dead === 0) {
                    for (j = 0; j < ballArraySize; j++) {
                        ballArray[j].checkInvaderHit(i);
                        ballArray[j].checkBombHit(i);
                    }
                    invaders[i].draw();
                    invaders[i].move();

                    if (bombs[i].dropped === 1 && bombs[i].ballHit == 0) {
                        bombs[i].draw();
                    } else {
                        if (random(0, 10000) < 10) {
                            bombs[i].dropped = 1;
                            bombs[i].x = invaders[i].x;
                            bombs[i].y = invaders[i].y + 5;
                        }
                        //increase probability of fire when hoving above gun
                        else if (random(0, 10000) < 100 && dist(invaders[i].x, 0, paddle.x, 0) < 10) {
                            bombs[i].dropped = 1;
                            bombs[i].x = invaders[i].x;
                            bombs[i].y = invaders[i].y + 5;
                        }
                    }
                } else {
                    invaderDeadCount++;
                }
                if (invaderDeadCount == invaders.length) {
                    gameOver = 2;
                }
            }
            invaderDeadCount = 0;
            //ball array
            for (currentBallIndex = 0; currentBallIndex < ballArraySize; currentBallIndex++) {
                ballArray[currentBallIndex].draw();
                ballArray[currentBallIndex].move();
            }
            //bullets array
            for (i = 0; i < bullets.length; i++) {
                if (bullets[i].fire === 1) {
                    for (j = 0; j < invaders.length; j++) {
                        bullets[i].checkHitInvader(j);
                    }
                    for (k = 0; k < ballArraySize; k++) {
                        bullets[i].checkHitBall(k);
                    }
                    bullets[i].draw();
                }
            }
        }
        //you lose screen
        if (gameOver == 1) {
            for (var i = 0; i < invadersEndScreen.length; i++) {
                invadersEndScreen[i].draw();
                invadersEndScreen[i].move();
            }
            fill(255, 255, 255);
            textSize(30);
            text('GAME OVER', 100, 200);
            text('YOU LOSE!', 100, 240);

         //you win screen
        } else if (gameOver == 2) {
            for (var i = 0; i < 400; i++) {
                var array = [];
                for (var j = 0; j < 400; j++) {
                    if (random(0, 10000) < 10) {
                        fill(255, 255, 255);
                        rect(i, j, 1, 1);
                        array.push(1);
                    } else {
                        array.push(0);
                    }
                }
                stars.push(array);
            }
            paddleEndScreen.draw();
            paddleEndScreen.move();
            fill(255, 255, 255);
            textSize(30);
            text('GAME OVER', 100, 200);
            text('YOU WIN!', 100, 240);

        }

    }
}