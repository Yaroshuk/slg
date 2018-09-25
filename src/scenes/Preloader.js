import graphicsGenerator from '../utils/graphics';

class Preloader extends Phaser.Scene {
    constructor() {
        super({key: 'Preloader'})
    }

    preload() {
        graphicsGenerator(this);
    }

    create() {
        this.scene.start('Level', {level: 1});
    }
}

export default Preloader;