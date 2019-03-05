/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.userName = loginInfo.userName || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.userName.length < 11) {
			return callback('账号最短为 11 个字符');
		}
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6个字符');
		}
		
		
		postData(loginUrl, loginInfo, function(data){
			
			var resultCode = data.resultCode;
			if (resultCode == '000000')
			{
				var user = data.user;
				if (user.mobileLogin != 1)
				{
					return callback('您没有权限登录应用');
				}
				return owner.createState(loginInfo.userName, user.nickName, user.id, user.mobileManage, callback);
			}
			else
			{
				return callback('用户名或密码错误');
			}
			
		});
		
		//var users = JSON.parse(localStorage.getItem('$users') || '[]');
		//var authed = users.some(function(user) {
		//	return loginInfo.userName == user.userName && loginInfo.password == user.password;
		//});
		//if (authed) {
		//	return owner.createState(loginInfo.userName, callback);
		//} else {
		//	return callback('用户名或密码错误');
		//}
	};

	owner.createState = function(name, nickName, userID, mobileManage, callback) {
		
		console.log(callback);
		
		// 保存userName
		localStorage.setItem('$userName', name);
		
		var state = owner.getState();
		state.userName = name;
		state.nickName = nickName;
		state.userID = userID;
		state.mobileManage = mobileManage;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};
	
	owner.logout = function(callback) {
		
		// 保存userName
		localStorage.setItem('$userName', '');
		localStorage.setItem('$account', '');
		
		// 域名
		localStorage.setItem('$domain', '');
		
		var state = owner.getState();
		state.userName = '';
		state.nickName = '';
		state.userID = '';
		state.mobileManage = '';
		state.companyID = '';
		state.token = "";
		owner.setState(state);
		return callback();
	};
	
	
	/**
	 * 创建当前位置
	 **/
	owner.createLocalPoistion = function(latitude, longitude) {
		var localPoistion = owner.getLocalPoistion();
		localPoistion.latitude = latitude;
		localPoistion.longitude = longitude;
		owner.setLocalPoistion(localPoistion);
		return localPoistion;
	};
	
	/**
	 * 获取当前位置
	 **/
	owner.getLocalPoistion = function() {
		var localPoistionText = localStorage.getItem('$localPoistion') || "{}";
		return JSON.parse(localPoistionText);
	};
	
	/**
	 * 设置当前状态
	 **/
	owner.setLocalPoistion = function(localPoistion) {
		localPoistion = localPoistion || {};
		localStorage.setItem('$localPoistion', JSON.stringify(localPoistion));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.userName = regInfo.userName || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.userName.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));