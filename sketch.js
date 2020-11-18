
   var monkey , monkey_running;
   var banana ,bananaImage, obstacle, obstacleImage;
  var FoodGroup, obstacleGroup, bg , gameover, go;
  var score;
  var PLAY = 0;
  var END = 1;
  var gameState = 0;

function preload(){
  
 monkeyr =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungle = loadImage("j.png");
  g = loadImage("b.png");
  gameOver = loadImage("GO-1.png");
}

function setup() 
{
  createCanvas(800,450);
  
  bg = createSprite(500,205);
  bg.addImage(jungle);
  bg.scale = 1.63;
  bg.velocityX = -4;
  
  go = createSprite(300,400);
  go.addImage(g);
  go.visible = false;
  
  monkey = createSprite(50,380);
  monkey.addAnimation("monkey",monkeyr);
  monkey.scale = 0.2;
  
  ground = createSprite(300,440,600,20);
  ground.velocityX = -4;
  ground.visible = false;
  
  obstacleGrp = createGroup();
  bananaGrp = createGroup();
  
  survive = 0;
  
  score=0;
  
}

function draw()
{
  background("white");
  
  monkey.collide(ground);

  if(ground.x < 0){
    ground.x = ground.width/2
  }

  if(bg.x < 0){
    bg.x = bg.width/2
  }
  
  if(frameCount % 100 === 0){
    banana = createSprite(580,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.scale = 0.14;
    banana.velocityX = -(4 + frameCount/30);
    banana.lifetime = 150;
    bananaGrp.add(banana);
   }

    if(keyDown("space") && monkey.y > 200){
      monkey.velocityY = -7;
    }

  monkey.velocityY= monkey.velocityY + 0.5;
  
  if(frameCount % 300 === 0){
    obstacle = createSprite(600,410);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.17;
    obstacle.velocityX = -(4 + frameCount/30);
    obstacle.lifetime = 150;
    obstacleGrp.add(obstacle);
  }

    survive= Math.ceil(frameCount/frameRate());

    if(obstacleGrp.isTouching(monkey)){

    monkey.x = 300;
    monkey.y = 225;
    monkey.velocityY = 0;
    
    bg.velocityX = 0;
   
    monkey.scale = 1.45;
    
    obstacleGrp.setLifetimeEach(-1);
    bananaGrp.setLifetimeEach(-1);
    
    bananaGrp.setVelocityXEach(0);
    obstacleGrp.setVelocityXEach(0);
    
    bananaGrp.destroyEach();
   
    monkey.addImage("monkey",gameOver);
  }
   
   if(bananaGrp.isTouching(monkey)){
       score = score + 1;
       bananaGrp.destroyEach();
  }
  
  drawSprites();
  
  fill("white");
  textSize(20);
  text("Survival Time: " + survive,300,30);
  
  textSize(20);
  text("Score: "+ score,30,30);

 }
