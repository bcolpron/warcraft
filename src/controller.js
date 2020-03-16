export default class Controller {
    constructor(game, camera) {
        this.game = game;
        this.camera = camera;
    }

    onClick(x, y) {
        const tile = this.camera.getTile(x, y);
        this.game.moveTo(tile.x, tile.y);
    }
}
