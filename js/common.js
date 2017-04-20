/*公共方法文件*/

// 禁止图片、a标签文字链接被拖动
$(function(){
    // 禁止图片拖动
    $("img").attr({"draggable":"false"});
    // 阻止a标签文字被拖动
    $("a").attr({"draggable":"false"});
});

//全局url变量
var uRl="http://api.kh.com";

//返回上一页
function history_go(){
	window.history.go(-1);
}
//tab切换
$(function(){
	function tabqh(obj1,obj2,obj3,obj4,obj5,obj6){
		$('.'+obj1).click(function(){
			$('.'+obj4).css({'display':'block'});
			$('.'+obj4).siblings().css({'display':'none'});
		});
		$('.'+obj2).click(function(){
			$('.'+obj5).css({'display':'block'});
			$('.'+obj5).siblings().css({'display':'none'});
		});
		$('.'+obj3).click(function(){
			$('.'+obj6).css({'display':'block'});
			$('.'+obj6).siblings().css({'display':'none'});
		});
	}
	tabqh('friend_hy','friend_ls','friend_gz','friend_con1','friend_con2','friend_con3');
});

$(function() {
    $("#slider").easySlider( {
        slideSpeed: 500,
        paginationSpacing: "15px",
        paginationDiameter: "15px",
        paginationPositionFromBottom: "20px",
        slidesClass: ".slides",
        controlsClass: ".controls",
        paginationClass: ".pagination"
    });
});
/*
$(document).ready(function() {
    $(".slider ol li").click(function(event) {
        var index=$(this).index();
        $(".slider ul li").eq(index).fadeIn().siblings().hide();
        $(this).addClass('current').siblings().removeClass('current');
    });
});*/
$(function () {
    $(".close_").click(function () {
        $(".content").css({'display':'none'});
    });
});
