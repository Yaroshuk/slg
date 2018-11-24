class BaseIsoScene extends Phaser.Scene {
    constructor(props) {
        super(props);
    }

    update() {
        this.children.list.forEach((elem) => {
            if (elem.staticDepth) {
                return elem.depth = elem.staticDepth;
            }
            elem.depth = elem.y;
        });
    }
}

export default BaseIsoScene;