let dragvalue;

function move() {
    let element = document.getElementById("brackground");
    element.onmousedown = function () {
        dragvalue = element;
    }
    document.onmouseup = function () {
        dragvalue = null;
    }
    document.onmousemove = function (e) {
        let x = e.pageX;
        let y = e.pageY;

        dragvalue.style.left = x + "px";
        dragvalue.style.top = x + "px";
    }
}
move()