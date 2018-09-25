import Consts from '../utils/consts';
import GridCreator from '../grid/GridCreator';
import WallBlock from '../objects/WallBlock';

class Grid {
    constructor(scene, width, height, config = {}) {
        this.scene = scene;
        this.gWidth = width;
        this.gHeight = height;
        this.cOffset = config.offset || 0; 
        this.cSize = config.size || Consts.baseSize;
        this.previousMap = this.generateStarterMap(width, height);
        this.currentMap = this.generateStarterMap(width, height);
        this.children;
        this.creator;

        this.create();
    }

    create() {
        this.children = new Phaser.GameObjects.Container(this.scene);
        this.creator = new GridCreator(this);
        this.creator.wall(1, 2);
    }

    generateStarterMap(width, height, defaultCKey = Consts.objectKeys.empty) {
        const result = [];

        for(let y = 0, max = height; y < max; y++) {
            const yLine = [];

            for (let x = 0, max = width; x < max; x++) {
                yLine[x] = defaultCKey;
            }

            result[y] = yLine;
        }

        return result;
    }

    addObject(obj, x, y) {
        if (!obj) return;

        this.children.add(obj)
    }

}

export default Grid;