
/**
Noémie and Katt
Screens in space
Plants in the greenhouse :)


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

 let backgroundColor = 0;

 let plant = [];

function preload() {
  soundFormats('mp3', 'ogg');
  plant.push(loadSound('assets/sounds/Salli1.mp3'));
  plant.push(loadSound('assets/sounds/salli2.mp3'));
  plant.push(loadSound('assets/sounds/Salli3.mp3'));
  plant.push(loadSound('assets/sounds/kendranavi.mp3'));
  plant.push(loadSound('assets/sounds/kendraforgot.mp3'));
  plant.push(loadSound('assets/sounds/kendradeep.mp3'));
  plant.push(loadSound('assets/sounds/justinweather.mp3'));
  plant.push(loadSound('assets/sounds/justinqueen.mp3'));
  plant.push(loadSound('assets/sounds/justineach.mp3'));
  plant.push(loadSound('assets/sounds/joeyhey.mp3'));
  plant.push(loadSound('assets/sounds/joeyexplosive.mp3'));
  plant.push(loadSound("assets/sounds/joeybee.mp3"));
  plant.push(loadSound("assets/sounds/Ivy1.mp3"));
  plant.push(loadSound("assets/sounds/Ivy2.mp3"));
  plant.push(loadSound("assets/sounds/Ivy3.mp3"));
  plant.push(loadSound("assets/sounds/Ivy4.mp3"));
  plant.push(loadSound("assets/sounds/AprilHelp.mp3"));
  plant.push(loadSound("assets/sounds/AprilHelp1.mp3"));
  plant.push(loadSound("assets/sounds/AprilHelp2.mp3"));
  //plant.push(loadSound("assets/sounds/Mathewstopactually.mp3"));
  //plant.push(loadSound("assets/sounds/mathewsometimes.mp3"));
  //plant.push(loadSound("assets/sounds/mathewif.mp3"));
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
  background(205,100,90);

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
  let vol     = mic.getLevel();  // Get the overall volume (between 0 and 1.0)
  // Map the range of each volume with your desired numbers
  var mapBass     = map(bass, 0, 255, -100, 100 );
  var mapMid      = map(mid, 0, 255, -150, 150 );
  var mapTreble   = map(treble, 0, 255, -200, 200 );
  let ambiantSound = map(vol, 0, 1, 100, 500); //transforms the volume into usable data


  // Define in how many pieces you want to divide the circle
  var pieces = 32;
  // Circle's radius
  var radius = 100;
  var radius2 = 400;

  push();
  // Move the origin to the center of the canvas
  translate( width/2, height/2 );
  // The centered circle reacting to the ambiant sound
  strokeWeight(0);
  fill(255,255,0);
  ellipse(0, 0, ambiantSound);

  //These for loops take a shape (line) and copies it "pieces" times around the middle point.
  for( i = 0; i < pieces; i++ ) {
     rotate( TWO_PI / pieces );
     // Draw the bass lines of the plant sounds
     strokeWeight(10);
     stroke(255,255,0);//color
     line(mapBass, radius*2, 0, radius);
     stroke(255,255,0);
    line(-mapBass, radius*2, 0, radius);
  }
  for( j = 0; j < pieces*2; j++ ) {
      rotate( PI / pieces*2 );
      // Draw the bass lines of the plant sounds
      strokeWeight(10);
      stroke(255,200,0);//color
      line(mapBass, radius2*4, 0, radius);
      stroke(255,200,0);
     line(-mapBass, radius2*4, 200, 0);
  }
  for( j = 0; j < pieces*2; j++ ) {
    rotate( HALF_PI / pieces*100 );
    rotate(turnAround);
    // Draw the big contour reacting to the ambiant sound
    strokeWeight(20);
    stroke(255,200,100);//color
    line(-ambiantSound, 400, 500, 600);
    turnAround = turnAround + 0.000001; //double rotation! Happy little accident :)
  }
  pop();
  //adding text
  fill(255);
  textAlign(CENTER,CENTER);
  textFont("helvetica",30);
  //text("Link the plants to the sun!", (width/2), (height-50));
}

//checks if there's a sound playing
function checkSound(){
  for (let i = 0 ; i<plant.length ; i++){
    if (plant[i].isPlaying()){
      //print(i); //tells us what sound is playing
      return false;
    }
  }
}

//plays the sounds
function keyPressed(){
    if (checkSound() == false){
      print("Stop")
    } else{
      if (keyCode == 87) {  //plant one = W ----> Keycode 87
        plant[int(random(0,2))].play();
      }
      if (keyCode == 65) {  //plant two = A ----> Keycode 65
        plant[int(random(3,5))].play();
      }
      if (keyCode == 83) {  //plant three = S ----> Keycode 83
        plant[int(random(6,8))].play();
      }
      if (keyCode == 68) {  //plant four = D ----> Keycode 68
        plant[int(random(9,11))].play();
      }
      if (keyCode == 70) {  //plant five = F ----> Keycode 70
        plant[int(random(12,15))].play();
      }
      if (keyCode == 71) {  //plant six = G ----> Keycode 71
        plant[int(random(16,18))].play();
      }
      print("touchy touchy")
    }
}
