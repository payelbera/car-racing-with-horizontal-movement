class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.horizontalDistance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  /*initialUpdate(){
    console.log("initialUpdate Function");
    var playerIndex = "players/player" + this.index;
    console.log("index" + playerIndex);
    console.log("this.index" + this.index);
    console.log( "distance" + this.distance);
    if(this.index === 1 && this.distance <= 40){
      console.log("if player 1");
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        horizontalDistance: 375
      });
    }
    if(this.index === 2 && this.distance <= 40){
      console.log("if player 2");
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        horizontalDistance: 575
      });
    }
  }*/

  update(){
    console.log("Update Function");
    var playerIndex = "players/player" + this.index;
    console.log("Distance  & HD "+this.distance +" "+this.horizontalDistance);
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance,
        horizontalDistance: this.horizontalDistance
      });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  getCarsAtEnd() {
    database.ref('carsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }

  static updateCarsAtEnd(rank) {
    database.ref('/').update({
      carsAtEnd:rank
    })
  }

  getHorizontalDistance() {
    database.ref('carsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }
}