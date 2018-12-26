import BaseScene from './BaseIsoScene';
import {drawIconTriangle} from '../utils/graphics';
import Button from '../ui/Button';

class StartMenu extends BaseScene {
    constructor() {
        super({key: 'StartMenu'})
    }

    create() {
        const { width, height } = this.game.config;

        const startButtonConfig = { //TODO: fix button origin
            handleClick: () => {
                this.scene.start('Level', {level: 1});
            },
            width: 200,
            height: 140,
            type: 'icon', 
            icon: {
                func: drawIconTriangle,
                width: 60,
                height: 50,
                color: 0xffffff
            }
        }

        const button = new Button(this, width/2 - startButtonConfig.width/2, height/2, startButtonConfig);

        console.log(this.game);
    }
}

export default StartMenu;