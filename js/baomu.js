/**
 * @description SLUSH
 * @createData: 2018-05-13 20:00
 * 
 */

var Base = {
	init:function(){
		// 事件调用
		this.bindEvent();
	},
	bindEvent:function() {

		// 导航栏
		$('.header-nav-btn').click(function() {
			$('.nav-opacity').show();
			$('.nav').addClass('active');
		})	

		$('.nav-opacity').click(function() {
			$('.nav-opacity').hide();
			$('.nav').removeClass('active');
		})	

	}
}

Base.init();