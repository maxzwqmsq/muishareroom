/*!
 * ======================================================
 * imageShowTools Template For MUI (http://dev.dcloud.net.cn/mui)
 * =======================================================
 * @version:1.0.0
 * @author:cuihongbao@dcloud.io
 */
var imageTools = (function() {
	
	var index = 1;
	var size = null;
	var imageIndexIdNum = 0;
	var starIndex = 0;
	var imageShowTools = {
		imageList: document.getElementById('image-list'),
	};
	var url = 'https://api.ucher.cn/file/uploadFile';
	imageShowTools.files = [];
	imageShowTools.uploader = null;  
	imageShowTools.deviceInfo = null; 
	mui.plusReady(function() {
		//设备信息，无需修改
		imageShowTools.deviceInfo = {
			appid: plus.runtime.appid, 
			imei: plus.device.imei, //设备标识
			images: imageShowTools.files, //图片文件
			p: mui.os.android ? 'a' : 'i', //平台类型，i表示iOS平台，a表示Android平台。
			md: plus.device.model, //设备型号
			app_version: plus.runtime.version,
			plus_version: plus.runtime.innerVersion, //基座版本号
			os:  mui.os.version,
			net: ''+plus.networkinfo.getCurrentType()
		}
		
		var o = fileTool.options;
		o.uploadUrl = fileUploadUrl; //图片上传链接
		
		o.multiple = false; //默认只上传一张图片 ，如果要选择多张，请设置为true
		o.maxPicsCount = 6; //默认一次最多选择10张图片,
		o.isUpload = true; //默认不上传
		o.filter = "image";
		var mine = plus.webview.currentWebview();
	});
	/**
	 *提交成功之后，恢复表单项 
	 */
	imageShowTools.clearForm = function() {
		imageShowTools.question.value = '';
		imageShowTools.contact.value = '';
		imageShowTools.imageList.innerHTML = '';
		imageShowTools.newPlaceholder();
		imageShowTools.files = [];
		index = 0;
		size = 0;
		imageIndexIdNum = 0;
		starIndex = 0;
		//清除所有星标
		mui('.icons i').each(function (index,element) {
			if (element.classList.contains('mui-icon-star-filled')) {
				element.classList.add('mui-icon-star')
	  			element.classList.remove('mui-icon-star-filled')
			}
		})
	};
	imageShowTools.getFileInputArray = function() {
		return [].slice.call(imageShowTools.imageList.querySelectorAll('.file'));
	};
	imageShowTools.addFile = function(path) {
		imageShowTools.files.push({name:"images"+index,path:path,id:"img-"+index});
		index++;
	};
	/**
	 * 初始化图片域占位
	 */
	var curplaceholder;
	imageShowTools.newPlaceholder = function() {
		var fileInputArray = imageShowTools.getFileInputArray();
		if (fileInputArray &&
			fileInputArray.length > 0 &&
			fileInputArray[fileInputArray.length - 1].parentNode.classList.contains('space')) {
			return;
		};
		imageIndexIdNum++;
		var placeholder = document.createElement('div');
		placeholder.setAttribute('class', 'image-item space');
		var up = document.createElement("div");
		up.setAttribute('class','image-up')
		//删除图片
		var closeButton = document.createElement('div');
		closeButton.setAttribute('class', 'image-close');
		closeButton.innerHTML = 'X';
		closeButton.id = "img-"+index;
		//小X的点击事件
		closeButton.addEventListener('tap', function(event) {
			setTimeout(function() {
				for(var temp=0;temp<imageShowTools.files.length;temp++){
					if(imageShowTools.files[temp].id==closeButton.id){
						imageShowTools.files.splice(temp,1);
					}
				}
				imageShowTools.imageList.removeChild(placeholder);
			}, 0);
			return false;
		}, false);
		
		//
		var fileInput = document.createElement('div');
		fileInput.setAttribute('class', 'file');
		fileInput.setAttribute('id', 'image-' + imageIndexIdNum);
		
		var curplaceholder = placeholder;
		fileInput.addEventListener('tap', function(event) {
			var self = this;
			var index = (this.id).substr(-1);
			
//			plus.gallery.pick(function(e) {
////				console.log("event:"+e);
//				var name = e.substr(e.lastIndexOf('/') + 1);
//				console.log("name:"+name);
//					
//				plus.zip.compressImage({
//					src: e,
//					dst: '_doc/' + name,
//					overwrite: true,
//					quality: 50
//				}, function(zip) {
//					size += zip.size  
//					console.log("filesize:"+zip.size+",totalsize:"+size);
//					if (size > (10*1024*1024)) {
//						return mui.toast('文件超大,请重新选择~');
//					}
//					if (!self.parentNode.classList.contains('space')) { //已有图片
//						imageShowTools.files.splice(index-1,1,{name:"images"+index,path:e});
//					} else { //加号
//						placeholder.classList.remove('space');
//						imageShowTools.addFile(zip.target);
//						imageShowTools.newPlaceholder();
//					}
//					up.classList.remove('image-up');
//					placeholder.style.backgroundImage = 'url(' + zip.target + ')';
//				}, function(zipe) {
//					mui.toast('压缩失败！')
//				});
//				
//
//				
//			}, function(e) {
//				mui.toast(e.message);
//			},{});

			// 弹出系统选择按钮框
			plus.nativeUI.actionSheet({
					cancel: "取消",
					buttons: [{
						title: "从手机相册选择"
					}, {
						title: '拍照'
					}]
				},
				function(e) {
					console.log(JSON.stringify(e));
					if (e.index == 1) { //点击从相册选择
						console.log("相册选择");
						fileTool.galleryImgs(doImageFilesCallback);
					} else if (e.index == 2) {
						console.log("拍照");
						fileTool.camera(doImageFilesCallback);
					}
				}
			);
				
			var doImageFilesCallback = function(err, list) {
						//因为dcloud官方上传地址上传后返回的格式并不是插件定义的规范，
						//"responseText":"{\"strings\":{\"uid\":\"39106184\",\"client\":\"HelloH5+\"},\"error\":\"0\",\"files\":{\"phillyx_72192431\":{\"name\":\"1464411747097.jpg\",\"url\":\"files\\/1464411747097.jpg\",\"type\":\"image\\/jpeg\",\"size\":245329}}}"
						//所以list内部数据都为空
						console.log(JSON.stringify(list));
						var err = '';
						var files = [];
						if (err) {
							console.log(err);
						}
						
						if (list) {
							mui.each(list, function(index, item) {
								//console.log("err " + item.error);
								if (item.imgUrl) {
									files.push(item.imgUrl);
								}
							});
						}
						//关掉mask
						//main.setStyle({
						//	mask: 'none'
						//});
						if (files.length > 0) {
							//在这里做项目的逻辑，可以打开新页面将files传过去
							var fileNames = "";
							mui.each(files, function(index, item) {
								
								var filePath = fileServerPath + item;
								
								console.log(filePath);
								
								placeholder.classList.remove('space');
								imageShowTools.addFile(item);
								imageShowTools.newPlaceholder();
								
								up.classList.remove('image-up');
								placeholder.style.backgroundImage = 'url(' + filePath + ')';
								
								fileNames = item;
							});
						}
						
						// mui.previewImage();
			};
			
		}, false);
		placeholder.appendChild(closeButton);
		placeholder.appendChild(up);
		placeholder.appendChild(fileInput);
		imageShowTools.imageList.appendChild(placeholder);
	};
	
	
	imageShowTools.newPlaceholder();
	
  	return imageShowTools;
})();
