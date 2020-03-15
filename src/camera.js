
const SCREEN_SIZE_TILES_X = 15;
const SCREEN_SIZE_TILES_Y = 11;

export default class Camera {
    constructor(map, x,y) {
        this.map = map;
        this.x = x;
        this.y = y;
    }

    isVisible(x, y) {
        return x >= this.x && x < this.x + SCREEN_SIZE_TILES_X
            && y >= this.y && y < this.y + SCREEN_SIZE_TILES_Y;
    }

    getScreenPos(pos) {
        return {
            x: 144 - 16 + pos.x - this.x*32,
            y: 24 - 16 + pos.y - this.y*32,
        }
    }

    panLeft() {
        if (this.x > 0) this.x -= 1;
    }

    panRight() {
        if (this.x < this.map.sizeX - SCREEN_SIZE_TILES_X) this.x += 1;
    }

    panUp() {
        if (this.y > 0) this.y -= 1;
    }

    panDown() {
        if (this.y < this.map.sizeY - SCREEN_SIZE_TILES_Y) this.y += 1;
    }
}