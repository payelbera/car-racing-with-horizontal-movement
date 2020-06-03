class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
 
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;
      
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        
        console.log("player.index is "+player.index);
        //position the cars a little away from each other in x direction
        if(player.distance === 0 && player.index !== null && assigned<=2){
          console.log("hd " + allPlayers[plr].horizontalDistance)
          console.log("assigned is "+assigned);
          x = x + 200;
          player.horizontalDistance = x;
          console.log("x inside if " + player.horizontalDistance);
          assigned +=1;
          player.update();
        }else{
          console.log("allPlayers[plr].horizontalDistance is  " + allPlayers[plr].horizontalDistance);
          x =  allPlayers[plr].horizontalDistance;
         player.horizontalDistance = x;
          console.log("x is "+x);
        }
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        Game.spawnHurdle(y);
        Game.spawnHurdle2(y);
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      console.log("player.distance is "+player.distance);
      console.log("player.horizontaldistance is "+player.horizontalDistance);
      player.distance +=10;
      //player.horizontalDistance += 1;
      console.log("player.distance  NOW is "+player.distance);
      console.log("player.horizontaldistance NOW is "+player.horizontalDistance);
      player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance +=1;
      //player.horizontalDistance -= 1;
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance += 3;
      player.horizontalDistance += 3;
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance += 3;
      player.horizontalDistance -= 3;
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }

  static spawnHurdle(car_y){
    if(frameCount%60 === 0){
      var x = Math.round(random(100, 1400));
      var y = car_y - 500;
      //console.log("added 10 to" + y);
      hurdle1 = createSprite(x, y, 20, 20);
      hurdle1.addImage(hurdle1Img);
      //hurdle1.debug = true;
      hurdle1.scale = 0.1;
      fill("red");
      //console.log("spawnHurdle");
      //console.log(displayWidth);
    }
  }

  static spawnHurdle2(car_y){
    if(frameCount%60 === 0){
      var x = Math.round(random(200, 1600));
      var y = car_y - 500;
     // console.log("added 10 to" + y);
      hurdle1 = createSprite(x, y, 20, 20);
      hurdle1.addImage(hurdle2Img);
      //hurdle1.debug = true;
      hurdle1.scale = 0.1;
      fill("red");
      //console.log("spawnHurdle2");
      //console.log(displayWidth);
    }
  }
}