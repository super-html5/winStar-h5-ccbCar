mui('#scroll').scroll();
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://mobile.sxwinstar.net/wechat_access/api/v1/community/car/getAllCar",
        data: {},
        async:"false",
        success: function(data){
            console.log(data);
           addItemPage(data);
        },
        error:function (data) {
            alert("网络不佳，请稍后再试！");
        }
    });
    
    
    function addItemPage(data) {
        var cont="",tit="";
        var segmentedControl=$("#segmentedControl");
        var muiScroll=$(".mui-scroll");
        for(var k=0;k<data.length;k++){
            var cars=data[k].cars;
            var liList="";
            for(var i=0; i<cars.length;i++){
                liList+="<li class='mui-table-view-cell'>" +
                    "<a id="+cars[i].id+" href='javascript:;'>" +
                    "<img src="+cars[i].image+">" +
                    "</a>" +
                    "</li>"
            }
            cont+="<div id='item"+parseInt(k+1)+"' class='mui-control-content'>" +
                "<ul class='mui-table-view' id='item-page"+parseInt(k+1)+"'>" +
                liList+"</ul></div>";
            tit+="<a class='mui-control-item' href='#item"+parseInt(k+1)+"'>"+data[k].month+"月火热进行</a>";

        }
        segmentedControl.html(tit);
        muiScroll.append(cont);
        $("#item1").addClass("mui-active");
        segmentedControl.find("a:nth-child(1)").addClass("mui-active");
        if(data.length==1){
            segmentedControl.html("<div class='mui-text-center' style='padding: 5px 0'>"+data[0].month+"月火热进行</div>");
        }
        mui('.mui-table-view').on("tap","a",function () {
            $(this)[0].href="../template/details.html?id="+this.id;
            document.location.href=this.href;
        });
        
    }

});





