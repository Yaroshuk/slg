const defaultConfig = {};

class BaseInteractiveUI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config) {
        super(scene, x, y);

        this.pointerDown = false;

        this.YY = config.center 
                            ? y - config.height/2
                            : y;

        //TODO:refactor

        this.config = Object.assign({}, defaultConfig, config);
        this.create();
    }

    create() {

        if (this.config.center) {
            this.x -= this.config.width/2;
            this.y -= this.config.height/2;
        } 

        if (this.config.parent === 'scene') {
            this.scene.children.add(this);
        } else {
            this.config.parent.add(this);
        }
    }

    addInteractive(config) {
        this.setInteractive(config);

        this.on('pointerover', () => {
            this.handleOver();
        })

        this.on('pointerout', () => {
            this.handleOut();
        })

        this.on('pointerdown', () => {
            this.handleDown();
            this.pointerDown = true;
        })

        this.on('pointerup', () => {
            this.handleUp();

            if (!this.pointerDown) return;

            this.pointerDown = false;
            this.handleClick();
        })

        this.on('click', this.handleClick);
    }

    handleClick() {
        this.config.handleClick();
    }

    handleOver() {}

    handleOut() {}

    handleDown() {}

    handleUp() {}
}

export default BaseInteractiveUI;