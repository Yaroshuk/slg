import BaseObject from './BaseObject';
import { textures } from '../utils/graphics';

class WallBlock extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, textures.wallBlock);
    }
}

export default WallBlock;