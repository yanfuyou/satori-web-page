import request from '@/utils/request'

export function addPet(data) {
    return request({
        url: 'api/pet/add',
        method: 'post',
        data
    })
}

export function editPet(data) {
    return request({
        url: 'api/pet/edit',
        method: 'post',
        data
    })
}

export function status(id, state) {
    return request({
        url: 'api/pet/status/' + id + '/' + state,
        method: 'put'
    })
}

export function delPet(id) {
    return request({
        url: 'api/pet/del/' + id,
        method: 'delete'
    })
}

export function listPet(ownerId) {
    return request({
        url: '/api/pet/list/' + ownerId,
        method: 'get'
    })
}

export function randomPet(num) {
    return request({
        url: '/api/pet/random/' + num,
        method: 'get'
    })
}