import { Direction, anim } from "./constants";
import Move from './move';
import Entity from './entity';
import Bot from './bot';
import {images, loadImages} from './images';

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

    var viewport = {offsetX: 34, offsetY: 16};
    var p = new Entity(images.peasant, pos(39, 21));
    var bot = new Bot(images.peasant, pos(35,18));

    var then = performance.now();
    function draw() {

        const now = performance.now();
        const fps = 1000/(now - then);
        then = performance.now();
        document.getElementById("dev-info").innerText = "FPS: " + Math.round((fps+ Number.EPSILON)*100)/100;

        ctx.drawImage(images.frame, 0, 0);
        ctx.drawImage(images.map, viewport.offsetX * 32, viewport.offsetY * 32, 480, 352, 144, 24, 480, 352);

        ctx.drawImage(images.minimap, 6, 12);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#c7c7c7";
        ctx.strokeRect(viewport.offsetX*2+6, viewport.offsetY*2+12, 29, 21);

        bot.update(now);
        bot.draw(ctx, viewport);

        p.draw(ctx, viewport);
        bot.draw(ctx, viewport);

        requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", function (event) {
        let prevent = true;
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        switch (key) { // change to event.key to key to use the above variable
            case "ArrowLeft":
                if (viewport.offsetX > 0) viewport.offsetX -= 1;
                break;
            case "ArrowRight":
                if (viewport.offsetX < 64-15) viewport.offsetX += 1;
                break;
            case "ArrowUp":
                if (viewport.offsetY > 0) viewport.offsetY -= 1;
                break;
            case "ArrowDown":
                if (viewport.offsetY < 64-11) viewport.offsetY += 1;
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
