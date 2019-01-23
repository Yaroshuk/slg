import BaseScene from './BaseIsoScene';
import {drawIconTriangle} from '../utils/graphics';
import Button from '../ui/Button';

class StartMenu extends BaseScene {
    constructor() {
        super({key: 'StartMenu'})

        this.modal;
        this.button;
    }

    update() {
        super.update();
    }

    create() {
        const { width, height } = this.game.config;

        const startButtonConfig = { //TODO: fix button origin
            handleClick: () => {
                console.log(this.scene)
                this.scene.start('Level', {level: 0});
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

        this.button = new Button(this, width/2 - startButtonConfig.width/2, height/2, startButtonConfig);
    }
}

export default StartMenu;