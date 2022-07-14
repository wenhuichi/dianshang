//这里配置全局路由

//引入需要的插件
import Vue from 'vue'
import VueRouter from 'vue-router'

//引入路由配置信息组件
import routes from './routes'
//引入srore
import store from '@/store'
//用户信息
let userName = store.state.user.userInfo.name
//使用插件
Vue.use(VueRouter)

//配置路由并暴露
let router =  new VueRouter({
    routes,
    //滚动行为
    scrollBehavior (to, from, savedPosition) {
        return {y: 0 }
      }
});

//全局守卫，前置守卫
router.beforeEach(async (to,from,next) => {
  //to可以换取到要去哪个路由
  //from可以获取到从哪个路由来
  //next；方形函数
  next()
  //监测用户是否已经登录
  let token = store.state.user.token
  if(token){
    //不可以在跳转到登录页面,停留在首页
    if(to.path == '/login'){
      next('/home')
    }else{
      //放行其他的路由,
      //判断方式就是有用户名
      if(userName){
        next()
      }else{
          try {
            //没有用户信息的话，派发action
             await store.dispatch('getUserInfo')
             //如果成功了就放行
             next()
          } catch (error) {
            //token失效，清除信息，回到登录界面
            await store.dispatch('userLogout')
            next('/login')
          }

      }
    }

  }else{
    //没有登录的情况
    //不能去交易相关，支付相关，个人中心相关页面
    //得到用户想去哪里
    let toPath = to.path;
    if(toPath == '/trade' ||toPath == '/pay' 
    || toPath == '/paysuccess' || toPath.indexOf('/center') != -1 ){
     //将本来想去的页面地址以query参数记录下来，配的登录组件
      next('/login?redirect='+toPath)
    }else{

    }
    next( )
  }
})

export default router;