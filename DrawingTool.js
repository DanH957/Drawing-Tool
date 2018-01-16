
var canvas, ctx, canvaso, ctxo;


 canvaso = document.getElementById('canvas2');
 ctxo = canvaso.getContext('2d');
 
 
 canvas = document.getElementById('myCanvas');
 ctx = canvas.getContext('2d');
 
 
 
 
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvaso.width = 640;
canvaso.height = 480;

canvas.width = 640;
canvas.height = 480;
canvas.started = false;




var Pencil = 1;
var Line = 0;

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function PickColour(a){
ctx.strokeStyle = a;
}

function IsPencil(){
	document.getElementById("button3").style.backgroundColor = "#1e242f";
	Pencil = 1;
	Line = 0;
}

function IsLine(){
	Line = 1;
	Pencil = 0;
	}

function ClearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
	ctxo.clearRect(0, 0, canvas.width, canvas.height);
}

function img_update () {
		ctxo.drawImage(canvas, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


canvas.addEventListener('mousedown', function(e) {
	
	canvas.Currentx = mouse.x;
	 canvas.Currenty = mouse.y;
	if(Pencil){
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
	}
	
	if(Line){
	e.target.started =  true;
	
	 var stPoint = new Point(e.PageX, e.PageY);
	canvas.addEventListener('mousemove', DrawLine, false);	
		
	}
	
}, false);
 
canvas.addEventListener('mouseup', function(e) {
	if(e.target.started){
	e.target.started = false;
    
	canvas.removeEventListener('mousemove', DrawLine, false);
	}
	canvas.removeEventListener('mousemove', onPaint, false);
	img_update();
}, false);
 
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

var DrawLine = function(e) {
    if(!e.target.started){
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(e.target.Currentx, e.target.Currenty);
	ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
	ctx.closepath();
	
};