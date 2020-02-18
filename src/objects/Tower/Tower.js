import { Group, CylinderGeometry, MeshPhongMaterial, Mesh } from 'three';
import TowerObstacle from '../TowerObstacle/TowerObstacle.js';

export default class Tower extends Group {
    constructor(state) {
        // const loader = new ObjectLoader();

        super();

        this.name = 'tower';

        var geometry = new CylinderGeometry(0.4, 0.4, 200, 32);
        var material = new MeshPhongMaterial( {color: 0xFFFFFF} );
        var cylinder = new Mesh(geometry, material);

        this.add(cylinder);

        this.receiveShadow = true

        // Init obstacles

        var steps = [...Array(50).keys()]

        var positions = [0, 1, 2, 3]

        for(var step in steps){
            var obstacle = new TowerObstacle({
                position: positions[Math.floor(Math.random() * positions.length)],
                step: step
            })
            this.add(obstacle);

            if(step > 10){
                var second_obstacle = new TowerObstacle({
                    position: positions[Math.floor(Math.random() * positions.length)],
                    step: step
                })
                this.add(second_obstacle);
            }

            if(step > 30){
                var third_obstacle = new TowerObstacle({
                    position: positions[Math.floor(Math.random() * positions.length)],
                    step: step
                })
                this.add(third_obstacle);
            }
            
        }
        

    }

    update(timeStamp) {
        // this.rotation.x = timeStamp / 10000;
        // this.rotation.y += 0.01;
    }
}
