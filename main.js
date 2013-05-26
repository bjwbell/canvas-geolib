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
  this.color = '#000';
  this.draw = function() {
    var canvas = getCanvas();
    context = canvas.getContext('2d');
    context.strokeStyle = this.color; //black
    //context.fillRect(this.x, this.y, 5, 5);
    // Let's subtract half of the width and height of the fillRect so that it'll look exactly the point where it
    // interesect
    context.fillRect(this.x-2.5, this.y-2.5, 5, 5);

  };
  this.scalarMult = function(scalar){
	  return new Vector(this.x * scalar, this.y * scalar);
  }
  this.dot = function(v2) {
    return this.x * v2.x + this.y * v2.y;
  };
  this.perp = function() {
    return new Vector(-1 * this.y, this.x);
  };
  this.subtract = function(v2) {
    return this.add(v2.scalarMult(-1));//new Vector(this.x - v2.x, this.y - v2.y);
  };
  this.add = function(v2) {
	  return new Vector(this.x + v2.x, this.y + v2.y);
  }
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

// the cross product of vectors v1 and v2.
function cross(v1, v2) {
	return v1.x * v2.y - v2.x * v1.y;
}


/* 
determines if the 3 points, p1, p2, p3 form a strictly right turn (i.e. they can't be collinear)
*/
function rightTurn(var p1, var p2, var p3)
{
	var v1 = p2.subtract(p1);
	var v2 = p3.subtract(p2);
	//returns true of the vector from p2 to p3 is a right turn compared to the vector from p1 to p2.
	if(cross(v1, v2) < 0){
		return true;
	}
	return false;
}


/*
*/

/*
determines if the 3 points, p1, p2, p3 form a strictly left turn (i.e. they can't be collinear)
*/
function leftTurn(var p1, var p2, var p3){
	var v1 = p2.subtract(p1);
	var v2 = p3.subtract(p2);
	//returns true of the vector from p2 to p3 is a left turn compared to the vector from p1 to p2.
	if(cross(v1, v2) > 0){
		return true;
	}
	return false;	
}

/*
	seg1 is represented by p + t * r where  0 <= t <= 1
	seg2 is represented by q + u * s where  0 <= u <= 1
	
	the intersection of line 1 and line 2 is given by 
	p + t*r = q + u*s, 
	let x be the two dimensional cross product then
	(p + t*r) x s = (q + u*s) x s = q x s
	which solving for t gives
	t = (q - p) x s / (r x s).
	similarly solving for u gives
	u = (q - p) x r / (r x s).
	the segments intersect if 0 <= t <= 1 and 0 <= 1 <= u.
	If r x s is zero then the lines are parallel, in which case if 
	(q - p) x r = 0 then the lines are co-linear.
	
*/

//determine if segments [x1, x2] and [x3, x4] intersect
function intersect1d(x1, x2, x3, x4){	
	if((x2 >= x3 || x2 >= x4) && (x1 <= x3 || x1 <= x4)){
		return 1;
	}
	return 0;
}

var epsilon = 10e-6;
var DONT_INTERSECT = 0;
var PARALLEL_DONT_INTERSECT = 1;
var COLLINEAR_DONT_INTERSECT = 2;
var INTERSECT = 3;
var COLLINEAR_INTERSECT = 4;
function intersect(seg1, seg2, intersectionPoint) {
	p = seg1.p1;
	r = seg1.p2.subtract(seg1.p1);
	q = seg2.p1;
	s = seg2.p2.subtract(seg2.p1);
	rCrossS = cross(r, s);
	// line segments are parallel
	if(rCrossS <= epsilon && rCrossS >= -1 * epsilon){
		// line segments are collinear
		if(cross(q.subtract(p), s) <= epsilon && cross(q.subtrac(p), s) >= -1 * epsilon){
			if(intersect1d(seg1.p1.x, seg1.p2.x, seg2.p1.x, seg2.p2.x) == 1){
				return COLLINEAR_INTERSECT;
			}else{
				return COLLINEAR_DONT_INTERSECT;
			}
		}
		return PARALLEL_DONT_INTERSECT;
	}
	t = cross(q.subtract(p), s)/rCrossS;
	u = cross(q.subtract(p), r)/rCrossS;
	if(0 <= u && u <= 1 && 0 <= t && t <= 1){
		intPoint = p.add(r.scalarMult(t));
		intersectionPoint.x = intPoint.x;
		intersectionPoint.y = intPoint.y;
		return INTERSECT;
	}else{
		return DONT_INTERSECT;
	}
}

function mouseDown(ev){
  var canvas = getCanvas();
  context = canvas.getContext('2d');
  debug = 1;

}

function getLine2(){
  return new Segment(new Vector(0, 100), new Vector(150, 50));
}

function drawLine2(){
  var canvas = getCanvas();
  context = canvas.getContext('2d');

}

var debug = 1;

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
  var intersectionPoint = new Vector(0, 0);
  if(intersect(seg1, seg2, intersectionPoint) == INTERSECT){
	  intersectionPoint.color = '#f00';
	  intersectionPoint.draw();
  }
};


