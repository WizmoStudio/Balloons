import { Group, BoxGeometry, SphereGeometry, MeshPhongMaterial, Mesh } from 'three';

export default class Balloon extends Group {
    constructor(state) {

        super();


        this.state = state;

        this.name = 'balloon';

        var geometry = new SphereGeometry(0.3, 12, 12);
        // var geometry = new BoxGeometry(0.5, 0.5, 0.5);
        var material = new MeshPhongMaterial( {color: 0xFE5A60} );
        var balloon = new Mesh(geometry, material);

        this.add(balloon);
        this.position.z = -1

    }

    update(timeStamp) {

        var variation = Math.sin(timeStamp/1000)/8;
        
        // Y positions

        this.position.y = (this.state.current.y*-1)

        // X Y position

        // console.log(this.state.current.face)

        var xz = [0,0]
        if(this.state.current.face == 0)
            xz = [0, -1]
        if(this.state.current.face == 1)
            xz = [-1, 0]
        if(this.state.current.face == 2)
            xz = [0, 1]
        if(this.state.current.face == 3)
            xz = [1, 0]

        var diff_balloon_x = xz[0]-this.state.current.balloon_x
        var diff_balloon_z = xz[1]-this.state.current.balloon_z

        this.state.current.balloon_x = this.state.current.balloon_x+diff_balloon_x*0.1
        this.state.current.balloon_z = this.state.current.balloon_z+diff_balloon_z*0.1

        this.position.x = this.state.current.balloon_x+variation
        this.position.z = this.state.current.balloon_z+variation

        // this.rotation.x = timeStamp / 10000;
    }
}
