import 'phaser';
import Preloader from './scenes/Preloader';
import Level from './scenes/Level';
import Test from './scenes/Test';

var game;

function resize() {
    var canvas = document.getElementById('game');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio){
        canvas.style.width = windowWidth + 'px';
        canvas.style.height = (windowWidth / gameRatio) + 'px';
    } else {
        canvas.style.width = (windowHeight * gameRatio) + 'px';
        canvas.style.height = windowHeight + 'px';
    }
}

var Boot = {
    create: function() {
        // Initialize things here

        // Loading screen
        this.scene.switch('Preloader');
    },
};

window.onload = function() {
    game = new Phaser.Game({
        type: Phaser.AUTO,
        canvas: document.getElementById('game'),
        width: 480,
        height: 640,
        backgroundColor: 0x222222,
        scene: [
            Preloader,
            Level,
            Test
        ],
    });

//    resize();
//    window.addEventListener('resize', resize, false);
}
