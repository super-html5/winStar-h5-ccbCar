linkage(mui, document, showCityPicker, cityResult, dataResult, showDataPicker);
var plateNumber = _getQueryString('plateNumber');
var isUserType = _getQueryString('isUserType');
//var isUserType = 0;
mui.ready(function () {

    var list = document.getElementById('brand-index-list');
    list.style.height = document.body.offsetHeight + 'px';
    window.indexedList = new mui.IndexedList(list);
    renderBrandList();
    carDetalis()
});

mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
var _zone = new Array();
_zone['陕A'] = ['西安', 27];
_zone['陕B'] = ['铜川', 57];
_zone['陕C'] = ['宝鸡', 85];
_zone['陕D'] = ['咸阳', 113];
_zone['陕E'] = ['渭南', 141];
_zone['陕F'] = ['汉中', 196];
_zone['陕G'] = ['安康', 248];
_zone['陕H'] = ['商洛', 270];
_zone['陕J'] = ['延安', 169];
_zone['陕K'] = ['榆林', 223];
_zone['陕V'] = ['杨凌', 113];

function rZoneNumber(str) {
    return _zone[str];
}

mui("#canvasContent").on('tap', '.bg-yellow', function () {

    var zone = document.getElementById("cityResult").getAttribute("data-value");
    var zoneText = document.getElementById("cityResult").innerHTML;
    if (!zone) {
        mui.alert("请选择车辆注册地！");
        return false;
    }
    var modelId = mui('#modelResult')[0].getAttribute("data-value");
    var modelIdText = mui('#modelResult')[0].innerHTML;
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
    var objText = {
        'zone': zone,
        'zoneText': zoneText,
        'modelIdText': modelIdText,
        'regDate': regDate,
        'mile': mile,
        'modelId': modelId,
        'plateNumber': '陕A3UW53'
    };

    mui.ajax('/ccb-api/api/v1/cbc/valuations/getUsedCarPrice', {
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
            if (data.error_msg) {
                alert(data.error_msg);
                return;
            }
            var _data = data;
            localStorage.setItem('car_obj', JSON.stringify(_data));
            localStorage.setItem('car_objText', JSON.stringify(objText));
            mui.ajax("/ccb-api/api/v1/cbc/valuations", {
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
                headers: {
                    'Content-Type': 'application/json',
                    // 'token_id': '0cd3a6a461c94caf99c466eabbedfbc8'
                    'token_id': localStorage.getItem('ccbToken')
                },
                success: function (data) {
                    if (isUserType == 1) {
                        location.href = 'valuation_result.html?obj=' + escape(JSON.stringify(_data)) + '&objText=' + escape(JSON.stringify(objText));
                    } else {
                        location.href = 'z_valuation_result.html?obj=' + escape(JSON.stringify(_data)) + '&objText=' + escape(JSON.stringify(objText));
                    }
                },
                error: function (data) {
                    if (isUserType == 1) {
                        location.href = 'valuation_result.html?obj=' + escape(JSON.stringify(_data)) + '&objText=' + escape(JSON.stringify(objText));
                    } else {
                        location.href = 'z_valuation_result.html?obj=' + escape(JSON.stringify(_data)) + '&objText=' + escape(JSON.stringify(objText));
                    }
                }
            });
            // location.href = 'valuation_result.html?obj=' + escape(JSON.stringify(data)) + '&objText=' + escape(JSON.stringify(objText));
        },
        error: function (data) {
            mui.alert("暂无报价！");
        }
    });
});


function carDetalis() {
    // var _u = '/ccb-api/api/v1/cbc/valuations/getVehicleInfo?plateNumber=' + '陕A3UW53'
    //     + '&plateNumberType=02'
    //     + '&accountId=' + '0cd3a6a461c94caf99c466eabbedfbc8' + '&isUserType=' + isUserType;
    var _u = '/ccb-api/api/v1/cbc/valuations/getVehicleInfo?plateNumber=' + plateNumber
        + '&plateNumberType=02'
        + '&accountId=' + localStorage.getItem('ccbToken');
    mui.ajax(_u, {
        dataType: 'json',
        type: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            console.log(data);
            var _data = rZoneNumber(data.certificateOrgan);
            var _s = _zone[data.certificateOrgan];
            if (!_s) {
                alert('非陕牌车辆，无法估价');
                return;
            }
            var cityResult = document.getElementById('cityResult');
            cityResult.innerHTML = '陕西' + _s[0];
            cityResult.setAttribute("data-value", _s[1]);
        },
        error: function (data) {

        }
    });
}

isSubmit();

function isSubmit() {
    // var _u = '/ccb-api/api/v1/cbc/valuations/isSaleVehicle?accountId=' + '0cd3a6a461c94caf99c466eabbedfbc8';
    var _u = '/ccb-api/api/v1/cbc/valuations/isSaleVehicle?accountId=' + localStorage.getItem('ccbToken');
    mui.ajax(_u, {
        dataType: 'json',
        type: 'get',
        headers: {
            'Content-Type': 'application/json',
            'token_id': localStorage.getItem('ccbToken')
        },
        success: function (data) {
            if (data.result == 1 && isUserType == 1) {
                location.href = 'valuation_result.html?obj=' + escape(localStorage.getItem('car_obj')) + '&objText=' + escape(localStorage.getItem('car_objText'));
            } else if (data.result == 1 && isUserType == 0) {
                location.href = 'z_valuation_result.html?obj=' + escape(localStorage.getItem('car_obj')) + '&objText=' + escape(localStorage.getItem('car_objText'));
            }
        },
        error: function (data) {

        }
    });
}

// 第三种方式：函数处理
function formatDate(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    if (month < 10) {
        month = '0' + month;
    }
    return year + "-" + month;
}

// var d = new Date(1553788800000);
//
// console.log(formatDate(d));