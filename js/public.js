/*
  create Time 20180904:23:42；
  author:xutongze
*/

// 导航区域的动画
var ulNav = document.querySelector(".public-head-nav");  // 获取最高权限的 ulNav
var liNavc = ulNav.querySelectorAll(".public-head-nav li[data-index='ychildren']"); // 获取 上四列
var liAll = ulNav.querySelectorAll(".public-head-nav li");
var listMenu = document.querySelector(".public-hide-menu"); // 获取最大的 list 列表public-hide-menu

for (var i = 0; i < liNavc.length; i++) {
  liNavc[i].index = i;
  liNavc[i].onmouseenter = function () {
    var index = this.index;
    animate(listMenu, { "height": 60 }, function () {
      resetList();
      listMenu.children[index].style.display = "block";
    });
  };
}
for (var i = 0; i < liAll.length; i++) {
  // console.log(!liAll[i].getAttribute("data-index"));
  if (!liAll[i].getAttribute("data-index")) {
    liAll[i].onmouseenter = function () {
      resetList();
      animate(listMenu, { "height": 0 });  // 选中非index 元素时 隐藏 listMenu元素；
    }
  }
}
// 离开事件
listMenu.onmouseleave = function () { resetList(); animate(listMenu, { "height": 0 }) }
document.querySelector(".public-header-wrapper").onmouseleave = function () { resetList(); animate(listMenu, { "height": 0 }) }

// 清除默认样式 "干掉其他元素";
function resetList() {
  for (var i = 0; i < listMenu.children.length; i++) {
    listMenu.children[i].style.display = "none";
  }
}



/*=======================
*@dis:  animate();
*@dis:  封装原生JS动画属性等;
*----------------
* @param {}  
* @return {}  
=======================*/
function animate(element, obj, fun) {

  // 清除当前元素之前的定时器
  if (element.timerId) {
    clearInterval(element.timerId);
  }

  // 执行定时器语句
  element.timerId = setInterval(function () {
    // 设置动画运动的样式

    // 假设法设定
    var flag = true;

    // for In 循环
    for (var key in obj) {

      if (key === "opacity") {

        // 当样式是  opacity 名称时采用的计算方式,单独给它采用一种计算方式
        var styleName = key;
        var target = obj[key] * 100;

        // 不透明度不能使用ParseInt 小数数值
        var current = getStyle(element, styleName) * 100;
        // console.log(current);

        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        current += step;

        // filter:alpha(opacity=30); filter
        element.style.filter = "alpha(opacity= " + current + " )";
        element.style[styleName] = current / 100;

        if (current !== target) {
          flag = false;
        }

      } else if (key == "zIndex") {
        // 由于层级性不需要设置动画.所以直接赋值;单独给它采用一种计算方式
        element.style[key] = obj[key];
      } else {  // 平时的样式动态修改 过程
        // 获取循环取到的 属性名称 与 属性值 进行设置
        var styleName = key;
        var target = obj[key];

        // 设置当前样式的位置
        var current = parseInt(getStyle(element, styleName)) || 0;

        // 计算步长
        var step = (target - current) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        current += step;

        // 对元素进行样式的持续更正
        element.style[styleName] = current + "px";
        // 假设法判断
        if (current !== target) {
          flag = false;
        }
      }

    }
    // flag 满足 清除定时器 结束循环
    if (flag) {
      clearInterval(element.timerId);

      // 判断第三个值是否是一个FUNCTION 是的话就执行该 “回调函数”;
      if (typeof fun === "function") {
        fun();
      }
    }

  }, 20);
};

// getStyle() // 获取样式属性
function getStyle(element, styleName) {
  // 设置获取样式的兼容性
  if (typeof getComputedStyle === "function") {
    return getComputedStyle(element)[styleName];
  } else {
    return element.currentStyle[styleName];
  }
}