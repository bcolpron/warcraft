
export default class Game {
    constructor() {
        this.entities = [];
    }

    update(tick) {
        this.entities.forEach(e => e.update(this, tick));
    }

    moveTo(x,y) {
        this.entities[0].moveTo(x, y);
    }
}
