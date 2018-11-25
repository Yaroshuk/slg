import Consts from '../utils/consts';
import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';

class WallBlock extends BaseObject {
    constructor(scene, x, y, config) {
        super(scene, x, y, textures.wallBlock, Consts.objectKeys.wall, config);
    }
}

export default WallBlock;