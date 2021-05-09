
let worldmap;
let gridSize = 14;
let shiftX = 0, shiftY = 0, shiftZ = 0;
let noiseScaleX = 0.015, noiseScaleY = 0.015;

function preload() {
    worldmap = loadImage('assets/worldmap.png');
    //worldmap = loadImage('assets/czechmap.png');
    //worldmap = loadImage('assets/anonym.png');
    //worldmap = loadImage('assets/me.png');
    //worldmap = loadImage('assets/arduino.png');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    frameRate(30);
}

function draw() {
    background('#121212');

    /* moving shifts for rectangles and noise Z */
    shiftX += 0.3;
    shiftY += 0.3;
    shiftZ += 0.08;

    /* Automatic width and height for placement to the middle and not offscreen */
    var mappingWidth, mappingHeight;

    //if (innerWidth/innerHeight > worldmap.width/worldmap.height) {
    if (innerWidth/innerHeight > 1) {
        translate(worldmap.width/2 * innerHeight/innerWidth * worldmap.height/worldmap.width,  0);
        mappingWidth = worldmap.height * innerWidth/innerHeight;
        mappingHeight = worldmap.height;
    } else {
        translate(0,  worldmap.height/2 * innerHeight/innerWidth * worldmap.height/worldmap.width);
        mappingWidth = worldmap.width;
        mappingHeight = worldmap.width * innerHeight/innerWidth;
    }

    stroke('#121212');
    strokeWeight(2);
    rectMode(CENTER);

    for (let y = innerHeight-gridSize + shiftY%gridSize -1; y >= 0; y -= gridSize) {
        for (let x = innerWidth-gridSize + shiftX%gridSize -1; x >= 0; x -= gridSize) {
            
            var imgX = map(x, 0, innerWidth, 0, mappingWidth);
            var imgY = map(y, 0, innerHeight, 0, mappingHeight); // worldmap.width * innerHeight/innerWidth

            if (imgX > worldmap.width || imgY > worldmap.height) continue;
            
            var pixel = worldmap.get(imgX, imgY);

            if (pixel[0] < 127) {
                fill(noise(x * noiseScaleX, y * noiseScaleY, shiftZ)*60 + 24); // 
                ellipse(x, y, gridSize, gridSize);
            }
        }
    }

    /*
    tint(255, 127);
    image(worldmap, 0, 0, innerWidth, innerHeight);
    */
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}