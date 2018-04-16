var $ = function(strs){
	return document.querySelector(strs);
};

function setMuiSlider(){
	//获得slider插件对象
	var gallery = mui('.mui-slider');
	gallery.slider({
		interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
	});
}

//屏幕滚动
/*mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});*/

function setMuiHref(id){
	//mui控件阻止了a链接跳转，需加如下代码让其跳转
	mui('#'+id).on('tap','a',function(){
		document.location.href=this.href;
	});
}
mui('.tel4').on('tap','a',function(){
	document.location.href=this.href;
});

//品牌三级页面滚动
mui('#scroll-series').scroll();


//返回顶部操作

var scrollToTopBox = document.getElementById('scrollToTop');  //返回按钮tap
if(undefined != scrollToTopBox && null != scrollToTopBox){
	scrollToTopBox.addEventListener('tap', function (e) {
		e.stopPropagation();
		mui('#scroll').scroll({indicators: false}).scrollTo(0,0);
		scrollToTopBox.classList.add('mui-hidden');
	});
}
var scrollTop = document.getElementById('scroll');
if(undefined != scrollTop && null != scrollTop){
	scrollTop.addEventListener('scrollend', function (e) {
		var wScrollY = - mui('#scroll').pullRefresh().y; // 当前滚动条位置
		if (wScrollY>= window.innerHeight) {
			scrollToTopBox.classList.remove('mui-hidden');
		}else{
			scrollToTopBox.classList.add('mui-hidden');
		}
	});
}


//键盘弹出时，确保input元素可见
if(/Android [4-6]/.test(navigator.appVersion)) {
	window.addEventListener("resize", function () {
		if(document.activeElement.tagName=="INPUT" || document.activeElement.tagName=="TEXTAREA"){
			window.setTimeout(function () {
				document.activeElement.scrollIntoViewIfNeeded();//确保只在当前元素不可见的情况下才使其可见
			}, 0);
		}
	})
}

//验证只能输入两位小数
function CheckInputIntFloat(oInput) {
	var number = /\d{1,}\.{0,1}\d{0,2}/;
	if('' != oInput.value.replace(number,'')) {
		oInput.value = oInput.value.match(number) == null ? '' :oInput.value.match(number);
	}
}
