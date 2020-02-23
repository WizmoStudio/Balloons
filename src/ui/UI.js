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

        this.ctx.textAlign = "center";

        this.ctx.font = "32px Arial";
        this.ctx.fillStyle = "#000";
        this.ctx.fillText(this.state.current.score.toFixed(0), innerWidth/2, 50);

        // this.ctx.font = "16px Arial";
        // this.ctx.fillStyle = "#FFF";
        // this.ctx.fillText('speed '+(this.state.current.speed).toFixed(2), 10, 100);

        // this.ctx.font = "16px Arial";
        // this.ctx.fillStyle = "#FFF";
        // this.ctx.fillText('y '+(this.state.current.y).toFixed(1), 10, 120);

        if(this.state.status == 'menu'){
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "#000";
            this.ctx.fillText("Touch to start", innerWidth/2, innerHeight/2);
        }

        if(this.state.status == 'gameover'){
            this.ctx.font = "32px Arial";
            this.ctx.fillStyle = "#000";
            this.ctx.fillText("Score : "+this.state.current.score.toFixed(0), innerWidth/2, (innerHeight/2)-20);
            this.ctx.fillText("Touch to restart", innerWidth/2, (innerHeight/2)+20);
        }

    }
}
