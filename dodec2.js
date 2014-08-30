var height = $(window).height();
var width = $(window).width();
var farX = width;
var lowY = height;
var scale = 25;
var time = 0
var timeout = 0
setInterval(function () {time+=1}, 1000); //this sets a timer that counts off seconds
$(document).ready(function(){
background();
hill();
dodec();
document.addEventListener('keydown',function(event){
	if(event.keyCode == 38 && timeout<(time-0.5)){ //if less than 0.5 seconds have passed, don't jump
		$("#can3").animate({top:"-60px"}).animate({top:"127px"});
		timeout = time
	}
});





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
	var move=0;
	var c3=document.getElementById("can3");
	c3.setAttribute("height",12*scale);
	c3.setAttribute("width",12*scale);
	var ct=c3.getContext("2d");
	ct.strokeStyle="#E5E4E2";
	ct.beginPath();
	ct.moveTo(12*scale,6*scale+move);
	ct.lineTo(11*scale,9*scale+move);
	ct.lineTo(9*scale,11*scale+move);
	ct.lineTo(6*scale,12*scale+move);
	ct.lineTo(3*scale,11*scale+move);
	ct.lineTo(1*scale,9*scale+move);
	ct.lineTo(0*scale,6*scale+move);
	ct.lineTo(1*scale,3*scale+move);
	ct.lineTo(3*scale,1*scale+move);
	ct.lineTo(6*scale,0*scale+move);
	ct.lineTo(9*scale,1*scale+move);
	ct.lineTo(11*scale,3*scale+move);
	ct.closePath();
	ct.stroke();
	move+=1;

}

});

