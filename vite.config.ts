import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import UnoCSS from "unocss/vite"
import { fileURLToPath, URL } from "node:url"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        {
          "@/request": [
            "callApi" // import { callApi } from '@/plugins/request',
          ]
        }
      ],
      dts: true,
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    open: true,
    port: 3000,
    host: true,
    proxy: {
      "/api/draw-lots": {
        // 正式环境
        // target: 'https://www.weixiaotong.com.cn',
        // 测试环境
        target: "http://127.0.0.1:3030/",
        // target: 'http://10.10.10.7:666',
        // target: 'http://172.20.10.7:18080',
        changeOrigin: true
      }
    }
  },
  base: "./",
  build: {
    outDir: "docs"
  }
})
