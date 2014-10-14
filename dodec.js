var height = window.innerHeight;
var width = window.innerWidth;
var scale = width/72;
var obsHeight = scale;
var obsWidth = scale;
var obsX = 0;
var obsY = height;
var horizMargin = (width)-(12*scale-5); 
var vertMargin = 0;
var move = 3;
var change = 2;
var score = 0;
var lives = 3;
var obsChange = 2;
var randobs = true;
var searching = true;
var justUnder;
var red;
var hillY = 0;
var obsable = false;
var pts = 'pts';
var mobile = false;
var hurt = false;
var hurtCounter = 0;
var obsWait = 0;
var obsCounter = 0;
var textMargin = height/8;
var inc = 0;
var started = false;
var incinc = .2;
var white = '#E5E4E2';
var blue = '#151B54';
var resetWidth;
//higher values increase gravity of boulder, lower values decrease it. Values too low cause boulder to fly infinitely
var gravity = .07;
$.mobile.loadingMessage = false;
if(typeof window.orientation !== 'undefined'){
	mobile = true;
}
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

$(document).ready(function(){
$(window).resize(function(){
    location.reload();
});
hill();
splash();
//obstacle/boulder canvas
var c3=document.getElementById("can3");
c3.setAttribute("height",height);
c3.setAttribute("width",width);
var ct=c3.getContext("2d");

ct.fillStyle='#E5E4E2';


function animate(){
	if(searching){
		getLow();
	}
	dodec();
	text();
    if(obsable && !searching){
		obs();
	}
	if(lives != 0){
		requestAnimationFrame(animate);
	}else{
		ct.clearRect(0,0,width,height);
		splash();
	}
	
}
var hiscore = localStorage.getItem('hiscore');
function hiscoreHandler(s){
    if(s > hiscore){
        localStorage.setItem('hiscore',s);
    }else if(localStorage.getItem('hiscore') == null){
        localStorage.setItem('hiscore',0);
    }
}

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
	pts = 'pts';
	if(score == 1){
		pts = 'pt'
	}
    ct.font="40px Courier";
	ct.fillText(score+" "+pts,100,textMargin);
	ct.fillText(lives+" lives",300,textMargin);
	hiscore = localStorage.getItem('hiscore');
	ct.fillText("High score: "+hiscore,500,textMargin);
    ct.font='20px Courier';
    $(document).on('vclick',reset);
    ct.fillText("Reset?", 900,textMargin);
    resetWidth = ct.measureText("Reset?").width;
}
function reset(event){
    var x = event.clientX;
    var y = event.clientY;
    if(x >= 900 && x <= resetWidth+900 && y >= textMargin-20 && y <= textMargin+20){
        swal({
            title:"Do you really want to reset your high score?",
            text:"This action cannot be undone.",
            type:"warning",
            showCancelButton:true,
            confirmButtonColor:blue,
            confirmButton:"Reset High Score",
            closeOnConfirm:false
        },
            function(){
                localStorage.setItem('hiscore',0);
                swal("Success","Your high score has been reset","success");
                restart();
        });
    }
}
function restart(){
    hurt = false;
    hurtCounter = 0;
    lives = 0;
    ct.clearRect(0,0,width,height);

}
function getLow(){
	justUnder = ct.getImageData(6*scale+horizMargin,12*scale+vertMargin+move,1,1);
	red = justUnder.data[0];
	if(red > 100){
		searching = false;
        hillY = move;
	}
}
function drawDodec(){
	ct.strokeStyle = "#E5E4E2";
	ct.beginPath();
	ct.moveTo(width, height/2)
	ct.lineTo(0,height);
	ct.stroke();
	if(hurt === false){
		ct.fillStyle="#E5E4E2";
	}else{
		ct.fillStyle="#FF0000";
		hurtCounter += 1;
	}
	if(hurtCounter > 45 && hurt){
		hurt = false;
		hurtCounter = 0;
	}
	if(obsCounter<obsWait){
		obsCounter +=1;
	}else{
		obsCounter = 0;
		obsWait = 0;
		obsable = true;
	}
	ct.beginPath();
	ct.moveTo(12*scale+horizMargin,6*scale+move);
	ct.lineTo(11*scale+horizMargin,9*scale+move);
	ct.lineTo(9*scale+horizMargin,11*scale+move);
	ct.lineTo(6*scale+horizMargin,12*scale+move);
	ct.lineTo(3*scale+horizMargin,11*scale+move);
	ct.lineTo(1*scale+horizMargin,9*scale+move);
	ct.lineTo(0*scale+horizMargin,6*scale+move);
	ct.lineTo(1*scale+horizMargin,3*scale+move);
	ct.lineTo(3*scale+horizMargin,1*scale+move);
	ct.lineTo(6*scale+horizMargin,0*scale+move);
	ct.lineTo(9*scale+horizMargin,1*scale+move);
	ct.lineTo(11*scale+horizMargin,3*scale+move);
	ct.closePath();
	ct.fill();
	ct.fillStyle="#E5E4E2";
	move += change - inc;
	if(started){
		inc += incinc;
	}
	if(move >= hillY && searching == false){
		change = 0;
		inc = 0;
		incinc = -incinc;
		started = true;
	}
	if(hillY - move >= 100){
		incinc = -incinc;
	}
}
function dodec(){
	var decSquare = 12*scale;
	var degrees = 2;
	ct.clearRect(0,0,width,height);
	drawDodec();
	if(change == 0 && mobile){
		$(document).on('vclick',function(){
			change = -3;
            incinc = -gravity;
		});
	}
	document.addEventListener('keydown',function(event){
		var thekey=event.keyCode;
		if((thekey == 38 ||thekey == 32) && change == 0){
			change = -3;
			incinc = -gravity;
		}
	});
}
function obs(){
    ct.strokeStyle="#E5E4E2";
    	if(randobs==true){
    		randobs = false;
    		obsWidth = Math.floor((Math.random() * 40) + 25);
    		obsHeight = Math.floor((Math.random() * 25) + 25);
    		obsWait = Math.floor(Math.random() * 100)
    		obsX = 0;
		obsY = height-obsHeight;
    	}
	
	if(obsCounter>=obsWait){
		ct.fillRect(obsX,obsY,obsWidth,obsHeight);
		ct.stroke();
		obsX += width*obsChange/400;
		obsY -= height*obsChange/800;
	}
	
	if(ct.isPointInPath(obsX+obsWidth,obsY)||ct.isPointInPath(obsX,obsY)){
			hurt = true;
			obsable = false;
			if(obsChange>2){
 		        	obsChange-=1;
			}
 			if(lives < 1){
                restart();
                        
 			}
 			lives -= 1;
			randobs=true;
		}
	if (obsX>width){
        	score += 1;
        	obsable = false;
        //Every 15 pts, an extra life
	        if(score % 15 == 0){
	        	lives +=1
	        }
	        hiscoreHandler(score);
	        obsChange = Math.floor(Math.sqrt(score+1))+1;
	        randobs=true;
	}
	
}

function splash(){
	hurt = false;
	hurtCounter = 0;
    score = 0;
    obsChange = 2;
    obsY = height - obsHeight;
    obsX = 0;
    var titleFont = width/20;
	var splashCanvas=document.getElementById("splash");
	splashCanvas.setAttribute("height",height);
	splashCanvas.setAttribute("width",width);
	var sct = splashCanvas.getContext("2d");
	sct.font=titleFont+"px Courier";
	sct.fillStyle='#E5E4E2';
	sct.strokeStyle='#E5E4E2';
	sct.lineWidth=width/200;
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
	var play = "play";
    var playFont = width/72;
	var titleWidth = sct.measureText(title).width;
	sct.fillText(title,width/14,height/2);
	sct.font=playFont+"px Courier";
	var playWidth = sct.measureText(play).width;
    var boxWidth = width/10;
    var boxHeight = boxWidth/3.5;
	var boxY = height/2-boxHeight;
	sct.fillText(play,(width/14)*2+titleWidth,boxY+playFont*1.3);
	sct.rect((width/14)*2+titleWidth-playWidth,boxY,boxWidth,boxHeight);
	sct.stroke();
	document.addEventListener('click',clickHandler);
	if(mobile){
		$(document).on('vclick',clickHandler);
	}
	lives = 3;

}
});
