//登录与注册的模块
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api/index'

const state = {
    //验证码
    code:'',
    //token字符串
    token:localStorage.getItem('TOKEN'),
    //用户信息
    userInfo:{},
    //用户昵称
    nickNmae:''
}
const mutations ={
    //验证码的处理模块
    GETCODE(state,code){
        state.code = code
    },
    //将token存起来
    USERLOGIN(state,token){
        state.token = token
    },
    //将用户信息存起来
    GETUSERIFON(state,userInfo){
        state.userInfo = userInfo
    },
    //清除用户信息的函数
    CLEAR(state){
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    //发送请求获取验证码,验证码会返回
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //进行用户的注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //进行登录业务
    async userLogin({commit},data){

        let result = await reqUserLogin(data)
        if(result.code == 200){
            //将token存起来
            commit("USERLOGIN",result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({commit,state}){
        let result = await reqUserInfo()
        console.log(result);
        if(result.code == 200){
            commit("GETUSERIFON",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(('faile')))
        }
    },

    //退出登录
    async userLogout({commit}){
        //发请求退出登录
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }

}
const getters = {
    userInfo(state){
        return state.userInfo
    },
}

export default{
    state,
    mutations,
    actions,
    getters,
}
