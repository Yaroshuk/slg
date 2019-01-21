export const textures = {
    wallBlock: 'wallBlock',
    finishBlock: 'finishBlock', 
    playerBlock: 'playerBlock',
    playerControl: 'playerControl'
}

const colors = {
    'greenIso': 0x1cba76,
    'green': 0x27f69d,
    'blue': 0x21c6c1,
    'blueIso': 0x27e9f6
}

export const drawIconTriangle = (graph, width, height, iWidth, iHeight, color = 0xffffff) => {
    graph.fillStyle(color);
    graph.fillTriangle(width/2 - iWidth/2, height/2 - iHeight/2, width/2 + iWidth/2, height/2, width/2 - iWidth/2, height/2 + iHeight/2); //TODO: fix

    return graph;
}

export const drawIconRest = (graph, width, height, iWidth, iHeight, color = 0xffffff, baseColor) => { //TODO: fix triangle icon
    const weight = iHeight/2 - iHeight/3;
    const triangleSide = iHeight/2 - weight/2;
    
    graph.fillStyle(color);
    graph.fillCircle(width/2, height/2, iWidth/2); //TODO: fix
    graph.fillStyle(colors[baseColor]);
    graph.fillCircle(width/2, height/2, iWidth/3); //TODO: fix
    // graph.fillStyle(color);
    // graph.fillTriangle(width/2, height/2 - weight, width/2 + triangleSide * 2, height/2 - weight, width/2 + triangleSide, height/2 + triangleSide - weight);

    return graph;
}

export const drawIconMenu = (graph, width, height, iWidth, iHeight, color = 0xffffff, baseColor) => {
    
    const lineHeight = iHeight/5;

    graph.fillStyle(color);
    graph.fillRect(width/2 - iWidth/2, height/2 - iHeight/2, iWidth, iHeight); //TODO: fix
    graph.fillStyle(colors[baseColor]);
    graph.fillRect(width/2 - iWidth/2, height/2 - lineHeight * 1.5, iWidth, lineHeight);
    graph.fillRect(width/2 - iWidth/2, height/2 + lineHeight/2, iWidth, lineHeight);

    return graph;
}

export const drawScreenCover = (scene) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    graph.clear();
    graph.fillStyle(0xffffff, 0.5);
    graph.lineStyle(0, 0xffffff);
    graph.fillRect(0, 0, scene.game.config.width, scene.game.config.height);

    return graph;
}

export const drawModalBackground = (scene, height, headerHeight = null) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    const width = scene.game.config.width - 60;

    graph.clear();
    graph.fillStyle(0xeeeeee);
    graph.lineStyle(2, 0x000000);
    graph.fillRoundedRect(0, 0, width, height, 10);
    graph.strokeRoundedRect(1, 1,width - 2,height - 2, 10);

    if (headerHeight) {
        graph.lineBetween(20, headerHeight, width-20, headerHeight);
    }

    return graph;
}

export const drawButton = (scene, width, height, color) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    let isoHeight = height * 0.3; //TODO: refactor

    let trianWidth = width * 0.25;
    let trianHeight = height * 0.25; 

    graph.clear();
    graph.fillStyle(colors[color + 'Iso']);
    graph.lineStyle(2, 0xffffff);
    graph.fillRoundedRect(0, isoHeight, width, height, 10);
    graph.fillStyle(colors[color]);
    graph.fillRoundedRect(0, 0, width, height, 10);
    graph.strokeRoundedRect(1, 1, width - 2, height - 2, 10);

    return graph;
}

export const drawButtonOver = (scene, width, height, color) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    let isoHeight = height * 0.3 - 3; //TODO: refactor

    graph.clear();
    graph.fillStyle(colors[color + 'Iso']);
    graph.lineStyle(2, 0xffffff);
    graph.fillRoundedRect(0, isoHeight, width, height, 10);
    graph.fillStyle(colors[color]);
    graph.fillRoundedRect(0, 0, width, height, 10);
    graph.strokeRoundedRect(1, 1, width - 2, height - 2, 10);

    return graph;
}

export const drawButtonDown = (scene, width, height, color) => {
    const graph = new Phaser.GameObjects.Graphics(scene);

    let isoHeight = height * 0.3; //TODO: refactor

    graph.clear();
    graph.fillStyle(colors[color + 'Iso']);
    graph.lineStyle(2, 0xffffff);
    graph.fillStyle(colors[color]);
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