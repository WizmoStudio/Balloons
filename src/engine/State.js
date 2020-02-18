export default class State {
    constructor() {
      
      this.current = {
          score: 0,
          face: 0,
          face_turns: 0,
          scene_y: 0,
          y: 0,
          balloon_x: 0,
          balloon_z: 0,
          speed: 1,
          turbo: false
      }

      setInterval(() => {
        this.current.speed += 0.2
      }, 10000)
      
    }
  }
  