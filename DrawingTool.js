
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
canvas.started = true;





var Pencil = 1;
var Line = 0;
var Circle = 0;
var BrushSize = 3;

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

function PlusBrushSize(){
	BrushSize++;
	ctx.lineWidth = BrushSize;
}

function MinusBrushSize(){
	BrushSize--;
	ctx.lineWidth = BrushSize;
}

function PickColour(a){
ctx.strokeStyle = a;
}

function UseEraser(){
	IsPencil();
	ctx.strokeStyle = '#ffffff';
	
}

function IsPencil(){
	document.getElementById("button3").style.backgroundColor = "#1e242f";
	document.getElementById("button2").style.backgroundColor = "#6288A5";
	document.getElementById("button5").style.backgroundColor = "#6288A5";
	Pencil = 1;
	Line = 0;
	Circle = 0;
	EraserCheck()
}

function IsLine(){
	document.getElementById("button3").style.backgroundColor = "#6288A5";
	document.getElementById("button2").style.backgroundColor = "#1e242f";
	document.getElementById("button5").style.backgroundColor = "#6288A5";
	Line = 1;
	Pencil = 0;
	Circle = 0;
	EraserCheck()
	}
	
function EraserCheck(){
if(ctx.strokeStyle === '#ffffff'){
		ctx.strokeStyle = '#000000';
	}
}	
	
function IsCircle(){
	document.getElementById("button3").style.backgroundColor = "#6288A5";
	document.getElementById("button2").style.backgroundColor = "#6288A5";
	document.getElementById("button5").style.backgroundColor = "#1e242f";
	Circle = 1;
	Pencil = 0;
	Line = 0;
	EraserCheck()
}	

function ClearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the canvas
	ctxo.clearRect(0, 0, canvas.width, canvas.height);
}

function img_update () {
		ctxo.drawImage(canvas, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  

canvas.addEventListener('mouseout', function(e) {  
e.target.started =  false;
img_update();
}, false);


canvas.addEventListener('mousedown', function(e) {
	e.target.started =  true;
	
	canvas.Currentx = mouse.x;
	 canvas.Currenty = mouse.y;
	 
	if(Pencil){
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint, false);
	}
	
	if(Line){
	
	canvas.addEventListener('mousemove', DrawLine, false);	
		
	}
	
	if(Circle){
		
		canvas.addEventListener('mousemove', drawOval, false);
	}
	
}, false);
 
canvas.addEventListener('mouseup', function(e) {
	if(e.target.started){
	e.target.started = false;
    
	canvas.removeEventListener('mousemove', DrawLine, false);
	canvas.removeEventListener('mousemove', drawOval, false);
	
	canvas.removeEventListener('mousemove', onPaint, false);
	img_update();
	}
}, false);
 
var onPaint = function(e) {
	 if(e.target.started){
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
	 }
};

var DrawLine = function(e) {
    if(e.target.started){
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(e.target.Currentx, e.target.Currenty);
	ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
	ctx.closepath();
}
	
};

var drawOval = function(e){
	if(e.target.started){
		
	 ctx.clearRect(0, 0, canvas.width, canvas.height);
	 ctx.beginPath();
	 ctx.moveTo(e.target.Currentx, e.target.Currenty  + (mouse.y - e.target.Currenty) / 2);
	 ctx.bezierCurveTo(e.target.Currentx, e.target.Currenty, mouse.x, e.target.Currenty, mouse.x , e.target.Currenty + (mouse.y - e.target.Currenty) / 2);
	 ctx.bezierCurveTo(mouse.x, mouse.y, e.target.Currentx, mouse.y, e.target.Currentx, e.target.Currenty + (mouse.y - e.target.Currenty) / 2);
	 ctx.closePath();
	 ctx.stroke();
	} 
 };