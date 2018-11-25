import Consts from '../utils/consts';
import BaseObject from '../grid/BaseGridObject';
import { textures } from '../utils/graphics';
import PlayerController from './PlayerController';

class PlayerBlock extends BaseObject {
    constructor(scene, x, y, config) {
        super(scene, x, y, textures.playerBlock, Consts.objectKeys.player, config);

        this.controller;
        this.isControllerActive = false;

        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.handleChangePostition = this.handleChangePostition.bind(this);

        this.setInteractive();
        this.on('click', this.handlePlayerClick);

        this.solidBlocks = '1X';
    }

    handleChangePostition(dir) {
        this.handlePlayerClick();

        const newPost = this.getNewPosition(dir);

        this.scene.tweens.add({
            targets: this,
            x: this.grid.getNormalX(newPost.x),
            y: this.grid.getNormalY(newPost.y),
            duration: 200,
            ease: 'Circ',
            onComplete: () => {
                this.grid.moveObject(this, newPost.x, newPost.y);
            }
        })
    }

    getNewPosition(dir) { //TODO: refactor
        let result = {
            x: 0,
            y: 0
        }

        if (dir === 'right') {
            for (let i = this.XX + 1, max = this.grid.gWidth; i < max; i++) {
                let cKey = this.grid.getCellKey(i, this.YY);

                if (this.solidBlocks.includes(cKey)) {
                    result.x = i - 1;
                    result.y = this.YY;

                    break;
                }
            }
        }

        if (dir === 'left') {
            for (let i = this.XX - 1, min = 0; i >= min; i--) {
                let cKey = this.grid.getCellKey(i, this.YY);
                if (this.solidBlocks.includes(cKey)) {
                    result.x = i + 1;
                    result.y = this.YY;

                    break;
                }
            }
        }

        if (dir === 'bottom') {
            for (let i = this.YY + 1, max = this.grid.gHeight; i < max; i++) {
                let cKey = this.grid.getCellKey(this.XX, i);

                if (this.solidBlocks.includes(cKey)) {
                    result.x = this.XX;
                    result.y = i - 1;

                    break;
                }
            }
        }

        if (dir === 'top') {
            for (let i = this.YY - 1, min = 0; i >= min; i--) {
                let cKey = this.grid.getCellKey(this.XX, i);
                if (this.solidBlocks.includes(cKey)) {
                    result.x = this.XX;
                    result.y = i + 1;

                    break;
                }
            }
        }

        return result;
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
        this.controller = new PlayerController(this, this.handleChangePostition);
    }
}

export default PlayerBlock;