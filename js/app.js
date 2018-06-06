const Enemy = function(x, y, speed) {

    // Add initial location of enemy
    this.x = x;
    this.y = y;
    // Add initial speed for enemy
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-taxi.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x >= 505) {
        this.x = 101 * dt;
    }  else {
        this.x += this.speed * dt;
    }

    checkWin();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
const Player = function() {
    // Add initial location
    this.x = 200;
    this.y = 400;

    // The image for the player
    this.sprite = 'images/char-cat-girl.png';
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
    if (this.y <= -15) {
        winningModal.classList.add('visible');
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    switch(input) {
        case 'up':
            if (this.y > -15) {
                this.y -=83;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y +=83;
            }
            break;
        case 'left':
            if (this.x > -2) {
                this.x -=101;
            }
            break;
        case 'right':
            if (this.x < 402) {
                this.x +=101;
            }
            break;
    };
};

// Now instantiate your objects.
const player = new Player(),
      enemy1 = new Enemy(1, 64, 101),
      enemy2 = new Enemy(200, 148, 200),
      enemy3 = new Enemy(320, 230, 155);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Winning Modal based on w#schools How to CSS Modals
// https://www.w3schools.com/howto/howto_css_modals.asp
const winningModal = document.querySelector('.winning-modal'),
      closeModal = document.querySelector('.close-modal');

closeModal.onclick = function() {
    winningModal.classList.remove('visible');
}

window.onclick = function() {
    if (event.target == winningModal) {
        winningModal.classList.remove('visible');
    }
}

// Checks if the player has reached the water and won
const checkWin = function() {
    if (this.x < (player.x + 55) && this.x > (player.x - 55)) {
        if (this.y < (player.y + 25) && this.y > (player.y - 25)) {
            player.x = 200;
            player.y = 400;
        }
    }
}