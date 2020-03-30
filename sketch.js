// made by Aditya Prakash

var brush, database;
var position;
var brushImg;

function preload() {
  
  brushImg=loadImage("w.png");
  
}

function setup(){
  
  database = firebase.database();
  
  createCanvas(500,500);

  brush = createSprite(250,250,10,10);
  brush.addImage(brushImg);
  brush.scale=0.15;

  var brushPosition = database.ref('brush/position');
  brushPosition.on("value", readPosition, showError);
  
}

function draw(){

    if(keyCode === 97){
      writePosition(-1,0);
    }
    else if(keyCode === 100){
      writePosition(1,0);
    }
    else if(keyCode === 119){
      writePosition(0,-1);
    }
    else if(keyCode === 115){
      writePosition(0,+1);
    }
  
    drawSprites();
}

function writePosition(x,y){
  
  database.ref('brush/position').set({'x': position.x + x ,'y': position.y + y})
  
}

function readPosition(data){
  
  position = data.val();
  
  brush.x = position.x;
  brush.y = position.y;
  
}
function showError(){
  
  console.log("Error in writing to the database");
  
}
