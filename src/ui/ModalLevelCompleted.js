import BaseModal from './Modal'; //TODO: Modal to BaseModal
import {drawIconTriangle, drawIconRest, drawIconMenu} from '../utils/graphics';

class ModalLevelCompleted extends BaseModal {
    constructor(scene) {
        super(scene, {name: 'Level completed'});
    }

    create() {
        super.create();

        const buttonsConfig = [
            {
                handleClick: () => {
                    console.log('Menu')
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
                    console.log('Rest')
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
                    console.log('Next')
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