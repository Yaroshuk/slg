import BaseObject from './BaseObject';
import { textures } from '../utils/graphics';

class PlayerControl extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, textures.playerControl);

        this.deactivate();
    }

    activate(x, y) {
        this.setNormalPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    deactivate() {
        this.setActive(false);
        this.setVisible(false);
    }
}

export default PlayerControl;