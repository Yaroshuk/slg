import Consts from '../utils/consts';
import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';

class PlayerBlock extends BaseObject {
    constructor(scene, x, y, config) {
        super(scene, x, y, textures.playerBlock, Consts.objectKeys.player);

        this.setInteractive();

        //this.on('click', config.handleChangeController);
    }
}

export default PlayerBlock;