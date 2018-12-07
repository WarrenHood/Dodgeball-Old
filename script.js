
alert('Dodgeball created by Warren Hood\nPorted to android\nMove player: Tap anywhere on left of screen\nThrow ball: tap anywhere on right of screen');
localStorage.points = localStorage.points || 0;
points =  0;
fps = 300;
caught = true;
mouseX= 200;
mouseY=500;
min = 100;
limit = window.innerWidth;
topmax = 500;
topmin = 10;
redThrowing = false;
function update(e){
	e = e || event;
	var x = e.clientX;
	var y = e.clientY;
	if(x < 300){
	mouseX = e.clientX;
	mouseY = e.clientY;}
	else if(caught){
	redThrowing = true;
	caught = false;

}

}
redSpeed =  25;

redPos = Math.round(Math.random() * 1000) + 100;
redPost = Math.round(Math.random() * 400) + 100;


timer = 1000/fps;
function gId(id){
return document.getElementById(id);
}
enemy=[];
enemy.length = 50;
function changePos(){
	gId('points').innerHTML = points;
	var enemiesDead = true;
	gId('health').innerHTML = playHealth;
for(i = 0;i<=50;i++){
	if(enemy[i].speed != 0)enemiesDead = false;
	if(enemy[i].posX <= 0 && !enemy[i].hurtPlayer){playHealth -= 10;
											enemy[i].speed = 0;
											enemy[i].hurtPlayer = true;
											enemy[i].posY = -window.innerHeight;
	}
	enemy[i].posX -= enemy[i].speed;
	if(!caught && Math.abs(redPos - enemy[i].posX -25) < 25 && Math.abs(redPost - enemy[i].posY - 50) < 50){enemy[i].health-=redSpeed;
															redThrowing = false;
															
	}
if(enemy[i].health <= 0){	enemy[i].posY = -window.innerHeight;
							enemy[i].speed = 0;
						if(!enemy[i].gavePoints){points += enemy[i].type;enemy[i].gavePoints = true;}
}
}
if(playHealth <= 0)lose();
if(enemiesDead && playHealth >0)win();

if(caught && !redThrowing){
	redPos = mouseX;
	redPost = mouseY
	
}
if(redPos >= limit)redThrowing = false;
if(!redThrowing && !caught){
if(redMidX()>mouseX)redPos -= redSpeed;
if(redMidX()<mouseX)redPos += redSpeed;
if(redMidY()>mouseY)redPost -= redSpeed;
if(redMidY()<mouseY)redPost += redSpeed;}
if(redThrowing)throwRed();
if(!redThrowing && Math.abs(redMidX() - mouseX) <= redSize/2 +25 && Math.abs(redMidY() - mouseY) <= redSize/2 + 15)caught = true;
}
function animate(){
changePos();
player.style.left = mouseX - 50+'px';
player.style.top = mouseY - 35 +'px';
red.style.left = redPos + 'px';
red.style.top = redPost + 'px';
enemies = document.getElementsByClassName('enemy');
for(var x = 0;x<=50;x++){
	enemies[x].style.left = enemy[x].posX;
	enemies[x].style.top = enemy[x].posY;
}

}
redSize = 15;
window.onload = function(){
	gId('winloss').style.left = -window.innerWidth+'px';
	playHealth = 100;
	for(var i = 0;i<=50;i++){
	enemy[i] = {
		type : 1,
		gavePoints : false,
		posX:window.innerWidth + i*200,
				posY:Math.floor((window.innerHeight - 250)*Math.random()),
				health:10,
				hurtPlayer:false,
	speed:window.innerWidth/500}
	
};
player= gId('player');
red = gId('red');
red.style.height=redSize +'px';
red.style.width=redSize +'px';
 animation = setInterval(animate,1000/fps);

}

function redMidX(){return redPos + redSize/2;}
function redMidY(){return redPost + redSize/2;}

function throwRed(){
redPos += redSpeed;

}
document.onclick = update;
function start(){
	points = 0
document.body.style.cursor = 'none';
	gId('winloss').style.left = -window.innerWidth+'px';
	gId('winloss').onclick = null;
	playHealth = 100;
	for(var i = 0;i<=50;i++){
	enemy[i] = {
		type : 1,
		gavePoints : false,
		posX:window.innerWidth + i*200,
				posY:Math.floor((window.innerHeight - 250)*Math.random()),
				health:10,
				hurtPlayer:false,
	speed:window.innerWidth/500}
		if(gamePaused)resume();
};}
function win(){
	localStorage.points += points;
	document.body.style.cursor = '';
	gId('winloss').innerHTML ="You win!";
	gId('winloss').style.left = window.innerWidth/2 - 400+'px';
	pause();
	gId('winloss').onclick = start;
}
function lose(){
	localStorage.points += points;
	document.body.style.cursor = '';
	gId('winloss').innerHTML ="You lose!";
	gId('winloss').style.left = window.innerWidth/2 - 400+'px';
	pause();
	gId('winloss').onclick = start;
}
function pause(){
	document.body.style.cursor = '';
	gId('winloss').onmouseover = function(){this.style.cursor = 'pointer';}
	gamePaused = true;
	if(animation)clearInterval(animation);
}
function resume(){
	gamePaused = false;
	animation = setInterval(animate,1000/fps);
}