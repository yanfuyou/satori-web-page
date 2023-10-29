import request from '@/utils/request'

export function contentUp(data){
    return request({
        url: '/api/content/save',
        method: 'post',
        data
    })
}

export function contentListPage(data){
    return request({
        url: '/api/content/list/page',
        method: 'post',
        data
    })
}