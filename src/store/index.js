//引入相关模块
import Vue from 'vue'
import Vuex from 'vuex'
//使用vuex插件
Vue.use(Vuex)

//引入各个模块化小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from "./user"
import trade from './trade'

//创建vuex实例并且向外暴露
export default new Vuex.Store({
    //注册模块化仓库
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})
