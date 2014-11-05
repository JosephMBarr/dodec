(function(){
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
	var incinc = 0.2;
	var white = '#E5E4E2';
	var blue = '#151B54';
	var resetWidth;
	var aUrl = 'leaderboards.txt';
	var already;
	var leaderboard=[];
	var titleFont = width/20;
	var livesText;
	var obsType = 0;
	var powerUp = false
	//higher values increase gravity of boulder, lower values decrease it. Values too low cause boulder to fly infinitely
	var gravity = 0.07;
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
	writeList(readList(httpGet(aUrl)));
	//obstacle/boulder canvas
	var c3=document.getElementById("can3");
	c3.setAttribute("height",height);
	c3.setAttribute("width",width);
	var ct=c3.getContext("2d");
	ct.fillStyle= white;
	var c2=document.getElementById("can2");
	var ctx2=c2.getContext("2d");
	hill();
	splash();
	if(localStorage.getItem("username") !== null){
		already = true;
	}
	if(!already){
		getUsername();
	}
	function animate(){
		if(searching){
			getLow();
		}
		dodec();
		ctx2.clearRect(0,0,width,height);
		hill();
		text();
	    if(obsable && !searching){
			obs();
		}
		if(lives > 0){
			requestAnimationFrame(animate);
		}else{
	        	if(score > parseFloat(leaderboard[4])){
								onTheList(score,localStorage.getItem("username"));
	        	}
			ct.clearRect(0,0,width,height);
			swal({
				title:"You Lose!",
				text:"Score: "+score+" Your High Score: "+hiscore+" Score to Beat: "+leaderboard[0],
				type:"error",
				confirmButtonText:"New Game",
				confirmButtonColor:blue

			},
				function(){
					splash();
					document.getElementById('dummy').style.visibility = 'visible';
					});

		}

	}
	var hiscore = localStorage.getItem('hiscore');
	function hiscoreHandler(s){
	    if(s > hiscore){
	        localStorage.setItem('hiscore',s);
	    }else if(localStorage.getItem('hiscore') === null){
	        localStorage.setItem('hiscore',0);
	    }
	}

	//draw hill down which boulder will roll as well as background
	function hill(){
		c2.setAttribute("height",height);
		c2.setAttribute("width",width);
		ctx2.fillStyle=blue;
		ctx2.fillRect(0,0,width,height);
	}
	function text(){
		ctx2.fillStyle=white;
		pts = 'pts';
		livesText = "lives";
		if(lives == 1){
			livesText = 'life';
		}
		if(score == 1){
			pts = 'pt';
		}
	    	ctx2.font="40px Courier";
		ctx2.fillText(score+" "+pts,100,textMargin);
		ctx2.fillText(lives+" "+livesText,300,textMargin);
		hiscore = localStorage.getItem('hiscore');
		ctx2.fillText("High score: "+hiscore,500,textMargin);
	    	ctx2.font='20px Courier';
	    	$(document).on('vclick',reset);
	    	ctx2.fillText("Reset?", 900,textMargin);
	    	resetWidth = ctx2.measureText("Reset?").width;
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
	            confirmButtonText:"Reset High Score",
	            closeOnConfirm:false
	        },
	            function(){
	                localStorage.setItem('hiscore',0);
	                swal("Success","Your high score has been reset","success");
	                splash();
	        });
	    }
	}
	function restart(){
	    hurt = false;
	    hurtCounter = 0;
	    score = 0;
	    obsChange = 2;
	    obsY = height - obsHeight;
	    obsX = 0;
	    lives = 0;
	    ct.clearRect(0,0,width,height);
	    ctx2.clearRect(0,0,width,height);
	    hill();
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
		ct.strokeStyle = white;
		ct.beginPath();
		ct.moveTo(width, height/2);
		ct.lineTo(0,height);
		ct.stroke();
		if(hurt === false){
			ct.fillStyle=white;
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
		ct.fillStyle=white;
		move += change - inc;
		if(started){
			inc += incinc;
		}
		if(move >= hillY && searching === false){
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
		ct.clearRect(0,0,width,height);
		drawDodec();
		if(change === 0 && mobile){
			$(document).on('vclick',function(){
				change = -3;
	            incinc = -gravity;
			});
		}
		document.addEventListener('keydown',function(event){
			var thekey=event.keyCode;
			if((thekey == 38 ||thekey == 32) && change === 0){
				change = -3;
				incinc = -gravity;
			}
		});
	}
	function obs(){
	    ct.strokeStyle= "#E5E4E2";
	    	if(randobs===true){
	    		randobs = false;
	    		obsWidth = Math.floor((Math.random() * 40) + 25);
	    		obsHeight = Math.floor((Math.random() * 25) + 25);
	    		obsWait = Math.floor((Math.random() * 100)+ obsChange*2);
	    		obsType = Math.random()
	    		if (obsType>0.9){
	    			powerUp = true;
	    		}
	    		else {
	    			powerUp = false;
	    		}
	    		obsX = 0;
			obsY = height-obsHeight;
	    	}

		if(obsCounter>=obsWait){
			if(powerUp=true){
				ct.fillStyle = "#009933"
			}
			else{
				ct.fillStyle = "#E5E4E2"
			}
			if(power)
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
	                		splash();

	 			}
	 			lives -= 1;
				randobs=true;
			}
		if (obsX>width){
	        	score += 1;
	        	obsable = false;
	        //Every 15 pts, an extra life
		        if(score % 15 === 0){
		        	lives +=1;
		        }
		        hiscoreHandler(score);
		          obsChange = Math.floor(Math.sqrt(score+1))+Math.floor(Math.random()*2);
		        randobs=true;
		}

	}
	//reset variables in order for new game
	function splash(){
		restart();
		var splashCanvas=document.getElementById("splash");
		splashCanvas.setAttribute("height",height);
		splashCanvas.setAttribute("width",width);
		var sct = splashCanvas.getContext("2d");
		sct.font=titleFont+"px Courier";
		sct.fillStyle=white;
		sct.strokeStyle=white;
		sct.lineWidth=width/200;
		function clickHandler(event){
			clickX = event.clientX;
			clickY = event.clientY;
			if(sct.isPointInPath(clickX,clickY)){
				sct.clearRect(0,0,width,height);
				document.getElementById('dummy').style.visibility="hidden";
				document.removeEventListener('click',clickHandler);
				lives = 3;
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

	}
	function getUsername(){
			var uname = {
				state0:{
					title:"What would you like your name on the leaderboard to be?",
					html:'<label>Username <input type="text" name="username" value=""></label><br />',
					buttons:{ submit: 1},
					submit:function(e,v,m,f){
						localStorage.setItem("username",f.username);
						e.preventDefault();
						$.prompt.close();
					}
				}
			};
				$.prompt(uname);

	}
	function httpGet(theUrl){
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open("GET",theUrl,false);
	    xmlHttp.send(null);
	    return xmlHttp.responseText;
	}
	function readList(lst){
	    var lines = lst.split('\n');
	    return lines;
	}
	function writeList(arr){
	    for(var i = 0;i<5;i++){
	        if(arr[i] === undefined){
	            arr[i] = 0;
	        }
	        leaderboard.push(arr[i]);
	        document.getElementById('score'+(i+1)).innerHTML = arr[i];
	    }
	}
	function onTheList(newScore,name){
	    $.ajax({
	        type:"POST",
	        url: "https://mandrillapp.com/api/1.0/messages/send.json",
	        data: {
	            'key':'dqZonEvVVPUI3IYSnJkK-Q',
	            'message':{
	                'from_email':'stheery@gmail.com',
	                'to':[
	                    {
	                        'email':'dodecgame@gmail.com',
	                        'type':'to'
	                    }
	                ],
	            'autotext':'true',
	                'subject':'New High Score!',
	                'html':''+newScore+" achieved by "+name
	            }
	        }
	    }).done(function(response){
	        console.log(response);
	    });
	}


	});
})();
