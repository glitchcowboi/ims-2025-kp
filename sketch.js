/*
Things I changed: YouTube tutorials and code on pixels, made the stepSize aka change in pixel size reactive to brightness, added on-click option to make full screen.
Linked step size to url param but want to update it to color because I think that could be a better/more fun option.
I wanted to use ml5 facetracking but couldn't quite get it to 'talk' with the size change so went with my back up that will be an addition for a later date...
*/

let capture;
let defaultStepSize = 15; // auto step size if no url param is provided
let stepSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();

  // step size from url param
  const params = getURLParams();
  if (params.stepSize) {
    stepSize = int(params.stepSize);
  } else {
    stepSize = defaultStepSize; // use default if needed
  }
}

function draw() {
  background(220);
  capture.loadPixels();

  // calc av brightness
  let totalBrightness = 0;
  let count = 0;

  for (let i = 0; i < capture.pixels.length; i += 4 * stepSize) {
    let r = capture.pixels[i];
    let g = capture.pixels[i + 1];
    let b = capture.pixels[i + 2];
    let brightnessVal = (r + g + b) / 3;
    totalBrightness += brightnessVal;
    count++;
  }

  let avgBrightness = totalBrightness / count;

  // adjust step size based on brightness if no params given
  let dynamicStepSize = floor(map(avgBrightness, 50, 200, stepSize, stepSize / 2));
  dynamicStepSize = constrain(dynamicStepSize, stepSize / 2, stepSize * 2);

  // pixel vid
  for (let x = 0; x < capture.width; x += dynamicStepSize) {
    for (let y = 0; y < capture.height; y += dynamicStepSize) {
      let index = (y * capture.width + x) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      noStroke();
      fill(r, g, b);
      rectMode(CENTER);
      rect(x, y, dynamicStepSize, dynamicStepSize);
    }
  }
}

// canvas resize when window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth, windowHeight);
}

// fullscreen on mouse press
function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    fullscreen(!fullscreen());
  }
}