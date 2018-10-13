import Consts from '../utils/consts';
import WallBlock from '../objects/WallBlock';
import PlayerBlock from '../objects/PlayerBlock';

class GridCreator {
    constructor(grid, createFunc) {
        this.grid = grid;
        this.scene = grid.scene;
        this.createFunc = createFunc;
        this.creatorLinks;

        this.wall = this.wall.bind(this);
        this.player = this.player.bind(this);

        this.initialSetup();
    }

    initialSetup() {
        this.creatorLinks = {
            [Consts.objectKeys.player]: this.player,
            [Consts.objectKeys.wall]: this.wall
        }
    }

    createFromKey(key, x, y, config = {}) {
        if (!key || !this.creatorLinks[key]) return;
        
        return this.creatorLinks[key](x, y, config);
    }

    player(x, y, config = {}) {
        config.grid = this.grid;
        const result = new PlayerBlock(this.scene, x, y, config)
        this.createFunc(result, x, y);
        return result;
    }

    wall(x, y, config = {}) {
        config.grid = this.grid;
        const result = new WallBlock(this.scene, x, y, config)
        this.createFunc(result, x, y);
        return result;
    }
}

export default GridCreator;