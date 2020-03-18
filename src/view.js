import { images } from './images';


class Zone {
    constructor(left, top, width, height) {
        if (typeof(left) === "object") {
            this.left = left.left;
            this.top = left.top;
            this.width = left.width;
            this.height = left.height;
        } else {
            this.left = left;
            this.top = top;
            this.width = width;
            this.height = height;
        }
        Object.freeze(this);
    }

    isIn(x, y) {
        return x >= this.left && x < this.left + this.width
            && y >= this.top && y < this.top + this.height;
    }
}

const MAIN_GAME_ZONE = new Zone({
    left: 144,
    top: 24,
    width: 480,
    height: 352,
});

const MINIMAP_ZONE = new Zone({
    left: 6,
    top: 12,
    width: 128,
    height: 128,
});

export default class View {
    constructor(map, minimap, camera, entities) {
        this.ctx = document.getElementById("myCanvas").getContext("2d");
        this.map = map;
        this.minimap = minimap;
        this.camera = camera;
        this.entities = entities;
    }

    static get MAIN () { return MAIN_GAME_ZONE; }
    static get MINIMAP () { return MINIMAP_ZONE; }

    update() {
        const ctx = this.ctx;
        ctx.drawImage(images.frame, 0, 0);
        ctx.drawImage(this.map.background, this.camera.x * 32, this.camera.y * 32, MAIN_GAME_ZONE.width, MAIN_GAME_ZONE.height,
                      MAIN_GAME_ZONE.left, MAIN_GAME_ZONE.top, MAIN_GAME_ZONE.width, MAIN_GAME_ZONE.height);
        this.minimap.draw(ctx);

        ctx.save();
        ctx.rect(MAIN_GAME_ZONE.left, MAIN_GAME_ZONE.top, MAIN_GAME_ZONE.width, MAIN_GAME_ZONE.height);
        ctx.clip();

        this.entities.forEach(e => e.draw(ctx, this.camera));

        ctx.restore();
    }
}