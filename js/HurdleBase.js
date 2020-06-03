class HurdleBase {
    constructor(x, y, width, height){
        this.width = 0;
        this.height = 0;
        this.x = 0;
        this.y = 0;
    }

    display(){
        createSprite(this.x, this.y, this.width, this.height);
        console.log("displaying");
        drawSprites();
    }
}