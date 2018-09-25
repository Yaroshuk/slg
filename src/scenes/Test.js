class Block extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'logo2');

        this.originY = 1;

        this.depth = 10;
    }
}

class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'logo2');

        this.originY = 1;

        this.addListener('pointerdown', function(event){
            this.y += 10
        })
    }
}

class Test extends Phaser.Scene {
    constructor() {
        super({key: 'Test'})

        console.log('TEST')

        this.graf;
        this.text;
    }

    preload() {
    }


    create() {
        let play = new Player(this, 100, 50);
        console.log(play);
        let block = new Block(this, 100, 100);
        this.children.add(block)
        this.children.add(play)
        play.setInteractive()

        this.input.on('pointerup', function(e){
            console.log(e)
        })
    }

    update() {
        this.children.list.forEach((elem) => {
            elem.depth = elem.y;
        });
    }
}

export default Test;