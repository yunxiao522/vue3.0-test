import {post,get} from '@/plug/axios/index'

export function login(data){
    return post('/login',data,false,true)
}
