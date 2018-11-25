import BaseObject from '../grid/BaseInteractiveObject';
import { textures } from '../utils/graphics';

class PlayerControl extends BaseObject {
    constructor(scene, x, y, handleClick, direction) {
        super(scene, x, y, textures.playerControl);

        this.staticDepth = 9999;

        this.deactivate();
        this.setInteractive();

        this.on('click', () => {handleClick(direction)});
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