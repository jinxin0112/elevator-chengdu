import request from '../utils/request';

// 获取问卷调查数据
export async function fetchCurrent(){
    return request({
        method: 'get',
        url: '/survey/current'
    })
}

// 提交
export async function submitCurrent(params){
    return request({
        method: 'post',
        url: '/survey/answer',
        data: params
    })    
}

// 提交用户信息
export async function submitUser(params){
    return request({
        method: 'post',
        url: '/survey/user',
        data: params
    })    
}