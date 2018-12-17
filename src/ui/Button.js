import UI from './UI';
import {drawButton, drawButtonOver, drawButtonDown} from '../utils/graphics';

const defaultConfig = {
    habdleClick: () => {},
    width: 100,
    height: 70,
    color: 'green',
    text: 'Button'
}

class Button extends UI {
    constructor(scene, x, y, config) {    
        super(scene, x, y, Object.assign({}, defaultConfig, config));

        this.YY = y;

        this.graph;
        this.text;
    }

    create() {
        super.create();

        const interactiveConfig = {
            hitArea: new Phaser.Geom.Rectangle(0, 0, this.config.width, this.config.height + (this.config.isoHeight || this.config.height * 0.3)),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
            useHandCursor: true
        }

        this.addInteractive(interactiveConfig);

        this.graph = new Phaser.GameObjects.Graphics(this.scene);
        this.text = new Phaser.GameObjects.Text(this.scene, this.x, this.y, this.config.text, {fontFamily: 'sans-serif', fontSize: '24px'});

        this.centerText();

        drawButton(this.graph, this.config.width, this.config.height, this.config.color);

        this.add(this.graph);
        this.add(this.text);
    }

    centerText() {
        this.text.x = this.config.width/2 - this.text.width/2;
        this.text.y = this.config.height/2 - this.text.height/2;
    }

    handleOver() {
        drawButtonOver(this.graph, this.config.width, this.config.height, this.config.color);
        this.y = this.YY + 3;
    }

    handleOut() {
        drawButton(this.graph, this.config.width, this.config.height, this.config.color);
        this.y = this.YY;
    }

    handleUp() {
        drawButtonOver(this.graph, this.config.width, this.config.height, this.config.color);
        this.centerText();
        this.y = this.YY + 3;
    }

    handleDown() {
        drawButtonDown(this.graph, this.config.width, this.config.height, this.config.color);
        this.centerText();
        this.y = this.YY + this.config.height * 0.3;
    }
}

export default Button;