//这是search模块的仓库
//引入axios请求
import { reqGetSearchInfo } from "@/api";

const actions={
    //发请求获取search页面数据
    //dispath时候至少传递一个空对象params
    async getSearchList({commit},params={}){//默认空对象
        let result = await reqGetSearchInfo(params)
        console.log(result.data);
        if(result.code === 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
};

const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const state={
    searchList:{}
};
//为了简化仓库中的数据,计算属性，组件想获取数据时简单点
const getters={
    goodsList(state){//这里是当前仓库的state，不是大仓库的
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
};

export default {
    // namespaced:true,
    state,
    mutations,
    actions,
    getters,
}