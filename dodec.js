var height = $(window).height();
var width = $(window).width();
var farX = width;
var lowY = height;
var scale = 25;
var obsX = 5;
var obsY = 5;
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

$(document).ready(function(){
hill();
requestAnimationFrame(dodec);
/*document.addEventListener('keydown',function(event){
	if(event.keyCode == 38){
		$("#can3").animate({top:"-60px"}).animate({top:"127px"});
	}
});*/
obstacle();
var c3=document.getElementById("can3");
c3.setAttribute("height",height);
c3.setAttribute("width",width);
var ct=c3.getContext("2d");





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
//draw a dodecagon
function dodec(){
	var decSquare = 12*scale;
	var degrees = 2;
	var horizMargin = width-12*scale-5; 
	var vertMargin = height/2-12*scale+25;
	ct.clearRect(0,0,width,height);
	ct.translate(decSquare/2+horizMargin,decSquare/2+vertMargin);
	ct.rotate(-degrees*Math.PI/180);
	ct.translate(-decSquare/2-horizMargin,-decSquare/2-vertMargin);
	ct.save();
	ct.strokeStyle="#E5E4E2";
	ct.beginPath();
	ct.moveTo(12*scale+horizMargin,6*scale+vertMargin);
	ct.lineTo(11*scale+horizMargin,9*scale+vertMargin);
	ct.lineTo(9*scale+horizMargin,11*scale+vertMargin);
	ct.lineTo(6*scale+horizMargin,12*scale+vertMargin);
	ct.lineTo(3*scale+horizMargin,11*scale+vertMargin);
	ct.lineTo(1*scale+horizMargin,9*scale+vertMargin);
	ct.lineTo(0*scale+horizMargin,6*scale+vertMargin);
	ct.lineTo(1*scale+horizMargin,3*scale+vertMargin);
	ct.lineTo(3*scale+horizMargin,1*scale+vertMargin);
	ct.lineTo(6*scale+horizMargin,0*scale+vertMargin);
	ct.lineTo(9*scale+horizMargin,1*scale+vertMargin);
	ct.lineTo(11*scale+horizMargin,3*scale+vertMargin);
	ct.closePath();
	requestAnimationFrame(dodec);
	ct.stroke();
	ct.restore();
	


}//obstacle test
function obstacle(){
	var c = document.getElementById("obs");
	c.setAttribute("height",scale);
	c.setAttribute("width",scale);
    c.style.left=obsX+'px';
    c.style.bottom=obsY+'px';
	var cc = c.getContext('2d');
	cc.strokeStyle="#E5E4E2";
	cc.strokeRect(0,0,scale,scale);
	obsX +=3;
	obsY +=.82;
	if(obsX>1500){
		clearInterval(obs);
	}
}
function colDec(){
	var d = document.getElementById("can3"),
	style = window.getComputedStyle(d),
	dodecHitbox = style.getPropertyValue('top');
}

});

