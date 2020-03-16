import {Direction, anim} from './constants'
import Move from './move';

export default class Entity {
    constructor(sprites, x, y) {
        this.sprites = sprites;
        this.pos = {x: x, y: y};
        this.bearing = Direction.SOUTH;
        this.sprite = 0;
    }

    update(game, tick) {
        if (this.move) {
            this.move.update(tick);
            if (this.move.isDone()) {
                this.move = null;
            }
        }
    }

    getOffsets() {
        if (this.move) return this.move.getOffsets();
        return {x: this.pos.x * 32,
                y: this.pos.y * 32};
    }

    draw(ctx, camera) {
        if (camera.isVisible(this.pos.x, this.pos.y)) {
            const pos = camera.getScreenPos(this.getOffsets());
            const orientation = this.move ? this.move.bearing.sprite : this.bearing.sprite;
            const frame = this.move ? this.move.sprite : this.sprite;
            ctx.drawImage(this.sprites, 64*orientation, 64*anim[frame], 64, 64,
                          pos.x,pos.y, 64, 64);
        }
    }

    moveTo(x,y) {
        const dst = this.nextMoveToward(x,y);
        if (dst && !this.move) {
            this.move = new Move(this.pos, dst);
            this.pos = this.move.dst;
            this.bearing = this.move.bearing;
        }
    }

    nextMoveToward(x,y) {
        if (x > this.pos.x) {
            if (y > this.pos.y) {
                return Direction.SOUTHEAST;
            } else if (y < this.pos.y) {
                return Direction.NORTHEAST;
            } else {
                return Direction.EAST;
            }
        } else if (x < this.pos.x) {
            if (y > this.pos.y) {
                return Direction.SOUTHWEST;
            } else if (y < this.pos.y) {
                return Direction.NORTHWEST;
            } else {
                return Direction.WEST;
            }
        } else {
            if (y > this.pos.y) {
                return Direction.SOUTH;
            } else if (y < this.pos.y) {
                return Direction.NORTH;
            }
        }
        return null;    // requested destination == current position!
    }
}

