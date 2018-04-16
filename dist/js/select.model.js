
//设置关闭遮罩
var mask = mui.createMask(function(){
    if(undefined!=$('.mui-show')){
        $('.mui-show').classList.add("visibi-hidden");
        $('.mui-show').classList.remove("mui-show");
    }
});

mui(".main-content").on('tap','#select-motorcycle-type',function() {
    $('#brand-content').classList.remove("visibi-hidden");
    $('#brand-content').classList.add("mui-show");
});

//三级菜单
mui("#brand-list").on('tap', ".mui-indexed-list-item", function() {
    $("#segmentedControlContents").classList.remove("mui-hidden");
    $("#segmentedControlContents").classList.add("mui-show");
    var bandId = this.getAttribute("data-value");
    mui.get(getKey(getSeriesByBrandId),"brandId=" + bandId, function (data) {
        renderSeries(data);
        mui('#segmentedControlContents .mui-scroll-wrapper').scroll().scrollTo(0,0,100);

    });
});

mui('#series-list').on('tap','.brand-Level3', function () {
    mui('#modelResult')[0].setAttribute("data-value",this.getAttribute('data-value'));
    mui('#modelResult')[0].innerHTML = this.innerHTML;
    $("#segmentedControlContents").classList.add("mui-hidden");
    mask.close();//关闭遮罩
});

mui("#segmentedControlContents").on('tap','.mui-collapse',function(){
    var seriesId = this.querySelector("span").getAttribute("data-value");
    var _this = this;
    mui.get(getKey(getModelBySeriesId),"seriesId=" + seriesId, function (data) {
        _this.innerHTML += renderModels(data);
    });
});

function renderModels(data){
    var modelsHtml = "<div class='mui-collapse-content'>";
    for(var key in data){
        modelsHtml += "<div class='black6 brand-Level3' data-value='" + data[key].id + "'>" + data[key].name + "</div>";
    }
    modelsHtml += "</div>";
    return modelsHtml;
}

function renderSeries(data){
    var seriesHtml = "";
    for (var key in data){
        seriesHtml += "<li class='mui-table-view-cell mui-collapse'>";
        seriesHtml += "<a><img src='" + series_image_url + data[key].picUrl + "' class='mui-pull-left' width='28' height='28' /><span class='mui-ellipsis brand-content-sale' data-value='" + data[key].id + "'>" + data[key].name + "</span></a>";
        seriesHtml += "</li>";
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
