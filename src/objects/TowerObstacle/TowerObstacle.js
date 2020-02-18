import { Group, BoxGeometry, MeshPhongMaterial, Mesh } from 'three';

export default class TowerObstacle extends Group {
    constructor(config) {
        // const loader = new ObjectLoader();

        super();

        this.name = 'tower-obstacle';

        var position_xz = [0,0]
        var size_dw = [0.8, 2]
        
        if(config.position == 0){
            position_xz[1] = 1
            size_dw = [0.8, 2]
        }

        if(config.position == 1){
            position_xz[1] = -1
            size_dw = [0.8, 2]
        }

        if(config.position == 2){
            position_xz[0] = -1
            size_dw = [2, 0.8]
        }

        if(config.position == 3){
            position_xz[0] = 1
            size_dw = [2, 0.8]
        }

        var geometry = new BoxGeometry(size_dw[0], 0.1, size_dw[1]);
        var material = new MeshPhongMaterial( {color: 0xffff00} );
        var cylinder = new Mesh(geometry, material);

        this.add(cylinder);
        this.position.y = config.step

        this.position.x = position_xz[0]
        this.position.z = position_xz[1]

    }

    update(timeStamp) {
        // this.rotation.x = timeStamp / 10000;
    }
}
