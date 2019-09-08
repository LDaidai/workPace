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
function getCssAttrValue(obj,attr) {
    if (obj.currentStyle) {
        IE//opera
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
function buffer(obj, json, fn) {
    //1.1清除定时器
    clearInterval(obj.timer);


    //2.设置定时器
    var begin = 0, target = 0, speed = 0;
    obj.timer = setInterval(function () {
        //标识 旗帜
        var flag = true;
        for (var k in json) {
            if ("opacity" === k) {//透明度
                begin = Math.round(parseFloat(getCssAttrValue(obj, k)) * 100) || 100;
                target = parseInt(json[k] * 100);

            } else {//其他情况
                //2.1获取初始值
                begin = parseInt(getCssAttrValue(obj, k)) || 0;
                target = parseInt(json[k]);

            }

            //1.3求出步长
            speed = (target - begin) * 0.2;

            //判断是否向上取整
            speed = (target > begin) ? Math.ceil(speed) : Math.floor(speed);

            //1.4动起来
            if ("opacity" === k) {//透明度
                //w3c的浏览器
                obj.style.opacity = (begin + speed) / 100;
                //IE浏览器
                obj.style.filter = 'alpha(opacity:' + (begin + speed) + ')';


            } else {
                obj.style[k] = begin + speed + "px";
                
            }

            //1.5判断
            if (begin !== target) {
                flag = false;
            }
        }
        //清楚定时器
        if (flag) {
            clearInterval(obj.timer);
            console.log(fn);

            //判断有没有回调函数
            if (fn) {
                fn();
            }
        }
    }, 30);
}