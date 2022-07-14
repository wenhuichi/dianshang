//这是home模块的仓库
//引入api模块
import {reqCategoryList, reqGetBannerList,reqFloorList} from '../../api/index.js'
const actions={
    //向服务器发请求获得三级分类的数据
    async CategoryList({commit}){
        let result =  await reqCategoryList()
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
        }
    },

    async getBannerList({ commit, state, dispatch }) {
        //获取首页数据
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
        console.log(result);
    },

    //获取floor组件的数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code === 200){
            //调用mutation
            commit('GETFLOORLIST',result.data)
        }
    },
};

const mutations={
    //将三级分类的数据存入仓库
    CATEGORYLIST(state,CategoryList){
        state.CategoryList = CategoryList
        //保持在16条数据用的有人改数据
        state.CategoryList.pop()
    },
    //将轮播图的数据存入仓库
    GETBANNERLIST(state,value){
        state.bannerList = value
    },
    //将floor数据存入仓库
    GETFLOORLIST(state,value){
        state.floorList = value
    }
};

const state={
    //三级列表的数据
    CategoryList:[],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList:[],
};

const getters={};

export default {
    // namespaced:true,
    state,
    mutations,
    actions,
    getters,
}