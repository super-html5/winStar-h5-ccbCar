$(document).ready(function () {
var id=getUrlParams("id");
if(id){
        $.ajax({
            type: "GET",
            url: " https://mobile.sxwinstar.net/wechat_access/api/v1/community/car/getCarView",
            data: { id:id},
            success: function (data) {
                console.log(data);
                var muiScroll=document.querySelector(".mui-scroll");
                var bigxiding=document.querySelector("#xiding");
                var xiding="";
                var detailsImg="";
                xiding+="<div class='detailsPrice background-color-fff'>";
                xiding+="<p class='color-orange  mui-text-center'>";
                xiding+="<span>"+data.car.name+"</span><br/><span>现售价："+data.car.price+".00元</span></p>";
                xiding+="<div class='mui-btn-blue  mui-text-center'>";
                xiding+="<a href='tel:4000290916'>立即预约<br/>400-029-0916</a></div></div>";

                detailsImg+="<div class='detailsImg' style='padding: 0'>";
                detailsImg+="<img src="+data.car.image+">";
                detailsImg+="<div class='detailsPrice background-color-fff'>";
                detailsImg+="<p class='color-orange  mui-text-center'>现售价："+data.car.price+".00元</p>";
                detailsImg+="<div class='mui-btn-blue  mui-text-center'>";
                detailsImg+="<a href='tel:4000290916'>立即预约<br/>400-029-0916</a></div></div>";

                var li="";
                for(var j=0;j<data.list.length;j++){
                    li+="<li class='mui-table-view-cell'><div class='detailsTitle'><hr class='fl hr'/>";
                    li+="<p class='fl mui-text-center'>"+data.list[j].title+"</p>";
                    li+="<hr class='fl hr'/></div>";
                    li+="<p style='text-indent:2em; padding: 0 0 15px 0'>"+data.list[j].content+"</p>";
                    li+="<img class='deImg' src="+data.list[j].image+"></li>";
                }
                var ulList="<ul class='mui-table-view mui-list-unstyled margin-top5'>"+li+"</ul>";
                var content=detailsImg+ulList;
                muiScroll.innerHTML=content;
                //console.log(muiScroll)
                bigxiding.innerHTML=xiding;
            },
            error:function (data) {
                alert("网络不佳，请稍后再试！");
            }
        })
    }

    //js获取url参数
    function getUrlParams(name, url) {
        if (!url) url = window.location.href;
        var params = {};
        var url = decodeURI(url);
        var idx = url.indexOf("?");
        if (idx > 0) {
            var queryStr = url.substring(idx + 1);
            var args = queryStr.split("&");
            for (var i = 0, a, nv; a = args[i]; i++) {
                nv = args[i] = a.split("=");
                params[nv[0]] = nv.length > 1 ? nv[1] : true;
            }
        }
        return params[name];
    }
});
