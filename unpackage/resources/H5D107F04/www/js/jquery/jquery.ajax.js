/**
 * 重新封装jQuery库getJSON/postJSON方法,增加错误处理回调函数
 * @description 
 * @version 1.0
 */
(function ($) {
	
	$.each(['getJSON','postJSON'], function(i, method) {
		$[method] = function(url, data, success, error) {
			if(jQuery.isFunction(data)) {
				error = error || success;
				success = data;
				data = undefined;
			}
			
			var methodName = 'GET'; //默认为get方法
			if(method == 'postJSON') {
				methodName = 'POST';
			}
			
			return $.ajax ({
				type: methodName,
				url: url,
				cache: false,
				data: data,
				success: function(data, status, xhr) {
					if(data.message) {
						alert(data.message);
					} else {
						success(data);
					}
				},
				error: function(xhr, status, thrown) {
					if(error) {
						error(xhr, status, thrown);
					}
				}
			});
		};
	});
})(jQuery);
