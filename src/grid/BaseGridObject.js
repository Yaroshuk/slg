import BaseInteractiveObject from './BaseInteractiveObject';
import {getTextureName} from '../utils/graphics';

class BaseGridObject extends BaseInteractiveObject {
    constructor(scene, x, y, texture, key = '0', config) {
        super(scene, 0, 0, getTextureName(texture, config.grid.cSize));

        this.originY = 1;
        this.originX = 0.5;

        this.startX = 0;
        this.startY = 0;

        this.key = key;

        this.grid = config.grid;

        this.setNormalPosition(x, y);

        this.create();
    }

    // getNormalX() {
    //     const {startX, baseSize} = Consts;

    //     return this.startX + (this.XX * baseSize) + baseSize/2;
    // }

    // getNormalY() {
    //     const {startY, baseSize, isoHeight} = Consts;

    //     return (this.startY + this.YY * baseSize + baseSize/2) + baseSize/2 - isoHeight; //TODO: исправить формулу
    // }

    setNormalPosition(x, y) {
        this.XX = x;
        this.YY = y;

        this.x = this.grid.getNormalX(x);
        this.y = this.grid.getNormalY(y);
    }

    setStartPosition(x = 0, y = 0) {
        this.startX = x;
        this.startY = y;

        this.setNormalPosition(this.XX, this.YY);
    }

    create() {
        // console.log('CREATE', this.startX, this.startY)
    }
}

export default BaseGridObject;