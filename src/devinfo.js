
var then = performance.now();

export default function fps(now) {
    const fps = 1000/(now - then);
    then = performance.now();
    document.getElementById("dev-info").innerText = "FPS: " + Math.round((fps+ Number.EPSILON)*100)/100;
}