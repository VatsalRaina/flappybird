var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game', stateActions);
var score = -3;
var score_display;
var player1;
var pipes;
var pipe_interval;
var coin;
var coin_interval;

function score_increase(){
    score = score + 1;
    score_display.setText(score.toString());
}

function preload() {
    game.load.image("bossmanImg","assets/blob.png");
    game.load.image("coin","assets/coin_001.png");
    game.load.audio("themetune","assets/Saadda Haq.m4a");
    game.load.image("pipe","assets/grid.jpg");
    game.load.image("pipe_mint","assets/pipe_mint.png");
    game.load.image("pipe_blue","assets/pipe_blue.png");
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

    player1.body.velocity.y = -100
}

function moveDown() {
    player1.y = player1.y + 10
    player1.body.velocity.y = 100
}

function pipesynthesis(){
    var gap = game.rnd.integerInRange(1,2);
    for(var count = 0;count<4;count++) {
        if (count != gap) {
            add_pipe_block(800, 150 * count);
            score_increase();
        }
    }
}

function coinsynthesis(){
    game.physics.arcade.enable(coin);
    coin.body.velocity.x=-100;
}

function add_pipe_block(x,y){
    var pipe = pipes.create(x,y,"pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -100;
}

function create() {
    var back1= game.rnd.integerInRange(0,9);
    var back2= game.rnd.integerInRange(0,9);
    var back3= game.rnd.integerInRange(0,9);
    var back4= game.rnd.integerInRange(0,9);
    var back5= game.rnd.integerInRange(0,9);
    var back6= game.rnd.integerInRange(0,9);
    game.stage.setBackgroundColor("#"+back4+back2+back1+back3+back5+back6);
    game.add.text(65,250,"Qu'est que tu fais",
        {font:"100px Arial",fill:"#ABCDEF"});
    player1 = game.add.sprite(100,200,"bossmanImg");
    coin = game.add.sprite(700,back1*50,"coin");
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE).onDown.add(coinHandler);
    score_display = game.add.text(20,20,"0");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    pipes = game.add.group();
    pipesynthesis();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player1);
    player1.body.gravity.y = 200;
    pipe_interval = 2.75;
    game.time.events.loop(pipe_interval*Phaser.Timer.SECOND,pipesynthesis);
    coinsynthesis();
    coin_interval = 0.75;
    game.time.events.loop(coin_interval*Phaser.Timer.SECOND,coinsynthesis);
}

function game_over(){
    game.destroy();
}

function update() {
    game.physics.arcade.overlap(player1,pipes,game_over);
    game.physics.arcade.overlap(player1,coin,score_increase);

}