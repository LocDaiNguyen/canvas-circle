var canvas = document.getElementById("myCanvas");
var c = canvas.getContext('2d');

var timer;
var mouseX;
var mouseY;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var maxRadius = 35;

canvas.onmousemove = function(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function Circle(xCord, yCord, radius) {
	var randomNumber = Math.floor((Math.random() * 4));
	var randomTrueOrFalse = Math.floor(Math.random() * 2);

	this.xCord = xCord;
	this.yCord = yCord;
	this.radius = radius;
	this.color = colorArray[randomNumber];

	if (randomTrueOrFalse == 1) {
		this.xVelocity = -Math.random() * 1;
	} else {
		this.xVelocity = Math.random() * 1;
	}

	if (randomTrueOrFalse == 1) {
		this.yVelocity = -Math.random() * 1;
	} else {
		this.yVelocity = Math.random() * 1;
	}

// As distance gets closer to 0, increase radius

	this.update = function() {
		this.xCord += this.xVelocity;
		var xDistance = mouseX - this.xCord;
		var yDistance = mouseY - this.yCord;
		var originalRadius = radius;
		this.yCord += this.yVelocity;

		// Movement Functions
		if (this.xCord + this.radius > canvasWidth || this.xCord - this.radius < 0) {
			this.xVelocity = -this.xVelocity;
		};	
		if (this.yCord + this.radius > canvasHeight || this.yCord - this.radius < 0) {
			this.yVelocity = - this.yVelocity;	
		};

		// Radius Decrease Functions
			// When distance between circle center and mouse on horizontal axis is less than 50, increase radius until it is equal to 35
		if (
      xDistance < 50 &&
      xDistance > -50 &&
      this.radius < maxRadius &&
      yDistance < 50 &&
      yDistance > -50
    ) {
			this.radius += 2;
		}
		else if (
      (xDistance >= 50 && originalRadius < this.radius) ||
      (xDistance <= -50 && originalRadius < this.radius) ||
      (yDistance >= 50 && originalRadius < this.radius) ||
      (yDistance <= -50 && originalRadius < this.radius)
    ) {
			this.radius -= 2; 
		};

		this.draw();

	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.xCord, this.yCord, Math.abs(this.radius), 0, Math.PI * 2)
		c.fillStyle = this.color;
		c.fill();
	}
}

var colorArray = ['#272F32', '#9DBDC6', '#00BFFF', '#DAEAEF'];
var circleArray = [];

for (var i = 0; i < 800; i++) {
	var randomxCord = Math.random() * canvasWidth;
	var randomyCord = Math.random() * canvasHeight;
	var randomRadius = Math.random() * 5;
    circleArray.push(new Circle(randomxCord,randomyCord ,randomRadius))
}



function updateAll() {
	c.clearRect(0,0, canvasWidth, canvasHeight);
	for (var i = 0; i < circleArray.length; i++) {
			circleArray[i].update();
		}
	window.requestAnimationFrame(updateAll);
}

updateAll();