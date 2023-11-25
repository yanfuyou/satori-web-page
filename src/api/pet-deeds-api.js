import request from '@/utils/request'


export function save(data) {
    return request({
        url: '/api/pet/deeds/save',
        method: 'post',
        data
    })
}

export function pageList(data) {
    return request({
        url: '/api/pet/deeds/page',
        method: 'post',
        data
    })
}