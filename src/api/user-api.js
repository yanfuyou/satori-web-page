import request from "@/utils/request";

/**
 * 注册
 * @param {object} signModel 
 * @returns 
 */
export function signUp(signModel){
    return request({
        url: '/api/user/sign_up',
        method: 'POST',
        data: signModel
    });
}

/**
 * 登录
 * @param {object} signModel 
 * @returns 
 */
export function signIn(signModel){
    return request({
        url: '/api/user/sign_in',
        method: 'POST',
        data: signModel
    });
}

/**
 * 退出登录
 * @param {number} userId 
 * @returns 
 */
export function signOut(userId){
    return request({
        url: '/api/user/sign_out/' + userId,
        method: 'GET',
    });
}


/**
 * 获取用户信息
 * @param {number} userId 
 * @returns 
 */
export function getUserInfo(userId){
    return request({
        url: '/api/user/get/' + userId,
        method: 'GET'
    });
}

/**
 * 退出群聊
 * @param {object} params 
 * @returns 
 */
export function exitGroup(params){
    return request({
        url:'/api/user/group/member/exit',
        method: 'GET',
        params
    })
}

/**
 * 删除好友
 * @param {object} params 
 * @returns 
 */
export function deletedFriend(params){
    return request({
        url: '/api/user/friend/del',
        method: 'GET',
        params
    })

}