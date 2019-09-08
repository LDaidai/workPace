window.onload = function () {
    //实现瀑布流布局
    waterFull("main", "box");
    //动态加载图片
    var timer1=null;
    window.onscroll = function () {
        clearInterval(timer1);
      timer1=setTimeout(function () {
          if (checkWillLoadImage()) {
              //2.1造数据
              var dataArr=[
                  {"src":"img02.jpg"},
                  {"src":"img03.jpg"},
                  {"src":"img04.jpg"},
                  {"src":"img05.jpg"},
                  {"src":"img06.jpg"},
                  {"src":"img07.jpg"},
                  {"src":"img08.jpg"},
              ];
              //2.2创建元素
              for (var i = 0; i <dataArr.length ; i++) {
                  var newBox=document.createElement("div");
                  newBox.className="box";
                  $("main").appendChild(newBox);

                  var newPic=document.createElement("div");
                  newPic.className="pic";
                  newBox.appendChild(newPic);

                  var newImg=document.createElement("img");
                  newImg.src="img/"+dataArr[i].src;
                  newPic.appendChild(newImg);

                  //.重新布局
                  waterFull("main","box");


              }
          }
      },200)
    };
    
    //3窗口大小发生改变
    var timer=null;
    window.onresize=function () {
        clearInterval(timer);//节流
        timer=setTimeout(function () {
            waterFull('main','box');
        },200);

    }
};


function waterFull(parent, child) {
    //父盒子居中
    //1.1获取所有的盒子
    var allBox = $(parent).getElementsByClassName(child);
    //1.2获取子盒子宽度
    var boxWidth = allBox[0].offsetWidth;
    //1.3获取屏幕的宽度
    var screenW = document.documentElement.clientWidth;
    //1.4求出列数
    var cols = parseInt(screenW / boxWidth);
    //1.5父盒子居中
    $(parent).style.width = cols * boxWidth + 'px';
    $(parent).style.margin = '0 auto';


    //2 子盒子定位
    //2.1定义高度数组
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    //2.2遍历子盒子
    for (var i = 0; i < allBox.length; i++) {
        //2.2.1求出每一一个子盒子高度
        boxHeight = allBox[i].offsetHeight;
        //2.2.2求出第一行盒子的高度放入高度数组
        if (i < cols) {//第一行
            heightArr.push(boxHeight);
            allBox[i].style='';
        } else {//剩余行
            //取出最矮的盒子高度
            minBoxHeight = _.min(heightArr);
            //2求出最矮盒子对应索引
            minBoxIndex = getMinBoxIndex(heightArr, minBoxHeight);
            //子盒子定位
            allBox[i].style.position = "absolute";
            allBox[i].style.left = minBoxIndex * boxWidth + 'px';
            allBox[i].style.top = minBoxHeight + 'px';
            //更新数组高度
            heightArr[minBoxIndex] += boxHeight;
        }
    }
    console.log(heightArr, minBoxHeight, minBoxIndex);

}

/*
* 获取数组中最矮盒子高度的索引
* */
function getMinBoxIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        }
    }
}

/*
* 判断是否具备加载图片的条件
* */
function checkWillLoadImage() {
    //1.获取最后一个盒子
    var allBox = document.getElementsByClassName("box");
    var lastBox = allBox[allBox.length - 1];

    //2.求出最后一个盒子自身高度的一般+offsetTop
    var lastBoxDis = lastBox.offsetHeight * 0.5 + lastBox.offsetTop;

    //3.求出屏幕高度
    var screenW = document.body.clientHeight || document.documentElement.clientHeight;
    //4.求出页面偏离浏览器的高度
    var scrollTop = scroll().top;
    return lastBoxDis <= screenW + scrollTop;


}
function $(id) {
    return typeof id === "string" ? document.getElementById(id) : null;

}
