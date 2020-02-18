export default class Background {
    constructor(state) {

        console.log('Background init')

        this.state = state

        this.canvas = document.getElementById('background');
        this.ctx = this.canvas.getContext('2d');

        this.lines = []

        this.background = {
            y: 0,
            new: '#212121',
            all: '#212121'
        }

    }

    update(timeStamp) {

        const { innerHeight, innerWidth } = window;

        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        // Bg

        if(this.background.y < innerHeight){
            var turbo_bonus = this.state.current.turbo ? 1.5 : 1
            this.background.y += (8*turbo_bonus)
        }else{
            this.background.all = this.background.new
        }

        this.ctx.fillStyle = this.background.all;
        this.ctx.globalAlpha = 1
        this.ctx.fillRect(0,0,innerWidth,innerHeight)

        this.ctx.fillStyle = this.background.new;
        this.ctx.globalAlpha = 1
        this.ctx.fillRect(0,0,innerWidth,this.background.y)

        if(this.state.current.y < -25 && this.state.current.y > -26){
            this.background.y = -10
            this.background.new = '#29DDB0'
        }

        if(this.state.current.y < -55 && this.state.current.y > -56){
            this.background.y = -10
            this.background.new = '#FE5A60'
        }

        if(this.state.current.y < -195 && this.state.current.y > -196){
            this.background.y = -10
            this.background.new = '#FFC112'
        }

        // Lines
        
        // this.ctx.globalAlpha = 1

        // var line_max_height = 40
        // var line_width = 2
        // var lines_count = 20
        // if(this.lines.length < lines_count){
        //     var rand1 = Math.random(),
        //         rand2 = Math.random()
        //     this.lines.push({
        //         x: innerWidth*rand1,
        //         h: line_max_height*rand2+10,
        //         y: -1*(innerHeight*3*rand2),
        //         speed: rand2,
        //         alpha: rand2
        //     })
        // }

        // var lines_to_remove = []
        // for(var i in this.lines){

        //     var turbo_bonus = this.state.current.turbo ? 2 : 1
        //     this.lines[i].y += this.state.current.speed+3*(this.lines[i].speed*turbo_bonus)+turbo_bonus

        //     this.ctx.fillStyle = '#000';
        //     this.ctx.globalAlpha = 0.1*this.lines[i].alpha+0.05;
        //     this.ctx.fillRect(
        //         this.lines[i].x,
        //         this.lines[i].y,
        //         line_width,
        //         this.lines[i].h
        //     )

        //     var diff = this.lines[i].y-this.lines[i].h

        //     if(diff > innerHeight){
        //         lines_to_remove.push(i)
        //     }
        // }

        // var i = lines_to_remove.length
        // while (i--) {
        //     this.lines.splice(lines_to_remove[i], 1);
        // }


    }
}
