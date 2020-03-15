const speed =.6; // tile per seconds

class Move {
    constructor(orig, bearing) {
        this.orig = {...orig};
        this.bearing = bearing;
        this.dst = {x: orig.x + bearing.x, y: orig.y + bearing.y};
        this.start = performance.now();
        this.duration = 1000/speed;
        this.update(this.start);
    };

    update(now) {
        this.progress = (now-this.start)/this.duration;
        this.sprite = Math.floor(8*this.progress);
    }

    getOffsets() {
        return {x: Math.floor(32*(this.orig.x + (this.dst.x - this.orig.x)*this.progress)) & 0xFFFFFFFE,
                y: Math.floor(32*(this.orig.y + (this.dst.y - this.orig.y)*this.progress)) & 0xFFFFFFFE};
    }

    isDone() {
        return this.progress > 1;
    }
}

export default Move;