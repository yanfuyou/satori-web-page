import request from '@/utils/request'

export function saveTodo(data) {
    console.log(data)
    return request({
        url: '/api/todo/save',
        method: 'post',
        data
    })
}

export function changeTodoState(params) {
    return request({
        url: '/api/todo/change_state',
        method: 'get',
        params
    })
}

export function getTodoList(params) {
    return request({
        url: '/api/todo/list',
        method: 'get',
        params
    })
}