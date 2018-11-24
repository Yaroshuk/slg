import Consts from '../utils/consts';
import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';
import PlayerController from './PlayerController';

class PlayerBlock extends BaseObject {
    constructor(scene, x, y, config) {
        super(scene, x, y, textures.playerBlock, Consts.objectKeys.player);

        this.controller;
        this.isControllerActive = false;

        this.handlePlayerClick = this.handlePlayerClick.bind(this);

        this.setInteractive();
        this.on('click', this.handlePlayerClick);
    }

    handlePlayerClick() {
        if (this.isControllerActive) {
            this.controller.deactivate();
            this.isControllerActive = false;
        } else {
            this.controller.activate();
            this.isControllerActive = true;
        }
    }

    create() {
        this.controller = new PlayerController(this);
    }
}

export default PlayerBlock;