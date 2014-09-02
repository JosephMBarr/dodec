var height = $(window).height();
var width = $(window).width();
var farX = width;
var lowY = height;
var scale = 25;
var obsX = 5;
var obsY = 5;

$(document).ready(function(){
background();
hill();
dodec();
document.addEventListener('keydown',function(event){
	if(event.keyCode == 38){
		$("#can3").animate({top:"-60px"}).animate({top:"127px"});
	}
});
obstacle();





//draw hill down which boulder will roll
function hill(){
	var c2=document.getElementById("can2");
	var ctx2=c2.getContext("2d");
	c2.setAttribute("height",height);
	c2.setAttribute("width",width);
	ctx2.strokeStyle="#E5E4E2";
	ctx2.beginPath();
	ctx2.moveTo(farX, lowY/2)
	ctx2.lineTo(0,lowY);
	ctx2.stroke();
}
//draw background
function background(){
	var c=document.getElementById("can1");
	var ctx=c.getContext("2d");
	c.setAttribute("height",height);
	c.setAttribute("width",width);
	ctx.fillStyle="#151B54";
	ctx.fillRect(0,0,farX,lowY);

}
//draw a dodecagon
function dodec(){

	var c3=document.getElementById("can3");
	c3.setAttribute("height",12*scale);
	c3.setAttribute("width",12*scale);
	var ct=c3.getContext("2d");
	ct.strokeStyle="#E5E4E2";
	ct.beginPath();
	ct.moveTo(12*scale,6*scale);
	ct.lineTo(11*scale,9*scale);
	ct.lineTo(9*scale,11*scale);
	ct.lineTo(6*scale,12*scale);
	ct.lineTo(3*scale,11*scale);
	ct.lineTo(1*scale,9*scale);
	ct.lineTo(0*scale,6*scale);
	ct.lineTo(1*scale,3*scale);
	ct.lineTo(3*scale,1*scale);
	ct.lineTo(6*scale,0*scale);
	ct.lineTo(9*scale,1*scale);
	ct.lineTo(11*scale,3*scale);
	ct.closePath();
	ct.stroke();

}
//obstacle test
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
var obs = setInterval(obstacle,16);
var dis = setInterval(colDec,50);
function colDec(){
	var d = document.getElementById("can3"),
	style = window.getComputedStyle(d),
	dodecHitbox = style.getPropertyValue('top');
	
	var o = document.getElementById("obs"),
	style = window.getComputedStyle(o),
	obsHitbox = style.getPropertyValue(
}

});

