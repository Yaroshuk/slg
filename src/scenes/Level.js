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
            ['1', '1', '1', '1', '1'],
            ['1', 'X', '0', '0', '1'],
            ['1', '0', '0', '0', '1'],
            ['1', '0', '0', '0', '1'],
            ['1', '0', '0', 'X', '1'],
            ['1', '1', '1', '1', '1']
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
        this.levelGenerator();

        this.cntr = new PlayerControl(this, 125, 100-15);
        console.log(this.cntr);
        this.children.add(this.cntr);
        //this.cntr.activate(1, 1);
    }

    update() {
        super.update();
    }

    levelGenerator() {
        const gridH = this.testLevel.length;
        const gridW = this.testLevel[0].length;

        this.grid = new Grid(this, gridW, gridH);

        this.testLevel.forEach((levelLine, yInx) => {
            levelLine.forEach((code, xInx) => {
                this.grid.creator.createFromKey(code, xInx, yInx);
            })
        })
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
}

export default Level;