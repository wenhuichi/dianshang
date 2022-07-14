//引入要发送的请求
import { reqGoodsInfo,reqAddOrUpdataShopCart } from '@/api/index.js'
//生成随机游客id的模块
import {getUUID} from '@/utils/uuid_token'

const state = {
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETDOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    //获取商品信息的action
    async getGoodsInfo({commit},skuId){
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            commit('GETDOODSINFO',result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        //加入购物车返回的结果
        let result = await reqAddOrUpdataShopCart(skuId,skuNum)
        //判断加入数据库是否成功
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    //商品分类的信息
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    //产品信息的数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //平台售卖信息（商品属性）
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}