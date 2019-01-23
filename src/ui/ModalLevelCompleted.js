import BaseModal from './Modal'; //TODO: Modal to BaseModal
import {drawIconTriangle, drawIconRest, drawIconMenu} from '../utils/graphics';
import {isLastLevel} from '../utils/levels';

class ModalLevelCompleted extends BaseModal {
    constructor(scene) {
        super(scene, {name: 'Level completed'});
    }

    create() {
        super.create();

        const buttonsConfig = [
            {
                handleClick: () => {
                    this.close();
                    this.scene.scene.start('StartMenu');
                },
                type: 'icon', 
                icon: {
                    func: drawIconMenu,
                    width: 30,
                    height: 30,
                    color: 0xffffff
                }
            },
            {
                handleClick: () => {
                    const {currentLevel} = this.scene;
                    this.close();
                    this.scene.scene.start('Level', {level: currentLevel});
                },
                type: 'icon', 
                icon: {
                    func: drawIconRest,
                    width: 30,
                    height: 30,
                    color: 0xffffff
                }
            },
            {
                handleClick: () => {
                    const {currentLevel} = this.scene;

                    this.close();
                    if (isLastLevel(currentLevel)) {
                        this.scene.scene.start('StartMenu');
                    } else {
                        this.scene.scene.start('Level', {level: currentLevel+1});
                    }
                },
                type: 'icon', 
                icon: {
                    func: drawIconTriangle,
                    width: 30,
                    height: 25,
                    color: 0xffffff
                }
            }
        ]

        this.addButton(buttonsConfig);
    }
}

export default ModalLevelCompleted;