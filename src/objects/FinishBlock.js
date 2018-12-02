import Consts from '../utils/consts';
import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';

class FinishBlock extends BaseObject {
    constructor(scene, x, y, config) {
        super(scene, x, y, textures.finishBlock, Consts.objectKeys.finish, config);
    }
}

export default FinishBlock;