import PlayerControl from './PlayerControl';

class PlayerController {
    constructor(player) {
        this.player = player;

        this.scene = player.scene;

        this.cntrls = [];
        this.top;
        this.right;
        this.bottom;
        this.left;

        this.create();
    }

    create() {
        this.cntrls.push(this.top = new PlayerControl(this.player.scene, 0, 0));
        this.cntrls.push(this.right = new PlayerControl(this.player.scene, 0, 0));
        this.cntrls.push(this.bottom = new PlayerControl(this.player.scene, 0, 0));
        this.cntrls.push(this.left = new PlayerControl(this.player.scene, 0, 0));

        this.cntrls.forEach(elem => {
            this.scene.children.add(elem);
        })
    }

    activate() {
        const plX = this.player.XX;
        const plY = this.player.YY;
        console.log(this.scene.grid.isEmptyCell(1, 3));
        
        if (this.scene.grid.isEmptyCell(plX - 1, plY)) {
            this.top.activate(this.player.x - 50, this.player.y);
        }

        if (this.scene.grid.isEmptyCell(plX, plY + 1)) {
            this.left.activate(this.player.x, this.player.y + 50);
        }

        if (this.scene.grid.isEmptyCell(plX + 1, plY)) {
            this.bottom.activate(this.player.x + 50, this.player.y);
        }

        if (this.scene.grid.isEmptyCell(plX, plY - 1)) {
            this.right.activate(this.player.x, this.player.y - 50);
        }
    }

    deactivate() {
        this.cntrls.forEach(elem => {
            elem.deactivate();
        })
    }
}

export default PlayerController;