export default class State {
    constructor() {
      
      this.status = "menu"
      this.todo = null

      this.initCurrent()

      this.obstacles = []
      
    }
    
    initCurrent() {
      this.current = {
        score: 0,
        face: 0,
        face_turns: 0,
        scene_y: 0,
        y: 0,
        balloon_x: 0,
        balloon_z: 0,
        speed: 1,
        turbo: false,
        sequence: 0
      }
    }

    update(){
      if(this.todo == 'restart'){
        this.initCurrent()
        this.todo = null
        this.status = 'playing'
      }
    }
  }
  