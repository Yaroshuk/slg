import BaseScene from './BaseIsoScene';
import Consts from '../utils/consts';
import Grid from '../grid/Grid';
import WallBlock from '../objects/WallBlock';
import PlayerBlock from '../objects/PlayerBlock';
import PlayerControl from '../objects/PlayerControl';

class Level extends BaseScene {
    constructor() {
        super({key: 'Level'})

        this.testLevel = [
            '111111111',
            '100110001',
            '100000001',
            '111000001',
            '1X0001001',
            '111111111'
        ];

        this.test2Level = [
            ['1', '1', '1', '1'],
            ['1', '0', '0', '1'],
            ['1', '0', '0', '1'],
            ['1', '1', '1', '1']
        ]

        this.controllerActive = false;
        this.player = null;

        this.previousLevelState = this.testLevel;
        this.currentLevelState = this.testLevel;

        this.solidBlocks = '1X';

        this.handleChangeController = this.handleChangeController.bind(this);

        this.grid;
    }

    create() {
        this.grid = new Grid(this, 4, 4);
         this.grid.creator.createFromKey(Consts.objectKeys.wall, 1, 3);
         this.grid.creator.createFromKey(Consts.objectKeys.wall, 1, 2);
         this.grid.creator.createFromKey(Consts.objectKeys.wall, 1, 1);

        console.log(this.grid.cellsConfig);

        this.controller = new PlayerControl(this, 2, 1);
    }

    update() {
        super.update();

        console.log(this.children)
    }

    levelGenerator() {
        this.testLevel.forEach((levelLine, yInx) => {
            console.log(levelLine, yInx)
            let lineLength = levelLine.length;

            for (let xInx = 0, max = lineLength; xInx < max; xInx++) {
                let objId = levelLine[xInx];

                this.createObject(objId, xInx, yInx);
            }
        })
    }

    createObject(id, x, y) {
        if (!id || id === '0') return;

        switch(id) {
            case '1': {
                this.children.add(new WallBlock(this, x, y));
            } break;
            case 'X': {
                this.player = new PlayerBlock(this, x, y, {
                    handleChangeController: this.handleChangeController
                });
                this.children.add(this.player);
            } break;
            default: {
                return;
            } 
        }
    }

    setLevelCord() {
        let levelW = (this.testLevel[0].length) * Consts.baseSize; //TODO: fix width
        let levelH = (this.testLevel.length + 1) * Consts.baseSize;

        this.startX = (this.game.config.width - levelW)/2;
        this.startY = (this.game.config.height - levelH)/2;
    }

    handleChangeController() {
        this.playerMove();

        if (this.controllerActive) 
            this.setControllerDeactive();
        else 
            this.setControllerActive();
    }

    setControllerActive() {
        this.controllerActive = true;
        this.controller.activate(this.player.XX + 1, this.player.YY);
    }

    setControllerDeactive() {
        this.controllerActive = false;
        this.controller.deactivate();
    }

    playerMove(dir = 'right') {
        let oldPlayerPosition = {x: this.player.XX, y: this.player.YY};
        let newPlayerPosition = this.getNewPlayerPosition(dir);

        this.player.setNormalPosition(newPlayerPosition.x, newPlayerPosition.y);

        console.log(this.currentLevelState);

        this.changeLevelState(newPlayerPosition, oldPlayerPosition, this.player.cell);

        console.log(this.currentLevelState);
    }

    getNewPlayerPosition(dir = 'right') {
        let playerX = this.player.XX;
        let playerY = this.player.YY;

        let levelLine = this.currentLevelState[playerY];

        let result = {x: playerX, y: playerY};

        for(let i = playerX + 1, max = levelLine.length; i<max; i++) {
            if (this.solidBlocks.includes(levelLine[i])) {
                result.x = i - 1;
                break;
            }
        }

        return result;
    }

    getLevelStateCell(x, y, previous = false) {
        let levelState = this.currentLevelState;

        if (previous) {
            levelState = this.previousLevelState;
        }

        return levelState[y][x];
    }

    setLevelStateCell(x, y, cell = '0') {
        let str = this.currentLevelState[y];
        this.currentLevelState[y] = str.substring(0, x) + cell + str.substring(x + 1);
    }

    changeLevelState(newPosition, oldPosition, cell = '0') {
        if (newPosition.x === oldPosition.x && newPosition.y === oldPosition.y) return;

        let current = this.currentLevelState;
        let prevousCell = this.getLevelStateCell(oldPosition.x, oldPosition.y, true);

        if (prevousCell === cell) {
            prevousCell = '0';
        }

        this.setLevelStateCell(newPosition.x, newPosition.y, cell);
        this.setLevelStateCell(oldPosition.x, oldPosition.y, prevousCell);

        this.previousLevelState = current;
    }
}

export default Level;