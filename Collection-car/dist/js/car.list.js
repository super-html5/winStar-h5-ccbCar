var pageSize = 10;
var nextPage = 0;

mui.ready(function(){
	var _this = mui('#sorting')[0];
	_this.setAttribute("data-sortData","id");
	_this.setAttribute("data-sortType","asc");
});

//商品点击量
mui('#car-list').on('tap','a',function(){
	var dataId = jQuery(this).find('#dataId').val();
	
	document.location.href=this.href;

});

//综合、价格 点击事件提取方法
var sortType;
var sortingAttr = document.getElementById("sorting");
var priceAttr = document.getElementById("price");
function sortPram(obj){
	if(obj == sortingAttr) priceAttr.classList.remove("mui-navigate-rightA","mui-navigate-rightB");
	if(obj == priceAttr) sortingAttr.classList.remove("mui-navigate-rightA","mui-navigate-rightB");

	var objClass = obj.classList;
	if(objClass.contains("mui-navigate-rightA")) {
		objClass.remove("mui-navigate-rightA");
		objClass.add("mui-navigate-rightB");
		sortType = "desc";
	}else if(objClass.contains("mui-navigate-rightB") || !objClass.contains("mui-navigate-rightA") && !objClass.contains("mui-navigate-rightB")){
		objClass.remove("mui-navigate-rightB");
		objClass.add("mui-navigate-rightA");
		sortType = "asc";
	}
}

//分类按ID排序
mui(".list-tab").on('tap','#classify',function(){
	jQuery("#classifyCon").show();
});

//全部按ID排序
mui(".list-tab").on('tap','#sorting',function(){
	jQuery("#classifyCon").hide();
	sortPram(this);
	this.setAttribute("data-sortData","id");
	this.setAttribute("data-sortType",sortType);
	loadData(getFilter(0,pageSize,null,sortType),1);
});

//车载用品
mui("#classifyCon").on('tap','#listB',function(){
	jQuery("#classifyCon").hide();
	sortPram(this);
	this.setAttribute("data-sortData","id");
	this.setAttribute("data-sortType",sortType);
	carArticles();
});

//美容清洗
mui("#classifyCon").on('tap','#listC',function(){
	jQuery("#classifyCon").hide();
	sortPram(this);
	this.setAttribute("data-sortData","id");
	this.setAttribute("data-sortType",sortType);
	carRinse();
});

//按价格高低排序
mui(".list-tab").on('tap','#price',function(){
	sortPram(this);
	this.setAttribute("data-sortData","preferentialPrice");
	this.setAttribute("data-sortType",sortType);
	loadData(getFilter(0,pageSize,"preferentialPrice",sortType),1);
});

function getMoreData(){
	nextPage++;
	loadData(getFilter(nextPage,pageSize,mui('.mui-active')[0].getAttribute('data-sortData'),mui('.mui-active')[0].getAttribute('data-sortType')));
}

function listData(){
	loadData(getFilter(nextPage,pageSize,null,"asc"));//默认加载数据，ID从低到高
}

//遍历列表信息
function loadData(jsonFilter,clearTag){
	//如果是查询，则重置列表数据和初始化分页
	if(clearTag == 1){
		document.getElementById("car-list").innerHTML = "";
		mui('#scroll').pullRefresh().refresh(true);
		nextPage = 0;
	}

	mui.get(getKey(car_list),jsonFilter,function(data){
		var data = data.content;

		console.log(data);
		if(!data) return false;
		if(data.length > 0){
			var carList = "";
			for(var i in data){
				carList += '<li class="mui-table-view-cell mui-media">';
				carList += '<a href="car_list_detail.html?id='+data[i].id+'"><figure class="mui-pull-left list-img"><img class="imageText-img" src="http://wsdimg2.sxwinstar.net/' + data[i].id + '/1.jpg"></figure>';
				carList += '<div class="mui-media-body">';
				carList += '<div class="details-title mui-h5 black height38 mui-ellipsis mui-block line-height19">'+data[i].name+'</div>';
				carList += '<div class="details-title margin-top5 orange"><span class="font-size14">优惠价：</span><span class="mui-h6 orange margin-top2 height15">￥</span><span class="mui-h4">'+data[i].preferentialPrice+'</span></div>';
				carList += '<div class="details-title mui-h6 blackAC"><span>价格：</span><span class="text-del">￥'+data[i].commodityPrice+'</span></div>';
				carList += '<input type="hidden" value="' + data[i].id + '" id="dataId">';
				carList += '</div></a></li>';
			}

			document.getElementById("car-list").innerHTML += carList;
			mui('#scroll').pullRefresh().endPullupToRefresh();
		}else{
			mui('#scroll').pullRefresh().endPullupToRefresh(true);
		}
	},'json');
}


//车载用品
function carArticles(){
		document.getElementById("car-list").innerHTML = "";
		mui.ajax(getKey(goodsClassify),{
			data:{
				"category":"车载用品"
			},
			dataType:'json',
			type:'get',
			success:function(data){
		console.log(data.content);
		if(!data.content) return false;
		if(data.content.length > 0){
			var carList = "";
			for(var i in data.content){
				carList += '<li class="mui-table-view-cell mui-media">';
				carList += '<a href="car_list_detail.html?id='+data.content[i].id+'"><figure class="mui-pull-left list-img"><img class="imageText-img" src="http://wsdimg2.sxwinstar.net/' + data.content[i].id + '/1.jpg"></figure>';
				carList += '<div class="mui-media-body">';
				carList += '<div class="details-title mui-h5 black height38 mui-ellipsis mui-block line-height19">'+data.content[i].name+'</div>';
				carList += '<div class="details-title margin-top5 orange"><span class="font-size14">优惠价：</span><span class="mui-h6 orange margin-top2 height15">￥</span><span class="mui-h4">'+data.content[i].preferentialPrice+'</span></div>';
				carList += '<div class="details-title mui-h6 blackAC"><span>价格：</span><span class="text-del">￥'+data.content[i].commodityPrice+'</span></div>';
				carList += '<input type="hidden" value="' + data.content[i].id + '" id="dataId">';
				carList += '</div></a></li>';
			}

			document.getElementById("car-list").innerHTML += carList;
			mui('#scroll').pullRefresh().endPullupToRefresh();
		}else{
			mui('#scroll').pullRefresh().endPullupToRefresh(true);
		}
	}
})
}

//美容清洗
function carRinse(){
	document.getElementById("car-list").innerHTML = "";
	mui.ajax(getKey(goodsClassify),{
		data:{
			"category":"美容清洗"
		},
		dataType:'json',
		type:'get',
		success:function(data){
			console.log(data.content);
			if(!data.content) return false;
			if(data.content.length > 0){
				var carList = "";
				for(var i in data.content){
					carList += '<li class="mui-table-view-cell mui-media">';
					carList += '<a href="car_list_detail.html?id='+data.content[i].id+'"><figure class="mui-pull-left list-img"><img class="imageText-img" src="http://wsdimg2.sxwinstar.net/' + data.content[i].id + '/1.jpg"></figure>';
					carList += '<div class="mui-media-body">';
					carList += '<div class="details-title mui-h5 black height38 mui-ellipsis mui-block line-height19">'+data.content[i].name+'</div>';
					carList += '<div class="details-title margin-top5 orange"><span class="font-size14">优惠价：</span><span class="mui-h6 orange margin-top2 height15">￥</span><span class="mui-h4">'+data.content[i].preferentialPrice+'</span></div>';
					carList += '<div class="details-title mui-h6 blackAC"><span>价格：</span><span class="text-del">￥'+data.content[i].commodityPrice+'</span></div>';
					carList += '<input type="hidden" value="' + data.content[i].id + '" id="dataId">';
					carList += '</div></a></li>';
				}

				document.getElementById("car-list").innerHTML += carList;
				mui('#scroll').pullRefresh().endPullupToRefresh();
			}else{
				mui('#scroll').pullRefresh().endPullupToRefresh(true);
			}
		}
	})
}



function getFilter(nextPage,pageSize,sortData,sortType){
	var _jsonFilter = "";
	if(nextPage){
		_jsonFilter += "nextPage=" + nextPage + "&";
	}
	if(pageSize){
		_jsonFilter += "pageSize=" + pageSize + "&";
	}
	if(sortData && sortData.length > 0){
		_jsonFilter += "sortData=" + sortData + "&";
	}
	if(sortType && sortType.length > 0){
		_jsonFilter += "sortType=" + sortType + "&";
	}
	return _jsonFilter;
}