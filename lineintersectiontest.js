


var width = 800;
var height = 600;



function getCanvas() {
  return document.getElementById('canvas');
}

window.addEventListener('load', function() {
			  var canvas = getCanvas();
			  if(canvas && canvas.getContext) {
			    var context = canvas.getContext('2d');
			    if (context) {
			      context.fillStyle = '#fff';
			      context.fillRect(0, 0, width, height);
			    }
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


function mouseDown(ev){
  var canvas = getCanvas();
  context = canvas.getContext('2d');
  debug = 1;

}

function getLine2(){
  return new Segment(new Vector(0, 100), new Vector(150, 50));
}

var debug = 1;

function mouseMove(ev) {
	if(debug == 1){
	//alert('t3');
	}
  var canvas = getCanvas();
  context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#f00'; //red
  if(debug == 1){
  //alert('t3.5');
  }
  context.strokeStyle = '#000'; //green
  context.lineWidth = 4;
  //context.beginPath();
  //alert('t3.75');
  //context.moveTo(0, 0);
  //alert('t3.95');
  var x = getEventXCoord(ev);
  var y = getEventYCoord(ev);
  //context.lineTo(x, y);
  if(debug == 1){
	 // alert('t4');
  }
  //context.closePath();
  //alert('t5');
  //context.fill();
  //alert('t6');
  //context.stroke();
  //alert('t7');
  //alert('b1');
 // var v = new Vector(0, 0);
  var seg1 = new Segment(new Vector(0, 0), new Vector(x, y));
  if(debug == 1){
  //alert('b2');
  debug = 0;
  }
  seg1.draw(getCanvas());

  var seg2 = new Segment(new Vector(0, 100), new Vector(100, 50));
  seg2.draw(getCanvas());
  var intersectionPoint = new Vector(0, 0);
  if(intersect(seg1, seg2, intersectionPoint) == INTERSECT){
	  intersectionPoint.color = '#f00';
	  intersectionPoint.draw(getCanvas());
  }
};


