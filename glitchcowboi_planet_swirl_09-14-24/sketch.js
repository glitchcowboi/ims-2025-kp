function setup() {
  createCanvas(750, 500, WEBGL);
  angleMode(DEGREES);
  rotate
}

function draw() {
  background(0);
  
  //star generate
  for (let i=0; i<30;i++){
  fill(255);
  circle(random(width),random(height),5);
  
  //sphere
  //push();
  normalMaterial();
  translate(-75, 40, 0);
  rotateWithFrameCount();
  sphere(60);
  //pop();
  }
}

function rotateWithFrameCount() {
  rotateX(frameCount);
  rotateZ(frameCount);
}