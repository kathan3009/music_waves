let mic;
let rand;
let rgb = ["#800000", "#8B0000", "#A52A2A", "#B22222", "#9ACD32", "#556B2F", "#2E8B57"]
let spectrum;
let randWave;
let waveform;
let yoff = 0.0;
let xoff = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.6, 512);  // 512 frequency  0.7 smoothing
  fft.setInput(mic);
  rand = random(rgb);
  randWave = int(random(0, 3));
}

function draw() {
  background(220);
  getAudioContext().resume();
  let vol = mic.getLevel()
  spectrum = fft.analyze();
  waveform = fft.waveform();
  noStroke();
  fill(rand);
  switch (randWave) {
    case 0:
      wave1()
      break;
    case 1:
      wave2()
      break;
    case 2:
      wave3()
      break;
    case 3:
      wave4()
      break;
    default:
  }

}
function wave1() {
  for (let j = 0; j < spectrum.length; j++) {
    let a = map(j, 0, spectrum.length, 0, width);
    let b = -height + map(spectrum[j], 0, 255, height, 0);
    rect(a, height, width / spectrum.length, b)
  }

}
function wave2() {

  translate(windowWidth / 2, windowHeight / 2);
  beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let angle = map(i, 0, spectrum.length, 0, 30);
    let radius = map(amp, 0, 512, 20, 300)
    let x = radius * cos(angle)
    let y = radius * sin(angle)
    vertex(x, y)
  }
  endShape(CLOSE);
}
function wave3() {
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    
      let x = map(i, 0, waveform.length, 0, width);
      let y = map(waveform[i]*0.6, -1, 1, 0, height); 
      vertex(x, y);
  
  }
  endShape();
}
function wave4() {

  beginShape();
  for (let i = 0; i < width; i+=10) {
    console.log('err')
    let y= map(noise(xoff, yoff), 0, 1, 200, 300);
    vertex(i,y)
    xoff+=0.0005
  }
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape();
} 