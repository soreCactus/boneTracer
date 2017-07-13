var capture;
var img;
var pixelsLength;
var x = 0;
var stepSize = 10; 

function setup() {
    createCanvas(1200, 640);
    capture = createCapture(VIDEO);
    capture.size(1200, 640);
    capture.hide();
    //frameRate(0.1);
}

function draw() {
    image(capture, 0, 0, width, width*capture.height/capture.width);
    capture.loadPixels();
    pixelsLength = capture.pixels.length;
    console.log(pixelsLength);
    for (var y = 0;y < capture.height;y+= stepSize) {
        for (var x = 0; x < capture.width;x+= stepSize) {
            var index = (x + y * capture.width)*4;
            if (capture.pixels[index] > 230) {
                console.log("found color");
                noStroke();
                fill("orange");
                ellipse(x,y,8);
            }
        }
    }
        

}