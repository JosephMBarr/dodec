var height = window.innerHeight;
var width = window.innerWidth;
var scale = 25;
var obsHeight = scale;
var obsWidth = scale;
var obsX = 5;
var obsY = height;
var horizMargin = (width)-(12*scale-5); 
var a = (12*scale);
var vertMargin = 0;
var move = 3;
var change = 2;
var score = 0;
var lives = 3;
var obsChange = 1;
var randobs = 1;
var searching = true;
var justUnder;
var red;
var hillY = 0;
var obsable = false;
var pts = 'pts';
var mobile = false;
function checkForMobile(){
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))mobile = true})(navigator.userAgent||navigator.vendor||window.opera,'http://detectmobilebrowser.com/mobile');
	
		
	}
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
	if(searching){
		getLow();
	}
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
	pts = 'pts';
	if(score == 1){
		pts = 'pt'
	}
	ct.fillText(score+" "+pts,100,100);
	ct.fillText(lives+" lives",300,100);
	ct.fillText("High score: "+hiscore,500,100);
}
function getLow(){
	justUnder = ct.getImageData(6*scale+horizMargin,12*scale+vertMargin+move,1,1);
	red = justUnder.data[0];
	if(red > 100){
		searching = false;
        hillY = move;
        obsable = true;
	}
}
function drawDodec(){
	ct.strokeStyle = "#E5E4E2";
	ct.beginPath();
	ct.moveTo(width, height/2)
	ct.lineTo(0,height);
	ct.stroke();
	ct.fillStyle="#E5E4E2";
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

	move += change;
	if(move >= hillY && searching == false){
		change = 0;
	}
	if(hillY - move >= height/8){
		change = 3;
	}
}
function dodec(){
	var decSquare = 12*scale;
	var degrees = 2;
	ct.clearRect(0,0,width,height);
	if(obsable){
		obs();
	}
	drawDodec();
	if(mobile){
		$(document).on('vclick',function(event){
			change = -3;
		});
	}
	document.addEventListener('keydown',function(event){
		var thekey=event.keyCode;
		if((thekey == 38 ||thekey == 32) && change == 0){
			change = -3;
		}
	});
}
function obs(){
    ct.strokeStyle="#E5E4E2";
    	if(randobs==1){
    		randobs = 0
    		obsWidth = Math.floor((Math.random() * 40) + 25);
    		obsHeight = Math.floor((Math.random() * 25) + 25);
    		obsX = 0;
		obsY = height-(obsHeight);
    	}
	ct.fillRect(obsX,obsY,obsWidth,obsHeight);
	ct.stroke();
	obsX += width*obsChange/400;
	obsY -= height*obsChange/800;
	if(ct.isPointInPath(obsX+obsWidth,obsY)||ct.isPointInPath(obsX,obsY)){
			if(obsChange>1){
 		        obsChange-=1;
			}
 			if(lives < 1){
 				ct.clearRect(-width,-height,width*2,height*2);
 				splash();
                        
 			}
 			lives -= 1;
			randobs=1;
		}
	if (obsX>width){
			score += 1;
			obsChange = Math.sqrt(score+1);
			randobs=1
	}
	
}

function splash(){
        score = 0;
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
	$(document).on('vclick',clickHandler);
	lives = 3;
}
});
