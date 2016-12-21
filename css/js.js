window.onload = init;
window.onmousemove = mouseMove;
window.onkeydown = keyDown;

var canvas , ctx,cW,cH;

var bg,board;

var st;

var boardX ,boardY ,boardW, boardH;

var ball, ballX , ballY;
boardX = 350;
boardY = 700;
boardW = 150;
boardH = 20;


ballX = 350;
ballY = 350;

cW = 1000;
cH = 800;

var vx , vy;

vx = 8;
vy = 4;

var bricks = [];

var imgW , imgH;
imgW = 150;
imgH = 50;
//初始化游戏设置和参数
function init(){
	trace("游戏初始化完毕！");
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	//背景
	bg = addImg("img/bg.png");
	//球
	ball = addImg("img/ball.png");
	//挡板
	board = addImg("img/board.png");
	
	createBrick();
	
	st = setInterval(updateCanvas,1000 / 60);
}

//生成砖块
function createBrick(){
	for(var i = 0;i<6;i++){
		for(var j = 0;j<4;j++){
			var item = addImg("img/2.png");
			var x = i * (imgW  + 10);
			var y = j * (imgH + 5) + 30;
			var obj = {item:item,x:x,y:y};
			bricks.push(obj);
		}
	}
}

//碰撞检测
function testObjectHit(x1,y1,w,h,x2,y2){
	if(x2>x1&& y2 > y1 && x2 < x1 + w && y2 < y1 + h){
		return true;
	}else{
		return false;
	}
}

//判断球与挡板的碰撞
function ballBoardHit(){
	
	var b = testObjectHit(boardX ,boardY - 50,boardW + 50,boardH,ballX,ballY);
	if(b){
		ballY = boardY - 50;
//		vx *= -1;
		vy *= -1;
	}
}

//鼠标移动
function mouseMove(e){
	boardX = e.clientX - boardW /2;
}
//键只按下的时候
function keyDown(e){
	if(e.keyCode == 37){
		boardX -= 5;
	}
	if(e.keyCode == 39){
		boardX += 5;
	}
}

//刷新画布
function updateCanvas(){
	ctx.clearRect(0,0,cW,cH);
	ctx.drawImage(bg,0,0);
	ctx.drawImage(board,boardX,boardY);
	
	ballMove();
	ballBoardHit();
	
	drawBricks();
	ballBricksHit();
}

//砖块与球碰撞检测
function ballBricksHit(){
	var l = bricks.length;
	for(var i = 0;i<l;i++){
		var item = bricks[i].item;
		var b = testObjectHit(bricks[i].x,bricks[i].y,item.width,item.height,ballX,ballY);
		if(b){
			bricks.splice(i,1);
			vy *= -1;
			item = null;
		}
	}
}

//绘制砖块
function drawBricks(){
	var l = bricks.length;
	for(var i = 0;i<l;i++){
		var item = bricks[i];
		ctx.drawImage(item.item,item.x,item.y);
	}
}


//球移动
function ballMove(){
	ballX += vx;
	ballY += vy;
	if(ballX >= cW - ball.width){
		vx  *= -1;
		
	}else if(ballX <= 0){
		vx  *= -1;
	}
	
	if(ballY <= 0){
        
        vy *= -1;
    }else if(ballY > 700){
//      trace("Game Over!");
    }
    ctx.drawImage(ball,ballX,ballY);
}


//生成图片
function addImg(_src){  
	var img = new Image();
	img.src = _src;   
	return img;
}

//简化输出信息
function trace(msg){
	console.log(msg);
}

