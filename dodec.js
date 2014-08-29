$(document).ready(function(){
background();
hill();


function hill(){
	var c2=document.getElementById("can2");
	var ctx2=c2.getContext("2d");
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
	ctx.fillStyle="#151B54";
	ctx.fillRect(0,0,700,700);

}

});
