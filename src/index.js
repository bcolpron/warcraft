function loadImage(path) {
    return new Promise(resolve => {
        var img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        }
    });
}

function main() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var frame = null;
    var map = null;
    var minimap = null;
    var peasant = null;
    Promise.all([
        loadImage("images/canvas.png").then((img) => frame = img),
        loadImage("images/campaign_h1.png").then((img) => map = img),
        loadImage("images/minimap.png").then((img) => minimap = img),
        loadImage("images/peasant.png").then((img) => peasant = img),
    ]).then(() => requestAnimationFrame(draw));

    var offsetX = 10, offsetY = 10;
    var then = performance.now();

    const Direction = Object.freeze({
        NORTH:      Object.freeze({x:  0, y: -1, sprite: 0}),
        NORTHEAST:  Object.freeze({x:  1, y: -1, sprite: 1}),
        EAST:       Object.freeze({x:  1, y:  0, sprite: 2}),
        SOUTHEAST:  Object.freeze({x:  1, y:  1, sprite: 3}),
        SOUTH:      Object.freeze({x:  0, y:  1, sprite: 4}),
        SOUTHWEST:  Object.freeze({x: -1, y:  1, sprite: 5}),
        WEST:       Object.freeze({x: -1, y:  0, sprite: 6}),
        NORTHWEST:  Object.freeze({x: -1, y: -1, sprite: 7}),
    });
    const anim = [0, 1, 2, 1, 0, 4, 3, 4];

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
            const progress = (now-this.start)/this.duration;
            this.pos = {x: Math.floor(32*(this.orig.x + (this.dst.x - this.orig.x)*progress)) & 0xFFFFFFFE,
                        y: Math.floor(32*(this.orig.y + (this.dst.y - this.orig.y)*progress)) & 0xFFFFFFFE};
            this.sprite = Math.floor(8*progress);
        }

        isDone(now) {
            return now > this.start + this.duration;
        }
    }

    class Entity {
        constructor(pos) {
            this.pos = {...pos};
            this.bearing = Direction.SOUTH;
            this.sprite = 0;
        }

        draw(ctx) {
            ctx.drawImage(peasant, 64*this.bearing.sprite, 64*anim[this.sprite], 64, 64,
                      144 - 16 + (this.pos.x - offsetX) * 32,
                      24 - 16 + (this.pos.y - offsetY) * 32,
                      64, 64);
        }
    }

    function pos(x, y) {return {x: x, y: y};}

    var p = new Entity(pos(40, 21));

    var pos = {x:0, y:0};
    var move = new Move(pos, Direction.EAST);

    function draw() {
        const now = performance.now();
        fps = 1000/(now - then);
        then = performance.now();
        document.getElementById("dev-info").innerText = "FPS: " + Math.round((fps+ Number.EPSILON)*100)/100;
        ctx.drawImage(frame, 0, 0);
        ctx.drawImage(minimap, 6, 12);
        ctx.drawImage(map, offsetX * 32, offsetY * 32, 480, 352, 144, 24, 480, 352);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#c7c7c7";
        ctx.strokeRect(offsetX*2+6, offsetY*2+12, 29, 21);

        move.update(now);
        if (move.isDone(now)) {
            move = new Move(move.dst, move.bearing === Direction.EAST ? Direction.SOUTHEAST
            : move.bearing === Direction.SOUTHEAST ? Direction.SOUTH
            : move.bearing === Direction.SOUTH ? Direction.SOUTHWEST
            : move.bearing === Direction.SOUTHWEST ? Direction.WEST
            : move.bearing === Direction.WEST ? Direction.NORTHWEST
            : move.bearing === Direction.NORTHWEST ? Direction.NORTH
            : move.bearing === Direction.NORTH ? Direction.NORTHEAST
            : Direction.EAST);
        }
        ctx.drawImage(peasant, 64*move.bearing.sprite, 64*anim[move.sprite], 64, 64,
                      144+16 + move.pos.x,
                      24+16 + move.pos.y,
                      64, 64);

        p.draw(ctx);

        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", function (event) {
        let prevent = true;
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (key) { // change to event.key to key to use the above variable
            case "ArrowLeft":
                if (offsetX > 0) offsetX -= 1;
                break;
            case "ArrowRight":
                if (offsetX < 64-15) offsetX += 1;
                break;
            case "ArrowUp":
                if (offsetY > 0) offsetY -= 1;
                break;
            case "ArrowDown":
                if (offsetY < 64-11) offsetY += 1;
                break;
            default:
                prevent = false;
        }
        if (prevent) event.preventDefault();
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    main();
});
