var obj = JSON.parse(getQueryString("obj"));
console.log(obj);
document.getElementById("date").innerHTML = obj.regDate;
document.getElementById("kilometre").innerHTML = obj.mile;
document.getElementById("reference-quote-excellent").innerHTML = obj.highPrice;
document.getElementById("reference-quote-good").innerHTML = obj.goodPrice;
document.getElementById("reference-quote-ordinary").innerHTML = obj.lowPrice;
document.getElementById("valuaR-price").innerHTML = obj.price;
var _zone = obj.title.split(' ');
document.getElementById("title").innerHTML = obj.title.substring(0, obj.title.lastIndexOf(' '));
document.getElementById("_zone").innerHTML = _zone[_zone.length - 1];
document.getElementById("dealerBuyPrice").innerHTML = obj.dealerBuyPrice + ' 万';
document.getElementById("dealerPrice").innerHTML = obj.dealerPrice + ' 万';

var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var tab3 = document.getElementById("tab3");
var tab1con = document.getElementById("tab1-con");
var tab2con = document.getElementById("tab2-con");
var tab3con = document.getElementById("tab3-con");

tab1.onclick = function () {
    tab1.setAttribute('class', 'tab-active');
    tab2.removeAttribute('class');
    tab3.removeAttribute('class');
    tab1con.style.display = 'block';
    tab2con.style.display = 'none';
    tab3con.style.display = 'none';
};
tab2.onclick = function () {
    tab2.setAttribute('class', 'tab-active');
    tab1.removeAttribute('class');
    tab3.removeAttribute('class');
    tab2con.style.display = 'block';
    tab1con.style.display = 'none';
    tab3con.style.display = 'none';
};
tab3.onclick = function () {
    tab3.setAttribute('class', 'tab-active');
    tab1.removeAttribute('class');
    tab2.removeAttribute('class');
    tab3con.style.display = 'block';
    tab1con.style.display = 'none';
    tab2con.style.display = 'none';
};
var dom = document.getElementById("container");
var myChart = echarts.init(dom);

var _dom = document.getElementById("container1");
var _myChart = echarts.init(_dom);
/**
 * 获取未来走势
 */
var _u = 'http://127.0.0.1:8080/ccb-api/api/v1/cbc/valuations/priceFutureRecord?modelId=' +
    obj.modelId + '&zone=' + obj.zone + '&regDate=' + obj.regDate + '&mile=' + obj.mile;
mui.ajax(_u, {
    dataType: 'json',
    type: 'get',
    headers: {
        'Content-Type': 'application/json',
        'token_id': '3324668167e04169a99f37fcfa88c43f'
    },
    success: function (data) {
        // console.log(data);
        var years = [];
        var prices = [];
        for (var item in data.residual_rate) {
            years.push(data.residual_rate[item].year);
            prices.push(data.residual_rate[item].price)
        }
        option = {
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: years
            },
            yAxis: {
                type: 'value',
                name: '单位：万元'
            },
            series: [{
                data: prices,
                type: 'line',
                areaStyle: {},
                itemStyle: {normal: {label: {show: true}}},
            }]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    },
    error: function (data) {
    }
});

/**
 查看历史价格
 **/

var _uu = 'http://127.0.0.1:8080/ccb-api/api/v1/cbc/valuations/priceHistoricalRecord?modelId=' +
    obj.modelId + '&zone=' + obj.zone + '&regDate=' + obj.regDate + '&mile=' + obj.mile;
mui.ajax(_uu, {
    dataType: 'json',
    type: 'get',
    headers: {
        'Content-Type': 'application/json',
        'token_id': '3324668167e04169a99f37fcfa88c43f'
    },
    success: function (data) {
        console.log(data);
        var _years = [];
        var _prices = [];
        for (var item in data.trends) {
            _years.push(data.trends[item].trend_date);
            _prices.push(data.trends[item].eval_price);
        }
        option = {
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: _years
            },
            yAxis: {
                type: 'value',
                name: '单位：万元'
            },
            series: [{
                data: _prices,
                type: 'line',
                areaStyle: {},
                itemStyle: {normal: {label: {show: true}}},
            }]
        };
        if (option && typeof option === "object") {
            _myChart.setOption(option, true);
        }
    },
    error: function (data) {
    }
});