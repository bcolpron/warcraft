import Entity from './entity';
import Bot from './bot';
import {images, loadImages} from './images';
import Camera from "./camera";
import Map from "./map";
import Minimap from "./minimap";
import fps from "./devinfo";
import View from './view';
import Game from './game';
import Controller from './controller';

document.addEventListener("DOMContentLoaded", function (event) {
    loadImages().then(ready);
});

function ready() {

    const map = new Map(images.map, 64, 64);
    const camera = new Camera(map, 34, 16);
    const minimap = new Minimap(images.minimap, camera);
    const game = new Game();
    const view = new View(map, minimap, camera, game.entities);
    const controller = new Controller(game, camera);

    game.entities.push(new Entity(images.peasant, 39, 21));
    game.entities.push(new Bot(images.peasant, 35, 18));


    function gameloop() {
        const now = performance.now();
        fps(now);

        game.update(now);

        view.update();

        requestAnimationFrame(gameloop);
    }

    const canvas = document.getElementById("myCanvas");
    canvas.addEventListener('click', function(event) {
        const x = event.pageX - canvas.offsetLeft,
              y = event.pageY - canvas.offsetTop;
        controller.onClick(x,y);
    });

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

    requestAnimationFrame(gameloop);
}
