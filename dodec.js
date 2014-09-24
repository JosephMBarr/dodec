var height = $(window).height();
var width = $(window).width();
var scale = 25;
var obsHeight = scale;
var obsWidth = scale;
var obsX = 5;
var obsY = height-scale;
var horizMargin = (width)-(12*scale-5); 
var a = (12*scale);
var vertMargin = 0;
var move = 0;
var change = 1;
var score = 0;
var lives = 3;
var obsChange = 1;
var randobs = 1;
var inPos = 0;


window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

$(document).ready(function(){
hill();
splash();
//obstacle/boulder canvas
var c3=document.getElementById("can3");
c3.setAttribute("height",height);
c3.setAttribute("width",width);
var ct=c3.getContext("2d");
ct.font="40px Lucida Console";
ct.fillStyle='#E5E4E2';


function animate(){
	dodec();
        if(localStorage.getItem('hiscore') == null){
                localStorage.setItem('hiscore',0);
        }
	text();
	if(lives != 0){
		requestAnimationFrame(animate);
		if(score > hiscore){
			localStorage.setItem('hiscore',score);
		}
	}else{
		ct.clearRect(-width,-height,width*2,height*2);
		splash();
	}
}
var hiscore = localStorage.getItem('hiscore');


//draw hill down which boulder will roll as well as background
function hill(){
	var c2=document.getElementById("can2");
	var ctx2=c2.getContext("2d");
	c2.setAttribute("height",height);
	c2.setAttribute("width",width);
	ctx2.fillStyle="#151B54";
	ctx2.fillRect(0,0,width,height);
}
function text(){
	ct.fillText(score+" pts",100,100);
	ct.fillText(lives+" lives",300,100);
	ct.fillText("High score: "+hiscore,500,100);
}
function drawDodec(){
	ct.strokeStyle="#E5E4E2";
	ct.beginPath();
	ct.moveTo(12*scale+horizMargin,6*scale+vertMargin+move);
	ct.lineTo(11*scale+horizMargin,9*scale+vertMargin+move);
	ct.lineTo(9*scale+horizMargin,11*scale+vertMargin+move);
	ct.lineTo(6*scale+horizMargin,12*scale+vertMargin+move);
	ct.lineTo(3*scale+horizMargin,11*scale+vertMargin+move);
	ct.lineTo(1*scale+horizMargin,9*scale+vertMargin+move);
	ct.lineTo(0*scale+horizMargin,6*scale+vertMargin+move);
	ct.lineTo(1*scale+horizMargin,3*scale+vertMargin+move);
	ct.lineTo(3*scale+horizMargin,1*scale+vertMargin+move);
	ct.lineTo(6*scale+horizMargin,0*scale+vertMargin+move);
	ct.lineTo(9*scale+horizMargin,1*scale+vertMargin+move);
	ct.lineTo(11*scale+horizMargin,3*scale+vertMargin+move);
	ct.closePath();
	ct.fill();
	ct.beginPath();
	ct.moveTo(width, height/2)
	ct.lineTo(0,height);
	ct.stroke();
	move += change;
	if(inPos == 0 && ct.isPointInPath(6*scale+horizMargin,12*scale+vertMargin+move)){
			console.log(inPos);
			inPos = 1;
			change = 0;
	}
	if(move<-110){
		change = 3;
	}
	if(move == 0 && inPos == 1){
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
	ct.restore();
	document.addEventListener('keydown',function(event){
		var thekey=event.keyCode;
		if(thekey == 38 && change == 0){
			change = -3;
		}
	});
}
function obs(){
    ct.strokeStyle="#E5E4E2";
    	if(randobs==1){
    		randobs = 0
    		obsWidth = Math.floor((Math.random() * 40) + 25);
    		obsHeight = Math.floor((Math.random() * 40) + 25);
    		obsX = 0;
		obsY = height-obsHeight
    	}
	ct.fillRect(obsX,obsY,obsHeight,obsWidth);
	obsX += width*obsChange/400;
	obsY -= height*obsChange/800;
        if(ct.isPointInPath(obsX+obsWidth,obsY)){
		if(obsChange>1){
 		        obsChange-=1;
		}
 		if(lives == 0){
 			ct.clearRect(-width,-height,width*2,height*2);
 			splash();
                        
 		}
 		lives -= 1;
		randobs=1

	}
	if (obsX>width){
			score += 1;
			obsChange = Math.sqrt(score+1);
			randobs=1
	}
	
}

function splash(){
        move = 0;
        change = 0;
        score = 0;
        lives = 3;
        obsChange = 1;
        randobs = 1;
	var splashCanvas=document.getElementById("splash");
	splashCanvas.setAttribute("height",height);
	splashCanvas.setAttribute("width",width);
	var sct = splashCanvas.getContext("2d");
	sct.font="70px Lucida Console";
	sct.fillStyle='#E5E4E2';
	sct.strokeStyle='#E5E4E2';
	sct.lineWidth=5;
	function clickHandler(event){
		clickX = event.clientX;
		clickY = event.clientY;
		if(sct.isPointInPath(clickX,clickY)){
			sct.clearRect(0,0,width,height);
			document.removeEventListener('click',clickHandler);
			animate();
        	}
	}
	var clickX;
	var clickY;
	var title = "dodec";
	var play = "play"
	var titleWidth = sct.measureText(title).width;
	sct.fillText(title,100,height/2);
	sct.font="20px Lucida Console";
	var playWidth = sct.measureText(play).width;
	sct.fillText(play,100+titleWidth+100+75-playWidth/2,height/2-20);
	sct.rect(200+titleWidth,height/2-50,150,50);
	sct.stroke();
	document.addEventListener('click',clickHandler);
}
});
