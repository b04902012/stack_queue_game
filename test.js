var Game = function(){
    var f = ()=>{
        this.a=1
    }
    this.g=f
}
var game = new Game()
var test = new game.f
