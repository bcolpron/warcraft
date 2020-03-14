
export default class Minimap {
    constructor(background, camera) {
        this.background = background;
        this.camera = camera;
    }

    draw(ctx) {
        ctx.drawImage(this.background, 6, 12);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#c7c7c7";
        ctx.strokeRect(this.camera.x*2+6, this.camera.y*2+12, 29, 21);
    }
}
