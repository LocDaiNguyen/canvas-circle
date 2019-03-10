var canvas = document.getElementById('myCanvas')
var c = canvas.getContext('2d')

var timer
var mouseX
var mouseY

canvas.height = window.innerHeight
canvas.width = window.innerWidth

var canvasHeight = canvas.height
var canvasWidth = canvas.width

var maxRadius = 35

canvas.onmousemove = function(e) {
  mouseX = e.clientX
  mouseY = e.clientY
}

windown.addEventListener('resize', function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

function Circle(xCord, yCord, radius) {
  var randomNumber = Math.floor((Math.random() * 4))
  var randomTrueOrFalse = Math.floor(Math.random() * 2)
  var randomTrueOrFalseTwo = Math.floor(Math.random() * 2)

  this.xCord = xCord
  this.yCord = yCord
  this.radius = radius
  this.color = colorArray[randomNumber]

  if (randomTrueOrFalse == 1) {
    this.xVelocity = -Math.random() * 1
  } else {
    this.xVelocity = Math.random() * 1
  }

  if (randomTrueOrFalse == 1) {
    this.yVelocity = -Math.random() * 1
  } else {
    this.yVelocity = Math.random() * 1
  }

  this.update = function() {
    this.xCord += this.xVelocity
    var xDistance = mouseX - this.xCord
    var yDistance = mouseY - this.yCord
    var originalRadius = radius
    this.yCord += this.yVelocity

    if (this.xCord + this.radius > canvasWidth || this.xCord - this.radius < 0) {
      this.xVelocity = -this.xVelocity
    }
    if (this.yCord + this.radius > canvasHeight || this.yCord - this.radius < 0) {
      this.yVelocity = -this.yVelocity
    }

    if (
      xDistance < 50 &&
      xDistance > -50 &&
      this.radius < maxRadius &&
      yDistance < 50 &&
      yDistance > -50
    ) {
      this.radius += 2
    }
    else if (
      (xDistance >= 50 && originalRadius < this.radius) ||
      (xDistance <= -50 && originalRadius < this.radius) ||
      (yDistance >= 50 && originalRadius < this.radius) ||
      (yDistance <= -50 && originalRadius < this.radius)
    ) {
      this.radius -= 2;
    }

    this.draw()
  }


  
}