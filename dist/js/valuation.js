linkage(mui, document, showCityPicker, cityResult, dataResult, showDataPicker);
mui.ready(function () {
    var list = document.getElementById('brand-index-list');
    list.style.height = document.body.offsetHeight + 'px';
    window.indexedList = new mui.IndexedList(list);
    renderBrandList();
});

mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

mui("#canvasContent").on('tap', '.bg-yellow', function () {

    var plateNumber = getQueryString('plateNumber');
    console.log(plateNumber);
    var zone = document.getElementById("cityResult").getAttribute("data-value");
    if (!zone) {
        mui.alert("请选择车辆注册地！");
        return false;
    }
    var modelId = mui('#modelResult')[0].getAttribute("data-value");
    if (!modelId) {
        mui.alert("请选择车型！");
        return false;
    }
    var regDate = mui('#dataResult')[0].getAttribute("data-value");
    if (!regDate) {
        mui.alert("请选择首次上牌日期！");
        return false;
    }
    var mile = mui("#mile")[0].value;
    if (!mile) {
        mui.alert("请输入行驶里程！");
        return false;
    }
    var numberReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    if (!numberReg.test(mile)) {
        mui.alert("请正确输入行驶里程！小数点后最多两位！");
        return false;
    }
    //http://localhost:8082/api/v1/valuations
    mui.ajax(getKey(valuation), {
        data: {
            modelId: modelId,
            zone: zone,
            regDate: regDate,
            mile: mile
        },
        dataType: 'json',
        type: 'post',
        headers: {'Content-Type': 'application/json'},
        success: function (data) {
            var _data = data;
            mui.ajax("https://mobile.sxwinstar.net/ccb-api/api/v1/cbc/valuations", {
                data: {
                    modelId: modelId,
                    zone: zone,
                    regDate: regDate,
                    mile: mile,
                    plateNumber: plateNumber,
                    price: data.highPrice * 10000
                },
                dataType: 'json',
                type: 'post',
                headers: {'Content-Type': 'application/json'},
                success: function (data) {
                    location.href = 'valuation_result.html?obj=' + escape(JSON.stringify(_data));
                },
                error: function (data) {
                    location.href = 'valuation_result.html?obj=' + escape(JSON.stringify(_data));
                }
            });
        },
        error: function (data) {
            if (data.status == 404) {
                mui.alert("暂无报价！");
            }
        }
    });
});