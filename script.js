var cvs = document.createElement('canvas'),
    context = cvs.getContext("2d");
document.body.appendChild(cvs);

cvs.style.background = "transparent";

var numDots = 17200,
    n = numDots,
    currDot,
    maxRad = 200,
    minRad = 120,
    radDiff = maxRad - minRad,
    dots = [],
    PI = Math.PI,
    centerPt = { x: 0, y: 0 };

resizeHandler();
window.onresize = resizeHandler;

while (n--) {
    currDot = {};
    currDot.radius = minRad + Math.random() * radDiff;
    currDot.ang = (1 - Math.random() * 1.5) * PI;
    currDot.speed = (1 - Math.random() * 3) * 0.005;
    currDot.intensity = Math.round(Math.random() * 255);
    currDot.fillColor = "rgb(" + currDot.intensity + "," + currDot.intensity + "," + currDot.intensity + ")";
    dots.push(currDot);
}

function drawPoints() {
    n = numDots;
    var _centerPt = centerPt,
        _context = context,
        dX = 0,
        dY = 0;

    _context.clearRect(0, 0, cvs.width, cvs.height);

    while (n--) {
        currDot = dots[n];
        dX = _centerPt.x + Math.sin(currDot.ang) * currDot.radius;
        dY = _centerPt.y + Math.cos(currDot.ang) * currDot.radius;

        currDot.ang += currDot.speed;

        _context.fillStyle = currDot.fillColor;
        _context.fillRect(dX, dY, 1, 1);
    } 
    window.requestAnimationFrame(drawPoints);
}

function resizeHandler() {
    var box = cvs.getBoundingClientRect();
    var w = box.width;
    var h = box.height;
    cvs.width = w;
    cvs.height = h;
    centerPt.x = Math.round(w / 2);
    centerPt.y = Math.round(h / 2);
}

drawPoints();

var circle = document.querySelector('.circle');

circle.appendChild(cvs);
