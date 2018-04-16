function loadingBannerData(domId) {
    mui.get(getKey(banner_search), '', function (data) {
        renderDom(domId, data);
        setMuiSlider();
    }, 'json');
}

function renderDom(domId, data) {
    var dom = "";
    //var itemIndicator = "";
    var startOrEndDom = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="${{imgUrl}}"/></a></div>';
    var itemDom = '<div class="mui-slider-item"><a href="#"><img src="${{imgUrl}}"/></a></div>';
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            dom += startOrEndDom.replace("${{imgUrl}}", data[data.length - 1].imageUrl) + itemDom.replace("${{imgUrl}}", data[i].imageUrl);
            //itemIndicator += '<div class="mui-indicator mui-active"></div>';
        } else if (i == data.length - 1) {
            dom += itemDom.replace("${{imgUrl}}", data[i].imageUrl) + startOrEndDom.replace("${{imgUrl}}", data[0].imageUrl);
            //itemIndicator += '<div class="mui-indicator"></div>';
        } else {
            dom += itemDom.replace("${{imgUrl}}", data[i].imageUrl);
            //itemIndicator += '<div class="mui-indicator"></div>';
        }
    }
    var itemDombox = '<div class="mui-slider-group mui-slider-loop">' + dom + '</div>';
    //var itemIndicatorbox = '<div class="mui-slider-indicator">'+itemIndicator+'</div>';
    document.getElementById(domId).innerHTML = itemDombox;   // + itemIndicatorbox ;
}
