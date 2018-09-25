export const textures = {
    wallBlock: 'WallBlock',
    playerBlock: 'playerBlock',
    playerControl: 'playerControl'
}

//21c6c1

export default (scene) => {
    let graf;
    graf = new Phaser.GameObjects.Graphics(scene);
    graf.fillStyle(0x1cba76);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, 15, 50, 50, 10);
    graf.fillStyle(0x27f69d);
    graf.fillRoundedRect(0, 0, 50, 50, 10);
    graf.strokeRoundedRect(1, 1, 48, 48, 10);
    graf.generateTexture(textures.wallBlock, 50, 65);

    graf.fillStyle(0x21c6c1);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, 15, 50, 50, 10);
    graf.fillStyle(0x27e9f6);
    graf.fillRoundedRect(0, 0, 50, 50, 10);
    graf.strokeRoundedRect(1, 1, 48, 48, 10);
    graf.generateTexture(textures.playerBlock, 50, 65);

    graf.clear();
    graf.fillStyle(0x21c6c1, 0);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, 15, 50, 50, 10);
    graf.fillStyle(0x27e9f6);
    graf.fillRoundedRect(0, 0, 50, 50, 10);
    graf.strokeRoundedRect(1, 1, 48, 48, 10);
    graf.generateTexture(textures.playerControl, 50, 65);
}