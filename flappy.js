var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'game', stateActions);
var score = -4;
var score_temp = 0;
var score_temp_increment = 0;
var score_display;
var player1;
var player2;
var pipes;
var pipe_interval;
var coins;
var rockets;
var rocket_interval;
var coin_interval;
var phrase = 0;
var phraseText;
var speed = 100;
var death1 = 0;
var death2 = 0;

$.get("/score", function(scores){
    scores.sort(function (scoreA, scoreB){
        var difference = scoreB.score - scoreA.score;
        return difference;
    });
    for (var i = 0; i < 5; i++) {
        $("#scoreBoard").append(
            "<li>" +
            scores[i].name + ": " + scores[i].score +
            "</li>");
    }
});

/*jQuery("#greeting-form").on("submit",function(event_details){
    var greeting = "Hi";
    var name = jQuery("#fullName").val();
    var greeting_message = greeting + " " + name;
    jQuery("#greeting-form").fadeOut();
    jQuery("#greeting").append("<p>"+ greeting_message + "</p");
    jQuery("#greeting").append("<p>"+ "Your score is: " + score + "</p");
    //event_details.preventDefault();
});*/

function score_increase(){
    if(death1 == 0 && death2 ==0){
        score = score + 2;
    }
    else{
        score = score + 1;
    }

    if(score>-1){
        score_display.setText(score.toString());
    }
    else{
        score_display.setText(score_temp.toString());
    }
}

function coin_score_increase(){
    score = score + 2;
}

function preload() {
    game.load.image("bossmanImg","assets/Babyblob.png");
    game.load.image("bossmanImg2","assets/flappy_frog.png");
    game.load.image("coin","assets/coin_001.png");
    game.load.audio("themetune","assets/Saadda Haq.m4a");
    game.load.image("pipe","assets/grid.jpg");
    game.load.image("pipe_mint","assets/pipe_mint.png");
    game.load.image("pipe_blue","assets/pipe_blue.png");
    game.load.image("rocket","assets/rocket.png");

}

//function clickHandler(event){
    //game.add.sprite(event.x,event.y,"bossmanImg");
//}

function spaceHandler() {
    game.sound.play("themetune");
}

function moveRight() {
    player1.x = player1.x + 0;
}

function moveLeft() {
    player1.x = player1.x + 0;
}

function moveUp() {
    player1.body.velocity.y = -100;
}

function moveDown() {
    player1.body.velocity.y = 100;
}

function moveRight2() {
   player2.x = player2.x + 0;
}

function moveLeft2() {
    player2.x = player2.x + 0;
}

function moveUp2() {
    player2.body.velocity.y = -100;
}

function moveDown2() {
    player2.body.velocity.y = 100;
}

function pipesynthesis(){
    var gap = game.rnd.integerInRange(1,2);
    for(var count = 0;count<4;count++) {
        if (count != gap) {
            add_pipe_block(800, 150 * count);
        }
    }
    score_increase();
}

function coinsynthesis(){
    var vertical_height = game.rnd.integerInRange(100,400);
    add_coin(900,vertical_height);
}
function coin_over(player1, coin){
    coin.destroy();
}

function coin_over2(player2, coin){
    coin.destroy();
}

function rocket_over1(player1,rocket){
   rocket.destroy();
}

function rocket_over2(player2,rocket){
    rocket.destroy();
}

function add_pipe_block(x,y){
    var pipe = pipes.create(x,y,"pipe");
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = (-1)*speed;
}

function add_coin(x,y){
    var coin = coins.create(x,y,"coin");
    game.physics.arcade.enable(coin);
    coin.body.velocity.x=(-1)*speed;
}

function rocketsynthesis(){
    var vertical_height2 = game.rnd.integerInRange(100,400);
    add_rocket(800,vertical_height2);
}

function add_rocket(x,y){
    var rocket = rockets.create(x,y,"rocket");
    game.physics.enable(rocket);
    rocket.body.velocity.x=(-1)*speed;
}

function increase_speed(){
    speed = speed + 5;
}

function start(){

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    score_display = game.add.text(20,20,"0");
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(moveRight2);
    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(moveLeft2);
    game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(moveUp2);
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(moveDown2);

    rocketsynthesis();
    pipesynthesis();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    player1.body.gravity.y = 200;


    player2.body.gravity.y = 200;

    rocket_interval = 10;
    game.time.events.loop(rocket_interval*Phaser.Timer.SECOND,rocketsynthesis);

    pipe_interval = 2.75;
    game.time.events.loop(pipe_interval*Phaser.Timer.SECOND,pipesynthesis);
    coinsynthesis();
    coin_interval = 5;
    game.time.events.loop(coin_interval*Phaser.Timer.SECOND,coinsynthesis);
    player1.anchor.setTo(0.5, 0.5);
    player2.anchor.setTo(0.5, 0.5);

    player1.checkWorldBounds = true;
    player2.checkWorldBounds = true;

    player1.events.onOutOfBounds.add(player_over1);
    player2.events.onOutOfBounds.add(player_over2);
}

function create() {
    var back1= game.rnd.integerInRange(0,9);
    var back2= game.rnd.integerInRange(0,9);
    var back3= game.rnd.integerInRange(0,9);
    var back4= game.rnd.integerInRange(0,9);
    var back5= game.rnd.integerInRange(0,9);
    var back6= game.rnd.integerInRange(0,9);
    pipes = game.add.group();
    coins = game.add.group();
    rockets = game.add.group();
    game.stage.setBackgroundColor("#"+back4+back2+back1+back3+back5+back6);
    phraseText = game.add.text(165,250,phrase,
        {font:"100px Arial",fill:"#ABCDEF"});
    player1 = game.add.sprite(100,200,"bossmanImg");
    player2 = game.add.sprite(50,200,"bossmanImg2");

    game.physics.arcade.enable(player2);
    game.physics.arcade.enable(player1);

   game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);
}

function game_over(){
    //score = -3;
    death1=0;
    death2=0;
    speed = 100;
    $("#score").val(score.toString());
    $("#greeting").show();
    //game.state.restart();
    game.destroy();
}

function player_over1(){
    player1.kill();
    death1 = death1 + 1;
    if(death1 >= 1 && death2 >= 1){
        game_over();
    }
}

function player_over2(){
    player2.kill();
    death2 = death2 +1;
    if(death1 >= 1 && death2 >= 1){
        game_over();
    }
}



function update() {
    if (score < 1){
        phrase = "GO GO GO...";
    }
    else{
        phrase = ">>>>>>>>>";
    }
    phraseText.setText(phrase);

    if (player1) {
        game.physics.arcade.overlap(player1, pipes, player_over1);
        game.physics.arcade.overlap(player1, coins, coin_score_increase);
        game.physics.arcade.overlap(player1, coins, coin_over);
        game.physics.arcade.overlap(player1, rockets, increase_speed);
        game.physics.arcade.overlap(player1, rockets, rocket_over1);

        player1.rotation = Math.atan(player1.body.velocity.y /speed);
    }

    if (player2) {
        game.physics.arcade.overlap(player2, pipes, player_over2);
        game.physics.arcade.overlap(player2, coins, coin_score_increase);
        game.physics.arcade.overlap(player2, coins, coin_over2);
        game.physics.arcade.overlap(player2, rockets, increase_speed);
        game.physics.arcade.overlap(player2, rockets, rocket_over2);

        player2.rotation = Math.atan(player2.body.velocity.y /speed);
    }
    game.physics.arcade.overlap(pipes,coins,coin_over);
    game.physics.arcade.overlap(pipes,rockets,rocket_over1);
    if (score - score_temp_increment >= 2){
        speed = speed + 5;
        score_temp_increment = score;
    }


    //if(player1.body.y<0){
    //    player_over1();
    //}
    //
    //if (player1.body.y >500){
    //    player_over1();
    //}
    //if(player2.body.y < 0){
    //    player_over2();
    //}
    //
    //if (player2.body.y > 500){
    //    player_over2();
    //}

}

jQuery.get("/score", function(scores){
    console.log("Data: ",scores);
});

