function scroll() {
    if (window.pageYOffset !== null) {
        return {
            top: window.pageYOffset,
            left: window.pageXOffset,
        }
    } else if (document.compatMode === "CSS1Compat") {//W3C标准
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }

    }
    return {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
    }

}

function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;

}

/*
  匀速动画  //object/元素 obj
             /number/ 目标 target
             /number/步长 speed
  * */
function constant(obj, target, speed) {

//清除定时器
    clearInterval(obj.timer);

    //判断方向
    var dir = obj.offsetLeft < target ? speed : -speed;

    //设置定时器
    obj.timer = setInterval(function () {

        obj.style.left = obj.offsetLeft + dir + "px";
        if (Math.abs(target - obj.offsetLeft) < Math.abs(dir)) {
            clearInterval(obj.timer);

            obj.style.left = target + "px";
            console.log(obj.offsetLeft, target);
        }

    }, 20);

}

/*
获取css的样式值
 */
function getCssAttrValue(obj, attr) {
    if (obj.currentStyle) {
        IE//opera
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}

