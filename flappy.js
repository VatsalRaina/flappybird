// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game', stateActions);
var score = 0;
var score_display;
var player1;
var player2;

function score_increase(){
    score = score + 10;
    score_display.setText(score.toString());
}

function preload() {
    game.load.image("bossmanImg","assets/blob.png");
    game.load.image("coin","assets/coin_001.png");
    game.load.audio("themetune","assets/Saadda Haq.m4a")
}

function clickHandler(event){
    game.add.sprite(event.x,event.y,"bossmanImg");
}

function spaceHandler() {
    game.sound.play("themetune");
}

function coinHandler() {
    game.add.sprite(200,300,"coin");
    game.add.sprite(600,300,"coin");
    game.add.sprite(460,300,"coin");
    game.add.sprite(100,300,"coin");
    game.add.sprite(10,300,"coin");
}

function moveRight() {
    player1.x = player1.x + 10
}

function moveLeft() {
    player1.x = player1.x - 10
}

function moveUp() {
    player1.y = player1.y - 50
}

function moveDown() {
    player1.y = player1.y + 10
}

function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#B777F3");
    game.add.text(65,250,"Qu'est que tu fais",
        {font:"100px Arial",fill:"#ABCDEF"});
    player1 = game.add.sprite(100,200,"bossmanImg");
    //game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE).onDown.add(coinHandler);
    score_display = game.add.text(20,20,"0")
    score_increase();
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}