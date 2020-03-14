import { Direction, anim } from "./constants";
import Entity from './entity';
import Move from './move';
import {images} from './images';

export default class Bot extends Entity {
    constructor(sprites, pos) {
        super(sprites, pos);
        this.move = new Move(this.pos, Direction.EAST);
    }

    update(now) {
        this.move.update(now);
        if (this.move.isDone(now)) {
            this.move = new Move(this.move.dst, this.move.bearing === Direction.EAST ? Direction.SOUTHEAST
            : this.move.bearing === Direction.SOUTHEAST ? Direction.SOUTH
            : this.move.bearing === Direction.SOUTH ? Direction.SOUTHWEST
            : this.move.bearing === Direction.SOUTHWEST ? Direction.WEST
            : this.move.bearing === Direction.WEST ? Direction.NORTHWEST
            : this.move.bearing === Direction.NORTHWEST ? Direction.NORTH
            : this.move.bearing === Direction.NORTH ? Direction.NORTHEAST
            : Direction.EAST);
        }
    }

    draw(ctx, viewport) {
        ctx.drawImage(images.peasant, 64*this.move.bearing.sprite, 64*anim[this.move.sprite], 64, 64,
            144+16 + this.move.pos.x - viewport.offsetX*32,
            24+16 + this.move.pos.y - viewport.offsetY*32,
            64, 64);
    }
}
