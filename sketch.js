let mic;
let rand;
let rgb = ["#800000","#8B0000","#A52A2A" ,"#B22222","#9ACD32","#556B2F","#2E8B57" ]

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
  rand = random(rgb)
}

function draw() {
  background(220);
  getAudioContext().resume();
  let vol = mic.getLevel()
 
  let spectrum = fft.analyze();
  noStroke();
  fill(rand);
  //  for (let j = 0; j< spectrum.length; j++){
  //   let a = map(j, 0, spectrum.length, 0, width);
  //   let b = -height +20 + map(spectrum[j], 0, 255, height, 0);
  //   rect(a, height, width / spectrum.length, b )
  // }
  translate(windowWidth/2,windowHeight/2);
  beginShape();
  for(var i=0 ; i<spectrum.length;i++)
    {
       let amp = spectrum[i];
       let angle = map(i,0, spectrum.length, 0, 30);
       let radius = map(amp,0,256,20,200)
       let x = radius*cos(angle)
       let y = radius*sin(angle)
       vertex(x,y)
    }
  endShape(CLOSE);
 
}