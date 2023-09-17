import request from "@/utils/request";

export function test(){
    return request({
        url:'/test',
        methods:'post',
        data:{"a":'123'}
    })
}