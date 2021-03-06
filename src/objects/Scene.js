import { Group } from 'three';
import { Math as ThreeMath } from 'three';
import Tower from './Tower/Tower.js';
import Balloon from './Balloon/Balloon.js';
import BasicLights from './Lights.js';

import State from '../engine/State.js';
import Controls from '../engine/Controls.js';
import Collision from '../engine/Collision.js';

import UI from '../ui/UI.js';
import Background from '../background/Background.js';

var store = require('store')

export default class SeedScene extends Group {
  constructor() {
    super();
    this.init()
  }

  init(){
    
    this.current = {
      is_moving: false,
      rotation: 0
    }

    this.state = new State();
    this.controls = new Controls(this.state);
    this.collision = new Collision(this.state);

    this.lights = new BasicLights(this.state);
    this.tower = new Tower(this.state);
    this.balloon = new Balloon(this.state);

    this.ui = new UI(this.state);
    this.background = new Background(this.state);

    this.add(this.lights);
    this.add(this.tower);
    this.add(this.balloon);

  }

  update(timeStamp) {

    if(this.state.status == 'gameover'){
      var score = this.state.current.score.toFixed(0)
      if(parseInt(score) > parseInt(store.get('highscore'))){
        store.set('highscore', score)
      }
    }

    if(
      this.state.status == 'playing' ||
      this.state.status == 'menu' ||
      this.state.status == 'gameover'
    ){

      this.tower.update(timeStamp)
      this.balloon.update(timeStamp)
      this.lights.update(timeStamp)
      this.collision.update(timeStamp)
      this.state.update(timeStamp)
      
      this.ui.update(timeStamp)
      this.background.update(timeStamp)
      this.collision.update(timeStamp)
  
      // Rotate part
      
      var angle = 0
      var angle_turns = this.state.current.face_turns*360
      if(this.state.current.face == 0)
        angle = ThreeMath.degToRad(0+angle_turns);
      if(this.state.current.face == 1)
        angle = ThreeMath.degToRad(-90+angle_turns);
      if(this.state.current.face == 2)
        angle = ThreeMath.degToRad(-180+angle_turns);
      if(this.state.current.face == 3)
        angle = ThreeMath.degToRad(-270+angle_turns);
  
      var way = angle > this.current.rotation ? 1 : -1
      var diff = angle-this.current.rotation
      
      this.current.rotation = this.current.rotation+diff*0.1
      this.rotation.y = this.current.rotation
  
      if(this.state.status == 'playing'){

        // Speed & up part
        var max_step_speed = 300
        var max_speed = 4
        var turbo_speed = 3
    
        var speed_diff = 1-((max_step_speed+this.position.y)/max_step_speed)
        speed_diff = speed_diff > 1 ? 1 : speed_diff
        var new_speed = max_speed*speed_diff+1.5
        new_speed = new_speed < 0 ? 0 : new_speed
        new_speed = new_speed > max_speed ? max_speed : new_speed
        new_speed = this.state.current.turbo ? new_speed+turbo_speed : new_speed
        
        this.state.current.speed = new_speed
        this.state.current.y = this.state.current.y+(this.state.current.speed/50)*-1
    
        if(this.state.current.turbo == true){
          var variation = Math.sin(timeStamp/40)/80;
          this.position.x = variation
        }
    
        // Score
        var score_add = this.state.current.turbo ? 0.8 : 0.1
        this.state.current.score += score_add

      }

      this.position.y = this.state.current.y-1

    }
  }
}