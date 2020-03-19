import View from "./view";

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
            x: View.MAIN.left - 16 + pos.x - this.x*32,
            y: View.MAIN.top - 16 + pos.y - this.y*32,
        }
    }

    getTileAt(x, y) {
        return {x: Math.floor((x - View.MAIN.left) / 32) + this.x,
                y: Math.floor((y - View.MAIN.top) / 32) + this.y };
    }

    goTo(x,y) {
        x -= SCREEN_SIZE_TILES_X/2;
        y -= SCREEN_SIZE_TILES_Y/2;

        if (x < 0) x=0;
        if (x >= this.map.sizeX - SCREEN_SIZE_TILES_X) x = this.map.sizeX - SCREEN_SIZE_TILES_X;

        if (y < 0) y=0;
        if (y >= this.map.sizeY - SCREEN_SIZE_TILES_Y) y = this.map.sizeY - SCREEN_SIZE_TILES_Y;

        this.x = Math.floor(x);
        this.y = Math.floor(y);
    }

    panLeft() {
        if (this.x > 0) this.x -= 1;
    }

    panRight() {
        if (this.x < this.map.sizeX - SCREEN_SIZE_TILES_X) this.x += 1;
    }

    panUp() {
        if (this.y > 0) this.y -= 1;
        console.log(this.y);
    }

    panDown() {
        if (this.y < this.map.sizeY - SCREEN_SIZE_TILES_Y) this.y += 1;
    }
}