function renderModelParamDiv(paramStr) {
    var icoName = "";
    if (paramStr == '电动天窗') {
        icoName = "ico-skylight";
    }
    if (paramStr == 'ABS防抱死') {
        icoName = "ico-ABS";
    }
    if (paramStr == 'EPS系统') {
        icoName = "ico-EPS";
    }
    if (paramStr == '发动机防盗') {
        icoName = "ico-Anti-theft";
    }
    if (paramStr == '遥控钥匙') {
        icoName = "ico-control";
    }
    if (paramStr == '驻车雷达') {
        icoName = "ico-p";
    }
    if (paramStr == '胎压监测') {
        icoName = "ico-tyre";
    }
    if (paramStr == '无钥匙启动') {
        icoName = "ico-start";
    }
    if (paramStr == '多功能方向盘') {
        icoName = "ico-wheel";
    }
    if (paramStr == '儿童座椅') {
        icoName = "ico-children";
    }
    if (paramStr == '四轮驱动') {
        icoName = "ico-wheel4";
    }
    if (paramStr == '氙气大灯') {
        icoName = "ico-lamp";
    }
    var str = '<div class="mui-control-item"> <span class="sprite ' + icoName + '"></span><br/>' + paramStr + '</div>';
    return str;
}


function renderItemLink(id) {
    var item_detail_link = document.getElementById('item-detail-link');
    item_detail_link.href = "item_detail.html?id=" + id;
}

//修改商品属性
function renderItem(data) {
    var item = data.item;
    var item_name = document.getElementById('item-name');
    item_name.innerHTML = '<b>' + item.name + '</b>';
    var item_price = document.getElementById('item-price');
    item_price.innerHTML = item.price;
    var item_origin_price = document.getElementById('item-originPrice');
    item_origin_price.innerHTML = item.originPrice;
    var item_description = document.getElementById('item-description');
    item_description.innerHTML = item.description;
    var item_detail_mile = document.getElementById('item-detail-mile');
    item_detail_mile.innerHTML = item.mile;
    var item_detail_regDate = document.getElementById('item-detail-regDate');
    item_detail_regDate.innerHTML = item.regDate;
    var item_detail_zone = document.getElementById('item-detail-zone');
    item_detail_zone.innerHTML = item.zone;
    var iitem_detail_standard = document.getElementById('item-detail-standard');
    iitem_detail_standard.innerHTML = item.standard;
    var item_detail_transmission = document.getElementById('item-detail-transmission');
    item_detail_transmission.innerHTML = item.transmission;
    //排量值默认保留一位小数
    var item_detail_displacement = document.getElementById('item-detail-displacement');
    item_detail_displacement.innerHTML = item.displacement.toFixed(1) + 'L';

    var is_origin = document.getElementById('is-origin');
    if (item.isOriginal == '1') {
        is_origin.innerHTML = "原厂质保";
    } else if(item.isOriginal == '0') {
        is_origin.innerHTML = "过保";
    }
}


//修改商品详情属性
function renderItemDetail(data) {
    var detailJson = JSON.parse(data.item.detailJson);
    var item_detail_div = document.getElementById('item-detail-div');
    var warpBox = "";
    for (var key in detailJson) {
        if (detailJson[key] == "1") {
            warpBox = warpBox + renderModelParamDiv(key);
        }
    }
    item_detail_div.innerHTML = warpBox;
}

//修改商户属性
function renderPartner(data) {
    var partner = data.partner;
    var partner_name = document.getElementById('partner-name');
    partner_name.innerHTML = partner.name;
    var partner_address = document.getElementById('partner-address');
    partner_address.innerHTML = partner.address;
    var telphone = document.getElementById('telphone');
    telphone.href = "tel:" + partner.telphone;
    var partner_id = document.getElementById('partner-id');
    partner_id.href = "shop.html?id=" + partner.id;
}

//商家咨询传ID,统计点击量
var btn = document.getElementById("telphone");
btn.onclick = function(e){
    var id = getQueryString("id");
    var xhr = new XMLHttpRequest();
    xhr.open("POST",getKey(telphone_click),true);
    xhr.onload = function(e){

    };
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("id="+id+"");
};


//修改商品图片
function renderItemImageBox(data) {
    var strs = new Array();
    strs = data.item.picUrl.split(",");
    renderDom('item-image', strs);
}

function renderDom(domId, data) {
    var dom = "";
    var startOrEndDom = '<div class="mui-slider-item mui-slider-item-duplicate"><a href="#"><img src="${{imgUrl}}"/></a></div>';
    var itemDom = '<div class="mui-slider-item"><a href="#"><img src="${{imgUrl}}"/></a></div>';
    for (var i = 0; i < data.length; i++) {
        if (i == 0) {
            dom += startOrEndDom.replace("${{imgUrl}}", car_image_url + data[data.length - 1]) + itemDom.replace("${{imgUrl}}", car_image_url + data[i]);
        } else if (i == data.length - 1) {
            dom += itemDom.replace("${{imgUrl}}", car_image_url + data[i]) + startOrEndDom.replace("${{imgUrl}}", car_image_url + data[0]);
        } else {
            dom += itemDom.replace("${{imgUrl}}",car_image_url +  data[i]);
        }
    }
    document.getElementById(domId).innerHTML = '<div class="mui-slider-group mui-slider-loop">' + dom + '</div>';
}

function renderItemBox() {
    var id = getQueryString("id");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getKey(item_search).replace("{id}", id));
    xhr.onload = function (e) {
        var data = JSON.parse(this.response);
        renderItemLink(id);
        renderItem(data);
        renderItemImageBox(data);
        renderItemDetail(data);
        renderPartner(data);
        setMuiSlider();
        setMuiHref('scroll');
    };
    xhr.send();
}













