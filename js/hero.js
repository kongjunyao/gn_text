/**
 * 顶部栏目
 */

window.onscroll = function () {
    var topScroll = document.documentElement.scrollTop;//滚动的距离,距离顶部的距离
    var bignav = document.querySelector(".heronav");//获取到导航栏
    if (topScroll >= 60) {  //当滚动距离大于60px时执行下面的东西
        bignav.style.position = 'fixed';
        bignav.style.top = '0';
        bignav.style.zIndex = '9999';
        bignav.style.width ='100%';
        // bignav.className = '.heronav.active';
    } else {//当滚动距离小于60的时候执行下面的内容，也就是让导航栏恢复原状
        bignav.style.position = 'static';
    }
}


/**
* tab栏切换
*/

var nav = document.querySelectorAll('#nav span');
var content = document.getElementById('content')
var divs = content.getElementsByTagName('div');

for (var i = 0; i < nav.length; i++) {
    nav[i].index = i;
    nav[i].onclick = function () {
        for (var i = 0; i < nav.length; i++) {
            nav[i].className = '';
        }
        this.className = 'active';
        for (var i = 0; i < divs.length; i++) {
            divs[i].style.display = 'none';
        }
        divs[this.index].style.display = 'block';
    }
}
/**
* tab栏切换
*/

