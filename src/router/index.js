import {createRouter , createWebHistory} from 'vue-router'
import Layout from '@/layout/index.vue'


const routes = [
    {
        path: '/',
        component: Layout,
        children:[
            {
                path:'home',
                component: () => import('@/views/home.vue')
            },
            {
                path: 'search',
                component: ()=> import('@/views/search.vue')
            },
            {
                path: 'write',
                component: ()=> import('@/views/detail.vue')
            },
            {
                path: 'detail',
                component: ()=> import('@/views/detail.vue')
            },
            {
                path: 'chat',
                component: ()=> import('@/views/chat-box.vue')
            },
            {
                path: 'sky-hole',
                component: () => import('@/views/sky-hole.vue')
            },
            {
                path: 'test',
                component: () =>import('@/views/test-page.vue')
            }
        ]
    },
    {
        path:'/logo',
        redirect: '/home'
    },
    {
        path:'',
        redirect: '/home'
    },
    {
        path:'/user',
        componet: Layout,
        children: [
            {
                path:'login',
                component: ()=> import('@/views/login.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;