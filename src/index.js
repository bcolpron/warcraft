import { Direction, anim } from "./constants";
import Move from './move';
import Entity from './entity';
import Bot from './bot';
import {images, loadImages} from './images';
import Camera from "./camera";
import Map from "./map";

function pos(x, y) {return {x: x, y: y};}

function main() {
    loadImages().then(ready);
}

function ready() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    canvas.addEventListener('click', function(event) {
        const x = event.pageX - canvas.offsetLeft,
              y = event.pageY - canvas.offsetTop;
        console.log(x,y);
    });

    const map = new Map(images.map, 64, 64);
    const camera = new Camera(map, 34, 16);

    var p = new Entity(images.peasant, pos(39, 21));
    var bot = new Bot(images.peasant, pos(35,18));

    var then = performance.now();
    function draw() {

        const now = performance.now();
        const fps = 1000/(now - then);
        then = performance.now();
        document.getElementById("dev-info").innerText = "FPS: " + Math.round((fps+ Number.EPSILON)*100)/100;

        ctx.drawImage(images.frame, 0, 0);
        ctx.drawImage(images.map, camera.x * 32, camera.y * 32, 480, 352, 144, 24, 480, 352);

        ctx.drawImage(images.minimap, 6, 12);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#c7c7c7";
        ctx.strokeRect(camera.x*2+6, camera.y*2+12, 29, 21);

        bot.update(now);
        bot.draw(ctx, camera);

        p.draw(ctx, camera);

        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", function (event) {
        let prevent = true;
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (key) { // change to event.key to key to use the above variable
            case "ArrowLeft":
                camera.panLeft();
                break;
            case "ArrowRight":
                camera.panRight();
                break;
            case "ArrowUp":
                camera.panUp();
                break;
            case "ArrowDown":
                camera.panDown();
                break;
            default:
                prevent = false;
        }
        if (prevent) event.preventDefault();
    });

    requestAnimationFrame(draw);
}

document.addEventListener("DOMContentLoaded", function (event) {
    main();
});
