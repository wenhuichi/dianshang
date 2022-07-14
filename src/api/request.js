//对于axios进行二次封装
import axios from 'axios'
//引入进度条插件
import nProgress from 'nprogress';
//引入进度条的样式，修改去源码里改bar
import 'nprogress/nprogress.css'
//star代表进度条开始 done 进度条结束

//在当前模块引入store
import store from '@/store'

//创建一个axios实例
const requests = axios.create({
    //基础路径
    baseURL:'/api',
    //请求超时时间5s
    timeout:5000,
});
//请求拦截器
requests.interceptors.request.use((config)=>{
    //将游客id添加到请求头中
    if(store.state.detail.uuid_token){
        config.headers.userTempId  = store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    
    //进度条开始动
    nProgress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条停止
    nProgress.done();
    return res.data;
},(error)=>{
    return Promise.reject(new Error('false')); 
})



//进行向外暴露
export default requests