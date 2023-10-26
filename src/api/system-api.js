import request from "@/utils/request";

export function getCaptcha(){
    return request({
        url:'/api/system/captcha',
        method:'GET'
    })
}


export function getParamValueByName(paramName){
    return request({
        url:'/api/system/param/value/get',
        method:'GET',
        params:{
            paramName
        }
    })
}

export function requestThirdUrlGet(url,params){
    return request({
        url,
        method: 'GET',
        params
    })
}

export function requestThirdUrlPost(url,body){
    return request({
        url,
        method: 'POST',
        body
    })
}

export function fileUpload(data){
    return request({
        url:'/api/system/file/upload',
        method:'POST',
        data
    })
}