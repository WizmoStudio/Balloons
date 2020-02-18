import { Group, CylinderGeometry, MeshPhongMaterial, Mesh } from 'three';
import TowerObstacle from '../TowerObstacle/TowerObstacle.js';

export default class Tower extends Group {
    constructor(state) {

        super();

        this.state = state

        this.name = 'tower';

        var geometry = new CylinderGeometry(0.4, 0.4, 2000, 32);
        var material = new MeshPhongMaterial({color: 0xFFFFFF});
        var cylinder = new Mesh(geometry, material);

        var colors = {
            green: 0x29DDB0,
            red: 0xFE5A60,
            purple: 0xC284FC,
            yellow: 0xFFC112
        }

        this.add(cylinder);

        this.receiveShadow = true

        // Init obstacles

        var steps = [...Array(1000).keys()]

        var positions = [0, 1, 2, 3]

        this.obstacles = []

        for(var step in steps){

            // Sandbox, no obstacles
            if(step > 0 && step < 5){}
            
            // Easy
            if(step > 5 && step < 30){
                if(Math.random() > 0.5){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.green,
                            step: step
                        })
                    })
                }
            }

            // Medium
            if(step > 30 && step < 60){
                if(Math.random() > 0.2){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.purple,
                            step: step
                        })
                    })
                }
                if(Math.random() > 0.6){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.purple,
                            step: step
                        })
                    })
                }
            }

            // Hard
            if(step > 60 && step < 200){
                if(Math.random() > 0.4){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.yellow,
                            step: step
                        })
                    })
                }
                if(Math.random() > 0.6){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.yellow,
                            step: step
                        })
                    })
                }
                if(Math.random() > 0.8){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.yellow,
                            step: step
                        })
                    })
                }
            }

            // Very hard
            if(step > 200){
                if(Math.random() > 0.4){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.red,
                            step: step
                        })
                    })
                }
                if(Math.random() > 0.6){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.red,
                            step: step
                        })
                    })
                }
                if(Math.random() > 0.6){
                    this.obstacles.push({
                        y: step,
                        obj: new TowerObstacle({
                            position: positions[Math.floor(Math.random() * positions.length)],
                            color: colors.red,
                            step: step
                        })
                    })
                }
            }
            
        }

        for(var i in this.obstacles){
            this.add(this.obstacles[i].obj);
        }
        

    }

    update(timeStamp) {

        var offset_top = 5
        var offset_bottom = 8
        var y = this.state.current.y

        for(var i in this.obstacles){
            
            var y = this.state.current.y*-1
            if(
                this.obstacles[i].y < (y-offset_bottom) ||
                this.obstacles[i].y > (y+offset_top)
            ){
                // console.log('hidden')
                this.obstacles[i].obj.visible = false
            }else{
                var animation_start = offset_top
                var animation_end = 3
                var diff = this.obstacles[i].y - y
                var diff_scale = (((diff-animation_end)/(animation_start-animation_end))*-1)+1
                diff_scale = diff_scale > 1 ? 1 : diff_scale
                // console.log(diff_scale)
                // var diff_scale = diff < 0 ? 1 : 1-(diff_scale/full_appear)
                
                this.obstacles[i].obj.visible = true

                if(this.obstacles[i].obj.userData.position == 0){
                    this.obstacles[i].obj.scale.z = diff_scale;
                    this.obstacles[i].obj.position.z = diff_scale*1;
                }

                if(this.obstacles[i].obj.userData.position == 1){
                    this.obstacles[i].obj.scale.z = diff_scale;
                    this.obstacles[i].obj.position.z = diff_scale*-1*1;
                }

                if(this.obstacles[i].obj.userData.position == 2){
                    this.obstacles[i].obj.scale.x = diff_scale;
                    this.obstacles[i].obj.position.x = diff_scale*-1*1;
                }

                if(this.obstacles[i].obj.userData.position == 3){
                    this.obstacles[i].obj.scale.x = diff_scale;
                    this.obstacles[i].obj.position.x = diff_scale*1;
                }

                
                // this.obstacles[i].obj.rotation.z = Math.PI*diff;
            }
        }
        // this.rotation.x = timeStamp / 10000;
        // this.rotation.y += 0.01;
    }
}
