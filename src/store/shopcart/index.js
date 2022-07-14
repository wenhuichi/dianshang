import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"

const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表信息的数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        console.log(result);
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车的某一个产品
    async deleteCartListBySkuId({ commit }, skuid) {
        let result = await reqDeleteCartById(skuid)
        //判断是否成功
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //修改购物车某一产品的状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //删除勾选的所有产品,多次调用删除的action
    deleteAllCheckedCart({ dispatch, getters }) {
        //context就等于一个小仓库
        //获取购物车中所有的数据，是一个数组
        let PromiseAll = []

        getters.cartList.cartInfoList.forEach((item) => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            //将每一次的结果添加到数组
            PromiseAll.push(promise)

        })
        //返回是否成功
        return Promise.all(PromiseAll)
    },
    //修改购物车中商品的全部状态
    updateAllCartIsChecked({ dispatch, getters }, ischecked) {
        let promiseAll = []
        console.log(getters.cartList.cartInfoList);

        getters.cartList.cartInfoList.forEach((item) => {
            let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked: ischecked })
            promiseAll.push(promise)
        }
        )
        return Promise.all(promiseAll)
    }

}
const getters = {
    // 提取出有用的信息
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}