var capture;
var img;
var pixelsLength; // length of the pixels array
var stepSize = 4; // every stepSize pixels gets checked to see if it's...
var cutoff = 230; //...over the cutoff
var xOfPoints;
var yOfPoints;
var avex;
var avey;
var lastPointx;//for drawing
var lastPointy;
var lookAreax;
var lookAreay;
var lookAreaSize = 40;
var isDrawing = false;

function setup() {
    console.log("Hay");
    createCanvas(windowWidth, windowHeight);
    drawing = createGraphics(width, height);
    ui = createGraphics(width, height);
    lookAreax = width / 2;
    lookAreay = height /2;
    //drawing.background(100);
    capture = createCapture(VIDEO);
    capture.size(width, height);
    capture.hide();
    frameRate(90);
    findStylus();
}

function draw() {
    xOfPoints = [];
    yOfPoints = [];
    avex = 0;
    avey = 0;
    
    image(capture, 0, 0, width, height);
    capture.loadPixels();
    pixelsLength = capture.pixels.length;
    //console.log(pixelsLength);
    noStroke();
    fill("orange");
    for (var y = lookAreay;y < lookAreay + lookAreaSize;y+= stepSize) {
        for (var x = lookAreax; x < lookAreax + lookAreaSize;x+= stepSize) {
            var index = (x + y * capture.width)*4;
            if (capture.pixels[index] > cutoff) {
                //console.log("found color");
                xOfPoints.push(x);
                yOfPoints.push(y);
                ellipse(x,y,8);
            }
        }
    }
    
    if (xOfPoints.length > 0) {
        for (var i = 0;i < xOfPoints.length;i++)  {
            avex += xOfPoints[i];
        }  
        avex = avex / xOfPoints.length;
        for (var i = 0;i < yOfPoints.length;i++) {
            avey += yOfPoints[i];
        } 
        avey = avey / yOfPoints.length;
        fill("purple");
        ellipse(avex,avey,12);
    }
    
    if (keyIsDown(32)) {
        drawing.noStroke();
        drawing.fill("yellow");
        drawing.ellipse(avex,avey,1);
        if (isDrawing) {
            drawing.stroke("yellow");
            drawing.line(lastPointx,lastPointy,avex,avey);
        }
        isDrawing = true;
        lastPointx = avex;
        lastPointy = avey;
    }
    image(ui,0,0);
    findStylus();
    image(drawing,0,0);
    if (avex != 0 && avey != 0) {
        lookAreax = Math.floor(avex - 20);
        lookAreay = Math.floor(avey - 20);
        
    }
//    console.log("xOfPoints: " + xOfPoints);
//    console.log("avex: " + avex);
//    console.log("lookAreaX: " + lookAreax);
    
}

function findStylus() {
    ui.noFill();
    ui.stroke("red");
    ui.rect(lookAreax,lookAreay,40,40);
}

function keyReleased() {
    if (keyCode == 32) {
        isDrawing = false;
    }
}

function keyPressed() {
    if (keyCode == 16) {
        drawing.background(0,0);
    }
}