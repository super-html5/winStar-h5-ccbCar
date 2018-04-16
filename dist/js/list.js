var pageSize = 10;
var nextPage = 0;
var searchValue ;

//设置关闭遮罩
var mask = mui.createMask(function(){
	if(undefined!=$('.mui-show')){
		if($('.mui-show').getAttribute("id") == 'brand-content'){
			$('.mui-show').classList.add("visibi-hidden");
		}else{
			$('.mui-show').classList.add("mui-hidden");
		}
		$('.mui-show').classList.remove("mui-show");
	 	$('.mui-active').classList.remove("mui-active");
	}
});
//切换tab操作显示相应下拉菜单
mui("nav").on('tap','a',function(){
	 var id = this.getAttribute("id");
	 if(undefined!=$('.mui-show')){
		 if($('.mui-show').getAttribute("id") == 'brand-content'){
			 $('.mui-show').classList.add("visibi-hidden");
		 }else{
			 $('.mui-show').classList.add("mui-hidden");
		 }
	 	 $('.mui-show').classList.remove("mui-show");
	 }
	 $('#'+id+'-content').classList.remove("visibi-hidden","mui-hidden");
	 $('#'+id+'-content').classList.add("mui-show");
	mask.show();//显示遮罩
	$('.mui-backdrop').classList.add("mui-backdrop-top");
});

//三级菜单
mui("#brand-list").on('tap', ".mui-indexed-list-item", function() {
	$("#segmentedControlContents").classList.remove("mui-hidden");
	$("#segmentedControlContents").classList.add("mui-show");
	var bandId = this.getAttribute("data-value");
	var brandName = this.getElementsByTagName('span')[0].innerHTML;
	mui.get(getKey(getSeriesByBrandId),"brandId=" + bandId, function (data) {
		renderSeries(data,bandId,brandName);
		mui('#segmentedControlContents .mui-scroll-wrapper').scroll().scrollTo(0,0,100);
	} )
});

mui(".show-cell").on('tap','b,.brand-content-sale,button',function(){
	$("#segmentedControlContents").classList.add("mui-hidden");
	mask.close();//关闭遮罩
});

/* 搜索 */
mui(".item-search").on('tap','button',function(){
	searchValue = $(".item-search input").value ;
	if( searchValue ){
		loadData(getFilter(0,pageSize,searchValue,$("#sorting span").getAttribute("data-value"),$("#brand span").getAttribute("data-value"),$("#price span").getAttribute("data-value"),$("#displacement span").getAttribute("data-value"),$("#brand span").getAttribute("data-brand-id")),1);
	} else {
		return false;
	}
	});

/* 排序 */
mui(".show-cell").on('tap','b',function(){
	$('#sorting').classList.remove("mui-navigate-right");
	$('#sorting .mui-tab-label').classList.add("select-border");
	$("#sorting span").innerHTML = this.innerHTML;
	$("#sorting span").setAttribute("data-value",this.getAttribute("data-value"));
	//加载数据
	loadData(getFilter(0,pageSize,searchValue,this.getAttribute("data-value"),$("#brand span").getAttribute("data-value"),$("#price span").getAttribute("data-value"),$("#displacement span").getAttribute("data-value"),$("#brand span").getAttribute("data-brand-id")),1);
});
/* 品牌 */
mui(".show-cell").on('tap','.brand-content-sale',function(){
	$('#brand').classList.remove("mui-navigate-right");
	$('#brand .mui-tab-label').classList.add("select-border");
	if(this.innerHTML == '不限车系'){
		$("#brand span").innerHTML = this.getAttribute("data-html");
	}else{
		$("#brand span").innerHTML = this.innerHTML;
	}
	$("#brand span").setAttribute("data-value",this.getAttribute("data-value"));
	$("#brand span").setAttribute("data-brand-id",this.getAttribute("data-brand-id"));
	//加载数据
	loadData(getFilter(0,pageSize,searchValue,$("#sorting span").getAttribute("data-value"),this.getAttribute("data-value"),$("#price span").getAttribute("data-value"),$("#displacement span").getAttribute("data-value"),this.getAttribute("data-brand-id")),1);
});
/* 价格 */
mui("#price-content").on('tap','button',function(){
	$('#price').classList.remove("mui-navigate-right");
	$('#price .mui-tab-label').classList.add("select-border");
	$("#price span").innerHTML = this.innerHTML;
	$("#price span").setAttribute("data-value",this.getAttribute("data-value"));
	//加载数据
	loadData(getFilter(0,pageSize,searchValue,$("#sorting span").getAttribute("data-value"),$("#brand span").getAttribute("data-value"),this.getAttribute("data-value"),$("#displacement span").getAttribute("data-value"),$("#brand span").getAttribute("data-brand-id")),1);
});
/* 排量 */
mui("#displacement-content").on('tap','button',function(){
	$('#displacement').classList.remove("mui-navigate-right");
	$('#displacement .mui-tab-label').classList.add("select-border");
	$("#displacement span").innerHTML = this.innerHTML;
	$("#displacement span").setAttribute("data-value",this.getAttribute("data-value"));
	//加载数据
	loadData(getFilter(0,pageSize,searchValue,$("#sorting span").getAttribute("data-value"),$("#brand span").getAttribute("data-value"),$("#price span").getAttribute("data-value"),this.getAttribute("data-value"),$("#brand span").getAttribute("data-brand-id")),1);
});

mui('#content-list').on('tap','a',function(){
	document.location.href=this.href;
});

function getMoreData(){
	nextPage++;
	loadData(getFilter(nextPage,pageSize,searchValue,$("#sorting span").getAttribute("data-value"),$("#brand span").getAttribute("data-value"),$("#price span").getAttribute("data-value"),$("#displacement span").getAttribute("data-value"),$("#brand span").getAttribute("data-brand-id")));
}

function initData(){
	renderBrandList();
	loadData(getFilter(nextPage,pageSize,searchValue,null,null,null,null,null));
}

function loadData(jsonFilter,clearTag){
	mui.get(getKey(findCarByFilter),jsonFilter,function(data){
		//如果是查询，则重置列表数据和初始化分页
		if(clearTag == 1){
			document.getElementById("content-list").innerHTML = "";
			mui('#scroll').pullRefresh().refresh(true);
			nextPage = 0;
		}
		if (data.length > 0) {
			var dataHtml = "";
			for(var key in data){
				var imgUrl = data[key].picUrl ? data[key].picUrl.split(",")[0] : data[key].picUrl;
				dataHtml += "<li class='mui-table-view-cell mui-media'>";
				dataHtml += "<a href='item.html?id=" + data[key].id + "'>";
				dataHtml += "<figure class='mui-pull-left list-img'><img class='imageText-img' src='" + car_image_url + imgUrl + "'></figure>";

				//产品状态标记
				var classTag = "";
				var itemtagsLength = "";
				if(data[key].isRecommend == '1') classTag = 'list-recommend';
				if(data[key].isUrgent == '1') classTag = 'list-unsale';
				if(data[key].status == '3') classTag = 'list-saled';
				itemtagsLength += "<span class='" + classTag + "'></span>";

				dataHtml += "<div class='list-ico-box'>"+itemtagsLength+"</div>";
				dataHtml += "<div class='mui-media-body'>";
				dataHtml += "<div class='details-title mui-h5'>";
				dataHtml += "<b class='black height38 mui-ellipsis mui-block'>" + data[key].name + "</b>";
				dataHtml += "</div>";
				dataHtml += "<div class='details-title padding-top5'>";
				dataHtml += "<span class='mui-h6 mui-pull-left'>" + data[key].regDate + "</span>";
				dataHtml += "<span class='mui-h6 mui-pull-left'><span>" + data[key].mile + "</span>万公里</span>";
				dataHtml += "<span class='mui-h4 mui-pull-left orange'><b>" + data[key].price + "</b><span class='mui-h6 orange'>万</span></span>";
				dataHtml += "</div></div></a></li>";
			}
			document.getElementById("content-list").innerHTML = document.getElementById("content-list").innerHTML + dataHtml;
			mui('#scroll').pullRefresh().endPullupToRefresh();
		} else {
			mui('#scroll').pullRefresh().endPullupToRefresh(true);
		}
	},'json');
}

function getFilter(nextPage,pageSize,searchValue,sort,seriesId,price,pl,brandId){
	var _jsonFilter = "";
	if(nextPage){
		_jsonFilter += "nextPage=" + nextPage + "&";
	}
	if(pageSize){
		_jsonFilter += "pageSize=" + pageSize + "&";
	}
	if(searchValue){
		_jsonFilter += "name='" + searchValue + "'&";
	}
	if(sort && sort.length > 0){
		var sortArr = sort.split("-");
		if(sortArr[0] && sortArr[1]){
			_jsonFilter += "sortData=" + sortArr[0] + "&sortType=" + sortArr[1] + "&";
		}
	}
	if(brandId){
		_jsonFilter += "brandId=" + brandId + "&";
	}
	if(seriesId){
		_jsonFilter += "seriesId=" + seriesId + "&";
	}
	if(price && price.length > 0){
		var priceArr = price.split("-");
		if(priceArr[0] && priceArr[0].length > 0){
			_jsonFilter += "minPrice=" + priceArr[0] + "&";
		}
		if(priceArr[1] && priceArr[1].length > 0){
			_jsonFilter += "maxPrice=" + priceArr[1] + "&";
		}
	}
	if(pl && pl.length > 0){
		var plArr = pl.split("-");
		if(plArr[0] && plArr[0].length > 0){
			_jsonFilter += "minDisplacement=" + plArr[0] + "&";
		}
		if(plArr[1] && plArr[1].length > 0){
			_jsonFilter += "maxDisplacement=" + plArr[1] + "&";
		}
	}
	if(_jsonFilter != ""){
		_jsonFilter = _jsonFilter.substring(0,_jsonFilter.length - 1);
	}
	return _jsonFilter;
}