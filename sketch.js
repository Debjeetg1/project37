var PLAY = 0;
var END = 1
var gameState = PLAY;

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var groundimg, ground, invisibleGround;
var score;
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  groundimg = loadImage("ground.png");




}



function setup() {
  createCanvas(displayWidth - 0, displayHeight - 130);



  monkey = createSprite(displayWidth , displayHeight - 150 , 20, 20)
  monkey.scale = 0.2;

  monkey.addAnimation("running", monkey_running);

  FoodGroup = new Group();
  obstacleGroup = new Group();

  invisibleGround = createSprite(displayWidth, displayHeight - 150, 450, 10);
  invisibleGround.visible = false;









}


function draw() {

  background("white");
  
  
   ground = createSprite(displayWidth/2, displayHeight - 150, 900 * 900 * 900, 50);
   ground.shapeColor = "green";
   ground.velocityX = -3;
  
  invisibleGround.velocityX = 0.8;
  monkey.velocityX = 0.8;
  

  if (gameState === PLAY) {
    monkey.velocityX = 0.8;

    if (ground.x < 200) {
      ground.x = ground.width / 2;

    }



    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -12;

    }

    monkey.velocityY = monkey.velocityY + 0.8;

    monkey.collide(invisibleGround);


    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      survivalTime = survivalTime + 1;
    }


    if (monkey.isTouching(obstacleGroup)) {
      monkey.collide(obstacleGroup);
      gameState = END;
    }


    spawnBanana();
    spawnObstacles();
     CameraRot();

    monkey.depth = ground.depth + 1

  }

  if (gameState === END) {
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.destroy();

    ground.velocityX = 0;
    stroke("black")
    textSize(20);
    text("GAME--OVER!", 120, 200);
  }

  stroke("black");
  textSize(20)
  text("SURVIVAL TIME:" + survivalTime, monkey.x, 50);
 

          
  drawSprites();


}

function spawnBanana() {
  if (frameCount % 100 === 0) {
    banana = createSprite(monkey.x + 100, Math.round(random(displayHeight - 520, displayHeight - 680)), 20, 20);
    banana.scale = 0.2;
    banana.velocityX = 0;
    banana.lifetime = displayWidth/0.8
    banana.addImage(bananaImage);

    banana.depth = monkey.depth - 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 250 === 0) {

    obstacle = createSprite(Math.round(random(monkey.x + 400, monkey.x + 500)), displayHeight - 210, 20, 20);
    obstacle.scale = 0.2;
    obstacle.velocityX = 0;
    obstacle.addImage(obstacleImage);

    obstacleGroup.add(obstacle);
  }
}

function CameraRot() {
  camera.position.x = monkey.x;
}