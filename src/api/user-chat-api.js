import request from '../utils/request.js'

/**
 * 创建群聊
 * @param {object} data 
 * @returns 
 */

export function createGroup(data) {
    return request({
        url: '/api/user/group/create',
        method: 'POST',
        data
    })
}

/**
 * 获取用户群组
 * @param {userId:number} params 
 * @returns 
 */
export function getGroupList(params){
    return request({
        url: '/api/user/group/get/list',
        method: 'GET',
        params
    })
}