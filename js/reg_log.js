/*注册登陆忘记密码页面
表单提交、验证*/

function get_focus(selector) {
    $(selector).focus();
}
//验证手机号
function check_mobile(){
	var pattern = /^1[34578]\d{9}$/; 
    var mobile = $("#mobile").val();
    if(mobile.length == 0) {
        layer.msg('请输入手机号',{time:1000,offset:"250px"});
        return false;
    } 
    else if(isNaN(mobile) || mobile.length != 11) {
        layer.msg('您输入的手机号不正确,请核对后重新输入',{time:1000,offset:"250px"});
        return false;
    }
    else if(!pattern.test(mobile)){
    	layer.msg("格式不正确!",{time:1000,offset:"250px"});
    	return false;
    }
    return true;
}
//验证码
function check_yzm(obj){
    var yzm = $("#"+obj).val();
    // console.log(yzm);
    if (yzm.length == 0) {
        layer.msg('验证码不能为空！',{time:1000,offset:"250px"});
        return false;
    }
    return true;
}

//短信验证码
var reg_timer=null;
var sms_time=parseInt("60");
function send_sms()
{
    //判断手机号码是否是被绑定的 如果被绑定 就不让发送验证码
    var mobile = $('#mobile').val();
    if(mobile.length == 0) {
        get_focus("#mobile");
        layer.msg("请输入手机号码!",{time:1000,offset:"250px"});
        return false;
    }
    $("#send").prop("disabled",true);//按钮不能用
	var url = 'http://api.kh.com/v1/sms/send';
    $.post(url, {mobile:mobile, sms_template:'sms_reg'}, function(data){
        if (data.status == true)
		{
            layer.msg(data.msg);
     		$("#send").val("重发").prop("disabled",true);//按钮不能用
            reg_timer=setInterval(function(){resend('send');},1000);
		} else {
            layer.msg(data.msg,{time:1000,offset:"250px"});
		}
    }, 'json');

}

function resend(obj){
	$('#'+obj).val("重发"+sms_time+"S");
	sms_time--;
	if(sms_time<0){
		sms_time=parseInt("60");
		$("#"+obj).val("重发").prop("disabled", false);
    	clearInterval(reg_timer);
	}
}
//验证密码
function check_password(obj) {
    var password = $('#'+obj).val();
    var no_number = /^(\d)+$/;
    if (password.length < 6 || password.length > 16) { 
        layer.msg('密码长度要在6-16位之间',{time:1000,offset:"250px"});
        return false;
    }else if(no_number.test(password)){
    	layer.msg('密码不能为纯数字',{time:1000,offset:"250px"});
    	return false;
    }
    return true;
}
//确认密码
function check_repassword(old,newv) {
    var password=document.getElementById(old).value;
    var repassword=document.getElementById(newv).value;
    if (repassword.length < 6 || repassword.length > 16) {
        layer.msg('重复密码长度要在6-16位之间',{time:1000,offset:"250px"});
        return false;
    }
    if (password != repassword) {
        layer.msg('两次输入密码不一致！',{time:1000,offset:"250px"});
        return false;
    }
    return true;
}

// 手机提交注册
$(function(){
    $('#sub_mob').on('click',function(){
        if (check_mobile()&& check_yzm('yzm') && check_password('password') 
            &&check_repassword('password','repassword')&&fwxy_('fwxy1')) {
           var url = uRl+'/v1/register';
            $.ajax({
            	type: "post",
			    url: url,
				dataType: "JSON",
			    data:$("#zcform").serialize(),
			    success:function(msg){
                    if (msg.status == true) {
                        // window.location.href="reg_success.html";
					} else if(msg.code=='1101'){
                         //判断手机号是否注册过，注册过显示手机号已经注册过了，
                        $(".ipt_p1_1").css({"display":"block"});
					}
			    },
			    error:function(){
			    	
			    }
            });
        }
    });
});
// =============邮箱================
//验证邮箱
function check_mail(){
    var mail=/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/;
    var mailv=$("#mail").val();
    if(mailv.length==0){
        layer.msg('请输入邮箱！',{time:1000,offset:"250px"});
    }else if(!mail.test(mailv)){
        layer.msg('邮箱格式不正确！',{time:1000,offset:"250px"});
    } else{
        return true;
    }
}

//发送邮箱验证码
function send_mail(){
    var mail=$('#mail').val();
    if(mail.length==0){
        get_focus("#mail");
        layer.msg("请输入邮箱地址!",{time:1000,offset:"250px"});
        return false;
    }
    var url=uRl+"/v1/mail/send";
    $.post(url,{mail:mail,mail_template:'mail_reg'},function(data){
        if(data.status==true){
            //发送成功
            $('#mail_send').val('重新发送！');
        }
    },'json');
}


// 邮箱提交注册
$(function(){
    $('#sub_mail').on('click',function(){
        if (check_mail() && check_yzm('mail_yzm') && check_password('mailpassword')&&check_repassword('mailpassword','mailrepassword') && fwxy_('fwxy2')) {
            var url = uRl+'/v1/register';
            console.log(url);
            console.log($("#zcform_mail").serialize());
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                data:$("#zcform_mail").serialize(),
                success:function(msg){
                    if (msg.status == true) {
                        //注册成功跳转
                        window.location.href="reg_success.html";
                    } else {
                        //是否注册过
                        $(".ipt_p1_2").css({"display":"block"});//邮箱注册过了，
                    }

                },
                error:function(){
                    
                }
            });
        }
    });
});
// =====================================自定义====================
//检测自定义账号
function check_custom(){
    var custom=/^[a-zA-Z]{4,16}$/;
    var customv=$("#custom").val();
    if($("#custom").val()==""){
        layer.msg('账号不能为空！',{time:1000,offset:"250px"});
    }else if(!custom.test(customv)){
        layer.msg('账号格式不正确！',{time:1000,offset:"250px"});
    } else{
        return true;
    }
}
//自定义验证提交注册
$(function(){
    $('#sub_custom').click(function(){
        if (check_custom()&& check_password('custompassword') &&check_repassword('custompassword','repassword_custom')&&fwxy_('fwxy3') ) {
           var url = uRl+'/v1/register';
           console.log(url);
           console.log($("#zcform_custom").serialize());
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                data:$("#zcform_custom").serialize(),
                success:function(msg){
                    if (msg.status == true) {
                      
                        //下一步后跳转至密保问题页面
                        window.location.href="sec_question.html";
                    } else {
                        //同样判断是否注册过
                        $('.ipt_p1_3').html(' * 该账号已注册,请<a href="login.html">登陆</a>');
                    }
                },
                error:function(){
                    
                }
            });
        }
    });
});

// 用户服务协议勾选
var reg_fwx=1;
function reg_fwxy(val,val2){
    if(reg_fwx==1){
        $('.'+val2).css({'background':'url(./img/zhuce/reg_dh.png)center center no-repeat'});
        reg_fwx=0;  
        $("#"+val).val("true");
    }
    else{
        $('.'+val2).css({'background-image':'none'});
        reg_fwx=1; 
        $("#"+val).val("false");
    }
}

function fwxy_(val){
    var fw=document.getElementById(val).value;
    if(fw=="false"){
        layer.msg('请先阅读用户服务协议',{time:1000,offset:"250px"});
    }else{
        return true;
    }
}


// 登陆页面登录
$(function(){
    $('#sub_login').on("click",function(){
        if($('#login_zh').val()==''||$('#login_password').val()==''){
            layer.msg('账户名和密码不能为空！',{time:1000,offset:"250px"});
        }else{
            var url=uRl+"/v1/login";
            console.log(url);
           console.log($("#login_form").serialize());
            $.ajax({
                type: "post",
                url: url,
                dataType: "json",
                data:$("#login_form").serialize(),
                success:function(msg){
                    if (msg.status == true) {
                        //登录成功
                        if($("#fwxy").val()==true){
                            saveStorage();//存储信息到本地
                        }
                        window.location.href=""
                    } else {
                        
                    }

                },
                error:function(){
                    
                }
            });
        }
    });
})

function check_mibao(obj){
    var mibao=document.getElementById(obj).value;
    if(mibao==''){
        layer.msg('请输入密保答案',{time:1000,offset:"250px"});
    }else{
        return true;
    }
}
//注册时密保提交
$(function(){
    $("#sub_mibaotj").click(function(){
        if(check_mibao('mibaomm')){
             layer.msg('请输入密保答案',{time:1000,offset:"250px"});
        }
        var url=uRl+"";
        $.ajax({
            type: "post",
                url: url,
                dataType: "json",
                data:$("#mibao_form").serialize(),
                success:function(msg){
                    if (msg.status == true) {
                        layer.msg(msg.msg,{time:1000,offset:"250px"});
                    //密保提交成功以后跳转至
                    window.location.href="reg_success.html";
                    } else {
                        layer.msg(msg.msg,{time:1000,offset:"250px"});
                        
                    }

                },
                error:function(){
                   
                }
        });
    });
});
//手机验证页面提交
$(function(){
    $('#mob_yz_tj').on("click",function(){
       var url=uRl+"";
       $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data:$("#yzsj_form").serialize(),
            success:function(msg){
                if (msg.status == true) {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    //手机号验证成功以后恭喜验证成功页面出现，
                   $('.mob_con1').css({'display':'none'});
                   $('#mob_num').text();//text值为验证成功的手机号
                   $('.mob_con2').css({'display':'block'});
                } else {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    
                }

            },
            error:function(){
               
            }
        });
    });
});
/*=======================修改密码======================*/
//提交修改密码的账号
$(function(){
    $('#sub_fgtnext1').on('click',function(){
        var url=uRl+'';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data:$("#fgtpwd_form").serialize(),
            success:function(msg){
                if (msg.status == true) {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                   
                } else {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    
                }

            },
            error:function(){
               
            }
        });
    });
});
//提交修改密码的方式
$(function(){
    $('#sub_fgtnext2').on('click',function(){
        var url=uRl+'';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data:$("#fgtpwd_sele_form").serialize(),
            success:function(msg){
                if (msg.status == true) {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                   
                } else {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    
                }

            },
            error:function(){
               
            }
        });
    });
});

//提交通过手机修改的密码
$(function(){
    $('#fgt_sub_mob').on('click',function(){
        var url=uRl+'';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data:$("#fgtpwd_mob_form").serialize(),
            success:function(msg){
                if (msg.status == true) {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                   
                } else {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    
                }

            },
            error:function(){
               
            }
        });
    });
});

//提交通过邮箱修改的密码
$(function(){
    $('#fgt_sub_mail').on('click',function(){
        var url=uRl+'';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data:$("#fgtpwd_mail_form").serialize(),
            success:function(msg){
                if (msg.status == true) {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                   
                } else {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    
                }

            },
            error:function(){
               
            }
        });
    });
});  

//提交通过密保修改的密码
$(function(){
    $('#subfgt_mibao').on('click',function(){
        var url=uRl+'';
        $.ajax({
            type: "post",
            url: url,
            dataType: "json",
            data:$("#fgtmibao_form").serialize(),
            success:function(msg){
                if (msg.status == true) {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                   
                } else {
                    layer.msg(msg.msg,{time:1000,offset:"250px"});
                    
                }

            },
            error:function(){
               
            }
        });
    });
});  