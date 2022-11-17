//统一管理接口的模块
import requests from "./request";
import mockRequests from './mockAjax.js'

//三级联动接口
export const reqCategoryList = ()=>{
    return requests({
        //axios请求返回的是promise对象
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

//获取首页轮播图的数据
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' });

//获取floor组件的数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取search搜索页面得数据 /api/list 需要传递参
//参数params至少是一个空对象,得有一个默认值
export const reqGetSearchInfo = (params) =>{
    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}

// export const reqGetSearchInfo = (params) => mockRequests.post('/list')


//获取商品详情信息的接口 URL：/api/item/{ skuId }
export const reqGoodsInfo = (skuid) => requests({
    url:`/item/${skuid}`,
    method:'get',
})

//将产品添加到购物车中（获取更新的某一个产品个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdataShopCart = (skuId,skuNum) =>requests({
    url:`/cart/addToCart/${skuId}/${skuNum}`,
    method:'post'
})

//为购物车页面获取数据 /api/cart/cartList get请求
export const reqCartList = () =>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

//删除购物车产品的接口，/api/cart/deleteCart/{skuId} delete请求方式
export const reqDeleteCartById = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}
//修改购物车里商品选中状态的接口 /api/cart/checkCart/{skuID}/{isChecked} get形式
export const reqUpdateCheckedByid = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

//获取注册用的验证码的接口/api/user/passport/sendCode/{phone} get方式
export const reqGetCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

//用户注册的接口
export const reqUserRegister = (data) =>{
    return requests({
        url:"/user/passport/register",
        method:'post',
        data,
    })
}

//用户登录的接口 /api/user/passport/login
export const reqUserLogin = (data) => {
    return requests({
        url:`/user/passport/login`,
        method:'post',
        data,
    })
}

//获取用户的信息，
//http://182.92.128.115/api/user/passport/auth/getUserInfo  需要token
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录的接口 /api/user/passport/logout get
export const reqLogout = () =>{
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAdressInfo = () =>{
    return requests({
        url:'user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

//获取商品清单 /api/order/auth/trade get 
export const reqOrderInfo =() => {
    return requests({
        url:'order/auth/trade',
        method:'get'
    })
}

//提交订单的接口 /api/order/auth/submitOrder?tradeNo={tradeNo} 方式：post
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data,
    })
}
//获取订单支付信息的接口/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => {
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'GET'
    })
}

//查询订单支付状态的接口 /api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus = (orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

//获取个人中心订单的接口 /api/order/auth/{page}/{limit} GET
export const reqMyOrderList = (page,limit) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}