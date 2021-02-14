var PLAY=1;
var END=0;
var gameState=PLAY;

var knife,fruit,fruitGroup,alien,alienGroup;
var knifeImage,alienImage,gameoverImage,fruit1,fruit2,fruit3,fruit4;
var knifeSwooshSound,gameoverSound;


function preload(){
  knifeImage = loadImage("knife.png");
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  
  alienImage=loadAnimation("alien1.png","alien2.png");
  
  gameoverImage=loadImage("gameover.png");

  knifeSwooshSound=loadSound("knifeSwoosh.mp3");
  gameoverSound=loadSound("gameover.mp3");
}


function setup() {
  createCanvas(600, 600);
  
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  
  fruitGroup = createGroup();
  alienGroup = createGroup();
}


function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
  knife.y=World.mouseY;
  knife.x=World.mouseX;
  }
  
  drawSprites();
  
  textSize(25);
  text("Score : "+ score,250,50);
  
  fruits();
  aliens();
  
  if (fruitGroup.isTouching(knife)){
    fruitGroup.destroyEach();
    knifeSwooshSound.play();
    score=score+1;
  }
  
  if (alienGroup.isTouching(knife)){
    alienGroup.destroyEach();
    score=score-2;
    gameoverSound.play();
    gameState=END;
  }
  
  else if(gameState===END){
    knife.addImage(gameoverImage);
    knife.x=290;
    knife.y=275;
    knife.scale=2;
    
    fruitGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0);
    
    alienGroup.destroyEach();
    fruitGroup.destroyEach();
  }
}


function fruits(){
  if (World.frameCount%80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale=0.2;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1);
              break;
      case 2: fruit.addImage(fruit2);
              break;
      case 3: fruit.addImage(fruit3);
              break;
      case 4: fruit.addImage(fruit4);
              break;
      default: break;
    }
    var p=Math.round(random(1,2));
    if (p===1){
      fruit.x=0;
      fruit.velocityX=7;
    }
    else if(p===2){
      fruit.x=600;
      fruit.velocityX=-(7+(score/100));
    }
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
  }
}


function aliens(){
  if (World.frameCount%80 === 0){
    alien = createSprite(400,200,20,20);
    alien.scale=1;
    alien.addAnimation("alien image",alienImage);
    var o=Math.round(random(1,2));
    if (o===1){
      alien.x=0;
      alien.velocityX=(7+(score/200));
    }
    else if(o===2){
      alien.x=600;
      alien.velocityX=-7;
    }
    alien.setLifetime=100;
    alienGroup.add(alien);
  }
}