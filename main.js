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

function Vector(x, y){
  this.x = x;
  this.y = y;
  this.draw = function() {
    var canvas = getCanvas();
    context = canvas.getContext('2d');
    context.strokeStyle = '#000'; //black
    context.fillRect(this.x, this.y, 5, 5);

  };
  this.dot = function(v2) {
    return this.x * v2.x + this.y * v2.y;
  };
  this.perp = function() {
    return new Vector(-1 * this.y, this.x);
  };
  this.subtract = function(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
  };
}

function Segment(p1, p2){
  //alert('s1');
  this.p1 = p1;
  this.p2 = p2;
  //alert('s2');
  this.draw = function() {
    //alert('s3');
    var canvas = getCanvas();
    context = canvas.getContext('2d');
    context.strokeStyle = '#000'; //black
    context.lineWidth = 4;
    //alert('s4');
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    //alert('s5');
    context.closePath();
    context.stroke();
    //alert('s6');
  };

}

function intersect(seg1, seg2) {

}

function mouseDown(ev){
  var canvas = getCanvas();
  context = canvas.getContext('2d');

}

function getLine2(){
  return new Segment(new Vector(0, 100), new Vector(150, 50));
}

function drawLine2(){
  var canvas = getCanvas();
  context = canvas.getContext('2d');

}

function mouseMove(ev) {
  //alert('t3');
  var canvas = getCanvas();
  context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#f00'; //red
  //alert('t3.5');
  context.strokeStyle = '#000'; //green
  context.lineWidth = 4;
  //context.beginPath();
  //alert('t3.75');
  //context.moveTo(0, 0);
  //alert('t3.95');
  var x = getEventXCoord(ev);
  var y = getEventYCoord(ev);
  //context.lineTo(x, y);
  //alert('t4');
  //context.closePath();
  //alert('t5');
  //context.fill();
  //alert('t6');
  //context.stroke();
  //alert('t7');
  //alert('b1');
  var seg1 = new Segment(new Vector(0, 0), new Vector(x, y));
  //alert('b2');
  seg1.draw();

  var seg2 = new Segment(new Vector(0, 100), new Vector(100, 50));
  seg2.draw();
};


