class BaseIsoScene extends Phaser.Scene {
    constructor(props) {
        super(props);
    }

    update() {
        this.children.list.forEach((elem) => {
            elem.depth = parseFloat(`${1}.${elem.y}`);
        });
    }
}

export default BaseIsoScene;