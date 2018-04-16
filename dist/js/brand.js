mui.ready(function() {
	var nav = document.querySelector('nav.mui-bar');
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = (document.body.offsetHeight-nav.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
});


function renderSeries(data,brandId,brandName){
    var seriesHtml = "";
    if(data.length > 0){
        seriesHtml += "<div class='mui-block default-list brand-content-sale border-bottom' style='padding-bottom:13px;' data-brand-id='" + brandId + "' data-value='' data-html='" + brandName + "'>不限车系</div>";
        for (var key in data){
            seriesHtml += "<li class='mui-table-view-cell mui-collapse'>";
            seriesHtml += "<a><img src='" + series_image_url + data[key].picUrl + "'class='mui-pull-left margin-top5' height='18' /><span class='mui-ellipsis brand-content-sale mui-block' data-brand-id='" + data[key].brandId + "' data-value='" + data[key].id + "'>" + data[key].name + "</span></a>";
            seriesHtml += "</li>";
        }
    }
    document.getElementById("series-list").innerHTML = seriesHtml;
}

function renderBrandList() {
    var brandList=JSON.parse(localStorage.getItem("brandList"));
    if(!brandList){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', getKey(getBrands));
        xhr.onload = function (e) {
            var data = JSON.parse(this.response);
            rendBrand(data);
        }
        xhr.send();
    }else{
        rendBrand(brandList);
    }
}

function rendBrand(data) {
    var brandDom = rendBrandDom(data);
    var brand = document.getElementById("brand-list");
    brand.innerHTML = brandDom;
}

function rendBrandDom(data) {
    var rendDom = "";
    var group = '<li data-group="${{groupData}}" class="mui-table-view-divider mui-indexed-list-group">${{groupData}}</li>';
    var groupItem = '<li data-value="${{groupItemValue}}" class="mui-table-view-cell mui-indexed-list-item"><img src="${{groupImageUrl}}" class="mui-pull-left" width="28" height="28" /><span>${{groupItemName}}</span></li>';
    var groupStr = "";
    for (var key in data) {
        if (groupStr != data[key].initial) {
            groupStr = data[key].initial;
            rendDom = rendDom + group.replace("${{groupData}}", groupStr).replace("${{groupData}}", groupStr);
            rendDom = rendDom + groupItem.replace("${{groupItemName}}", data[key].name).replace("${{groupImageUrl}}",brand_image_url + data[key].imageUrl).replace("${{groupItemValue}}",data[key].id);
        } else {
            rendDom = rendDom + groupItem.replace("${{groupItemName}}", data[key].name).replace("${{groupImageUrl}}",brand_image_url + data[key].imageUrl).replace("${{groupItemValue}}",data[key].id);
        }

    }
    return rendDom;
}
