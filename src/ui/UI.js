export default class UI {
    constructor(state) {

        console.log('UI init')

        this.state = state

        this.canvas = document.getElementById('ui');
        this.ctx = this.canvas.getContext('2d');

        this.lines = []

    }

    update(timeStamp) {

        const { innerHeight, innerWidth } = window;

        this.ctx.clearRect(0, 0, innerWidth, innerHeight);

        // this.ctx.fillStyle = 'green';
        // this.ctx.fillRect(10, 10, 200, 200);
        
        this.ctx.globalAlpha = 1

        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText(this.state.current.score, innerWidth-100, 50);

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText('speed '+this.state.current.speed, 10, 100);

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText('y '+this.state.current.y, 10, 120);

        var line_max_height = 60
        var line_width = 2
        var lines_count = 15
        if(this.lines.length < lines_count){
            var rand1 = Math.random(),
                rand2 = Math.random()
            this.lines.push({
                x: innerWidth*rand1,
                h: line_max_height*rand2+10,
                y: -1*(innerHeight*3*rand2),
                speed: rand2,
                alpha: rand2
            })
        }

        var lines_to_remove = []
        for(var i in this.lines){

            var turbo_bonus = this.state.current.turbo ? 2 : 1
            this.lines[i].y += this.state.current.speed+3*(this.lines[i].speed*turbo_bonus)+turbo_bonus

            this.ctx.fillStyle = '#FFF';
            this.ctx.globalAlpha = 0.1*this.lines[i].alpha+0.05;
            this.ctx.fillRect(
                this.lines[i].x,
                this.lines[i].y,
                line_width,
                this.lines[i].h
            )

            var diff = this.lines[i].y-this.lines[i].h

            if(diff > innerHeight){
                lines_to_remove.push(i)
            }
        }

        var i = lines_to_remove.length
        while (i--) {
            this.lines.splice(lines_to_remove[i], 1);
        }


    }
}
