import request from "@/utils/request";

export function getCaptcha(){
    return request({
        url:'/api/system/captcha',
        method:'GET'
    })
}