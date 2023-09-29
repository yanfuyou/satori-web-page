import {fileURLToPath, URL} from 'node:url'

import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default ({ mode, command}) => {
    const env = loadEnv(mode, process.cwd(), '')
    return defineConfig({
        plugins: [
            vue()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
      define:{
        // _APP_URL: env.VITE_APP_BASE_PATH
      },
      dev:{
        devtool: 'source-map'
      }
    })
}
