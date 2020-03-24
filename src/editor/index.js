import { loadImages, images } from "../images";

function hash(s) {
    var hash = 0, i, chr;
    for (i = 0; i < s.length; i++) {
        chr   = s.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

class Tiles {
    constructor() {
        this.rows = new Array(64*64);
    }

    get(x,y) {
        return this.rows[y*64+x];
    }

    set(x,y, val) {
        this.rows[y*64 + x] = val;
    }

    filter(val, cb) {
        for(let y=0; y < 64; ++y) {
            for(let x=0; x < 64; ++x) {
                if (this.rows[y*64 + x] === val) cb(x,y);
            }
        }
     }
}

function init() {
    loadImages().then(() => {
        const canvas = document.getElementById("canvas");
        const map = document.getElementsByClassName("map")[0];
        const ctx = canvas.getContext("2d");
        ctx.drawImage(images.map, 0, 0);

        const tiles = new Tiles();
        for(let y=0; y < 64; ++y) {
           for(let x=0; x < 64; ++x) {
                const data = ctx.getImageData(x*32, y*32, 32, 32);
                const h = hash(JSON.stringify(data));
                tiles.set(x, y, h);
            }
        }

        canvas.addEventListener('click', function(event) {
            const x = Math.floor((event.pageX - canvas.offsetLeft + map.scrollLeft)/32),
                  y = Math.floor((event.pageY - canvas.offsetTop + map.scrollTop)/32);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#c7c7c7";
            ctx.drawImage(images.map, 0, 0);
            tiles.filter(tiles.get(x,y), (x,y) => {
                ctx.strokeRect(x*32, y*32, 31, 31);
            });
        });
    });
}

export default {init};