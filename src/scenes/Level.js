import BaseScene from './BaseIsoScene';
import Consts from '../utils/consts';
import Grid from '../grid/Grid';
import graphicsGenerator, {drawIconTriangle} from '../utils/graphics';
import ModalLevelCompleted from '../ui/ModalLevelCompleted';
import WallBlock from '../objects/WallBlock';
import PlayerBlock from '../objects/PlayerBlock';
import PlayerControl from '../objects/PlayerControl';
import Button from '../ui/Button';

class Level extends BaseScene {
    constructor() {
        super({key: 'Level'})

        this.testLevel = [
            ['1', '1', '1', '1', '1'],
            ['1', '0', 'F', '0', '1'],
            ['1', '0', 'X', '0', '1'],
            ['1', '0', '0', '1', '1'],
            ['1', '1', '0', '1', '1'],
            ['1', '1', '0', '0', '1'],
            ['1', '0', 'X', '0', '1'],
            ['1', '1', '1', 'F', '1'],
            ['1', '1', '1', '1', '1'],
            ['1', '1', '1', '1', '1'],
            ['1', '1', '1', '1', '1'],
            ['1', '1', '1', '1', '1']
        ]

        this.controllerActive = false;
        this.players = [];

        this.previousLevelState = this.testLevel;
        this.currentLevelState = this.testLevel;

        this.solidBlocks = '1X';

        this.baseSize = 50;
        this.isoHeight = 15;
        this.borderOffset = 25;
        this.topOffset = 50;

        this.modalLevelCompleted;

        this.grid;

        this.handlePlayerFinished = this.handlePlayerFinished.bind(this);
    }

    preload() {
        this.levelSetup();
        graphicsGenerator(this, this.baseSize, this.isoHeight);
    }

    create() {
        this.levelGenerator();

        this.modalLevelCompleted = new ModalLevelCompleted(this);
    }

    update() {
        super.update();
    }

    levelSetup() {
        const game = this.game;
        this.gameW = game.config.width;
        this.gameH = game.config.height;

        this.gridH = this.testLevel.length;
        this.gridW = this.testLevel[0].length;

        const maxWidth = this.gameW - this.borderOffset * 2;
        const maxHeight = this.gameH - (this.topOffset + this.borderOffset * 2);

        const realWidth = this.baseSize * this.gridW;
        const realHeight = this.baseSize * this.gridH + this.isoHeight;
        console.log(maxWidth, maxHeight, realWidth, realHeight);
        if (realWidth > maxWidth) { //TODO: refactor
            if (realHeight > maxHeight) {
                if (realWidth - maxWidth > realHeight - maxHeight) {
                    this.baseSize = Math.round(maxWidth/this.gridW);
                } else {
                    this.baseSize = Math.round((maxHeight-15)/this.gridH);
                }
            } else {
                this.baseSize = Math.round(maxWidth/this.gridW);
            }
        }

        if (realHeight > maxHeight) {
            if (realWidth > maxWidth) {
                if (realWidth - maxWidth > realHeight - maxHeight) {
                    this.baseSize = Math.round(maxWidth/this.gridW);
                } else {
                    this.baseSize = Math.round((maxHeight-15)/this.gridH);
                }
            } else {
                this.baseSize = Math.round((maxHeight-15)/this.gridH);
            }
        }

        this.isoHeight = Math.round(this.baseSize * 0.23) //23% TODO: refactor with const
        console.log('fff', this)
    }

    levelGenerator() {
        let gridX = (this.gameW - this.baseSize * this.gridW)/2;
        let gridY = (this.gameH - (this.baseSize * this.gridH - this.isoHeight))/2;

        if (gridY < this.topOffset + this.borderOffset) {
            gridY = this.topOffset + this.borderOffset;
        }

        this.grid = new Grid(this, this.gridW, this.gridH, {size: this.baseSize, isoHeight: this.isoHeight, x: gridX, y: gridY});

        this.testLevel.forEach((levelLine, yInx) => {
            levelLine.forEach((code, xInx) => {
                if (code === Consts.objectKeys.player) {
                    this.players.push(this.grid.creator.createFromKey(code, xInx, yInx));
                } else {
                    this.grid.creator.createFromKey(code, xInx, yInx);
                }
            })
        })
    }

    handlePlayerFinished(player, x, y) {

        let indx = null;
        indx = this.players.findIndex((elem) => {
            return elem === player;
        })

        if (indx !== null) {
            this.players.splice(indx, 1);
        }
        const finish = this.grid.getCellObject(x, y);
        this.grid.removeObject(finish);
        this.grid.removeObject(player);
        this.grid.creator.wall(x, y);

        if (!this.players.length) {
            this.modalLevelCompleted.open();
        }
    }
}

export default Level;