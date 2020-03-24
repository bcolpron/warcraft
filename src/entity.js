import {Direction, anim} from './constants'
import Move from './move';

export default class Entity {
    constructor(sprites, x, y) {
        this.sprites = sprites;
        this.pos = {x: x, y: y};
        this.bearing = Direction.SOUTH;
        this.sprite = 0;
        this.nextMoves = null;
    }

    update(game, tick) {
        if (this.move) {
            this.move.update(tick);
            if (this.move.isDone()) {
                this._doNextMove();
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
        if (!this.move) {
            this.nextMoves = this.movesToward(x,y);
            this._doNextMove();
        }
    }

    _doNextMove() {
        if (this.nextMoves.length === 0) {
            this.move = this.nextMoves = null;
            return;
        }
        
        const dst = this.nextMoveToward(this.nextMoves[0].x,this.nextMoves[0].y);
        this.nextMoves = this.nextMoves.slice(1);

        if (dst) {
            this.move = new Move(this.pos, dst);
            this.pos = this.move.dst;
            this.bearing = this.move.bearing;
        } else {
            this._doNextMove();
        }
    }

    movesToward(x,y) {
        const max = Math.max(Math.abs(x - this.pos.x), Math.abs(y - this.pos.y));
        const moves = new Array(max);
        for (let i = 0; i != max; ++i) {
            moves[i] = {
                x: this.pos.x + Math.round((i+1) * (x - this.pos.x) / max),
                y: this.pos.y + Math.round((i+1) * (y - this.pos.y) / max)};
        }
        return moves;
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

