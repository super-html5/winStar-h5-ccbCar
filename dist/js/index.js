mui.ready(function () {
    //车型显示高度为屏幕高度
    var list = document.getElementById('brand-index-list');
    list.style.height = document.body.offsetHeight + 'px';
    window.indexedList = new mui.IndexedList(list);

    var cityData = JSON.parse(localStorage.getItem("cityData"));
    renderCityPicker();
});

//车辆注册地
function renderCityPicker(cityData) {
    if (!cityData) {
        getCityData();
    } else {
        var cityPicker = new mui.PopPicker({
            layer: 2
        });
        cityPicker.setData(cityData);
        var showCityPickerButton = document.getElementById('showCityPicker');
        var cityResult = document.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap', function () {
            cityPicker.show(function (items) {
                cityResult.innerHTML = items[0].text + items[1].text;
                cityResult.setAttribute("data-value", items[1].value);
            });
        }, false);
    }
}
function getCityData() {
    mui.ajax({
        url: getKey(city_tree_search),
        type: "get",
        success: function (data) {
            renderCityPicker(data);
        }
    })
}

//首次上牌日期
var result = $('#dataResult');
var data = $('#showDataPicker');
data.addEventListener('tap', function () {
    var optionsJson = this.getAttribute('data-options') || '{}';
    var options = JSON.parse(optionsJson);
    /*
     * 首次显示时实例化组件
     * 示例为了简洁，将 options 放在了按钮的 dom 上
     * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
     */
    var picker = new mui.DtPicker(options);
    picker.show(function (rs) {
        /*
         * rs.value 拼合后的 value
         * rs.text 拼合后的 text
         * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
         * rs.m 月，用法同年
         * rs.d 日，用法同年
         * rs.h 时，用法同年
         * rs.i 分（minutes 的第二个字母），用法同年
         */
        result.innerHTML = rs.y.value + "-" + rs.m.value;
        result.setAttribute('data-value', rs.y.value + "-" + rs.m.value);
        /*
         * 返回 false 可以阻止选择框的关闭
         * return false;
         */
        /*
         * 释放组件资源，释放后将将不能再操作组件
         * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
         * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
         * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
         */
        picker.dispose();
    });
}, false);

mui('.mui-scroll-wrapper').scroll({
    indicators: false,
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


var modelsId = '';
var zone = '';
var regDate = '';
var mile = mui("#mile")[0];
var expectPrice = mui("#expectPrice")[0];
var verifyCode = mui("#verifyCode")[0];
var telephone = mui("#telephone")[0];
var mobileReg = /^1[3-9]\d{9}$/;
var validCode = mui("#validCode")[0];

var getCodeImg = document.getElementById("getCodeImg");
var sendDefaultUrl = "https://mobile.sxwinstar.net/api/v3/smsSend";
var srcCheckUrl = sendDefaultUrl + "/checkImgCode";

//校验信息是否为空
function checkInput() {
    modelsId = mui("#modelResult")[0].getAttribute("data-value");
    zone = mui("#cityResult")[0].getAttribute("data-value");
    regDate = mui("#dataResult")[0].getAttribute("data-value");
    if (!modelsId) {
        mui.alert("请选择车型！");
        return false;
    }
    if (!zone) {
        mui.alert("请选择车辆注册地！");
        return false;
    }
    if (!regDate) {
        mui.alert("请选择首次上牌日期！");
        return false;
    }
    var numberReg = /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
    if (!(mile.value)) {
        mui.alert("请输入行驶里程！");
        return false;
    }
    if (!numberReg.test(mile.value)) {
        mui.alert("请输入正确的行驶里程！小数点后最多两位！");
        return false;
    }
    if (!(expectPrice.value)) {
        mui.alert("请输入期望售价！");
        return false;
    }
    if (!numberReg.test(expectPrice.value)) {
        mui.alert("请输入正确的期望售价！小数点后最多两位！");
        return false;
    }
    if (!(verifyCode.value)) {
        mui.alert("请输入验证码！");
        return false;
    }
    if (!(telephone.value)) {
        mui.alert("请输入手机号码！");
        return false;
    }
    if (!mobileReg.test(telephone.value)) {
        mui.alert("请输入正确的手机号码！");
        return false;
    }
    if (!(validCode.value)) {
        mui.alert("请输入手机验证码!");
        return false;
    }
    return true;
}

//获取图片验证码
getCodeImg.src = sendDefaultUrl + "/getRandomCode?a=" + Math.floor(Math.random() * 10000 + Math.random() * 100);
mui('.code').on('tap', '#getCodeImg', function () {
    getCodeImg.src = sendDefaultUrl + "/getRandomCode?a=" + Math.floor(Math.random() * 10000 + Math.random() * 100);
});

//校验验证码图片正确后、验证手机号，成功发送短信验证码，并倒计时
mui('.mui-input-row').on('tap', '#getCode', function () {
    if (!(verifyCode.value)) {
        mui.alert("请输入验证码！");
        return false;
    } else {
        mui.ajax(srcCheckUrl + '?validateCode=' + verifyCode.value, {
            type: 'get',
            headers: {'Content-Type': 'application/json'},
            dataType: 'json',
            success: function (data) {
                if (!(telephone.value)) {
                    mui.alert("请输入手机号码！");
                    return false;
                } else if (!mobileReg.test(telephone.value)) {
                    mui.alert("请输入正确的手机号码！");
                    return false;
                } else {
                    sendCode(data.checkId);
                    sendMessage(getCodeValue);
                }
            },
            error: function () {
                mui.alert("图片验证码错误，请重试！");
            }
        });
    }
});

//发送短信验证码
var successId;
function sendCode(checkId) {
    mui.ajax(sendDefaultUrl + '?appSecret=1&checkId=' + checkId + '&phoneNumber=' + telephone.value + '&types=6', {
        type: 'post',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        dataType: 'json',
        success: function (data) {
            successId = data.text;
            console.log(successId);
            mui.alert("短信发送成功！");
        },
        error: function () {
            mui.alert("服务器繁忙，请稍后再试！");
        }
    });
}


//倒计时60s
var countDown = 60;
var getCodeValue = document.getElementById('getCode');
function sendMessage(getCodeValue) {
    if (countDown == 0) {
        getCodeValue.classList.remove("text-secondary");
        getCodeValue.innerHTML = '重新获取';
        countDown = 60;
    } else {
        getCodeValue.classList.add("text-secondary");
        getCodeValue.innerHTML = '重新获取' + countDown + 's';
        countDown--;
        setTimeout(function () {
            sendMessage(getCodeValue)
        }, 1000);
    }
}


//点击提交信息
mui('.paddingLR12').on('tap', '#confirmBtn', function () {
    var _this = this;
    if (checkInput()) {
        _this.classList.add("disabled-confirm");
        // mui.ajax('http://192.168.118.111:7000/api/v1/items/applys/save', {
         mui.ajax(getKey(applys_save), {
            type: 'post',
            headers: {'id': successId},
            dataType: 'json',
            data: {
                modelId: modelsId,
                zone: zone,
                regDate: regDate,
                mile: mile.value,
                expectPrice: expectPrice.value,
                telephone: telephone.value,
                verifyCode: validCode.value
            },
            success: function () {
                var message = '我们工作人员会尽快与您联系并安排买车事宜<br/>咨询电话：<span class="blue text-decoration">4008012122</span>';
                mui.alert(message, '您的信息已提交成功！', function () {
                    location.reload();
                }, 'div');
            },
            error: function (data) {
                console.log(data);
                _this.classList.remove("disabled-confirm");
                if (data.status == 400) {
                    mui.alert("验证码错误！");
                }
                if (data.status == 404) {
                    mui.alert("验证码失效！");
                }
            }
        });
    }
});