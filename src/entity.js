import {Direction, anim} from './constants'

export default class Entity {
    constructor(sprites, pos) {
        this.sprites = sprites;
        this.pos = {...pos};
        this.bearing = Direction.SOUTH;
        this.sprite = 0;
    }

    update(tick) {

    }
    
    draw(ctx, camera) {
        if (camera.isVisible(this.pos.x, this.pos.y)) {
            ctx.drawImage(this.sprites, 64*this.bearing.sprite, 64*anim[this.sprite], 64, 64,
                    144 - 16 + (this.pos.x - camera.x) * 32,
                    24 - 16 + (this.pos.y - camera.y) * 32,
                    64, 64);
        }
    }

    moveTo(dst) {
        
    }
}

