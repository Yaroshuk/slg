import Consts from '../utils/consts';

class BaseGridObject extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, key = '0') {
        super(scene, 0, 0, texture);

        this.originY = 1;
        this.originX = 0.5;

        this.startX = 0;
        this.startY = 0;

        this.pointerDown = false;

        this.key = key;


        //TODO:refactor
        this.addListener('pointerdown', () => {
            this.pointerDown = true;
        })

        this.addListener('pointerup', () => {
            if (!this.pointerDown) return;

            this.pointerDown = false;
            this.emit('click');
        })

        this.setNormalPosition(x, y);

        this.create();
    }

    getNormalX() {
        const {startX, baseSize} = Consts;

        return this.startX + (this.XX * baseSize) + baseSize/2;
    }

    getNormalY() {
        const {startY, baseSize, isoHeight} = Consts;

        return (this.startY + this.YY * baseSize + baseSize/2) + baseSize/2 - isoHeight; //TODO: исправить формулу
    }

    setNormalPosition(x, y) {
        this.XX = x;
        this.YY = y;

        this.x = this.getNormalX();
        this.y = this.getNormalY();
    }

    setStartPosition(x = 0, y = 0) {
        this.startX = x;
        this.startY = y;

        this.setNormalPosition(this.XX, this.YY);
    }

    create() {
        console.log('CREATE', this.startX, this.startY)
    }
}

export default BaseGridObject;