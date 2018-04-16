
/**
 * 基础路径
 */
var base_path = "https://mobile.sxwinstar.net/wechat_access/";

/**
 * 车品信息.
 */
var car_list = "api/v1/items/goods/list";

/**
 * 车品详情.
 */
var car_details = "api/v1/items/goods/detail";

/**
 * 商品点击量统计.
 */
var goodsClickNum = "api/v1/items/goods/detail";

/**
 * 电话咨询统计.
 */
var phoneNum = "api/v1/items/consultation/consultation";

/**
 * 车品分类.
 */
var goodsClassify = "api/v1/items/goods/list";



function getKey(key){
    return base_path + key;
}