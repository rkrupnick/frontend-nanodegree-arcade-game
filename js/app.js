// TODO: Count rounds in winning modal
// TODO: 'Reset' after losing
// TODO: Score system
// TODO: Character selection

'use strict';



const Enemy = function(x, y, speed) {

    // Add initial location of enemy
    this.x = x;
    this.y = y;
    // Add initial speed for enemy
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Loop the enemies
    if (this.x >= 505) {
        this.x = 101 * dt;
    }  else {
        this.x += this.speed * dt;
    }

    // Check for collisions
    this.collision(this.x, this.y);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles collisions with enemies
Enemy.prototype.collision = function(x,y) {
    if (x < (player.x + 55) && x > (player.x - 55)) {
        if (y < (player.y + 25) && y > (player.y - 25)) {
            player.x = 200;
            player.y = 400;
            player.minusHeart();
        }
    }
};

const speedUp = function() {
    allEnemies.map(e => e.speed *= 1.25);
}

// Now write your own player class
const Player = function() {
    // Add initial location
    this.x = 200;
    this.y = 400;

    // The image for the player
    this.sprite = 'images/char-cat-girl.png';
    this.lives = 3;
};

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {
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
    }
    this.checkWin(this.x, this.y);
};

// Checks if the player has reached the water and won
Player.prototype.checkWin = function(x,y) {
    if (y <= -15) {
        displayWinModal();
        player.x = 200;
        player.y = 400;
        speedUp();
    }
};

Player.prototype.minusHeart = function() {
    const hearts = document.querySelector('#lives');
    if (player.lives > 1) {
        player.lives -= 1;
        lives.children[0].remove();
    } else {
        lives.children[0].remove();
        losingModal.classList.add('visible');
    }
}

// Now instantiate your objects.
const player = new Player(),
      enemy1 = new Enemy(1, 64, 101),
      enemy2 = new Enemy(200, 148, 220),
      enemy3 = new Enemy(320, 230, 155),
      enemy4 = new Enemy(400, 148, 50);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
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
    losingModal = document.querySelector('.losing-modal'),
    closeWinModal = document.querySelector('.close-winning-modal'),
    closeLoseModal = document.querySelector('.close-losing-modal'),
    roundsText = document.querySelector('.rounds');
let rounds = 1;

// When user clicks the 'x', the modal closes
closeWinModal.onclick = function() {
    winningModal.classList.remove('visible');
};

closeLoseModal.onclick = function() {
    losingModal.classList.remove('visible');
};
// When user clicks outside the modal content, the modal closes
window.onclick = function() {
    if (event.target == winningModal) {
        winningModal.classList.remove('visible');
    } else if (event.target === losingModal) {
        losingModal.classList.remove('visible');
    }
};

function displayWinModal() {
    winningModal.classList.add('visible');
    rounds += 1;
    roundsText.innerText = rounds;
    setTimeout(function() {winningModal.classList.remove('visible');}, 1500);
}


