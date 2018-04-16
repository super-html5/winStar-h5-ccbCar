function renderShopBox() {
    var partner_id = getQueryString("id");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getKey(partner_search).replace("{partnerId}",partner_id));
    xhr.onload = function (e) {
        var data = JSON.parse(this.response);
        renderShopInfo(data);
    }
    xhr.send();
}


function renderShopInfo(data) {
    var partner_img = document.getElementById("shopPage-small-img");
    partner_img.src = seller_image_url + data.imageUrl;
    var partner_name = document.getElementById("partner-name");
    partner_name.innerHTML = data.name;
    var item_count = document.getElementById("item-count");
    item_count.innerHTML = data.itemCount;
    var item_count2 = document.getElementById("item-count2");
    item_count2.innerHTML = data.itemCount;
    var sale_count = document.getElementById("sale-count");
    sale_count.innerHTML = data.saleCount;
    var bussinessHour = document.getElementById("bussinessHour");
    bussinessHour.innerHTML = data.bussinessHour;
    var tel = document.getElementById("tel");
    tel.innerHTML = data.telphone;
    var address = document.getElementById("address");
    address.innerHTML = data.address;
    var serviceContent = document.getElementById("shopPage-server");
    serviceContent.innerHTML = data.serviceContent;
    var description = document.getElementById("shopPage-company-profile");
    description.innerHTML = data.description;
    var telphone = document.getElementById("telphone");
    telphone.href = "tel:"+data.telphone;
}
