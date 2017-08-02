function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 100);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
            elem.innerHTML = width * 1 + '%';
            if(width===100){
                location.href="index.html";
            }
        }
    }
}

move();
