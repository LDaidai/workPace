window.onload = function () {
    //1.实现瀑布布局
    waterFull("main", "box");

//2. 动态加载图片
    window.onscroll = function () {
        if (checkWillloadImage()) {
            //2.1造数据
            var dataArr =
                [
                    {"src":
                            "1.jpg"
                    }
                    ,
                    {
                        "src":
                            "2.jpg"
                    }
                    ,
                    {
                        "src":
                            "3.jpg"
                    }
                    ,
                    {
                        "src":
                            "4.jpg"
                    }
                    ,
                    {
                        "src":
                            "5.jpg"
                    }
                    ,
                    {
                        "src":
                            "6.jpg"
                    }
                    ,
                    {
                        "src":
                            "7.jpg"
                    }
                    ,
                    {
                        "src":
                            "8.jpg"
                    }
                    ,
                    {
                        "src":
                            "9.jpg"
                    },
                ];
            //2.2创建元素
            for (var i = 0; i <dataArr.length ; i++) {
                var newBox=document.createElement("div");
                newBox.className="box";
                $("main").appendChild(newBox);

                var newPic = document.createElement("div");
                newPic.className = "pic";
               newBox.appendChild(newPic);

               var newImg = document.createElement("img");
                newImg.src = "img/"+dataArr[i].src;
               newPic.appendChild(newImg);
            }
            //2.3重新布局
            waterFull("main","box");
            //3.动态加载图片
            window.onscroll=function () {
                setTimeout(function () {

                },2000);
            }
        }
    }
    //窗口的大小发生改变
    window.onresize=function () {
        waterFull('main','box');
    }
};

/*
* */
function waterFull(parent, child) {
    //1.父盒子居中
    //1.1获取所有盒子
    var allbox = $(parent).getElementsByClassName(child);
    //1.2获取子盒子的宽度
    var boxWidth = allbox[0].offsetWidth;
    //1.3获取屏幕宽度
    var screenW = document.documentElement.clientWidth;
    //1.4求出列数
    var cols = parseInt(screenW / boxWidth);
    //1.5父盒子居中
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = "0 auto";


    //2子盒子的定位
    //2.1定义高度数组
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    //2.2遍历子盒子
    for (var i = 0; i < allbox.length; i++) {
        //2.2.1 求出每一个子盒子的高度
        boxHeight = allbox[i].offsetHeight;
        //2.2.2取出第一行盒子的高度放入高度数组
        if (i < cols) {
            //第一行
            heightArr.push(boxHeight);
        } else {
            //剩余行
            //1.取出最矮的盒子高度
            minBoxHeight = _.min(heightArr);
            //2.求出最矮盒子对应的索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            //3.子盒子定位
            allbox[i].style.position = "absolute";
            allbox[i].style.left = minBoxIndex * boxWidth + 'px';
            allbox[i].style.top = minBoxHeight + 'px';

            //4.更新数组中的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
    console.log(heightArr, minBoxHeight, minBoxIndex);
}

/**
 * 获取数组中最矮盒子高度的索引
 * @param arr
 * @param val
 * @returns {number}
 */


function getMinBoxIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}


function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;
}

/*
判断是否具备加载图片的功能
* */
function checkWillloadImage() {
    //1.获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];

    //2求出最后一个盒子自身高度的一半 offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //3.求出屏幕的高度
    var screenH = document.body.clientHeight || document.documentElement.clientHeight;

    //4.页面偏离浏览器的高度
    var scrollTop = scroll().top;
    return lastBoxDis <= screenH + scrollTop;


}