var obj = JSON.parse(_getQueryString("obj"));
var objText = JSON.parse(_getQueryString("objText"));
var isUserType = _getQueryString('isUserType');
var isChinaT = new Array();

isChinaT['A'] = '国产';
isChinaT['B'] = '海关进口';
isChinaT['C'] = '公安没收';
isChinaT['D'] = '工商没收';
isChinaT['E'] = '海关没收';
isChinaT['F'] = '一车一证';
isChinaT['G'] = '海关监管';
isChinaT['H'] = '进口改装';
isChinaT['I'] = '解除监管';
if (localStorage.getItem('carIsSub') == 1) {
    document.getElementById('SellCard').innerHTML = '信息已提交';
    document.getElementById('SellCard').setAttribute('disabled', 'disabled');
}

document.getElementById('fxUrl').value = 'https://mobile.sxwinstar.net/ccb/winstar-h5-ccbCar/template/f_valuation_result.html?objText=' + encodeURIComponent(JSON.stringify(objText));

var isShow = false;
document.getElementById("date").innerHTML = objText.regDate;
document.getElementById("kilometre").innerHTML = objText.mile;
document.getElementById("fxTitle").value = objText.modelIdText;
document.getElementById("valuaR-price").innerHTML = obj.model_price;
document.getElementById("title").innerHTML = objText.modelIdText;
document.getElementById("_zone").innerHTML = objText.zoneText;


/**
 * 优秀
 */
document.getElementById("excellent_dealer_buy_price").innerHTML = obj.eval_prices[0].dealer_buy_price;
document.getElementById("excellent_individual_price").innerHTML = obj.eval_prices[0].individual_price;
document.getElementById("excellent_dealer_price").innerHTML = obj.eval_prices[0].dealer_price;

document.getElementById("excellent_dealer_low_buy_price").innerHTML = obj.eval_prices[0].dealer_low_buy_price;
document.getElementById("excellent_individual_low_sold_price").innerHTML = obj.eval_prices[0].individual_low_sold_price;
document.getElementById("excellent_dealer_low_sold_price").innerHTML = obj.eval_prices[0].dealer_low_sold_price;
document.getElementById("excellent_dealer_high_sold_price").innerHTML = obj.eval_prices[0].dealer_high_sold_price;


/**
 * 良好
 * @type {Element}
 */
document.getElementById("good_dealer_buy_price").innerHTML = obj.eval_prices[1].dealer_buy_price;
document.getElementById("good_individual_price").innerHTML = obj.eval_prices[1].individual_price;
document.getElementById("good_dealer_price").innerHTML = obj.eval_prices[1].dealer_price;

document.getElementById("good_dealer_low_buy_price").innerHTML = obj.eval_prices[1].dealer_low_buy_price;
document.getElementById("good_individual_low_sold_price").innerHTML = obj.eval_prices[1].individual_low_sold_price;
document.getElementById("good_dealer_low_sold_price").innerHTML = obj.eval_prices[1].dealer_low_sold_price;
document.getElementById("good_dealer_high_sold_price").innerHTML = obj.eval_prices[1].dealer_high_sold_price;


/**
 * 一般
 * @type {Element}
 */
document.getElementById("normal_dealer_buy_price").innerHTML = obj.eval_prices[2].dealer_buy_price;
document.getElementById("normal_individual_price").innerHTML = obj.eval_prices[2].individual_price;
document.getElementById("normal_dealer_price").innerHTML = obj.eval_prices[2].dealer_price;

document.getElementById("normal_dealer_low_buy_price").innerHTML = obj.eval_prices[2].dealer_low_buy_price;
document.getElementById("normal_individual_low_sold_price").innerHTML = obj.eval_prices[2].individual_low_sold_price;
document.getElementById("normal_dealer_low_sold_price").innerHTML = obj.eval_prices[2].dealer_low_sold_price;
document.getElementById("normal_dealer_high_sold_price").innerHTML = obj.eval_prices[2].dealer_high_sold_price;

var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var tab3 = document.getElementById("tab3");
var tab1con = document.getElementById("tab1-con");
var tab2con = document.getElementById("tab2-con");
var tab3con = document.getElementById("tab3-con");
var bottom_btn = document.getElementById("bottom_btn");
var showSearchCar = document.getElementById("showSearchCar");
var carDetailsInfo = document.getElementById("carDetailsInfo");

tab1.onclick = function () {
    tab1.setAttribute('class', 'tab-active');
    tab2.removeAttribute('class');
    tab3.removeAttribute('class');
    tab1con.style.display = 'block';
    tab2con.style.display = 'none';
    tab3con.style.display = 'none';
    bottom_btn.style.display = 'block';
};
tab2.onclick = function () {
    tab2.setAttribute('class', 'tab-active');
    tab1.removeAttribute('class');
    tab3.removeAttribute('class');
    tab2con.style.display = 'block';
    tab1con.style.display = 'none';
    tab3con.style.display = 'none';
    bottom_btn.style.display = 'block';
};
tab3.onclick = function () {
    tab3.setAttribute('class', 'tab-active');
    tab1.removeAttribute('class');
    tab2.removeAttribute('class');
    tab3con.style.display = 'block';
    tab1con.style.display = 'none';
    tab2con.style.display = 'none';

    if (isShow) {
        bottom_btn.style.display = 'block';
    } else {
        bottom_btn.style.display = 'none';
    }

};

var dom = document.getElementById("container");
var myChart = echarts.init(dom);

/**
 * 获取未来走势
 */
var _u = '/ccb-api/api/v1/cbc/valuations/priceFutureRecord?modelId=' +
    objText.modelId + '&zone=' + objText.zone + '&regDate=' + objText.regDate + '&mile=' + objText.mile;
mui.ajax(_u, {
    dataType: 'json',
    type: 'get',
    headers: {
        'Content-Type': 'application/json'
    },
    success: function (data) {
        var years = [];
        var prices = [];
        for (var item in data.residual_rate) {
            years.push(data.residual_rate[item].year);
            prices.push(data.residual_rate[item].price)
        }
        option = {
            title: {
                subtext: '单位(万元)',
                x: 'left',
                align: 'right'
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: years,
            },
            yAxis: {
                type: 'value',
                // name: '单位：万元'
            },
            series: [{
                areaStyle: {},
                data: prices,
                type: 'line',
                itemStyle: {
                    normal: {
                        label: {show: true}, lineStyle: {
                            color: '#47cc74'
                        },
                        color: '#47cc74'
                    }
                },
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    },
    error: function (data) {
    }
});

// var carType = document.getElementById('carType'); //车辆型号
var brand = document.getElementById('brand');	//中文品牌
var checkTime = document.getElementById('checkTime');	//检验有效期
// var displacement = document.getElementById('displacement');	//排量
var environmental = document.getElementById('environmental');	//环保情况
var illegalNumber = document.getElementById('illegalNumber');	//累计违法数量
var integral = document.getElementById('integral');	//累计罚款积分
var isChina = document.getElementById('isChina');	//是否国产
var isTransfer = document.getElementById('isTransfer');	//是否过户
var _location = document.getElementById('_location');	//车辆所在地
var mortgageStatus = document.getElementById('mortgageStatus');	//抵押状态
var power = document.getElementById('power');	//功率
var productionTime = document.getElementById('productionTime');	//出厂日期
var registerTime = document.getElementById('registerTime');	//初登日期
var strongInsuranceTime = document.getElementById('strongInsuranceTime');	//交强险有效期
var vehicleStatus = document.getElementById('vehicleStatus');	//机动车状态
var vehicleType = document.getElementById('vehicleType');	//车辆类型


var vehicleStatus_text = document.getElementById('vehicleStatus_text');
var vehicleType_text = document.getElementById('vehicleType_text');

/**
 查询车辆详情
 **/
function getCarDetails() {
    var engineNumber = document.getElementById("engineNumber").value;
    if (!engineNumber || engineNumber.length != 6) {
        alert('请输入正确的发动机后六位');
        return;
    }
    var _u = '/ccb-api/api/v1/cbc/valuations/getVehicleDetail?modelId=' +
        objText.modelId + '&plateNumber=' + objText.plateNumber + '&engineNumber=' + engineNumber;
    mui.ajax(_u, {
        dataType: 'json',
        type: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (data) {
            console.log(data);

            bottom_btn.style.display = 'block';
            showSearchCar.style.display = 'none';
            carDetailsInfo.style.display = 'block';
            isShow = true;


            var checkTimeStr = new Date(data.checkTime);
            var registerTimeStr = new Date(data.registerTime);
            var strongInsuranceTimeStr = new Date(data.strongInsuranceTime);

            // carType.innerHTML = objText.modelIdText;
            data.brand ? (brand.innerHTML = data.brand ) : (brand.innerHTML = '- -');
            data.checkTime ? (checkTime.innerHTML = formatDate(checkTimeStr) ) : (checkTime.innerHTML = '- -');
            // data.displacement ? (displacement.innerHTML = data.displacement ) : (displacement.innerHTML = '- -');
            data.environmental ? (environmental.innerHTML = data.environmental ) : (environmental.innerHTML = '- -');
            data.illegalNumber ? (illegalNumber.innerHTML = data.illegalNumber ) : (illegalNumber.innerHTML = '- -');
            data.integral ? (integral.innerHTML = data.integral ) : (integral.innerHTML = '- -');
            if (!isChinaT[data.isChina]) {
                isChinaT[data.isChina] = '其他';
            }
            data.isChina ? (isChina.innerHTML = isChinaT[data.isChina] ) : (isChina.innerHTML = '- -');
            data.isTransfer ? (isTransfer.innerHTML = data.isTransfer ) : (isTransfer.innerHTML = '- -');
            data.location ? (_location.innerHTML = data.location ) : (_location.innerHTML = objText.zoneText);
            data.mortgageStatus ? (mortgageStatus.innerHTML = data.mortgageStatus ) : (mortgageStatus.innerHTML = '- -');
            data.power ? (power.innerHTML = data.displacement + 'L' + ' / ' + data.power + 'kw') : (power.innerHTML = '- - / - -');
            data.productionTime ? (productionTime.innerHTML = data.productionTime ) : (productionTime.innerHTML = '- -');
            data.registerTime ? (registerTime.innerHTML = formatDate(registerTimeStr) ) : (registerTime.innerHTML = '- -');
            data.strongInsuranceTime ? (strongInsuranceTime.innerHTML = formatDate(strongInsuranceTimeStr) ) : (strongInsuranceTime.innerHTML = '- -');
            data.vehicleStatus ? (vehicleStatus.innerHTML = data.vehicleStatus ) : (vehicleStatus.innerHTML = '正常');

            if (objText.modelIdText.length >= 16) {
                objText.modelIdText = objText.modelIdText.substring(0, 16) + '...';
            }

            data.vehicleType ? (vehicleType.innerHTML = data.vehicleType ) : (vehicleType.innerHTML = objText.modelIdText);

            data.vehicleStatus ? (vehicleStatus_text.innerHTML = data.vehicleStatus ) : (vehicleStatus_text.innerHTML = ' -- ');
            data.vehicleType ? (vehicleType_text.innerHTML = data.vehicleType ) : (vehicleType_text.innerHTML = ' -- ');

            if (!data.vehicleStatus || !data.vehicleType) {
                document.getElementById('c0').style.display = 'none';
            }
            if (!data.vehicleStatus) {
                vehicleType_text.style.display = 'none';
            }
            var thisTime = new Date().getTime();
            if (data.registerTime) {
                if (thisTime - data.registerTime <= 31536000000) {
                    document.getElementById('c1').style.display = 'block';
                } else if (thisTime - data.registerTime > 31536000000 && thisTime - data.registerTime < 31536000000 * 3) {
                    document.getElementById('c2').style.display = 'block';
                } else if (thisTime - data.registerTime > 31536000000 * 3 && thisTime - data.registerTime < 31536000000 * 6) {
                    document.getElementById('c3').style.display = 'block';
                } else if (thisTime - data.registerTime > 31536000000 * 6) {
                    document.getElementById('c4').style.display = 'block';
                }
            }
            if (!data.illegalNumber) {
                document.getElementById('creditStatus').innerHTML = '';
            } else {
                if (data.illegalNumber < 3) {
                    document.getElementById('creditStatus').innerHTML = '车辆驾驶习惯：优秀';
                } else if (data.illegalNumber >= 3 && data.illegalNumber <= 6) {
                    document.getElementById('creditStatus').innerHTML = '车辆驾驶习惯：良好';
                } else if (data.illegalNumber > 6 && data.illegalNumber < 10) {
                    document.getElementById('creditStatus').innerHTML = '车辆驾驶习惯：中等';
                } else if (data.illegalNumber >= 10) {
                    document.getElementById('creditStatus').innerHTML = '车辆驾驶习惯：较差';
                }
            }
        },
        error: function (data) {
            if (JSON.parse(data.response).code == 'notMatchEngineNumber.NotRule') {
                alert('发动机后六位有误，请重新输入');
            }
        }
    });
}

$('#SellCard').click(function () {
    slog('点击出售爱车', 17);
    $("#maskLayer").fadeIn(500);
    var centerHeight = $("#popupQuery").height() / 2;
    $("#popupQuery").css("margin-top", -centerHeight + "px");
});


$("#maskLayer").on("click", function () {
    $(this).fadeOut(500);
});
$("#popupQuery").on("click", function (e) {
    e.stopPropagation();
});
$("#query-mask-layer").on("click", function () {
    $("#maskLayer").fadeOut(500);
});

$("#clearCard").on("click", function () {
    $("#maskLayer").fadeOut(500);
});

function sell_car() {
    slog('提交预售信息', 18);
    if (!$('#price').val()) {
        alert('请输入出售价格');
        return;
    } else if ($('#saleTime').val() == 1) {
        alert('请选择出售日期');
        return;
    } else if (!$('#phoneNumber').val()) {
        alert('请输入手机号码');
        return;
    }
    if ($('#phoneNumber').val().length != 11) {
        alert('请输入正确的手机号码');
        return;
    }

    /**
     * 出售车辆
     */
    var su = '/ccb-api/api/v1/cbc/valuations/saleVehicle';
    $.ajax({
        url: su,
        type: 'post',
        dataType: "json",
        data: JSON.stringify({
            phoneNumber: $('#phoneNumber').val(),
            plateNumber: objText.plateNumber,
            price: parseInt(parseFloat($('#price').val()).toFixed(2) * 10000),
            saleTime: $('#saleTime').val(),
            accountId: localStorage.getItem('ccbToken'),
            model: objText.modelIdText,
            mile: objText.mile,
            registerTime: objText.regDate
        }),
        beforeSend: function (res) {
            res.setRequestHeader('Content-Type', 'application/json');
            document.getElementById('mcar').innerHTML = '请稍后...';
            document.getElementById('mcar').setAttribute('disabled', 'disabled');
        },
        success: function (response) {
            document.getElementById('mcar').innerHTML = '提交';
            document.getElementById('mcar').removeAttribute('disabled');
            // alert('恭喜您提交成功，我们会在24小时内与您联系，请保持电话畅通');
            $("#maskLayer").fadeOut(500);
            localStorage.setItem('carIsSub', '1');
            document.getElementById('SellCard').innerHTML = '信息已提交';
            document.getElementById('SellCard').setAttribute('disabled', 'disabled');
            // location.href = 'https://mobile.sxwinstar.net/ccb/ccb-php/index.php?type=callback&menu=ccbTwo';
            location.href = 'success.html';
        },
        error: function (data) {
            document.getElementById('mcar').innerHTML = '提交';
            document.getElementById('mcar').removeAttribute('disabled');
            console.log(data);
            alert('信息有误，请重新提交');
        }
    });
}

function zzcShow() {
    document.getElementById('zzc').style.display = 'block';
}

function zzcHidden() {
    document.getElementById('zzc').style.display = 'none';
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
    if (date < 10) {
        date = '0' + date;
    }
    return year + "-" + month + "-" + date;
}

// var d = new Date(1553788800000);
//
// console.log(formatDate(d));

function slog(applyUrl, code) {
    /**
     * 出售车辆
     */
    var su = '/ccb-api/api/v1/cbc/couponActivities/queryLog';
    $.ajax({
        url: su,
        type: 'post',
        dataType: "json",
        data: JSON.stringify({
            applyUrl: applyUrl,
            code: code
        }),
        headers: {'Content-Type': 'application/json', 'token_id': localStorage.getItem('ccbToken')},
        beforeSend: function (res) {
            res.setRequestHeader('token_id', localStorage.getItem('ccbToken'));
        },
        success: function (response) {

        },
        error: function (data) {

        }
    });
}