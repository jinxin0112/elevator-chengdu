import request from '../utils/request';

// 获取问卷调查数据
export async function fetchCurrent(){
    return request({
        method: 'get',
        url: '/survey/current'
    })
}

// 获取关注列表
export async function fetchFollowList(){
    return request({
        method: 'get',
        url: '/elevator'
    })
}
// 添加关注
export async function putFollowList(num){
    return request({
        method: 'put',
        url: `/elevator?num=${num}`
    })
}
// 移除关注
export async function removeFollowList(num){
    return request({
        method: 'DELETE',
        url: `/elevator?num=${num}`
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
    const {name, mobile, address} = params;
    return request({
        method: 'post',
        url: `/survey/user?name=${name}&mobile=${mobile}&address=${address}`
    })    
}

// 扫码
export async function smElevator(params){
    return request({
        method: 'post',
        url: `/elevator?num=${params.num}`
    })     
}

// 微信ticket
export async function fetchTicket(){
    return request({
        method: 'get',
        url: '/wx/ticket'
    })
}