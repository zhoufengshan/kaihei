// 存储数据 
function saveStorage(val,pass){
	var gameaccount=$("#"+val).val();
	localStorage.setItem("gameaccount",gameaccount);
	var gamepassword=$("#"+pass).val();
	localStorage.setItem("gamepassword",gamepassword);
}
//检查本地是否有数据，如果有数据，自动填入，
function detection(){
	var gameaccount = localStorage.getItem("gameaccount");
	var gamepassword = localStorage.getItem("gamepassword");
	if(gameaccount!=null&&gamepassword!=null){
		$("#login_zh").val(gameaccount);
		$("#login_password").val(gamepassword);
	}else{
		return false;
	}
}


