$(function () {
    //pc才显示图片
    var ww = $(window).width();
    if(ww >= 1200){
        $("img.lazy").each(function (i, item) {
            $(item).attr("src", $(item).attr("data-original"));
        });
    }
    //开启轮播
    $('.carousel').carousel({interval: 2000});
});