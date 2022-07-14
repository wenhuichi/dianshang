import {reqAdressInfo,reqOrderInfo} from '@/api'

const state ={
    //用户地址
    userAddress:[],
    //商品清单
    orderInfo:{}
}
const mutations = {
    //获取用户地址
    GETUSERADDRESS(state,userAddress){
        state.userAddress = userAddress
    },
    //获取商品清单
    GETORDERINFIO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    //获取用户地址的请求
    async getUserAddress({commit}){
        let result = await reqAdressInfo()
        console.log(result);
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取商品清单的数据
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('GETORDERINFIO',result.data)
        }
    }
}
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}