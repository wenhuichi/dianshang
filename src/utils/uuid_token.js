//引入uuid
import { v4 as uuidv4 } from 'uuid'

//生成一个随机字符串，不能改变且持久保存
export const getUUID = () => {
    //先从本地存储看是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        //如果没有则进行生成且存在本地
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
} 