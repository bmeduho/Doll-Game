var canvas = document.createElement('canvas');
canvas.id = "ui";
document.body.appendChild(canvas);
var gEBI = document.getElementById('ui')
var gCtx = gEBI.getContext("2d");
gEBI.style.color = "blue";
gEBI.width = window.innerWidth;
gEBI.height = window.innerHeight;
gEBI.style.position = "absolute";
gEBI.style.zIndex = "100";
gCtx.font = "30px Comic Sans MS";
gCtx.fillStyle = "red";
gCtx.textAlign = "center";


var healthReady = 0;
var healthImage = [new Image(), new Image(), new Image(), new Image()];
healthImage[0].onload = function () {
	healthReady += 1;
};
healthImage[1].onload = function () {
	healthReady += 1;
};
healthImage[2].onload = function () {
	healthReady += 1;
};
healthImage[3].onload = function () {
	healthReady += 1;
};
healthImage[0].src = "../../Visuals/2D/HealthThree.png";
healthImage[1].src = "../../Visuals/2D/HealthTwo.png";
healthImage[2].src = "../../Visuals/2D/HealthOne.png";
healthImage[3].src = "../../Visuals/2D/HealthEmpty.png";