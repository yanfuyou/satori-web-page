import { defineStore } from "pinia";

export const useUserStore = defineStore('user',{
    state: ()=> {
       return {
           id:0
       }
    },
    getters: {
        getUser: (state) => state.id
    },
    actions: {
        // setUser(){
        //     console.log('click me!')
        //     this.user.name='cat——y'
        //     console.log(this.user.name)
        // },
        setUserId(userId){
            this.state.id=userId;
        }
    }
});

export default {}