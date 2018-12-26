const defaultConfig = {};

class UI extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config) {
        super(scene, x, y);

        this.pointerDown = false;

        //TODO:refactor

        this.config = Object.assign({}, defaultConfig, config);
        this.create();
    }

    create() {
        this.scene.children.add(this);
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

export default UI;