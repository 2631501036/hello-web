const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

// 创建格子
const box=32;

// 地图图片
const ground = new Image();
ground.src='./images/ground.png';

// 食物图片
const foodImg = new Image();
 foodImg.src ='./images/food.png';

// 创建蛇
var snake =[]
snake[0] ={
    x:9*box,
    y:10*box
}


// 食物
var food = {
    x: Math.floor(Math.random()*17+1)*box,         //sss
    y: Math.floor(Math.random()*15+3)*box,      //sss
}

// 得分
var score=0

// 控制方向
var d 
document.addEventListener('keydown',direction)

function direction(event){
    var key=event.keyCode
    if(key==37 && d!='RIGHT'){
        d='LEFT'
    }else if(key==38 && d!='DOWN'){
        d='UP'
    }else if(key==39 && d!='LEFT'){
       d='RIGHT'
    }else if(key==40 && d!='UP'){
        d='DOWN'
    }
   
}
//撞到自己时
function conllision(head, array) {
    for (var i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true
        }
    }
    return false
}


// 绘制地图
function draw(){
    ctx.drawImage(ground,0,0)//地面位置
    ctx.drawImage(foodImg,food.x,food.y)//食物位置                         //ssss


    ctx.fillText(score, 2 * box, 1.6 * box);//对象  位置
    ctx.fillStyle = "white"//字体颜色
    ctx.font = "45px Changa one"
    
    // 蛇的头部 初始位置
    for(i=0;i<snake.length;i++){
        // 如果是头部就是绿色，尾部都是白色
        ctx.fillStyle=(i==0)?'green':'white'
        // 蛇 的位置 x y 轴， 宽 高  
        ctx.fillRect(snake[i].x,snake[i].y,box,box)

        ctx.strokeStyle='red'
        ctx.strokeRect(snake[i].x,snake[i].y,box,box)
    }
    // 记录原来的位置
    var snakeX=snake[0].x
    var snakeY=snake[0].y
    // 转方向时
    // 在Y轴前进时  才能左右转 左减 右加
    if(d=='LEFT') snakeX -=box
    if(d=='RIGHT') snakeX +=box
    // 在X轴前进时  才能上下转 上减 下加
    if(d=='UP') snakeY -=box
    if(d=='DOWN') snakeY +=box

    //如果吃到食物
    //即头部与食物 的位置相同
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop() //删除数组最后一位元素
    }

    

    // 记录新的位置
    var newSnake={
        x:snakeX,
        y:snakeY,

    }

    //Game Over
    //撞到墙或者撞到自己
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || conllision(newSnake, snake)) {
        clearInterval(game)
    }


    snake.unshift(newSnake)//在数组头部添加并返回一个元素
    
    
}
game=setInterval(draw,150)