import Vue from 'vue'
import App from './App.vue'
//引入三级联动组件
import TypeNav from './components/TypeNav/index.vue'
//引入轮播图
import Carousel from './components/Carousel/index.vue'
//引入分页器
import Pagination from '@/components/Pagination/index.vue'
//饿了吗，按需引入
import {Button,MessageBox} from 'element-ui';

//将三级联动组件注册为全局组件
Vue.component(TypeNav.name,TypeNav)
//轮播图注册为全局组件
Vue.component(Carousel.name,Carousel)
//分页器注册全局组件
Vue.component(Pagination.name,Pagination)
//饿了吗,两种注册方式
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//统一引入请求接口
import * as API from '@/api'

Vue.config.productionTip = false
//引入路由
import router from '../src/router'
//引入仓库
import store from './store/index.js'
//引入mockServe.js
import '../src/mock/mockServe.js'
//引swiper样式
import 'swiper/css/swiper.css'

//引入图片懒加载插件
// import VueLazyload from 'vue-lazyload'
// //注册图片懒加载
// Vue.use(VueLazyload, {
//   //懒加载默认的图片
//   loading: 选择一个图片引入,
// });

//引入自定义插件-表单校验
import "@/plugins/validate"


new Vue({
  //注册路由和仓库
  router,
  store,
  render: h => h(App),
  beforeCreate(){
      //全局事件总线
    Vue.prototype.$bus = this
    //将请求接口统一挂载
    Vue.prototype.$API = API
  }
}).$mount('#app')
