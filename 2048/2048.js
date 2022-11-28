var board = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
var tableID = Array(Array("00","01","02","03"),Array("10","11","12","13"),Array("20","21","22","23"),Array("30","31","32","33"));



window.onkeydown = keylog;
function keylog(e){
    console.log(e.key);
    switch (e.key) {
        case "ArrowUp": move(); break;
        case "ArrowDown": Rotate(2); move(); Rotate(2); break; 
        case "ArrowLeft": Rotate(1); move(); Rotate(3); break;
        case "ArrowRight": Rotate(3); move(); Rotate(1); break;
    }
}
function init(){
    score = 0;
    for(var i=0; i<4; i++)
        for(var j=0; j<4; j++)
            board[i][j] = 0;
    for(var i=0; i<2; i++){
        var rand = parseInt(Math.random()*16);
        var y = parseInt(rand/4);
        var x = rand % 4;
        if(board[y][x] == 0) board[y][x] = getNewNum();
        else i--;
    }
    update();
}

function update(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            var cell = document.getElementById(tableID[i][j]);
            cell.innerHTML = board[i][j]==0?"":board[i][j];
            coloring(cell);
        }
    }
    document.getElementById("score").innerHTML=score;
}

function move() {
    var isMoved = false;
    var isPlused = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
    for(var i=1;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)  continue;
            var tempY = i-1;
            while(tempY>0 && board[tempY][j]==0) tempY--;
            if(board[tempY][j]==0){
                board[tempY][j]=board[i][j];
                board[i][j]=0;
                isMoved=true;
            }
            else if(board[tempY][j] != board[i][j]){
                if(tempY+1==Y) continue;
                board[tempY+1][j]=board[i][j];
                board[i][j]=0;
                isMoved =true;
            }
            else{
                if(isPlused[tempY][j]==0){
                    board[tempY][j]*=2;
                    score+=board[tempY][j];
                    board[i][j]=0;
                    isPlused[tempY][j] = 1;
                    isMoved=true;
                }
                else{
                    board[tempY+1][j]=board[i][j];
                    board[i][j]=0;
                    isMoved=true;
                }
            }
        }
    }
    if(isMoved) generate();
}

function Rotate(n){
    while(n--){
        var tempBoard = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                tempBoard[i][j] = board[i][j];
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++)
                board[j][3-i]=tempBoard[i][j];
    }
}

function generate(){
    var zeroNum = 0;
    for(var i=0; i<4; i++)
        for(var j=0; j<4; j++)
            if(board[i][j]==0)
                zeroNum++;
    while(true){
        for(var i=0;i<4;i++){
            for(var j=0; j<4; j++){
                if(board[i][j]==0){
                    var rand = parseInt(Math.random()*zeroNum);
                    if(rand == 0){
                        board[i][j]=getNewNum();
                        return;
                    }
                }
            }
        }
    }
}

function getNewNum(){
    var rand = parseInt(Math.random()*10);
    if(rand==0)return 4;
    return 2;
}