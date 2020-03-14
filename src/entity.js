import {Direction, anim} from './constants'

export default class Entity {
    constructor(sprites, pos) {
        this.sprites = sprites;
        this.pos = {...pos};
        this.bearing = Direction.SOUTH;
        this.sprite = 0;
    }

    draw(ctx, viewport) {
        ctx.drawImage(this.sprites, 64*this.bearing.sprite, 64*anim[this.sprite], 64, 64,
                  144 - 16 + (this.pos.x - viewport.offsetX) * 32,
                  24 - 16 + (this.pos.y - viewport.offsetY) * 32,
                  64, 64);
    }

    moveTo(dst) {
        
    }
}

