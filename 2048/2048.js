
function keylog(e){
    console.log(e.key);
    if(e.key == "ArrowRight")
    {
        var move = document.getElementById("block");
        move.style.left = 175;
        console.log(move.style.left);
    }
    if(e.key == "ArrowLeft")
    {
        var move = document.getElementById("block");
        move.style.left = 20;
    }
}

window.onkeydown = keylog;