var width = 800;
var height = 600;
var points = new Array();
points.push([100, 100]);
points.push([200, 200]);
points.push([300, 50]);
//points.push([2, 0]);

function getCanvas() {
  return document.getElementById('canvas');
}

window.addEventListener('load', function() {
			  var canvas = getCanvas();
			  if(canvas && canvas.getContext) {
				  initCanvas();
			  }
			  canvas.addEventListener('mousemove', mouseMove, false);
			  canvas.addEventListener('mousedown', mouseDown, false);


}, false);

function getEventXCoord(ev){
 if(ev.layerX){ //Firefox
   return ev.layerX;
 }
 return ev.offsetX; //Opera
}
function getEventYCoord(ev){
 if(ev.layerY){ //Firefox
   return ev.layerY;
 }
 return ev.offsetY; //Opera
}

function initCanvas(){
	var canvas = getCanvas();
	context = canvas.getContext('2d');
	context.fillStyle = '#fff';
	context.fillRect(0, 0, width, height);
	context.fillStyle = '#fff'; //white
	context.strokeStyle = '#000'; //black
	context.lineWidth = 4;
	drawEnclosingDisk();
}

function drawEnclosingDisk() {
    var canvas = getCanvas();
    context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
	
    for(var i = 0; i < points.length; i++){
	var p = new Vector(points[i][0], points[i][1]);
	p.color = '#000';
	p.size = 10;
	p.draw(canvas);
    }
    // compute the smallest disk enclosing the points
    var disk = enclosingDisk(points)
    var x = disk[0][0];
    var y = disk[0][1];
    var r = disk[1];
    context.beginPath();
    context.arc(x, 600 - y, r, 0, 2 * Math.PI);
    context.stroke();
}


function mouseDown(ev){	
	var x = getEventXCoord(ev);
	var y = getEventYCoord(ev);
	y = 600 - y;
	points.push([x, y]);
	drawEnclosingDisk();
}

function getLine2(){
  return new Segment(new Vector(0, 100), new Vector(150, 50));
}

var debug = 1;

function mouseMove(ev) {
};


