import {fileURLToPath, URL} from 'node:url'

import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode}) => {
  console.log(mode)
    return defineConfig({
        plugins: [
            vue(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
      define:{
        _APP_URL: loadEnv(mode,process.cwd()).VUE_APP_BASE_API
      }
    })
}
