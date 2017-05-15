// JavaScript Document
/*-------------------登录验证begin------------------*/
/*function checkLogin(){
	var name = document.getElementById("username");
	var password = document.getElementById("password");

	if(name == ""){
		alert("请输入账号！");
		//return false;
	}
	if(password == ""){
		alert("请输入密码！");
		//return false;
	}
	if(document.getElementById("autoLogin").checked){//自动登录被选中
		setCookie("name",name,7);  //将账号id保存进cookie,有效期为7天
		setCookie("password",password,7);
	}
	//return true;
}*/
/*-------------------登录验证end------------------*/
$(document).ready(function(){
	/*-------------------导航管理begin------------------*/
	$('.go-menu').click(function(){
		$(this).fadeOut(200);
		$('.go-back').fadeIn(200);
		$('.navigation').fadeIn(200);
		return false;
	});
	
	$('.go-back').click(function(){
		$(this).fadeOut(200);
		$('.go-menu').fadeIn(200);
		$('.navigation').fadeOut(200);
		return false;
	});
	/*-------------------导航管理end------------------*/
	
	$('.has-submenu').click(function(){
		$(this).parent().find('.dropdown-menu').toggleClass('dropup-menu');
		$(this).parent().find('.submenu').toggle(150);
		return false;
	});
	
	$('.wide-image a').click(function(){
		$(this).parent().parent().find('.wide-active').toggle(100);
	});
	
	$('.update-button').click(function(){
		$(this).parent().find('.page-update-text').toggle(100);
		$(this).parent().find('.update-icon').toggleClass('active-update-icon');
	});
	
	$('.style-changer').click(function(){
		return false;
	});
	
	$('.close-nav, .sidebar-close, .shortcut-close').click(function(){
		snapper.close();
	});
	
	$('.shortcut-search').click(function(){
		$('.sidebar-shortcuts').hide();
		$('.sidebar-search').show();
	});
	
	$('.search-close').click(function(){
		$('.sidebar-search').hide();
		$('.sidebar-shortcuts').show();
	});

	$('.open-nav').click(function(){
		//$(this).toggleClass('remove-sidebar');
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
		return false;
	});
	
	$('.wide-image').click(function(){
		$(this).parent().find('.wide-item-content').toggle(50);
		return false;
	});
	
	var snapper = new Snap({
	  element: document.getElementById('content')
	});

	$('.deploy-sidebar').click(function(){
		//$(this).toggleClass('remove-sidebar');
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
		return false;
	});

	
});