/**
 * 基础路径
 */
var base_path = "https://mobile.sxwinstar.net/wechat_access/";
var sbase_path = "http://ch.sxeccellentdriving.com/ccb-api/";
/**
 * 导航页
 */
var nav_search = "api/v1/items/extensions/{id}";
/**
 * 商品查询api
 */
var item_search = "api/v1/items/items/{id}";
/**
 * 商品详情查询api
 */
var item_detail_search = "api/v1/items/items/{id}/modelparam";
/**
 * 根据商户id分页查询商品列表
 */
var partner_item_page_search = "api/v1/items/items/partner/{partnerId}/findByPage?page={page}&limit={limit}";
/**
 * 卖车
 */
var applys_save = "api/v1/items/applys/save";
/**
 * 获取城市列表(tree)
 */
var city_tree_search = "api/v1/items/citys/tree";
/**
 * 获取城市列表(非tree)
 */
var city_search = "api/v1/items/citys";

// /**
//  * 发送验证码
//  */
// var send_code = "api/v1/items/applys/sendCode";
//
// /**
//  * 发送验证码（加密）
//  */
// var send_code = 'http://sms.sxjiashi.com:8080/api/v3/smsSend';

/**
 * 获取车辆品牌
 */
var getBrands = "api/v1/items/brands";
/**
 * 根据品牌Id查询车系
 */
var getSeriesByBrandId = "api/v1/items/series/getSeriesByBrandId";
/**
 * 根据车系Id查询车型
 */
var getModelBySeriesId = "api/v1/items/models/getModelsBySeriesId";
/**
 * 车辆估值
 */
// var valuation = "api/v1/items/valuations";
var valuation = 'api/v1/cbc/valuations/getUsedCarPrice';
/**
 * 我要买车
 */
var findCarByFilter = "api/v1/items/items/page";

/**
 * 店铺查询
 */
var partner_search = "api/v1/items/partners/{partnerId}";

/**
 * 图文导航
 */
var banner_search = "api/v1/items/banners";


/**
 * 商家咨询，统计点击率
 */
var telphone_click = "api/v1/items/items/consultationIncrease";


var car_image_url = "";

var series_image_url = "";

var brand_image_url = "";

var seller_image_url = "";

function getKey(key) {
    return base_path + key;
}
function sGetKey(key) {
    return sbase_path + key;
}

