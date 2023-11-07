import { defineStore } from "pinia";
import { setToken, removeToken } from '../utils/auth.js';
export const useUserStore = defineStore('userStore', {
    state: () => {
        return {
            baseInfo: {
                id: null,
                name: null,
                nikeName: null,
                email: null,
                avatar: null,
                createTime: null
            }
        }
    },
    getters: {
        getUser: (state) => {
            if(state.baseInfo.id === null || state.baseInfo.id === undefined || state.baseInfo.id === -1){
                const userInfoStr = sessionStorage.getItem("userInfo")
                if(userInfoStr){
                    state.baseInfo = JSON.parse(userInfoStr)
                }
            }
            return state.baseInfo
        },
        needSignin: (state) => {
            if(state.baseInfo.id === null || state.baseInfo.id === undefined || state.baseInfo.id === -1){
                const userInfoStr = sessionStorage.getItem("userInfo")
                if(userInfoStr){
                    state.baseInfo = JSON.parse(userInfoStr)
                }
            }
            return state.baseInfo.id === null || state.baseInfo.id === undefined || state.baseInfo.id === -1
        }
    },
    actions: {
        saveUser(userInfo, tokenVal) {
            setToken(tokenVal);
            const { id, userName, nikeName, avatar, userEmail, createTime } = userInfo;
            this.baseInfo.id = id;
            this.baseInfo.name = userName;
            this.baseInfo.nikeName = nikeName;
            this.baseInfo.avatar = avatar;
            this.baseInfo.email = userEmail;
            this.baseInfo.createTime = createTime;
            sessionStorage.setItem('userInfo', JSON.stringify(this.baseInfo));
        },
        signOut() {
            this.baseInfo = {
                id: -1,
                name: '',
                nikeName: '',
                email: '',
                avatar: '',
                createTime: ''
            }
            removeToken();
            sessionStorage.removeItem('userInfo');
        }
    }
});

export default {}