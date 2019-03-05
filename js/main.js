// 用户名
var userName = getUserName();

function getHeaderData()
{
	var headerData = {"x-s-loginName": userName};
	return headerData;
}

/**
 * 获取用户名
 */
function getUserName()
{
	var userName = getQueryString("userName");
	//alert(userName);
	if (userName != null && userName != '')
	{
		// 保存userName
		setUserName(userName);
	}
	else
	{
		// 从缓存中获取
		userName = localStorage.getItem('$userName');
	}
	
	//alert(userName);
	
	return userName;
}

/**
 * 获取登录用户
 */
function getAccount()
{
		// 从缓存中获取
	var userName = localStorage.getItem('$userName');
	
	if (userName != null && userName != "")
	{
		return userName;
	}
	
	return userName;
}

/**
 * 保存用户名
 * @param {Object} userName
 */
function setUserName(userName)
{
	userName = userName || "";
	localStorage.setItem('$userName', JSON.stringify(userName));
}



/**
 * ajax 请求参数
 * @param {Object} url
 * @param {Object} data
 * @param {Object} headerData
 * @param {Object} callback
 */
function postData(url, data, callback) {
	
	//alert(url);
	var headerData = getHeaderData();
	
    jQuery.ajax(url,{  
    	headers:headerData,
        data:JSON.stringify(data),  
        dataType:'JSON',  
        //contentType: 'application/json',
        contentType:"application/json; charset=utf-8",
        type:'post',  
        timeout:60000,  
        success:callback,  
        error:function(xhr,type,errorThrown){  
        	//alert(type);
        	
            //waitingDialog.close();  
            //mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
            mui.toast("网络连接失败，请重新尝试一下");
        }
        
    });  
} 

/**
 * ajax 请求参数- 同步
 * @param {Object} url
 * @param {Object} data
 * @param {Object} headerData
 * @param {Object} callback
 */
function postDataSync(url, data, callback1) {
	
	//alert(url);
	var headerData = getHeaderData();
	
	jQuery.ajax(url,{  
    	headers:headerData,
    	async:false,
        data:JSON.stringify(data),  
        dataType:'JSON',  
        contentType:"application/json; charset=utf-8", 
        type:'post',  
        timeout:60000,  
        success:callback1,  
        error:function(xhr,type,errorThrown){  
            //waitingDialog.close();  
            //mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
            mui.toast("网络连接失败，请重新尝试一下");
        }
    }); 
} 

function postFile(url, data, callback) {
	var headerData = getHeaderData();
    jQuery.ajax(url,{  
    	headers:headerData,
        data: data,  
        dataType:'FORM-DATA',  
        //contentType: 'application/json',
        contentType:"application/json; charset=utf-8",
        type:'post',  
        timeout:60000,  
        success:callback,  
        error:function(xhr,type,errorThrown){  
        	//alert(type);
        	
            //waitingDialog.close();  
            //mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);  
            mui.toast("网络连接失败，请重新尝试一下");
        }
        
    });  
} 

function msgTip(msg, resultCode)
{
	mui.alert(msg, "提示", "OK", null);  
}

/**
 * 获取Url请求参数
 * @param {Object} name
 */
function getQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

/**
 * 获取Url请求参数
 * @param {Object} name
 */
function getQueryStringByUrl(url, name)
{
	
	var reg = new RegExp("(^|&|\\?)"+ name +"=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function initPageBarMenu()
{
	mui('#tab_menu').on('tap','#mnav-information',function(){
		window.location.href="../information.html?_d=" + companyID + "&_d=" + Math.random();
	});
	mui('#tab_menu').on('tap','#mnav-work',function(){window.location.href="../main.html?_d=" + Math.random();});
	mui('#tab_menu').on('tap','#mnav-mail',function(){window.location.href="../mailList.html?_d=" + Math.random();});
	mui('#tab_menu').on('tap','#mnav-myInfo',function(){window.location.href="../setting.html?_d=" + Math.random();});
}

function ajaxInitMui()
{
	mui('.mui-switch')['switch']();
}

/*浏览器的兼容处理方法*/
// 使用iframe打开
var createIframe = function (el, opt) {
    var elContainer = document.querySelector(el);
    var wrapper = document.querySelector(".mui-iframe-wrapper");
    if(!wrapper){
        // 创建wrapper 和 iframe
        wrapper = document.createElement('div');
        wrapper.className = 'mui-iframe-wrapper';
        for(var i in opt.style){
            wrapper.style[i] = opt.style[i];
        }
        var iframe = document.createElement('iframe');
        iframe.src = opt.url;
        iframe.id = opt.id || opt.url;
        iframe.name = opt.id;
        wrapper.appendChild(iframe);
        elContainer.appendChild(wrapper);
    }else{
        var iframe = wrapper.querySelector('iframe');
        iframe.src = opt.url;
        iframe.id = opt.id || opt.url;
        iframe.name = iframe.id;
    }
}

// 初始化编辑器 begin=====
var Edr;
function initEditer()
{
	Edr = new Eleditor({
            el: '#contentEditor',
            upload:{
               server: editerFileUploadUrl, //填写你的后端上传路径
               fileSizeLimit: 5 //限制图片上传大小，单位M
            },
            placeHolder: '请输入内容',
    });
}
// 初始化编辑器 end=====
// 初始化时间空间 begin=====
function initDataPicker()
			{
				var btns = $('.picker_input');
				btns.each(function(i, btn) {
					btn.addEventListener('tap', function() {
						var _self = this;
						if(_self.picker) {
							_self.picker.show(function (rs) {
								
								$(btn).val(rs.text);
								
								_self.picker.dispose();
								_self.picker = null;
							});
						} else {
							var optionsJson = this.getAttribute('data-options') || '{}';
							var options = JSON.parse(optionsJson);
							var id = this.getAttribute('id');
							/*
							 * 首次显示时实例化组件
							 * 示例为了简洁，将 options 放在了按钮的 dom 上
							 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
							 */
							_self.picker = new mui.DtPicker(options);
							_self.picker.show(function(rs) {
								/*
								 * rs.value 拼合后的 value
								 * rs.text 拼合后的 text
								 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
								 * rs.m 月，用法同年
								 * rs.d 日，用法同年
								 * rs.h 时，用法同年
								 * rs.i 分（minutes 的第二个字母），用法同年
								 */
								//result.innerText = '选择结果: ' + rs.text;
								//selectCallback(rs.text);
								$(btn).val(rs.text);
								/* 
								 * 返回 false 可以阻止选择框的关闭
								 * return false;
								 */
								/*
								 * 释放组件资源，释放后将将不能再操作组件
								 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
								 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
								 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
								 */
								_self.picker.dispose();
								_self.picker = null;
							});
						}
						
					}, false);
				});
			}
// 初始化时间空间 end=====

// 不记录浏览器
var fnUrlReplace = function (eleLink) {
		if (!eleLink) {
			return;
		}
		var href = eleLink.href;
		if (href && /^#|javasc/.test(href) === false) {
            if (history.replaceState) {
            	history.replaceState(null, document.title, href.split('#')[0] + '#');
                location.replace('');
            } else {
             	location.replace(href);
            }
        }
	};
	
var fnUrlLinkReplace = function (urlLink) {
		if (!urlLink) {
			return;
		}
		if (urlLink && /^#|javasc/.test(urlLink) === false) {
            if (history.replaceState) {
            	history.replaceState(null, document.title, urlLink.split('#')[0] + '#');
                location.replace('');
            } else {
             	location.replace(urlLink);
            }
        }
	};
	
var skipCurPage = function(){
	
	var curUrl = window.location.href;
	
	var currentState = history.state;
	console.log(currentState);
	
	console.log(curUrl);
	
	if (history.replaceState) {
    	history.replaceState(null, document.title, curUrl);
    } 
}


//格式话日期
// 使用方法：var pDate = nowDate.format("yyyy/MM/dd - hh: mm");

Date.prototype.Format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S" : this.getMilliseconds()
	//millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}

	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}