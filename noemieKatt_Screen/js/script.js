
/**
Noémie and Katt
Getting in tuch with nature


CART 253, Automne 2022
Main tutorial and source of inspiration:
https://tympanus.net/codrops/2018/03/06/creative-audio-visualizers/
*/



// Initiate the FFT object
  var fft = new p5.FFT();
  // Get the volumes of different frequency ranges
  // Get different values for different frequency ranges
  // -----------------------------------------------------
  // p5.sound comes with predefined keywords,
  // but giving getEnergy() 2 numbers instead of a keyword
  // you could use your custom range if needed
  var bass;
  var mid;
  var treble;
  // Map the range of each volume with your desired numbers
 var mapBass;
 var mapMid;
 var mapTreble;

 var turnAround = 0;

 let plant = [];

function preload() {
  soundFormats('mp3', 'ogg');
  plant.push(loadSound('assets/sounds/1'));
  plant.push(loadSound('assets/sounds/2'));
  //plant.push(loadSound('assets/sounds/3'));
  plant.push(loadSound('assets/sounds/4'));
  plant.push(loadSound('assets/sounds/bark'));
  plant.push(loadSound('assets/sounds/hello'));
 }

function setup() {
  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  createCanvas(windowWidth, windowHeight);
  background(210,100,90);
  // Run the analysis, while the audio is playing
  fft.analyze(plant);
  // Get different values for different frequency ranges
  // -----------------------------------------------------
  // p5.sound comes with predefined keywords,
  // but giving getEnergy() 2 numbers instead of a keyword
  // you could use your custom range if needed
  var bass    = fft.getEnergy( "bass" );
  var treble  = fft.getEnergy( "treble" );
  var mid     = fft.getEnergy( "mid" );
  var custom  = fft.getEnergy( 100, 200 );
  // Map the range of each volume with your desired numbers
  var mapBass     = map(bass, 0, 255, -100, 100 );
  var mapMid      = map(mid, 0, 255, -150, 150 );
  var mapTreble   = map(treble, 0, 255, -200, 200 );

  // Get the overall volume (between 0 and 1.0)
  let vol = mic.getLevel();
  let ambiantSound = map(vol, 0, 1, 100, 500);

  // Define in how many pieces you want to divide the circle
  var pieces = 32;
  // Circle's radius
  var radius = 100;
  var radius2 = 400;
  // Move the origin to the center of the canvas
  translate( width/2, height/2 );
  // The centered circle
  strokeWeight(0);
  fill(255,255,0);
  ellipse( 0, 0, ambiantSound );

  for( i = 0; i < pieces; i++ ) {
     rotate( TWO_PI / pieces );
     // Draw the bass lines
     strokeWeight(10);
     stroke(255,255,0);//color
     line(mapBass, radius*2, 0, radius);
     stroke(255,255,0);
    line(-mapBass, radius*2, 0, radius);
   }
   for( j = 0; j < pieces*2; j++ ) {
      rotate( PI / pieces*2 );
      // Draw the bass lines
      strokeWeight(10);
      stroke(255,200,0);//color
      line(mapBass, radius2*4, 0, radius);
      stroke(255,200,0);
     line(-mapBass, radius2*4, 200, 0);
    }

    for( j = 0; j < pieces*2; j++ ) { //big contour
      rotate( HALF_PI / pieces*100 );
      rotate(turnAround);
       // Draw the bass lines
       strokeWeight(20);
       stroke(255,200,100);//color
      line(-ambiantSound, 400, 500, 600);
      turnAround = turnAround + 0.000001;
     }
}

function keyPressed(){
  if (keyCode == 87) {  //plant one = W ----> Keycode 87
    plant[int(random(0,4))].play();
  }
  if (keyCode == 65) {  //plant two = A ----> Keycode 65
    plant[1].play();
  }
  if (keyCode == 83) {  //plant three = S ----> Keycode 83
    plant[2].play();
  }
  if (keyCode == 68) {  //plant four = D ----> Keycode 68
    plant[3].play();
  }
  if (keyCode == 70) {  //plant five = F ----> Keycode 70
    plant[4].play();
  }
  if (keyCode == 71) {  //plant six = G ----> Keycode 71
    plant[5].play();
  }

  print("touchy touchy")
}
