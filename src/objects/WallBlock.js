import Consts from '../utils/consts';
import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';

class WallBlock extends BaseObject {
    constructor(scene, x, y) {
        super(scene, x, y, textures.wallBlock, Consts.objectKeys.wall);
    }
}

export default WallBlock;