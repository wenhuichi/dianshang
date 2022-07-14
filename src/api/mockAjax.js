//对于axios进行二次封装
import axios from 'axios'
//引入进度条插件
import nProgress from 'nprogress';
//引入进度条的样式，修改去源码里改bar
import 'nprogress/nprogress.css'
//star代表进度条开始 done 进度条结束

//创建一个axios实例
const requests = axios.create({
    //基础路径
    baseURL:'/mock',
    //请求超时时间5s
    timeout:5000,
});
//请求拦截器
requests.interceptors.request.use((config)=>{
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