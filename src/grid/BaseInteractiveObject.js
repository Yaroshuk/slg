class BaseInteractiveObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        this.pointerDown = false;

        //TODO:refactor
        this.addListener('pointerdown', () => {
            this.pointerDown = true;
        })

        this.addListener('pointerup', () => {
            if (!this.pointerDown) return;

            this.pointerDown = false;
            this.emit('click');
        })
    }
}

export default BaseInteractiveObject;