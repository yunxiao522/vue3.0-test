import axios from 'axios';
import qs from 'qs';
import store from '@/store/index'
import {message} from "ant-design-vue";
import {handleData} from "@/plug/axios/extend";
// import router from "@/router";

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        //补全完整的请求url地址
        config.url = 'http://127.0.0.1:8000/admin' + config.url
        //对请求参数进行产处理
        config.data = handleData(config.data)
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        if(config.auth){
            config.headers.Authorization = ''
        }
        //如果发送的请求类型是post,则对请求参数进行qs字符串话
        if(config.method === 'post'){
            config.data = qs.stringify(config.data)
        }
        return config;
    },
    error => {
        console.log(error)
        return 'error';
    })

// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log(response)
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    //服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    message.error('登录过期，请重新登录',1000)
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面

                    break;
                // 404请求不存在
                case 404:
                    message.error('网络请求不存在')
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    message.error(error.response.data.message, 1500);
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params,auth,tips) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            auth:auth
        })
            .then(res => {
                if (tips) {
                    if (res.data.success) {
                        message.success(res.data.msg)
                    } else {
                        message.error(res.data.msg)
                    }
                }
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, auth, tips) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,{auth:auth})
            .then(res => {
                if (tips) {
                    if (res.data.success) {
                        message.success(res.data.msg)
                    } else {
                        message.error(res.data.msg)
                    }
                }
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
