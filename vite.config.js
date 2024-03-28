import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {createHtmlPlugin} from 'vite-plugin-html';
import * as path from 'path'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), 'APP')
    let strings = process.cwd().split(/\w:./)[1].replace(/^/,'/').replace(/$/,'/');
    // 导出配置对象之前可以进行一些处理
    return {
        transpileDependencies: true,
        productionSourceMap: env.APP_NODE_ENV !== "production",
        envPrefix: "APP_",
        //项目根目录
        root: process.cwd(),
        //项目部署的基础路径
        base: command === 'build'? strings : env.APP_NODE_ENV === "production" ? "./" : env.APP_BASE_URL,
        //环境配置 'development'|'production'
        mode: env.APP_NODE_ENV,
        //全局常量替换 Record<string, string>
        define: {},
        //静态资源服务的文件夹
        publicDir: 'public',
        //vite开发服务器配置
        server: {
            host: 'localhost',
            port: env.APP_PORT,
            open: false,
            strictPort: false,
            https: false,
            // 反向代理
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                    selfHandleResponse: true,
                    configure: (proxy, _options) => {
                        proxy.on('proxyRes', (proxyRes, req, res) => {
                            res.removeHeader("Access-Control-Allow-Origin")
                            res.removeHeader("access-control-allow-origin")
                            res.setHeader("Access-Control-Allow-Origin", "*")
                            res.setHeader("content-type", "application/json")
                            proxyRes.pipe(res)
                        });
                    },
                }
            }
        },
        plugins: [
            vue(),
            // html入口配置
            createHtmlPlugin({
                minify: true,
                /**
                 * 在此处写完条目后，您无需在 'index.html '中添加脚本标签，原始标签需要删除
                 * @default src/main.ts
                 */
                entry: '../src/main.ts',
                /**
                 * 如果要将 'index.html '存储在指定的文件夹中，则可以对其进行修改，否则不需要配置
                 * @default index.html
                 */
                template: 'public/index.vite.html',
                inject: {
                    data: {
                        title: '我的项目',
                    },
                },

            }),
            // SVG配置
            createSvgIconsPlugin({
                // 指定要缓存的文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
                symbolId: 'icon-[dir]-[name]',
                // svgoOptions: {full: true, plugins: [{name: "removeAttrs", params: {attrs: "fill"}}]}
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~@': path.resolve(__dirname, './src'),
                // 其他的 alias 配置...
            },
            //解析package.json中字段的优先级
            mainFields: ["module", "jsnext:main", "jsnext"],
            //导入时想要省略的扩展名列表
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
            //使Vite通过原始文件路径而不是真正的文件路径确定文件身份
            preserveSymlinks: false,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/scss/themefy.scss" as *;`,
                },
            },
            devSourcemap: false,
        },
        json: {
            //是否支持从 .json 文件中进行按名导入
            namedExports: true,
            //若设置为 true，导入的 JSON 会被转换为 export default JSON.parse("...") 会比转译成对象字面量性能更好，
            stringify: false,
        },
        //构建
        build: {
            //浏览器兼容性  "esnext"|"modules"
            // target: "modules",
            target: ["chrome89", "edge89", "firefox89", "safari15"],
            //否自动注入 module preload 的 polyfill
            modulePreload: {
                polyfill: true
            },
            //输出路径
            outDir: "docs",
            //生成静态资源的存放路径
            assetsDir: "assets",
            // //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
            assetsInlineLimit: 4096,
            //启用/禁用 CSS 代码拆分
            cssCodeSplit: true,
            //构建后是否生成 source map 文件
            //boolean | 'inline' | 'hidden'
            sourcemap: false,
            //自定义底层的 Rollup 打包配置
            rollupOptions: {
                //文件输出位置
                output:  {
                    //打包输出格式
                    // "amd", "cjs", "system", "es", "iife" or "umd
                    format: 'es',
                    // 分包
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].split('/')[0].toString();
                        }
                    }
                },
                //插件
                plugins: [],
                //不需打包的文件
                external: ["lodash"],
            },
            // //@rollup/plugin-commonjs 插件的选项
            // commonjsOptions: {},
            // //@rollup/plugin-dynamic-import-vars 选项
            // dynamicImportVarsOptions: {},
            // //构建的库
            // lib: {
            //     entry: path.resolve(__dirname, "lib/main.js"),
            //     //暴露的全局变量
            //     name: "mylib",
            //     //'es' | 'cjs' | 'umd' | 'iife'
            //     formats: ['es'],
            //     //输出的包文件名
            //     fileName: "my-lib",
            // },
            // //当设置为 true，构建后将会生成 manifest.json 文件
            // manifest: false,
            // //当设置为 true，构建后将会生成SSR的manifest.json 文件
            // ssrManifest: false,
            // //生成面向 SSR 的构建
            // ssr: "undefined",
            // //设置为 false 可以禁用最小化混淆，
            // //boolean | 'terser' | 'esbuild'
            // minify: "terser",
            // //传递给 Terser 的更多 minify 选项。
            // terserOptions: {},
            // //设置为 false 来禁用将构建后的文件写入磁盘
            // write: true,
            // //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
            // emptyOutDir: true,
            // //启用/禁用 gzip 压缩大小报告
            // reportCompressedSize: true,
            // //触发警告的 chunk 大小（以 kbs 为单位）
            // chunkSizeWarningLimit: 500,
            // //设置为 {} 则会启用 rollup 的监听器
            // watch: null,
        },
    };
});
