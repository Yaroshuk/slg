import {drawModalBackground, drawScreenCover} from '../utils/graphics';
import Button from './Button';

const defaultConfig = {
    height: 200,
    color: 'green',
    name: 'Play'
}

const controllHeight = 80;

class BaseModal extends Phaser.GameObjects.Container {
    constructor(scene, config) {    
        super(scene);

        this.config = Object.assign({}, defaultConfig, config);
        
        this.YY = 80;
        this.XX = 30;

        this.H = this.config.height + controllHeight;
        this.W = scene.game.config.width - 60;

        this.screenCover;
        this.container;
        this.background;

        this.create();
    }

    create() {
        this.staticDepth = 9999;

        this.container = new Phaser.GameObjects.Container(this.scene);

        this.container.x = 30;
        this.container.y = 80;

        const interactiveConfig = {
            hitArea: new Phaser.Geom.Rectangle(0, 0, this.scene.game.config.width, this.scene.game.config.height),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains
        }

        this.setInteractive(interactiveConfig);

        this.backgroundInitial();

        // this.content = new Phaser.GameObjects.Container(this.scene, 0, 0);

        // this.controll = new Phaser.GameObjects.Container(this.scene, 0, 200);
        this.scene.children.add(this);
        this.add(this.screenCover);
        this.add(this.container);
        this.container.add(this.background);

        this.addButton();
    }

    backgroundInitial() {
        this.screenCover = drawScreenCover(this.scene);
        this.background = drawModalBackground(this.scene, this.config.height + controllHeight);
    }

    open() {
        this.setActive(true);
        this.setVisible(true);
    }

    close() {
        this.setActive(false);
        this.setVisible(false);
    }

    addButton(buttons = [{}, {}, {}]) {

        const startButtonConfig = { //TODO: fix button origin
            handleClick: () => {
                this.close();
            },
            width: 80,
            height: 40,
            type: 'text',
            center: true,
            parent: this,
            depth: 1100
        }

        switch(buttons.length) {
            case 1: {
                let button = new Button(this.scene, this.container.x + this.W/2,this.container.y + this.H - 40, startButtonConfig);
            } break;

            case 2: {
                let button = new Button(this.scene, this.container.x + this.W/3,this.container.y + this.H - 40, startButtonConfig);
                let button2 = new Button(this.scene, this.container.x + this.W/3 * 2,this.container.y + this.H - 40, startButtonConfig);
            } break;

            case 3: {
                let button = new Button(this.scene, this.container.x + this.W/4,this.container.y + this.H - 40, startButtonConfig);
                let button2 = new Button(this.scene, this.container.x + this.W/4 * 2,this.container.y + this.H - 40, startButtonConfig);
                let button3 = new Button(this.scene, this.container.x + this.W/4 * 3,this.container.y + this.H - 40, startButtonConfig);
            } break;
        }
    }
}

export default BaseModal;