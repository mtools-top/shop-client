import axios from "axios";

axios.interceptors.request.use(config => {
    console.log('^^请求拦截');
    console.log('拦截目标:' + config.url);
    console.log(config);
    // 如果登陆,就带上tokrn
    if (sessionStorage.getItem('user')) {
        config.headers.authorization = JSON.parse(sessionStorage.getItem('user')).token;
    };
    console.log('**请求结束**');
    console.log('');
    return config
})

axios.interceptors.response.use(res => {
    console.log('oo响应拦截oo');
    console.log('响应来自:' + res.config.url);
    console.log(res);
    console.log('xx拦截结束xx');
    console.log('');
    if(res.data.code!=200){
        if(sessionStorage.getItem('user')){
            sessionStorage.removeItem('user')
        }
    }
    return res
});


const BASE_UR = '/api';
// const BASE_UR = '';

/**
 * 获取轮播图信息(首页)
 * @getBanner
 */
export const getBanner = () => {
    return axios({
        method: 'get',
        url: BASE_UR + '/api/getbanner'
    })
}
/**
 * 获取商品信息(首页)
 * @getGoods
 */
export const getGoods = () => {
    return axios({
        method: 'get',
        url: BASE_UR + '/api/getindexgoods'
    })
}
/**
 * 获取分类树形结构
 * @getCate
 * get
 * fid分类编号，必填项
 */
export const getCate = () => {
    return axios({
        method: 'get',
        url: BASE_UR + '/api/getcatetree'
    })
}
/**
 * 获取分类商品
 * @getCateGoods
 */
export const getCateGoods = (params) => {
    return axios({
        method: 'get',
        url: BASE_UR + '/api/getgoods',
        params
    })
}
/**
 * 会员注册
 * @register
 * phone手机号nickname昵称password密码
 */
export const register = (data) => {
    return axios({
        method: 'post',
        url: BASE_UR + '/api/register',
        data
    })
}
/**
 * 会员登陆
 * @login
 * phone手机号password密码
 */
export const login = (data) => {
    return axios({
        method: 'post',
        url: BASE_UR + '/api/login',
        data
    })
}
/**
 * 购物车添加
 * @cartAdd
 * uid用户编号，必填项
 * goodsid商品编号，必填项
 * num数量，必填项
 */
export const cartAdd = (data) => {
    return axios({
        method: 'post',
        url: BASE_UR + '/api/cartadd',
        data
    })
}
/**
 * 购物车删除
 * @cartDel
 * uid用户编号，必填项
 */
export const cartDel = (data) => {
    return axios({
        method: 'post',
        url: BASE_UR + '/api/cartdelete',
        data
    })
}
/**
 * 购物车列表
 * @cartList 
 * uid用户编号，必填项
 */
export const cartList = (params) => {
    return axios({
        method: 'get',
        url: BASE_UR + '/api/cartlist',
        params
    })
}