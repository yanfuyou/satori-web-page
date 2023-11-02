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
        getUser: (state) => state.baseInfo,
        needSignin: (state) => state.baseInfo.id === null || state.baseInfo.id === undefined || state.baseInfo.id === -1
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
        }
    }
});

export default {}