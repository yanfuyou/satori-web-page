import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state: ()=> {
       return {
           user:{
               "name":'123',
               "sex":0
           }
       }
    },
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        setUser(){
            console.log('click me!')
            this.user.name='cat——y'
            console.log(this.user.name)
        }
    }
});