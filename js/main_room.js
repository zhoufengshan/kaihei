
$(function(){
	//tab切换样式
	$('.friend_tit span').click(function(){
		$(this).addClass('friend_tith');
		$(this).siblings().removeClass('friend_tith');
	});

	//好友列表点击出先好友
	$('.friend_hy_con1_tit').on("click",function(){
		if($(this).children('span').attr("class")=="xiaosj"){
			$(this).children('span').attr("class","xiaosj1");
		}else{
			$(this).children('span').attr("class","xiaosj");
		}

		if($(this).siblings('.friend_hylist').is(':hidden')){
			$(this).siblings('.friend_hylist').show(1);
		}else{
			$(this).siblings('.friend_hylist').hide(1);
		}
	});	

	//右键点击好友事件
	//去掉默认的contextmenu事件，否则会和右键事件同时出现。
   	document.oncontextmenu = function(e){
       e.preventDefault();
   	};
	$('.friend_hylist').children('li').on('mousedown',function(e){
		// alert(e.clientX);
		if(e.button==2){//点击鼠标右键
			$(this).each(function(){
				$(this).addClass('friend_hylist_c');
				$(this).siblings().removeClass('friend_hylist_c');
			});
			toggler('hy_list_sbyj','hy_list_sbyj','hy_list_sbyj',1);
			var clientX=e.clientX;
			var clientY=e.clientY;
			$('.hy_list_sbyj').css({'top':clientY,'left':clientX});

		}else if(e.button==0){//点击鼠标左键
			$(this).each(function(){
				$(this).addClass('friend_hylist_c');
				$(this).siblings().removeClass('friend_hylist_c');
			});
		}else{
			return false;
		}
		
	});	

	//判断未读消息数大于99时显示99+
	if($("#wdxx").text()>99){
		$("#wdxx").text('99+');
	};
	// toggle函数替代函数
	function toggler(obj,obj1,obj2,speed){
		// alert(obj);
		if($('.'+obj).is(':hidden')){
			$('.'+obj1).show(speed);
		}else{
			$('.'+obj2).hide(speed);
		}
	}

});