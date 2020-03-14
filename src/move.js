const speed =.6; // tile per seconds

class Move {
    constructor(orig, bearing) {
        this.orig = {...orig};
        this.bearing = bearing;
        this.dst = {x: orig.x + bearing.x, y: orig.y + bearing.y};
        this.start = performance.now();
        this.duration = 1000/speed;
        this.update(this.start);
        console.log(this.orig);
    };

    update(now) {
        const progress = (now-this.start)/this.duration;
        this.pos = {x: Math.floor(32*(this.orig.x + (this.dst.x - this.orig.x)*progress)) & 0xFFFFFFFE,
                    y: Math.floor(32*(this.orig.y + (this.dst.y - this.orig.y)*progress)) & 0xFFFFFFFE};
        this.sprite = Math.floor(8*progress);
    }

    isDone(now) {
        return now > this.start + this.duration;
    }
}

export default Move;