var obj = JSON.parse(getQueryString("obj"));
var objText = JSON.parse(getQueryString("objText"));
var isUserType = getQueryString('isUserType');

console.log(obj);
console.log(objText);

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
var tab1con = document.getElementById("tab1-con");
var tab2con = document.getElementById("tab2-con");
tab1.onclick = function () {
    tab1.setAttribute('class', 'tab-active');
    tab2.removeAttribute('class');
    tab1con.style.display = 'block';
    tab2con.style.display = 'none';
};
tab2.onclick = function () {
    tab2.setAttribute('class', 'tab-active');
    tab1.removeAttribute('class');
    tab2con.style.display = 'block';
    tab1con.style.display = 'none';
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
        document.getElementById('fxUrl').value = 'https://mobile.sxwinstar.net/ccb/winStar-h5-ccbCar/template/f_valuation_result.html?objCar='
            + escape(JSON.stringify(data)) + '&obj=' + escape(JSON.stringify(obj)) + '&objText=' + escape(JSON.stringify(objText));
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
                name: '单位：万元',
                show: false
            },
            series: [{
                data: prices,
                type: 'line',
                itemStyle: {
                    normal: {
                        label: {show: true}, lineStyle: {
                            color: '#999'
                        },
                        color: '#999'
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

$('#SellCard').click(function () {
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
            // accountId: '0cd3a6a461c94caf99c466eabbedfbc8'
            accountId: localStorage.getItem('ccbToken')
        }),
        beforeSend: function (res) {
            res.setRequestHeader('Content-Type', 'application/json');
        },
        success: function (response) {
            alert('恭喜您提交成功，我们会在24小时内与您联系，请保持电话畅通');
            $("#maskLayer").fadeOut(500);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function zzcShow() {
    document.getElementById('zzc').style.display = 'block';
}

function zzcHidden() {
    document.getElementById('zzc').style.display = 'none';
}