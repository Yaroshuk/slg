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
        this.objectsArray = this.generateStarterObjectArray(width, height);
        
        this.startMap = this.generateStarterMap(width, height);
        
        this.previousMap = this.startMap;
        this.currentMap = this.startMap;
        this.children;
        this.creator;

        this.addObject = this.addObject.bind(this);

        this.initialSetup();
        this.create();
    }

    initialSetup() {
        this.children = new Phaser.GameObjects.Container(this.scene, this.x, this.y);
        this.creator = new GridCreator(this, this.addObject);
    }

    create() {
    }

    setPosition(x = 0, y = 0) {
        this.x = x;
        this.y = y;

        this.children.x = x;
        this.children.y = y;
    }

    generateStarterObjectArray(width, height) {
        const result = [];

        for(let y = 0, max = height; y < max; y++) {
            const yLine = [];

            for (let x = 0, max = width; x < max; x++) {
                yLine[x] = null;
            }

            result[y] = yLine;
        }

        return result;
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

    getCellObject(x, y) {
        const obj = this.objectsArray[y][x];

        if (!obj) return null;

        return obj;
    }

    getCellKey(x, y) {
        const key = this.currentMap[y][x];

        if (!key) return null;

        return key;
    }

    setMapKey(key = Consts.objectKeys.empty, x, y) { //TODO: fix it
        this.previousMap = this.currentMap.map(yLine => [...yLine]);
        
        this.currentMap = this.currentMap.map((yLine, inx) => {
            const line = [...yLine];

            if(inx === y) {
                line[x] = key;
            } 

            return line;
        });
    }

    setMapObject(obj, x, y) { //TODO: fix it
        this.objectsArray = this.objectsArray.map((yLine, inx) => {
            const line = [...yLine];

            if(inx === y) {
                line[x] = obj;
            } 

            return line;
        });
    }

    addObject(obj, x, y) {
        if (!obj) return;

        this.setMapObject(obj, x, y);
        this.setMapKey(obj.key, x, y);
        console.log(this.currentMap, this.previousMap)
        this.children.add(obj)
    }

}

export default Grid;