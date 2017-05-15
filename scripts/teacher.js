var num = 0;//显示的图片数量
var rstList = new Array();//储存图片的集合
//rstList.remove(teacherId);//移除存储的id数组元素;rstList.push(teacherId);//添加存储的id数组元素
$(document).ready(function(){
	  /**
	   * .replace(/\D|^0/g,'')只能输入数字，不可以小数
	   */
	  $("#username").keyup(function(){     
	    var tmptxt=$(this).val();     
	    $(this).val(tmptxt.replace(/\D|^0/g,''));     
	      }).bind("paste",function(){     
	          var tmptxt=$(this).val();     
	      $(this).val(tmptxt.replace(/\D|^0/g,''));    
	   }).css("ime-mode", "disabled");  
	  
	  
		//限制文本框输入的字数400
		$('#message').keyup(function(){
			var maxLength = 400;
			var l = $(this).val().length;
			$('.limit strong').text(maxLength - l);
			if($('.limit strong').text() <= 10)
			{
				$(".note").css("display","block");
				if($('.limit strong').text() < 0)
				{
					$('.limit strong').text('0');
					var val = $(this).val().substring(0,400);
					$(this).val(val);
				}
			}

		});

});

/**
 * 教师登录
 */

function teacherLogin(){
	
	var teacherAccount = $('#username').val();
	var teacherPassword = $('#password').val();
	
	 
    if (!isEmpty(teacherAccount) && !isEmpty(teacherPassword)) {
    	 if(teacherPassword.length>=6 && teacherPassword.length<=20){
             alert("登录成功,跳转到主页");
             window.location = '../index.html';
    	  	  /*$.ajax({
    	  		    dataType:  'json',
    	  		    url:'/HomeSchool/teacher/teacherLogin.do',//url:WEBROOT+'/user/userLogin.do',
    			    type:'post',
    			    data:{
    			    	teacherAccount:teacherAccount,
    			    	teacherPassword:teacherPassword,
    			    },
    			    success:function(res){
    			      if(res.resultCode=="SUCCESS"){
    			    	  alert("登录成功");
    			    	  window.location = WEBROOT + '/teacher/index.do';
    			      }
    			      else if(res.resultCode=="FAILE"){
    			        alert("登录失败，请检查账号和密码");
    			      }
    			    }
    			 });*/
    	 }else{
    		 alert("密码是六至二十位");
    	 }
    }else{
    	alert("请填写登录信息");
    }
	
}

function test(){
	alert("暂时不添加图片");
}

/**
 * 测试批量图片上传
 */

function testUploadPicDemo(){
	
	var uploadPhoto = $('#uploadField').val();//文件按钮的图片路径
	
	
    var imgUploadUrl = '/HomeSchool_uploads/upload_json.jsp';
	
    $('#uploader').ajaxSubmit({
          dataType:  'json',
          url : imgUploadUrl,
          type: 'post',
          data:{},
          success:function(res){
            //alert("图片上传成功！路径为："+res.urlList);
            $('#uploadPhoto').html(uploadPhoto);
            $('#finalImg').attr('src',res.url);
            //$('#finalImg01').attr('src',res.url01);
            //$('#previewPhoto').html(previewPhoto);
            $('#finalPhoto').html(res.urlList)//上传成功后的图片路径
            alert("res.urlList="+res.urlList);
            //批量上传图片
            //handlePicList(res.urlList);
		    $.ajax({
		        url : "/HomeSchool/teacher/handlePicList.do",
		        type: "post",
		        dataType: "json",
		        data:{
		        	picList:JSON.stringify(res.urlList),
			    	testStr:"123"	
		        },
		        success: function(res) {
		        	alert("上传成功");
		        	
		        	for (var int = 0; int < res.pictureList.length; int++) {
						var PICTURElIST = '<img width="50px" height="50px" alt="无" src='+res.pictureList[int]+'>';
						$('#picShow').append(PICTURElIST);
					} 
		           //window.location = WEBROOT + '/admin/stuDetail.do?studentId='+studentId;

		        },
		        error:function(){
		          alert("未修改成功,请检查操作");
		        }
		      });
          },
          error: function(res) {
            alert("系统错误，保存失败！");
          }
      });
	
	
}
/**
 * 在添加图片，删除图片时依然要遍历，只不过得把握两点规则：
   1.添加图片时传递某个id（photo和addicon一一对应，id一致），然后显示该id的图片，此时原来的addicon隐藏并随机遍历一个addicon出来（但要保证不能和已显示的photo的id一致）
   2.删除时，先将所有addicon删除，然后你删哪个photo，就显示对应的addicon
 * @param id
 */
//发表动态时点击添加图片按钮增加图片
function addPhoto(id){
	$(".photo-list-li,.nav-photo").each(function(index){
		/**
		 * 把photo对应addicon里面file没有值得photo除去
		 */
		if ($("#add-icon0"+index).find('.uploadField').val() == "") {
			$("#photo"+index).css("display","none");
			num--;
		}
	});
	//alert("添加图片，此时num="+num);
	$(".photo-list-li,.nav-photo").each(function(index){
		
		if($("#photo"+index).css("display")=='none')
		{			
			//alert("第"+index+"个div马上要显示了");
			$('#photo'+id).css("display","inline-block");

			$('#add-icon0'+id).css("display","none");//保证点击的那个addicon要消失
			if (index != id) {//保证点击的那个addicon要消失且出现的photo不能与addicon同时出现
				$('#add-icon0'+index).css("display","inline-block");
				num++;
				if(num==9)
				{
					$('#add-icon0'+index).css("display","none");
				}
				
				return false;
			}
		}
	});
	
}


//删除图片
function deletePhoto(id){
	//alert("删除图片，此时num="+num);
	//alert("删除图片，此时id="+id);
	var elements = document.getElementsByClassName("photo-list-li");
	elements.item(id).style.display = "none";
	num--;
	$(".add-icon").each(function(index){
		//alert("删除index="+(index+1));
		//$("#add-icon0"+(index+1)).css("display")=='inline-block'
		$("#add-icon0"+(index+1)).css("display","none");
//		alert("成功删除icon"+(index+1));
	});
	if(num!=9)
	{
		$("#add-icon0"+(id+1)).css("display","inline-block");//保证删除时不把同一id的photo和addicon删了
		//alert("要删除的input file值="+$("#add-icon0"+(id+1)).find('.uploadField').val());
		$("#add-icon0"+(id+1)).find('.uploadField').val("");
		$('#preview'+(id+1)).find(".nav-photo").attr("src","");
		rstList.remove($('#rst'+(id+1)).val());//移除存储的id数组元素
		console.log('rstList移除后' + rstList);
	}
}

/**
 * 发表动态消息
 */
function addMessage(){
	var flag = false;
	var studentId = $('#studentId').val();
	var teacherId = $('#teacherId').val();
	var messageInfo = $('#message').val();
	//遍历看是否有上传到图片
	$(".add-icon").each(function(index){
		
		if(!isEmpty($("#add-icon0"+(index+1)).find('.uploadField').val())){
			flag = true;
		}
	});
	
	if (!isEmpty(messageInfo) && flag) {
		  var r=confirm("确认发表动态？"); 
		 
		  if (r==true){
              alert("图片将传入后台处理成功后，跳转到个人动态空间");
              window.location = 'dynamicSpace.html';
			    /*$.ajax({
			        url : "/HomeSchool/teacher/addMessage.do",
			        type: "post",
			        dataType: "json",
			        data:{
			        	rstList:JSON.stringify(rstList),
			        	messageInfo:messageInfo,
			        	studentId:studentId,
			        	teacherId:teacherId
			        },
			        success: function(res) {
			        	alert("发布成功");
			        	window.location = '/HomeSchool/teacher/getMessageByTeacher';
			        },
			        error:function(){
			          alert("未发布成功,请检查操作");
			        }
			      });*/
		  }

/* 		$.ajax({  
	        url : "/HomeSchool/teacher/fileUploadPicture",  
	        type: "post",
	        data : {  
	            //imgdata:rst.base64//压缩后的base值  
	            rstList:JSON.stringify(rstList)//转换为json数组
	        },  
	        dataType:"json",  
	        cache:false,  
	        async:false,  
	        success : function(data) {  
	        if(data.success)  
	            {  
	                alert(data.message);///data.message为上传成功后的文件路径  
	            }else{  
	                alert(data.message);///data.message为上传失败原因  
	            }  
	                          
	        },  
	    	error : function(){  
	            alert("上传失败");  
	        }  
        }); */
	} else if(!isEmpty(messageInfo) && !flag){
		  var r=confirm("确认发表动态？"); 
		  if (r==true){
              alert("图片将传入后台处理成功后，跳转到个人动态空间");
              window.location = 'dynamicSpace.html';
			    /*$.ajax({
			        url : "/HomeSchool/teacher/addMessage.do",
			        type: "post",
			        dataType: "json",
			        data:{
			        	picList:JSON.stringify(rstList),//无图片
			        	messageInfo:messageInfo,
			        	studentId:studentId,
			        	teacherId:teacherId
			        },
			        success: function(res) {
			        	alert("发布成功");
			        	window.location = '/HomeSchool/teacher/getMessageByTeacher';
			        },
			        error:function(){
			          alert("未发布成功,请检查操作");
			        }
			      });*/
		  }

	}else{
		alert("请填写信息！");
	}

}
/**
 * 压缩上传的图片
 * @param that
 * @param id
 * @returns {Boolean}
 */
function fileChange(that,id){  
	//alert("进入上传");
	var filepath=$(that).val();  
    if(filepath=="")  
    {  
        return;  
    }  
    var extStart=filepath.lastIndexOf(".");  
    var ext=filepath.substring(extStart,filepath.length).toUpperCase();  
    if(".jpg|.png|.bmp|.jpeg".toUpperCase().indexOf(ext.toUpperCase())==-1){  
       alert("只允许上传jpg、png、bmp、jpeg格式的图片");  
        return false;  
    }  

   	 //以图片宽度为1200进行压缩  
    	lrz(that.files[0], {  
    	     width: 1200,
    	     height:1200
    	   })  
    	.then(function (rst) {  
    		alert("图片正进行压缩");
    		
			var img = new Image(),
    	    sourceSize = toFixed2(that.files[0].size / 1024),
    	    resultSize = toFixed2(rst.fileLen / 1024),
    	    scale = parseInt(100 - (resultSize / sourceSize * 100));
    		
    	    
    	    //alert("源文件："+sourceSize);
    	    console.log('源文件：' + sourceSize + 'KB');
    	    console.log('压缩后文件：' + resultSize + 'KB');
    	    console.log('省：' + scale + '%');
    		
    		img.src = rst.base64;
    		
    		$('#preview'+id).find(".nav-photo").attr("src",img.src);
/*    		console.log('img.src=：' + img.src);
    		console.log('rstList添加前' + rstList);
    		console.log('rstList添加前' + rstList)*/
    		rstList.push(img.src);
    		
    		$('#rst'+id).val(img.src);
/*    		console.log('rst放入input中：' + $('#rst1').val());
    		console.log('rstList添加后' + rstList);*/

    	     });  

}  
function toFixed2 (num) {
    return parseFloat(+num.toFixed(2));
}


/**
 * ajax删除该老师管理学生的动态消息
 */
function deleteMessage(msgId){
  var r=confirm("确认删除该动态吗？"); //删除提示框
  if (r==true)
  {	
     $.ajax({
        url : "/HomeSchool/teacher/deleteMessage.do",
        type: "post",
        dataType: "json",
        data:{msgId:msgId},
        success: function(res) {
        	if(res.resultCode == "SUCCESS"){
        		alert("动态删除成功!");  
                window.location = '/HomeSchool/teacher/getMessageByTeacher.do';
        	}
        },
  
        error:function(){
          alert("系统繁忙，请稍后操作");
        }
      });
  }

}


/**
 * ajax加载更多某学生动态消息
 */
function addMoreDynamicInfo(){
	$('#add').hide();
	$('#load').show();
	//alert("ajax加载更多某学生动态消息");
	var pageNum = $('#pageNum').html();
	var studentId = $('#studentId').val();
	$.ajax({
		url : "/HomeSchool/teacher/addMoreMessageByStu.do",
		type:'post',
		data:{
			studentId:studentId,	
			pageNum:pageNum
		},
		dataType: "json", 
		success:function(res){ 
		    if(res.resultCode == "TRUE"){
		    	$('#add').show();
		    	$('#load').hide();
		      showMoreDynamicInfo(res);
		      $('#pageNum').html(parseInt($('#pageNum').html())+1);	
		    }
		    if(res.resultCode == "FALSE"){
		      $('#load').hide();
		      $('#noResult').show();
		    }
		  
		},
		error:function(){
		  alert("系统繁忙，请稍后操作");
		}
	});
}

//显示更多加载某学生动态消息
function showMoreDynamicInfo(res){
	//alert("res.moreMessageList.length="+res.moreMessageList.length);
	for(var i=0;i<res.moreMessageList.length;i++){
		Message = res.moreMessageList[i];

		var picContent = '';
		if (!isEmpty(Message.pictureList)) {
			for(var j=0;j<Message.pictureList.length;j++){
				pic = Message.pictureList[j];
				 picContent = picContent + '     <li class="photo-list-li record-li">'
				 						 + '          <div style="overflow: hidden;"><img src="'+pic+'" class="nav-photo"/></div>'
				 						 + '     </li>';
			}
		}



	var htmlContent = '<div class="one-record">'
	    + '        	   <div class="record-head">'
	    + '            		<div class="head-portrait">'
	    + '        				<img src="'+res.student.studentPhoto+'" />'
	    + '        			</div>'
	    + '         		<div class="stu-name">'
	    + '            			<a href="javascript:void(0)">'+res.student.studentName+'</a>'
	    + '            			<span>'+Message.msgTime+'&nbsp;&nbsp;by '+Message.teacherName+'</span>'
	    + '                 </div>'
	    + '          	</div>'
	    + '            <div style="clear: both"></div> '
	    + '            <div class="record-info">'
	    + '            		<span>'
	    + '          			'+Message.msgInfo+''
	    + '            		</span>'
	    + '            		<div class="record-info-img">'
	    + '         			<div class="dynamic-photo-list">'
	    + '          				<ul class="photo-list-ul">'
	    + '            					'+picContent
	    + '            					<div style="clear:both;"></div>'
	    + '          				</ul>'
	    + '        				</div>'
	    + '					</div>'
	    + '      		</div>'
	    + '      		</div>';

		$('.container').append(htmlContent);
	
	};

}



/**
 * ajax加载更多教师发布动态消息
 */
function addMoreDynamicInfoAll(){
	$('#add').hide();
	$('#load').show();
	//alert("ajax加载更多教师发布动态消息");
	var pageNum = $('#pageNum').html();
	$.ajax({
		url : "/HomeSchool/teacher/addMoreMessageByTeacher.do",
		type:'post',
		data:{
		  pageNum:pageNum
		},
		dataType: "json", 
		success:function(res){ 
		    if(res.resultCode == "TRUE"){
		    	$('#add').show();
		    	$('#load').hide();
		      showMoreDynamicInfoAll(res);
		      $('#pageNum').html(parseInt($('#pageNum').html())+1);	
		    }
		    if(res.resultCode == "FALSE"){
		      $('#load').hide();
		      $('#noResult').show();
		    }
		  
		},
		error:function(){
		  alert("系统繁忙，请稍后操作");
		}
	});
}

//显示更多加载出来的教师发布动态消息
function showMoreDynamicInfoAll(res){
	//alert("res.moreMessageList.length="+res.moreMessageList.length);
	for(var i=0;i<res.moreMessageList.length;i++){
		Message = res.moreMessageList[i];

		var picContent = '';
		if (!isEmpty(Message.pictureList)) {
			for(var j=0;j<Message.pictureList.length;j++){
				pic = Message.pictureList[j];
				 picContent = picContent + '     <li class="photo-list-li record-li">'
				 						 + '          <div style="overflow: hidden;"><img src="'+pic+'" class="nav-photo"/></div>'
				 						 + '     </li>';
			}
		}



	var htmlContent = '<div class="one-record">'
	    + '        	   <div class="record-head">'
	    + '            		<div class="head-portrait">'
	    + '        				<img src="'+Message.student.studentPhoto+'" />'
	    + '        			</div>'
	    + '         		<div class="stu-name">'
	    + '            			<a href="javascript:void(0)">'+Message.student.studentName+'</a>'
	    + '            			<span>'+Message.msgTime+'&nbsp;&nbsp;by '+Message.teacherName+'<a href="javascript:void(0)" onclick="deleteMessage('+Message.msgId+')" style="margin-left: 60px; color: gray;">删除</a></span>'
	    + '                 </div>'
	    + '          	</div>'
	    + '            <div style="clear: both"></div> '
	    + '            <div class="record-info">'
	    + '            		<span>'
	    + '          			'+Message.msgInfo+''
	    + '            		</span>'
	    + '            		<div class="record-info-img">'
	    + '         			<div class="dynamic-photo-list">'
	    + '          				<ul class="photo-list-ul">'
	    + '            					'+picContent
	    + '            					<div style="clear:both;"></div>'
	    + '          				</ul>'
	    + '        				</div>'
	    + '					</div>'
	    + '      		</div>'
	    + '      		</div>';

		$('.container').append(htmlContent);
	
	};

}


/**
 * 判断为空
 */
var isEmpty = function(obj) {
  if (obj == null || obj == undefined || jQuery.trim(obj).length == 0 || obj == "" || obj === "null") {
    return true;
  }
  return false;
};


/**
 * 验证输入框是否有非法字符
 */ 
var valiInput = function(obj){
  
  var patrn=/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;  
  
  if (patrn.test(obj)) {
    return false;
  } else {
    return true;  
  }
};

/**
 * 构造删除数组元素函数
 */
Array.prototype.remove = function(val) { 
	var index = this.indexOf(val); 
	//console.log(this);
	if (index > -1) { 
		this.splice(index, 1); 
	} 
};

/**
 * 预览图片
 * @param file
 */
function previewImage(file,id)  
{  console.log(' previewImage当前this=：' + this);
  var MAXWIDTH  = 150;  
  var MAXHEIGHT = 100;  
  var div = document.getElementById('preview'+id);  
  if (file.files && file.files[0])  
  {  
    div.innerHTML = '<img id=imghead'+id+'>';  
    var img = document.getElementById('imghead'+id);  
    img.onload = function(){  //成功地装载了图像时调用的事件处理程序
      var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);  
      img.width = rect.width;  
      img.height = rect.height;  
      img.style.marginLeft = '0px';  
      img.style.marginTop = '0px';  
    }  
    var reader = new FileReader();  
    reader.onload = function(evt){img.src = evt.target.result;}  
    reader.readAsDataURL(file.files[0]);  
  }  
  else  
  {  
    var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';  
    file.select();  
    var src = document.selection.createRange().text;  
    div.innerHTML = '<img id=imghead'+id+'>';  
    var img = document.getElementById('imghead'+id);  
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;  
    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);  
    status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height); 
    //div.innerHTML = "<div id=divhead style='width:100%;height:100%;margin-top:0;margin-left:0;"+sFilter+src+"\"'></div>";  
    div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;margin-left:"+rect.left+"px;"+sFilter+src+"\"'></div>"; 
  }  
}  
function clacImgZoomParam( maxWidth, maxHeight, width, height ){  
    var param = {top:0, left:0, width:width, height:height};  
    if( width>maxWidth || height>maxHeight )  
    {  
        rateWidth = width / maxWidth;  
        rateHeight = height / maxHeight;  
          
        if( rateWidth > rateHeight )  
        {  
            param.width =  maxWidth;  
            param.height = Math.round(height / rateWidth);  
        }else  
        {  
            param.width = Math.round(width / rateHeight);  
            param.height = maxHeight;  
        }  
    }  
      
    param.left = Math.round((maxWidth - param.width) / 2);  
    param.top = Math.round((maxHeight - param.height) / 2);  
    return param;  
}  

//拖拽函数
function drag(dv){
  var disX = 0;
  var disY = 0;
  dv.onmousedown = function(ev){
    var oEvent = ev || event;
    disX = oEvent.clientX-dv.offsetLeft;
    disY = oEvent.clientY-dv.offsetTop;
    document.onmousemove = function(ev){
      var oEvent = ev || event;
      var l = oEvent.clientX-disX;
      var t = oEvent.clientY-disY;
      //50表示;自动吸附，当距离边侧50px时，自动吸附到边侧
      if(l<0){   //左边
        l=0;
      }else if(l>document.documentElement.clientWidth-dv.offsetWidth){  //右边
        l=document.documentElement.clientWidth-dv.offsetWidth;
      }
      if(t<0){  //上
        t=0;
      }else if(t>document.documentElement.clientHeight-dv.offsetHeight){  //下
        t=document.documentElement.clientHeight-dv.offsetHeight;
      }
      dv.style.left = l+'px';
      dv.style.top = t+'px';
    };
    document.onmouseup = function(){
      document.onmousemove=null;
      document.onmouseup=null;
    };
    oEvent.stopPropagation();//阻止冒泡，当前div上的东西还是可以操作
  };    
}


