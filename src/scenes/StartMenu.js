import BaseScene from './BaseIsoScene';
import {drawIconTriangle} from '../utils/graphics';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

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

        this.button = new Button(this, width/2 - startButtonConfig.width/2, height/2, startButtonConfig);

        this.modal = new Modal(this);
    }
}

export default StartMenu;