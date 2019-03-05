
// 必须登录使用
var loginUserName = getUserName();
if (loginUserName == null || loginUserName == '')
{
	//location.href = "../../login.html";
}

var curAccount = getAccount();
if (typeof(curAccount) == 'undefined' || curAccount == null || curAccount == '')
{
	//location.href = "../../login.html";
}

var state = app.getState();
var mobileManage = state.mobileManage;

if (mobileManage != 1)
{
	$("#mnav_time").hide();
	$(".tab-box").find("a").css("width", "33%");
}

