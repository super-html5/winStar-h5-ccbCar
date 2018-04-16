function generateWarpBox(paramStr){
    var warpBox = "";
    var warpBoxStr = "<ul class='mui-table-view mui-list-unstyled margin-top10 margin-bottom10 font-size15 black8'><li class='mui-table-view-cell mui-table-view-cell2'><span class='left-line padding-left5 black'>${{parameter}}</span></li>${{warpContent}}</ul>";
    var warpContentStr = "<li class='mui-table-view-cell'><span>${{key}}</span><span class='mui-pull-right'>${{value}}</span></li>";
    var param = JSON.parse(paramStr);
    for (var key in param) {
        var value = param[key];
        warpBox = warpBox + warpBoxStr.replace("${{parameter}}", key);
        var warpContent = "";
        for (var detail in value) {
            var _spanHtml = "";
            if(value[detail] == "1" ){
                _spanHtml = "标配";
            }
            if(value[detail] == "0" ){
                _spanHtml = "无";
            }
            if(!value[detail]){
                _spanHtml = "--";
            }
            warpContent += warpContentStr.replace("${{key}}", detail).replace("${{value}}", _spanHtml ?_spanHtml: value[detail] );
        }
        warpBox = warpBox.replace("${{warpContent}}", warpContent);
    }
    return warpBox;


}

function renderItemBox(){
    var id = getQueryString("id");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getKey(item_search).replace("{id}",id));
    xhr.onload = function (e) {
        var data = JSON.parse(this.response);
        var item = data.item;

        var item_name = document.getElementById('details-title');
        item_name.innerHTML = '<b>' + item.name + '</b>';

        var item_date = document.getElementById('date');
        item_date.innerHTML = item.regDate;

        var item_kilometre = document.getElementById('kilometre');
        item_kilometre.innerHTML = item.mile;

        var item_amount = document.getElementById('amount');
        item_amount.innerHTML = item.price;

        var item_pic = document.getElementById('itemPic');
        var strs = item.picUrl.split(",");
        item_pic.src = strs[0];

        var partner = data.partner;
        var telphone = document.getElementById('telphone');
        telphone.href= "tel:"+partner.telphone;
    };
    xhr.send();
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


function renderItemDetailBox(){
    var id = getQueryString("id");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', getKey(item_detail_search).replace("{id}",id));
    xhr.onload = function (e) {
        var data = JSON.parse(this.response);
        var warpBoxStr = generateWarpBox(data.paramJson);
        document.getElementById('warp-box').innerHTML = warpBoxStr;
    };
    xhr.send();
}








