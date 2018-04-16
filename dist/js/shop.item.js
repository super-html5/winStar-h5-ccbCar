function renderShopItemList(page) {
    var partner_id = getQueryString("id");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getKey(partner_item_page_search).replace("{partnerId}",partner_id).replace("{page}",page).replace("{limit}",5));
    xhr.onload = function (e) {
        var data = JSON.parse(this.response);
        if (data.length > 0) {
            rendItemList(data);
            mui('#scroll').pullRefresh().endPullupToRefresh();
        } else {
            mui('#scroll').pullRefresh().endPullupToRefresh(true);
        }
    }
    xhr.send();
}

function rendItemList(data) {
    var itemDomStr = "";
    for (var key in data) {

        //产品状态标记
        var classtags = "";
        var itemtagsLength = "";
        if(data[key].isRecommend == '1') classtags = "list-recommend";
        if(data[key].isUrgent == '1') classtags = 'list-unsale';
        if(data[key].status == '3') classtags = 'list-saled';
        itemtagsLength += "<span class='" + classtags + "'></span>";

        var itemTemplate = ' <li class="mui-table-view-cell mui-media"> <a href="${{item-href}}"><figure class="mui-pull-left list-img"><img class="imageText-img" id="itemPic" src="${{item-image}}"></figure><div class="list-ico-box">'+itemtagsLength+'</div> <div class="mui-media-body"> <div class="details-title mui-h5"> <b class="black height38 mui-ellipsis mui-block">${{item-name}}</b> </div> <div class="details-title padding-top5"> <span class="mui-h6 mui-pull-left">${{item-regDate}}</span> <span class="mui-h6 mui-pull-left"><span>${{item-mile}}</span>万公里</span> <span class="mui-h4 mui-pull-left orange"><b>${{item-price}}</b><span class="mui-h6 orange">万</span></span> </div> </div> </a> </li> ';
        var picUrlList = data[key].picUrl.split(",");
        var itemDom = itemTemplate.replace("${{item-href}}", "item.html?id=" + data[key].id).replace("${{item-image}}", picUrlList[0]).replace("${{item-name}}", data[key].name).replace("${{item-mile}}", data[key].mile).replace("${{item-regDate}}", data[key].regDate).replace("${{item-price}}", data[key].price);
        itemDomStr = itemDomStr + itemDom;
    }
    var itemPage = document.getElementById("item-page");
    itemPage.innerHTML = itemPage.innerHTML + itemDomStr;

}


