function loadImage(path) {
    return new Promise(resolve => {
        var img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        }
    });
}

const images = {};

function loadImages() {
    return Promise.all([
        loadImage("images/canvas.png").then((img) => images.frame = img),
        loadImage("images/campaign_h1.png").then((img) => images.map = img),
        loadImage("images/minimap.png").then((img) => images.minimap = img),
        loadImage("images/peasant.png").then((img) => images.peasant = img),
    ]);
}

export {images, loadImages};