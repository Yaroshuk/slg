import {drawModalBackground, drawScreenCover} from '../utils/graphics';
import Button from './Button';

const defaultConfig = {
    startState: 'close',
    height: 150,
    color: 'green',
    name: ''
}

const headerHeight = 50;
const controllHeight = 100;

class BaseModal extends Phaser.GameObjects.Container {
    constructor(scene, config) {    
        super(scene);

        this.config = Object.assign({}, defaultConfig, config);
        
        this.YY = 80;
        this.XX = 30;

        this.H = this.config.height + controllHeight + headerHeight;
        this.W = scene.game.config.width - 60;

        this.text;
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
        this.container.add(this.text);

        if (this.config.startState === 'close') {
            this.close();
        }
    }

    backgroundInitial() {
        this.screenCover = drawScreenCover(this.scene);
        this.background = drawModalBackground(this.scene, this.H, this.config.name ? headerHeight : 0);
        this.text = new Phaser.GameObjects.Text(this.scene, this.x, this.y, this.config.name, {fontFamily: 'sans-serif', fontSize: '30px', color: '#000'});
        this.text.y = headerHeight/2 - 15;
        this.text.x = this.W/2 - this.text.width/2;
    }

    open() {
        this.setActive(true);
        this.setVisible(true);
    }

    close() {
        this.setActive(false);
        this.setVisible(false);
    }

    addButton(buttons = [{}, {}, {}, {}, {}]) {

        if (!buttons || !buttons.length) return;

        let length = buttons.length > 3 
                                    ? 3
                                    : buttons.length;

        const defaultConfig = { //TODO: fix button origin
            handleClick: () => {
                console.log('Click')
            },
            width: 90,
            height: 50,
            type: 'text',
            center: true,
            parent: this
        }

        let YY = this.container.y + this.H - 60;

        for(let i = 0, max = length; i<max; i++) {

            let XX = this.container.x + this.W/(length+1) * (i+1);

            new Button(this.scene, XX, YY, Object.assign({}, defaultConfig, buttons[i]));
        }
    }
}

export default BaseModal;