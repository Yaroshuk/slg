import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';

class PlayerBlock extends BaseObject {
    constructor(scene, x, y, config) {
        console.log('fffg', scene, x, y)
        super(scene, x, y, textures.playerBlock, 'X');

        console.log(config)

        this.setInteractive();

        this.on('click', config.handleChangeController);
    }
}

export default PlayerBlock;