import BaseObject from './BaseObject';
import { textures } from '../utils/graphics';

class PlayerBlock extends BaseObject {
    constructor(scene, x, y, data) {
        super(scene, x, y, textures.playerBlock, 'X');

        console.log(data)

        this.setInteractive();

        this.on('click', data.handleChangeController);
    }
}

export default PlayerBlock;