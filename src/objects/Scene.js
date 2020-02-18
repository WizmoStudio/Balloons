import { Group, Math } from 'three';
import Tower from './Tower/Tower.js';
import Balloon from './Balloon/Balloon.js';
import BasicLights from './Lights.js';

import State from '../engine/State.js';
import Controls from '../engine/Controls.js';

export default class SeedScene extends Group {
  constructor() {
    super();

    this.current = {
      is_moving: false,
      rotation: 0
    }

    this.state = new State();
    this.controls = new Controls(this.state);

    this.lights = new BasicLights(this.state);
    this.tower = new Tower(this.state);
    this.balloon = new Balloon(this.state);

    this.add(this.lights);
    this.add(this.tower);
    this.add(this.balloon);
  }

  update(timeStamp) {

    this.tower.update(timeStamp)
    this.balloon.update(timeStamp)
    this.lights.update(timeStamp)

    // Rotate part
    
    var angle = 0
    var angle_turns = this.state.current.face_turns*360
    // console.log(this.state.current.face_turns)
    if(this.state.current.face == 0)
      angle = Math.degToRad(0+angle_turns);
    if(this.state.current.face == 1)
      angle = Math.degToRad(-90+angle_turns);
    if(this.state.current.face == 2)
      angle = Math.degToRad(-180+angle_turns);
    if(this.state.current.face == 3)
      angle = Math.degToRad(-270+angle_turns);

    var way = angle > this.current.rotation ? 1 : -1

    var diff = angle-this.current.rotation
    
    this.current.rotation = this.current.rotation+diff*0.1

    this.rotation.y = this.current.rotation

    // Up part

    var speed = !this.state.current.turbo ? this.state.current.speed : this.state.current.speed*3
    this.state.current.y = this.state.current.y+(speed/50)*-1

    this.position.y = this.state.current.y

    // Score

    var score_add = this.state.current.turbo ? 1 : 6
    this.state.current.score += score_add
    // console.log(this.state.current.score)

  }
}