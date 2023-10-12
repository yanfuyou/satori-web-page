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
export function getGroupList(params) {
    return request({
        url: '/api/user/group/get/list',
        method: 'GET',
        params
    })
}


/**
 * 获取群组用户
 * @param {groupId:number} params 
 * @returns
 */
export function getGroupUsers(params) {
    return request({
        url: '/api/user/group/users/list',
        method: 'GET',
        params
    })
}

/**
 * 查询历史消息
 * @param {receiverId:number,receiverType:number} params 
 * @returns 
 */
export function getMessageHistory(params) {

    return request({
        url: '/api/message/history/get',
        method: 'GET',
        params
    })

}

/**
 * 
 * @param {userId:number} params 
 * @returns 
 */

export function getFriendList(params){
    return request({
        url: '/api/user/friend/list',
        method: 'GET',
        params
    })
}