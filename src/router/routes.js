//这里是路由配置的信息

//引入路由组件
import Home from '../pages/Home'
import Login from '../pages/Login'
import Search from '../pages/Search'
import Register from '../pages/Register'
// import Detail from '../pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from "@/pages/Pay"
import PaySuccess from "@/pages/PaySuccess"
// import Center from '@/pages/Center'
//个人中心的二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    //个人中心页面路由
    {
        path: '/center',
        component: ()=>import('@/pages/Center'),
        //配置路由元信息
        meta: {
            show: true
        },
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            //重定向
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },

    {
        path: '/home',
        component: Home,
        //配置路由元信息
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: Login,
        //配置路由元信息
        meta: {
            show: false
        }
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        component: Search,
        //配置路由元信息
        meta: {
            show: true
        },
        //传递props参数
        //布尔值方式，会把params当做props数据进行传递
        // props:true,
        //对象写法，直接传递一个参数对象
        // props:{a:'1',b:'2'},
        //函数写法，
        // props(routr){
        //     return 
        // }
    },
    {
        path: '/register',
        component: Register,
        //配置路由元信息
        meta: {
            show: false
        }
    },
    //商品详情页面的路由
    {
        path: '/detail/:skuid',
        component:()=>import('../pages/Detail'),
        //配置路由元信息
        meta: {
            show: true
        },
    },
    //添加购物车成功页面的路由
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        name: 'AddCartSuccess',
        //配置路由元信息
        meta: {
            show: true
        },
    },
    //购物车页面的路由
    {
        path: '/shopcart',
        component: ShopCart,
        name: 'shopcart',
        //配置路由元信息
        meta: {
            show: true
        },
    },
    //结算交易理由
    {
        path: '/trade',
        component: Trade,
        //配置路由元信息
        meta: {
            show: true
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //智能从指定页面进入(购物车界面)
            if (from.path == "/shopcart") {
                next()
            } else {
                //停留在当前页面
                next(false)
            }
        }
    },
    //支付界面路由
    {
        path: '/pay',
        component: Pay,
        //配置路由元信息
        meta: {
            show: true
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //智能从指定页面进入(购物车界面)
            if (from.path == "/trade") {
                next()
            } else {
                //停留在当前页面
                next(false)
            }
        }
    },
    //支付成功页面路由
    {
        path: '/paysuccess',
        component: PaySuccess,
        //配置路由元信息
        meta: {
            show: true
        },
    },

    //重定向，在项目跑起来的时候访问/，立刻进入到首页
    {
        path: '*',
        redirect: '/home'
    },


]