import { Group, SpotLight, PointLight, AmbientLight, HemisphereLight, Color } from 'three';

export default class BasicLights extends Group {
  constructor(state) {
    super();

    this.state = state

    const dir1 = new SpotLight(0xFFFFFF, 0.3, 500, 1, 1, 1);
    dir1.position.set(70, 0, 0);
    dir1.target.position.set(0,0,0);
    dir1.castShadow = true
    this.add(dir1);

    // const dir2 = new SpotLight(0xFFFFFF, 0.3, 500, 1, 1, 1);
    // dir2.position.set(-70, 0, 0);
    // dir2.target.position.set(0,0,0);
    // this.add(dir2);

    // const dir3 = new SpotLight(0xFFFFFF, 0.3, 500, 1, 1, 1);
    // dir3.position.set(0, 0, 70);
    // dir3.target.position.set(0,0,0);
    // this.add(dir3);

    // const dir4 = new SpotLight(0xFFFFFF, 0.3, 500, 1, 1, 1);
    // dir4.position.set(0, 0, -70);
    // dir4.target.position.set(0,0,0);
    // this.add(dir4);

    // this.add(hemi);

    var light = new AmbientLight(0xffffff, 1); 
    this.add(light);

  }

  update(timeStamp) {
    this.position.y = (this.state.current.y*-1) - 100
  }
}
