
initSignature();
function initSignature() {
	
	$("#signature").jSignature({height:150,});
}

function reset() {
	var $sigdiv = $("#signature");
	$sigdiv.jSignature("reset");
}

function savaSignature() {
	var $sigdiv = $("#signature");
	var datapair = $sigdiv.jSignature("getData", "image"); //设置输出的格式，具体可以参考官方文档

	var datalength = $sigdiv.jSignature('getData', 'native').length;
	console.log(datalength);

	var i = new Image();
	i.src = "data:" + datapair[0] + "," + datapair[1]
	$(i).appendTo($("#image")) // append the image (SVG) to DOM.
	
	console.log(getSigImgData());
}

function getSigImgData() {
	
	var $sigdiv = $("#signature");
	var datapair = $sigdiv.jSignature("getData", "image"); //设置输出的格式，具体可以参考官方文档

	var imgData = "data:" + datapair[0] + "," + datapair[1]
	
	return imgData;
}

function getSigDataLength()
{
	var $sigdiv = $("#signature");
	var datalength = $sigdiv.jSignature('getData', 'native').length;
	return datalength;
}

function setSigData(imageData)
{
	var $sigdiv = $("#signature");
	$sigdiv.jSignature("setData", imageData);
}
