import { images } from './images';

export default class View {
    constructor(map, minimap, camera, entities) {
        this.ctx = document.getElementById("myCanvas").getContext("2d");
        this.map = map;
        this.minimap = minimap;
        this.camera = camera;
        this.entities = entities;
    }

    update() {
        const ctx = this.ctx;
        ctx.drawImage(images.frame, 0, 0);
        ctx.drawImage(this.map.background, this.camera.x * 32, this.camera.y * 32,
                      480, 352, 144, 24, 480, 352);
        this.minimap.draw(ctx);

        ctx.save();
        ctx.rect(144, 24, 480, 352);
        ctx.clip();

        this.entities.forEach(e => e.draw(ctx, this.camera));

        ctx.restore();
    }
}