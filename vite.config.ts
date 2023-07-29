import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  console.log('command:', command)
  console.log('mode:', mode)
  const env = loadEnv(mode, process.cwd())
  console.log('env:', env)

  const configs = {
    // vite 配置
    define: {
      __APP_ENV__: env.APP_ENV
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // global imports to register
        imports: ['vue', 'vue-router'],
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass'
          }),
          // Auto import icon components
          // 自动导入图标组件
          IconsResolver()
        ]
      }),
      Components({
        dts: true,
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep']
          }),
          ElementPlusResolver({
            //importStyle: mode === 'development' ? false : 'sass'
            importStyle: 'sass'
          })
        ]
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()]
      }),
      Icons({
        autoInstall: true
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'local-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {},
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "src/styles/var.scss" as *;`
        }
      }
    }
  }

  if (mode == 'development' || mode == 'test') {
    configs.server = {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
  }
  return configs
})
