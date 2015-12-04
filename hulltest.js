var width = 800;
var height = 600;
var points = new Array();
points.push(new Vector(100, 100));
points.push(new Vector(400, 100));
points.push(new Vector(350, 400));
points.push(new Vector(100, 400));
points.push(new Vector(250, 300));

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
	drawConvexHull();
}

function drawConvexHull() {
    var canvas = getCanvas();
    var i = 0;
    var seg;
    context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);
	
    hull = convexHull(points);
    for(i = 0; i < hull.length - 1; i++){
	seg = new Segment(hull[i], hull[i + 1]);
	seg.draw(canvas);
    }
    seg = new Segment(hull[0], hull[hull.length - 1]);
    seg.draw(canvas);
    for(i = 0; i < points.length; i++){
	points[i].color = '#000';	
	points[i].size = 10;
	points[i].draw(canvas);
    }
}


function mouseDown(ev){	
	var x = getEventXCoord(ev);
	var y = getEventYCoord(ev);
	y = 600 - y;
	points.push(new Vector(x, y));
	drawConvexHull();			
}

function getLine2(){
  return new Segment(new Vector(0, 100), new Vector(150, 50));
}

var debug = 1;

function mouseMove(ev) {
  /*var canvas = getCanvas();
  context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#f00'; //red

  context.strokeStyle = '#000'; //green
  context.lineWidth = 4;
  var x = getEventXCoord(ev);
  var y = getEventYCoord(ev);
  var p1 = new Vector(0, 200);
  var p2 = new Vector(150, 150);
  var p3 = new Vector(x, y);
  var seg1 = new Segment(p2, p3);
  var seg2 = new Segment(p1, p2);
  if(leftTurn(p1, p2, p3)){
	  seg1.color = '#f00';
	  seg2.color = '#f00';
  }
  seg1.draw(getCanvas());

  seg2.draw(getCanvas());*/
}


