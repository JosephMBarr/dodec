var height = $(window).height();
var width = $(window).width();
var farX = width;
var lowY = height;
var scale = 25;
var obsX = 5;
var obsY = height-scale*2;
var horizMargin = width-12*scale-5; 
var vertMargin = height/2-12*scale+25;
var move = 0;
var change = 0;
var boopmeter=0;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

$(document).ready(function(){
hill();
requestAnimationFrame(animate);
//obstacle/boulder canvas
var c3=document.getElementById("can3");
c3.setAttribute("height",height);
c3.setAttribute("width",width);
var ct=c3.getContext("2d");
function animate(){
	dodec();
	requestAnimationFrame(animate);
}




//draw hill down which boulder will roll as well as background
function hill(){
	var c2=document.getElementById("can2");
	var ctx2=c2.getContext("2d");
	c2.setAttribute("height",height);
	c2.setAttribute("width",width);
	ctx2.fillStyle="#151B54";
	ctx2.fillRect(0,0,farX,lowY);
	ctx2.strokeStyle="#E5E4E2";
	ctx2.beginPath();
	ctx2.moveTo(farX, lowY/2)
	ctx2.lineTo(0,lowY);
	ctx2.stroke();
}
function drawDodec(){
	ct.strokeStyle="#E5E4E2";
	ct.beginPath();
	ct.moveTo(12*scale+horizMargin+move,6*scale+vertMargin+move);
	ct.lineTo(11*scale+horizMargin+move,9*scale+vertMargin+move);
	ct.lineTo(9*scale+horizMargin+move,11*scale+vertMargin+move);
	ct.lineTo(6*scale+horizMargin+move,12*scale+vertMargin+move);
	ct.lineTo(3*scale+horizMargin+move,11*scale+vertMargin+move);
	ct.lineTo(1*scale+horizMargin+move,9*scale+vertMargin+move);
	ct.lineTo(0*scale+horizMargin+move,6*scale+vertMargin+move);
	ct.lineTo(1*scale+horizMargin+move,3*scale+vertMargin+move);
	ct.lineTo(3*scale+horizMargin+move,1*scale+vertMargin+move);
	ct.lineTo(6*scale+horizMargin+move,0*scale+vertMargin+move);
	ct.lineTo(9*scale+horizMargin+move,1*scale+vertMargin+move);
	ct.lineTo(11*scale+horizMargin+move,3*scale+vertMargin+move);
	ct.lineTo(12*scale+horizMargin+move,6*scale+vertMargin+move);
	if(ct.isPointInPath(obsX,obsY) && boopmeter == 0){
 		alert('boop');
		boopmeter=1;
	}
	ct.stroke();
	move += change;
	if(move<-70){
		change = 4;
	}
	if(move == 0){
		change = 0;
	}
}
function dodec(){
	var decSquare = 12*scale;
	var degrees = 2;
	ct.clearRect(-width,-height,width*2,height*2);
	obs();
	ct.save();
	drawDodec();
	ct.translate(decSquare/2+horizMargin,decSquare/2+vertMargin);
	ct.rotate(-degrees*Math.PI/180);
	ct.translate(-decSquare/2-horizMargin,-decSquare/2-vertMargin);
	ct.restore();
	document.addEventListener('keydown',function(event){
		var thekey=event.keyCode;
		if(thekey == 38 && change == 0){
			change = -4;
		}
	});
}
function obs(){
    ct.strokeStyle="#E5E4E2";
	ct.strokeRect(obsX,obsY,scale,scale);
	obsX += 3;
	obsY -= .8;
	if (obsX>farX){
		obsX = 5;
		obsY = height-scale*2;
	}
	
}

});

