import View from "./view";

export default class Controller {
    constructor(game, camera) {
        this.game = game;
        this.camera = camera;
    }

    onClick(x, y) {
        console.log(x,y);
        if (View.MAIN.isIn(x,y)) {
            const tile = this.camera.getTileAt(x, y);
            this.game.moveTo(tile.x, tile.y);
        } else if (View.MINIMAP.isIn(x,y)) {
            this.camera.goTo(
                (x - View.MINIMAP.left)/2,
                (y - View.MINIMAP.top)/2);
        }
    }

    onMouseMove(x, y) {
        if (View.MINIMAP.isIn(x,y)) {
            this.camera.goTo(
                (x - View.MINIMAP.left)/2,
                (y - View.MINIMAP.top)/2);
        }
    }
}
