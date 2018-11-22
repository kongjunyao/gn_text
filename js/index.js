/*
  create Time : 20180906
  author: xutongze
*/


// 设置banner高度
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
document.getElementsByClassName("index-banner-wrapper")[0].style.height = windowHeight - 60 + "px"; // 传入高度参数 
document.getElementsByClassName("index-banner-imagebox")[0].style.height = windowHeight - 60 + "px"; // UL传入高度;




// Index banner wrap
$(function () {
  // 页面加载完成之后执行
  var olBox = $(".index-banner-ols");           // banner 控件 Ol box;
  var ulInLis = $("ul.index-banner-imagebox li");
  var indKey = 0;        // 默认 第一张图片显示
  
  
  // 动态创建下标类型的元素;
  for (var i = 0; i < ulInLis.length; i++) {
    if (i === 0) {
      var $lia = $("<li class='current'></li>");
    } else {
      var $lia = $("<li></li>");                  // 创建LI 元素;
    }
    olBox.append($lia);
  }

  // 鼠标经过事件;
  var olis = olBox.children();      // 动态获取元素;
  olis.mouseenter(function () {
    indKey = $(this).index();       // 获取当前的下标;
    olis.removeClass("current");    // 设置所有的ol -> li 属性 清空
    
    $(this).addClass("current");    // 设置当前属性为选中的状态;

    console.log("当前经过下标" + indKey);
    ulInLis.eq(indKey).fadeIn().siblings("li").fadeOut(500);   // 设置BANNER图中第几个显示;
  });
  // 设置定时器,进行TAB切换;
  var timerId = setInterval(loopBanner, 5000);
  function loopBanner() {
    indKey++;
    if (indKey == olis.length){indKey = 0}  // 判断是否“出局”
    olis.removeClass().eq(indKey).addClass("current");

    ulInLis.eq(indKey).fadeIn().siblings().fadeOut(500);
  }
  $(".index-banner-wrapper").mouseenter(function (){clearInterval(timerId)});
  $(".index-banner-wrapper").mouseleave(function (){timerId = setInterval(loopBanner, 5000)});

  // 点击search 按钮

  var imgBut = $("#search-but");
  imgBut.click(function(){
    $(".index-fixed_wraps").fadeIn("300");
    $(".index-fixed-inwrap i img").addClass("bounceInUp");
    $(".index-fixed-search").addClass("bounceInUp");
    $(".index-fixed-lists").addClass("bounceInUp");
  });
  $(".index-fixed-inwrap i img").click(function(){
    $(".index-fixed_wraps").fadeOut("300");
  });


});
