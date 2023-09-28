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
    })
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
    })
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
    })
}