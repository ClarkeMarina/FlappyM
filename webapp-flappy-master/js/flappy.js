// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = -2;
var player;
var pipes = [];
var gapMargin = 20;
var blockHeight = 50;
var height = 400
var width =800;
var gapSize = 100;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("playerImg", "../assets/flappy.png");

  game.load.image("pipeBlock", "../assets/pipe_red.png");
  game.load.image("star","../assets/star.png");

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {



  game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of tcene
  game.stage.setBackgroundColor("#000000");

  var backgroundVelocity = 50;
  var backgroundSprite = game.add.tileSprite(600,600,width,height,"star");
  backgroundSprite.autoScroll(-backgroundVelocity,0);

  labelScore = game.add.text(20, 20, "0", {fill: "red"});

  player = game.add.sprite(20,50, "playerImg");
  game.physics.arcade.enable(player);
  player.body.gravity.y = 300;

  generatePipe();

  game.input
   .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
   .onDown.add(playerJump2);

 game.input
  .keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);

  game.input
   .keyboard.addKey(Phaser.Keyboard.RIGHT)
   .onDown.add(moveRight);


  game.input
    .keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);


  game.input
    .keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    var pipeInterval = 2.00 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval, generatePipe);

}
function spaceHandler(){
  score = score + 1;
  game.add.text(0, 0, score.toString())
  game.sound.play("score");
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(player, pipes, gameOver);
  if(player.body.y<0 || player.body.y>400){
    gameOver();
  }
}

function spaceHandler() {
  changeScore();
 game.sound.play("score");
}

 function changeScore() {
  score = score + 1;
  labelScore.setText(score.toString());
 }
function moveRight(){
player.x = player.x + 35;
}
function moveUp(){
  player.y = player.y - 35;
}

function moveDown(){
  player.y = player.y + 35;
}

function moveLeft(){
  player.x = player.x - 35;
}
function generatePipe(){
  var gapStart = game.rnd.integerInRange(1, 5);
  for(var count=0; count < 8; count = count + 1){
    if(count != gapStart && count != gapStart +1){
    // game.add.sprite(200, count * 50, "pipeBlock");
      addPipeBlock(750, count * 50);
    }
  }
  changeScore();

}

function addPipeBlock(x, y) {
   var pipeBlock = game.add.sprite(x,y,"pipeBlock");
   pipes.push(pipeBlock);
   game.physics.arcade.enable(pipeBlock);
   pipeBlock.body.velocity.x = -200;
}

function playerJump2(){
  player.body.velocity.y = -145;
}

function playerJump() {
  game.sound.play("score");
  game.add.sprite(event.x, event.y, "playerImg");
}

function changeGravity(g) {
 gameGravity += g;
 player.body.gravity.y = gameGravity;
}

function gameOver(){
  registerScore(score);
  game.state.restart();
  score = 0;
  gameGravity = 200;

}

function generatePipe(){
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);
  for(var y = gapStart ; y > 0; y-=blockHeight){
    addPipeBlock(width,y-blockHeight);
  }
  for(var y = gapStart + gapSize;y<height;y+=blockHeight){
    addPipeBlock(width,y);
  }
  changeScore();
}
