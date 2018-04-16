showloaddinghtml5(1);

var id = getQueryString("id");

mui.ajax("https://mobile.sxwinstar.net/wechat_access/api/v1/items/goods/detail",{
    data:{
        "id":id
    },
    dataType:'json',
    type:'get',
    success:function(){
        // showloaddinghtml5(1);
    }
});

function detailDate(){
    mui.get(getKey(car_details),{"id":id},function(data){
            showloaddinghtml5(1);
            carDetailPram(data);
            renderPartner(data);
            detailContent(data);
            showloaddinghtml5(0);
        },'json'
    );
}

//详情页图片
function detailContent(data){
    // var obj = data.thumbnail || "";
    // var img_prefix = obj.substr(0,obj.indexOf("/" + data.id));
    var detailImgArr = data.details;
    var img_str = '';
    for(var i = 2 ; i<=detailImgArr; i++){
        var imgUrl ='http://wsdimg2.sxwinstar.net/'+ data.id +'/'+i+'.jpg';
        img_str += '<li><img class="item-img" src="'+imgUrl+'"/></li>';
    }
    document.getElementById("detail-content").innerHTML = img_str;
}

//获取每月的最后一天
function getCurMonthLastDay(){
    var date = new Date();
    //取下一个月的今天 对应的日期
    date.setMonth(date.getMonth()+1);
    var strTime = date.getFullYear() + "-" + (date.getMonth()+1) + "-01";
    var curTime = new Date(new Date(strTime) - 24*60*60*1000);
    return curTime;
}
var curTime = getCurMonthLastDay();
var lastDay = curTime.getMonth()+1 +"."+ curTime.getDate();



//修改商品信息
function carDetailPram(data){
    var liContentA = '<li class="mui-table-view-cell"><div class="details-title mui-h5 black" id="item-name"></div><div class="details-title margin-top10 orange"><span class="mui-h6 orange margin-top2 height15">￥</span><span id="detail-price" class="mui-h3 margin-right10"> </span><sub><b id="date">' + lastDay + '</b>日前有效</sub></div><div class="details-title mui-h6 blackAC"><span>价格：</span><span id="detail-del-Price" class="text-del"> </span></div></li>';
    document.getElementById("ul-contentA").innerHTML = liContentA;

    var liContentB = '<li class="mui-table-view-cell"><div class="partner-width"><div class="font-size16 black" id="partner-name"></div><h6><span id="partner-address"> </span></h6></div><div class="footer-tel"><a id="telphone"><button type="button" class="mui-btn mui-btn-blue" id="phoneBtn"><span class="mui-icon mui-icon mui-icon-phone"></span>电话咨询</button></a></div></li>';
    document.getElementById("ul-contentB").innerHTML = liContentB;

    var item_img = document.getElementById("banner");
    item_img.innerHTML = '<img class="item-img" src="http://wsdimg2.sxwinstar.net/' + id + '/1.jpg"/>';

    var item_detail_name = document.getElementById("item-name");
    item_detail_name.innerHTML = data.name;

    var item_detail_price = document.getElementById("detail-price");
    item_detail_price.innerHTML = data.preferentialPrice;

    //var item_detail_date = document.getElementById("date");
    //item_detail_date.innerHTML = data.couponNumberOf；

    var item_detail_del_price = document.getElementById("detail-del-Price");
    item_detail_del_price.innerHTML = "￥"+data.commodityPrice;


}

//修改店铺信息
 function renderPartner(data){

     var partner_name = document.getElementById("partner-name");
     partner_name.innerHTML = data.businessName;

     var partner_address = document.getElementById("partner-address");
     partner_address.innerHTML = data.businessAddress;

     var telphone = document.getElementById('telphone');
     telphone.href = "tel:" + data.telephone;

 }

//电话点击量
mui('#telphone').on('tap','button',function(){
    mui.ajax(getKey(phoneNum),{
        data:{
            "id":id
        },
        dataType:'json',
        type:'post',
        success:function(){
            // alert('OK')
        }
    });
});
