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
        this.ctx.fillText('speed '+(this.state.current.speed).toFixed(2), 10, 100);

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "#FFF";
        this.ctx.fillText('y '+(this.state.current.y).toFixed(1), 10, 120);

    }
}
