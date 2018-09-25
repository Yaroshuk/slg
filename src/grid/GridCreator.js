import WallBlock from '../objects/WallBlock';

class GridCreator {
    constructor(grid) {
        this.grid = grid;
        this.scene = grid.scene;
    }

    wall(x, y, config) {
        const result = new WallBlock(this.scene, x, y, config)
        this.grid.addObject(result, x, y);
        return result;
    }
}

export default GridCreator;