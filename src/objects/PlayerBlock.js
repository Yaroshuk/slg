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
    }

    handleChangePostition(dir) {
        this.handlePlayerClick();

        const newPost = this.getNewPosition(dir);

        let finishCallback = null;

        if (newPost.activeBlocks.length) {
            newPost.activeBlocks.forEach(elem => {
                if (elem.key === Consts.objectKeys.finish && !finishCallback) {
                    newPost.x = elem.x;
                    newPost.y = elem.y;

                    finishCallback = () => {this.scene.handlePlayerFinished(this, elem.x, elem.y)};
                }
            })
        }

        this.scene.tweens.add({
            targets: this,
            x: this.grid.getNormalX(newPost.x),
            y: this.grid.getNormalY(newPost.y),
            duration: 200,
            ease: 'Circ',
            onComplete: () => {
                if (finishCallback) {
                    finishCallback();
                } else {
                    this.grid.moveObject(this, newPost.x, newPost.y);
                }
            }
        })
    }

    getNewPosition(dir) { //TODO: refactor
        let result = {
            x: 0,
            y: 0,
            activeBlocks: []
        }

        if (dir === 'right') {
            for (let i = this.XX + 1, max = this.grid.gWidth; i < max; i++) {
                let cKey = this.grid.getCellKey(i, this.YY);
                if (this.solidBlocks.includes(cKey)) {
                    result.x = i - 1;
                    result.y = this.YY;

                    break;
                } else if (this.activeBlocks.includes(cKey)) {
                    result.activeBlocks.push({x: i, y: this.YY, key: cKey})
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
                } else if (this.activeBlocks.includes(cKey)) {
                    result.activeBlocks.push({x: i, y: this.YY, key: cKey})
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
                } else if (this.activeBlocks.includes(cKey)) {
                    result.activeBlocks.push({x: this.XX, y: i, key: cKey})
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
                } else if (this.activeBlocks.includes(cKey)) {
                    result.activeBlocks.push({x: this.XX, y: i, key: cKey})
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