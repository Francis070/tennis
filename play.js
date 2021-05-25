var c;
var ctx;
var fps = 70;
var pad_h = 60;
var pad_w = 10;
var rad = 10;
var paddle1y = 220;
var paddle2y = 220;
var ballx = 500;
var bally = 250;
var ballSpeedx = 5;
var ballSpeedy = 5;

var player1Score = 0;
var player2Score = 0;
var winScore = 4;

var showWinScreen = false;

window.onload = function(){
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");

	// drawEverything();
	setInterval(function(){
		moveEverything();
		drawEverything();
	}, 1000/fps);

	c.addEventListener('mousedown', handleMouseClick);

	c.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			paddle1y = mousePos.y - (pad_h/2);
		});
}

function handleMouseClick(evt) {
	if(showWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showWinScreen = false;
	}
}

function calculateMousePos(evt) {
	var rect = c.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function computerMovement(){
	var paddle2Center = paddle2y + pad_h/2;
	if((bally - 30) > paddle2Center)
		paddle2y += 7;
	else if((bally + 25) < paddle2Center)
		paddle2y -= 30;
}

function moveEverything(){
	if(showWinScreen) {
		return;
	}

	computerMovement();

	ballx += ballSpeedx;
	bally += ballSpeedy;

	if(ballx + rad > c.width){
		// ballSpeedx = -ballSpeedx;
		if(bally > paddle2y && bally < paddle2y + pad_h){
			ballSpeedx = -ballSpeedx;
			var del = bally - (paddle2y + pad_h/2);
			ballSpeedy = del * 0.35;
		}
		else{
			player1Score++;
			ballReset();
		}
	}

	if(ballx - rad < 0){
		// ballSpeedx = -ballSpeedx;
		if(bally > paddle1y && bally < paddle1y + pad_h){
			ballSpeedx = -ballSpeedx;
			var del = bally - (paddle1y + pad_h/2);
			ballSpeedy = del * 0.35;
		}
		else{
			player2Score++;
			ballReset();
		}
	}

	if(bally + rad > c.height)
		ballSpeedy = -ballSpeedy;
	if(bally - rad < 0)
		ballSpeedy = -ballSpeedy;
}

function drawEverything(){
	colorRect(0, 0, c.width, c.height, "#4a1c40");
	drawCourt();

	if(showWinScreen) {
		ctx.fillStyle = 'white';

		if(player1Score >= winScore) {
			ctx.fillText("Left Player Won", c.width/8, c.height/4);
		} else if(player2Score >= winScore) {
			ctx.fillText("Right Player Won", 7 * (c.width/8), c.height/4);
		}

		ctx.fillText("click to continue", c.width/2, 300);
		return;
	}

	colorRect(0, paddle1y, pad_w, pad_h, "#d99879");
	colorRect(c.width - pad_w, paddle2y, pad_w, pad_h, "#e798ae");
	colorCircle(ballx, bally, rad, "#f7fd04");

	ctx.fillText(player1Score, 100, 100);
	ctx.fillText(player2Score, c.width-100, 100);
}

function ballReset() {
	if(player1Score >= winScore ||
		player2Score >= winScore) {

		showWinScreen = true;

	}

	ballSpeedx = -ballSpeedx;
	ballx = c.width/2;
	bally = c.height/2;
}

function drawCourt(){

	colorRect(c.width/2 - 2.5, 0, 5, c.height, "#00adb5");

	colorRect(0, 65, c.width, 5, "#00adb5");

	colorRect(0, c.height - 70, c.width, 5, "#00adb5");

	colorRect(0, c.height - 70, c.width, 5, "#00adb5");

	colorRect(c.width/4 - 2.5, 70, 5, c.height - 140, "#00adb5");

	colorRect(3 * c.width/4 - 2.5, 70, 5, c.height - 140, "#00adb5");

	colorRect(c.width/4, c.height/2 - 2.5, c.width/2, 5, "#00adb5");
}

function colorRect(topx, topy, width, height, color){
	ctx.fillStyle = color;
	ctx.fillRect(topx, topy, width, height);
}

function colorCircle(x, y, rad, color){
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, rad, 0, 2 * Math.PI);
	ctx.fill();
}
