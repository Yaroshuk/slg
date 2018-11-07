import Consts from '../utils/consts';
import GridCreator from '../grid/GridCreator';

class Grid {
    constructor(scene, width, height, config = {}) {
        this.scene = scene;
        this.gWidth = width;
        this.gHeight = height;
        this.cOffset = config.offset || 0; 
        this.cSize = config.size || Consts.baseSize;
        this.x = config.x || 0;
        this.y = config.y || 0;

        this.cellsConfig = this.generateStarterCellsConfig(width, height);
        this.children;
        this.creator;

        this.addObject = this.addObject.bind(this);

        this.initialSetup();
    }

    initialSetup() {
        this.children = new Phaser.GameObjects.Group(this.scene); //, this.x, this.y
        this.creator = new GridCreator(this, this.addObject);
    }

    setPosition(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.children.x = x;
        this.children.y = y;
    }

    generateStarterCellsConfig(width, height) {
        const result = {};

        for(let y = 0, max = height; y < max; y++) {
            for (let x = 0, max = width; x < max; x++) {
                result[this.getCellsConfigName(x, y)] = {
                    currentKey: Consts.objectKeys.empty,
                    previousKey: Consts.objectKeys.empty,
                    obj: null
                }
            }
        }

        return result;
    }

    getCellsConfigName(x, y) {
        return `${x}${y}`;
    }

    setCellsConfigOptions(x, y, options) { //TODO: refactor
        const newConfig = Object.assign({}, this.cellsConfig[this.getCellsConfigName(x, y)]);

        for(let key in options) {
            if (options.hasOwnProperty(key)) {
                newConfig[key] = options[key];
            }
        } 

        this.cellsConfig = Object.assign({}, this.cellsConfig, {[this.getCellsConfigName(x, y)]: newConfig})
    }

    getCellsConfigOptions(x, y) {
        return this.cellsConfig[this.getCellsConfigName(x, y)];
    }

    setCellsConfigObj(x, y, obj) {
        const cellConfig = this.getCellsConfigOptions(x, y);
        
        this.setCellsConfigOptions(x, y, {
            currentKey: obj ? obj.key : '0',
            previousKey: cellConfig.currentKey,
            obj
        });
    }

    getCellObject(x, y) {
        const obj = this.getCellsConfigOptions(x, y).obj;

        if (!obj) return null;

        return obj;
    }

    getCellKey(x, y) {
        const key = this.getCellsConfigOptions(x, y).currentKey;

        if (!key) return null;

        return key;
    }

    moveObject(obj, newX = 0, newY = 0, keyInstead = Consts.objectKeys.empty) { //TODO: add cords check
        if (!obj || this.getCellObject(obj.XX, obj.YY) !== obj) return;

        const oldX = obj.XX;
        const oldY = obj.YY;

        let newCorrectX = newX;
        let newCorrectY = newY;

        if (newCorrectX > this.gWidth - 1) {
            newCorrectX = this.gWidth - 1;
        }

        if (newCorrectY > this.gHeight - 1) {
            newCorrectY = this.gHeight - 1;
        }

        if (obj.XX !== newCorrectX || obj.YY !== newCorrectY) {
            obj.setNormalPosition(newCorrectX, newCorrectY);
        }
        
        this.setCellsConfigObj(newCorrectX, newCorrectY, obj);

        this.setCellsConfigObj(oldX, oldY, null);

        this.children.sort('y');
    }

    setGridPosition(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.children.children.entries.forEach(elem => {
            elem.setStartPosition(this.x, this.y);
        })
    }

    addObject(obj, x, y) {
        if (!obj) return;

        obj.setStartPosition(this.x, this.y);
        this.setCellsConfigObj(x, y, obj);
        this.children.add(obj, true);
    }

}

export default Grid;