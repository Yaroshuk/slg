import BaseInteractiveUI from './BaseInteractiveUI';
import BaseInteractiveObject from './BaseInteractiveObject';
import {drawButton, drawButtonOver, drawButtonDown} from '../utils/graphics';

const defaultConfig = {
    handleClick: () => {},
    width: 100,
    height: 70,
    color: 'green',
    type: 'text',
    text: '',
    parent: 'scene',
    center: false,
    icon: {
        func: () => {},
        width: 25,
        height: 25,
        color: 0xffffff
    }
}

class Button extends BaseInteractiveUI {
    constructor(scene, x, y, config) {    
        super(scene, x, y, Object.assign({}, defaultConfig, config));

        this.graph;
        this.text;

        this.backNormal;
        this.backOver;
        this.backDown;

        this.backArray;
    }

    create() {
        super.create();

        const interactiveConfig = {
            hitArea: new Phaser.Geom.Rectangle(0, 0, this.config.width, this.config.height + (this.config.isoHeight || this.config.height * 0.3)),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains, 
            useHandCursor: true
        }

        this.addInteractive(interactiveConfig);

        this.backgroundInitial();
    }

    drawWithIcon(drawFunction, iconFunction) {
        const result = drawFunction(this.scene, this.config.width, this.config.height, this.config.color); 

        const icon = this.config.icon;

        console.log(icon);

        return iconFunction(result, this.config.width, this.config.height, icon.width, icon.height, icon.color, this.config.color);
    }

    backgroundInitial() {
        if (this.config.type === 'text') {

            this.backNormal = drawButton(this.scene, this.config.width, this.config.height, this.config.color);
            this.backOver = drawButtonOver(this.scene, this.config.width, this.config.height, this.config.color);
            this.backDown = drawButtonDown(this.scene, this.config.width, this.config.height, this.config.color);
            this.text = new Phaser.GameObjects.Text(this.scene, this.x, this.y, this.config.text, {fontFamily: 'sans-serif', fontSize: '24px'});    
        
        } else if (this.config.type === 'icon') {

            this.backNormal = this.drawWithIcon(drawButton, this.config.icon.func);
            this.backOver = this.drawWithIcon(drawButtonOver, this.config.icon.func);
            this.backDown = this.drawWithIcon(drawButtonDown, this.config.icon.func);   
       
        }

        this.backArray = [];

        this.backArray.push(this.backNormal);
        this.backArray.push(this.backOver);
        this.backArray.push(this.backDown);


        this.centerText();

        this.backArray.forEach(back => {
            this.add(back);
        });

        this.setVisibleBackground();

        if (this.config.type === 'text') {
            this.add(this.text);  
        }
    }

    setVisibleBackground(indx = 0) {
        this.backArray.forEach((elem, index) => {
            if (index === indx) {
                elem.setVisible(true);
            } else {
                elem.setVisible(false);
            }
        })
    }

    centerText() {
        if (this.config.type !== 'text') return;

        this.text.x = this.config.width/2 - this.text.width/2;
        this.text.y = this.config.height/2 - this.text.height/2;
    }

    handleOver() { //TODO: fix event system 
        this.setVisibleBackground(1);

        this.y = this.YY + 3;
    }

    handleOut() {
        this.setVisibleBackground(0);

        this.y = this.YY;
    }

    handleUp() {
        this.setVisibleBackground(1);

        this.centerText();
        this.y = this.YY + 3;
    }

    handleDown() {
        this.setVisibleBackground(2);

        this.centerText();
        this.y = this.YY + this.config.height * 0.3;
    }
}

export default Button;