import { defineStore } from "pinia";

export const useSystemStore = defineStore('systemStore', {
    state: () => {
        return {
            SystemConfig: {
                beautyWordsUrl:'https://international.v1.hitokoto.cn',
                beautyWordsType:['a','b','c','d','e','f','h','i','k']
            }
        }
    },
    getters: {
        getBeautyWordsUrl: (state) => state.SystemConfig.beautyWordsUrl,
        getBeautyWordsType: (state) => state.SystemConfig.beautyWordsType,
    },
    actions: {
        updateBeautyWordsUrl(url){
            this.SystemConfig.beautyWordsUrl = url;
        }
    }
});

export default {}