var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameOver, gameOverImg
var restart, restartImg

var score = 0;

// Variables de estados del juego      


function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")

//Cargar imágenes restart y gameOver

}

function setup(){

  createCanvas(400,400)
// Imagen de fondo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


// Creando los terrenos inferior y superior
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
// Creando el globo
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
balloon.debug = true;

// Inicializando los grupos
topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();

// Creando los sprites de fin del juego y reiniciar

}

function draw() {
  
  background("black");

  
//Estado PLAY
  if(gameState === PLAY){

    // Hacer que el globo aerostático salte
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
    }

    // Agregando gravedad
     balloon.velocityY = balloon.velocityY + 2;

     
    Bar();

    // Generando obstáculos inferiores y superiores
    spawnObstaclesTop();
    spawnObstaclesBottom();

//condición para el estado END

  }

  //Estado END
  if(gameState === END) 
    {
      
      //restart y gameOver visibles

          
          // Todos los sprite deben detenerse en el estado END

  
          // Configurando lifetime en -1 para que los obstáculos no desaparezcan en el estado END

         
          balloon.y = 200;
          
          // Reiniciando el juego


    } 

    drawSprites();
    Score();     
}

function reset()
{

}


function spawnObstaclesTop() 
{
  if(World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400,50,40,50);

//obstacleTop.addImage(obsTop1);

obstacleTop.scale = 0.1;
obstacleTop.velocityX = -4;

// Posiciones "y" aleatorias para los obstaculos superiores
obstacleTop.y = Math.round(random(10,100));

// Generando obstáculos superiores aleatorios 
var rand = Math.round(random(1,2));
switch(rand) {
  case 1: obstacleTop.addImage(obsTop1);
          break;
  case 2: obstacleTop.addImage(obsTop2);
          break;
  default: break;
}

 // Asignando lifetime a la variables 
obstacleTop.lifetime = 100;

balloon.depth = balloon.depth + 1;

topObstaclesGroup.add(obstacleTop);

  }
}

function spawnObstaclesBottom() 
{
      if(World.frameCount % 60 === 0) {
        obstacleBottom = createSprite(400,350,40,50);
    
    obstacleBottom.addImage(obsBottom1);
    obstacleBottom.debug=true

    
    obstacleBottom.scale = 0.07;
    obstacleBottom.velocityX = -4;
    
    

   // Generar obstáculos inferiores aleatorios 
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacleBottom.addImage(obsBottom1);
              break;
      case 2: obstacleBottom.addImage(obsBottom2);
              break;
      case 3: obstacleBottom.addImage(obsBottom3);
              break;
      default: break;
    }

     // Asignar lifetime a la variable
   obstacleBottom.lifetime = 100;
    
   balloon.depth = balloon.depth + 1;

   bottomObstaclesGroup.add(obstacleBottom);
   
      }
}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
        
          
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;

          barGroup.add(bar);
         }
}

function Score()
{
         if(balloon.isTouching(barGroup))
         {
           score = score + 1;
         }
        textFont("algerian");
        textSize(30);
        fill("yellow");
        text("Puntuación : "+ score, 150, 50);
       
  
}

  
