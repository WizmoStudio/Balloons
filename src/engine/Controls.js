import Hammer from "hammerjs";

export default class Controls {
  constructor(state) {

    this.state = state

    var viewport = {
      w: 0,
      h: 0
    }

    var w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName('body')[0];
    viewport.w = w.innerWidth||e.clientWidth||g.clientWidth;
    viewport.h = w.innerHeight||e.clientHeight||g.clientHeight;


    var faces = [0, 1, 2, 3]
    // var mc = new Hammer(document);

    // mc.on("touchstart", (ev) => {
    //   if(ev.center.x > (viewport.w / 2)){
    //     this.doRotate(1)
    //   }else{
    //     this.doRotate(-1)
    //   }
    // })

    document.addEventListener("touchstart", (e) => {
      if(e.touches[0].clientY > (viewport.h*0.8)){
        this.enableTurbo()
      }else{
        if(e.touches[0].clientX > (viewport.w*0.5)){
          this.doRotate(1)
        }else{
          this.doRotate(-1)
        }
      }
    })

    document.addEventListener("touchend", (e) => {
      console.log(e)
      if(e.changedTouches[0].clientY < (viewport.h*0.8)){
        this.enableTurbo()
      }
    })
    



    document.onkeyup = (e) => {
      e = e || window.event;
      if(e.keyCode == '38'){
        this.disableTurbo()
      }
    }

    document.onkeydown = (e) => {
      e = e || window.event;
      if(e.keyCode == '38'){
        this.enableTurbo()
      }
      if(e.keyCode == '37'){
        this.doRotate(-1)
      }
      if(e.keyCode == '39'){
        this.doRotate(1)
      }
    }
  }
  
  enableTurbo(){
    console.log('turbo on')
    this.state.current.turbo = true
  }
  
  disableTurbo(){
    console.log('turbo off')
    this.state.current.turbo = false
  }
  
  doRotate(way){
    if(way == 1){
      var tmpFace = this.state.current.face + 1
      if(tmpFace > 3){
        this.state.current.face = 0
        this.state.current.face_turns -= 1
      }else{
        this.state.current.face = tmpFace
      }
    }
    if(way == -1){
      var tmpFace = this.state.current.face - 1
      if(tmpFace < 0){
        this.state.current.face = 3
        this.state.current.face_turns += 1
      }else{
        this.state.current.face = tmpFace
      }
    }
  }
}
