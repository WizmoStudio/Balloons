export default class Collision {
    constructor(state) {
      
        console.log('Collisions init')

        this.state = state
      
    }

    update(timeStamp) {
       
        if(this.state.status == 'playing'){

            var offset_top = 0.3
            var offset_bottom = 0.3
            var y = this.state.current.y

            for(var i in this.state.obstacles){
                
                var y = this.state.current.y*-1
                if(
                    this.state.obstacles[i].y > (y-offset_bottom) &&
                    this.state.obstacles[i].y < (y+offset_top)
                ){
                    if(
                        this.state.obstacles[i].position == 0 &&
                        this.state.current.face == 2){
                        this.state.status = 'gameover'
                    }
                    if(
                        this.state.obstacles[i].position == 1 &&
                        this.state.current.face == 0){
                        this.state.status = 'gameover'
                    }
                    if(
                        this.state.obstacles[i].position == 2 &&
                        this.state.current.face == 1){
                        this.state.status = 'gameover'
                    }
                    if(
                        this.state.obstacles[i].position == 3 &&
                        this.state.current.face == 3){
                        this.state.status = 'gameover'
                    }
                }

            }
        }
    }
  }
  