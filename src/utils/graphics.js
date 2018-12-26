export const textures = {
    wallBlock: 'wallBlock',
    finishBlock: 'finishBlock', 
    playerBlock: 'playerBlock',
    playerControl: 'playerControl'
}

const colors = {
    'green': 0x1cba76,
    'greenIso': 0x27f69d,
    'blue': 0x21c6c1,
    'blueIso': 0x27e9f6
}

export const drawIconTriangle = (graph, width, height, iWidth, iHeight, color = 0xffffff) => {
    graph.fillStyle(color);
    graph.fillTriangle(width/2 - iWidth/2, height/2 - iHeight/2, width/2 + iWidth/2, height/2, width/2 - iWidth/2, height/2 + iHeight/2);

    return graph;
}

export const drawButton = (scene, width, height, color) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    let isoHeight = height * 0.3; //TODO: refactor

    let trianWidth = width * 0.25;
    let trianHeight = height * 0.25; 

    graph.clear();
    graph.fillStyle(colors[color]);
    graph.lineStyle(2, 0xffffff);
    graph.fillRoundedRect(0, isoHeight, width, height, 10);
    graph.fillStyle(colors[color + 'Iso']);
    graph.fillRoundedRect(0, 0, width, height, 10);
    graph.strokeRoundedRect(1, 1, width - 2, height - 2, 10);

    return graph;
}

export const drawButtonOver = (scene, width, height, color) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    let isoHeight = height * 0.3 - 3; //TODO: refactor

    graph.clear();
    graph.fillStyle(colors[color]);
    graph.lineStyle(2, 0xffffff);
    graph.fillRoundedRect(0, isoHeight, width, height, 10);
    graph.fillStyle(colors[color + 'Iso']);
    graph.fillRoundedRect(0, 0, width, height, 10);
    graph.strokeRoundedRect(1, 1, width - 2, height - 2, 10);

    return graph;
}

export const drawButtonDown = (scene, width, height, color) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    let isoHeight = height * 0.3; //TODO: refactor

    graph.clear();
    graph.fillStyle(colors[color]);
    graph.lineStyle(2, 0xffffff);
    graph.fillStyle(colors[color + 'Iso']);
    graph.fillRoundedRect(0, 0, width, height, 10);
    graph.strokeRoundedRect(1, 1, width - 2, height - 2, 10);

    return graph;
}
//21c6c1
export const getTextureName = (name, size) => {
    return `${name}-${size}`;
}

export default (scene, baseSize = 50, isoHeight = 15) => {
    let graf;
    graf = new Phaser.GameObjects.Graphics(scene);
    graf.fillStyle(0x1cba76);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, isoHeight, baseSize, baseSize, baseSize * 0.2);
    graf.fillStyle(0x27f69d);
    graf.fillRoundedRect(0, 0, baseSize, baseSize, baseSize * 0.2);
    graf.strokeRoundedRect(1, 1, baseSize - 2, baseSize - 2, baseSize * 0.2);
    graf.generateTexture(getTextureName(textures.wallBlock, baseSize), baseSize, baseSize + isoHeight);

    graf.fillStyle(0x21c6c1);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, isoHeight, baseSize, baseSize, baseSize * 0.2);
    graf.fillStyle(0x27e9f6);
    graf.fillRoundedRect(0, 0, baseSize, baseSize, baseSize * 0.2);
    graf.strokeRoundedRect(1, 1, baseSize - 2, baseSize - 2, baseSize * 0.2);
    graf.generateTexture(getTextureName(textures.playerBlock, baseSize), baseSize, baseSize + isoHeight);

    graf.clear();
    graf.fillStyle(0x21c6c1, 0);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, isoHeight, baseSize, baseSize, baseSize * 0.2);
    graf.fillStyle(0x27e9f6);
    graf.fillRoundedRect(0, 0, baseSize, baseSize, baseSize * 0.2);
    graf.strokeRoundedRect(1, 1, baseSize - 2, baseSize - 2, baseSize * 0.2);
    graf.generateTexture(getTextureName(textures.playerControl, baseSize), baseSize, baseSize + isoHeight);

    graf.clear();
    graf.fillStyle(0xcc9e38);
    graf.lineStyle(2, 0xffffff);
    graf.fillRoundedRect(0, isoHeight, baseSize, baseSize, baseSize * 0.2);
    graf.fillStyle(0xf1bc44);
    graf.fillRoundedRect(0, 0, baseSize, baseSize, baseSize * 0.2);
    graf.strokeRoundedRect(1, 1, baseSize - 2, baseSize - 2, baseSize * 0.2);
    graf.generateTexture(getTextureName(textures.finishBlock, baseSize), baseSize, baseSize + isoHeight);
}