

function compress(res, fileSize, imageID) { //res代表上传的图片，fileSize大小图片的大小
    var img = new Image(),
        maxW = 300; //设置最大宽度
	
	console.log(fileSize);
	
    img.onload = function () {
        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext( '2d');
            
        if(img.width > maxW) {
            img.height *= maxW / img.width;
            img.width = maxW;
        }

        cvs.width = img.width;
        cvs.height = img.height;

        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        var compressRate = getCompressRate(0.7, fileSize);
        
        console.log(compressRate);

        var dataUrl = cvs.toDataURL( 'image/jpeg', compressRate);

        //document.body.appendChild(cvs);
        //console.log(dataUrl);
        
        $("#" + imageID).attr("src", dataUrl);
        signPhoto = dataUrl;
    }

    img.src = res;
}

function getCompressRate(allowMaxSize,fileSize){ //计算压缩比率，size单位为MB
      var compressRate = 1;
		
	 if(fileSize/allowMaxSize > 6){
           compressRate = 0.3;
      } 
      else if(fileSize/allowMaxSize > 4){
           compressRate = 0.5;
      } else if(fileSize/allowMaxSize >3){
           compressRate = 0.6;
      } else if(fileSize/allowMaxSize >2){
           compressRate = 0.7;
      } else if(fileSize > allowMaxSize){
           compressRate = 0.8;
      } else{
           compressRate = 0.9;
      }

      return compressRate;
}