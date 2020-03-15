import { Direction, anim } from "./constants";
import Entity from './entity';
import Move from './move';
import {images} from './images';

export default class Bot extends Entity {
    constructor(sprites, x, y) {
        super(sprites, x, y);
        this.move = new Move(this.pos, Direction.EAST);
    }

    update(game, now) {
        this.move.update(now);
        if (this.move.isDone()) {
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
}
