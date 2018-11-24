import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';

class PlayerControl extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, textures.playerControl);

        this.staticDepth = 9999;

        this.deactivate();
    }

    activate(x = 0, y = 0) {
        //this.setNormalPosition(x, y);
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    deactivate() {
        this.setActive(false);
        this.setVisible(false);
    }
}

export default PlayerControl;