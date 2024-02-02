import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import {createHtmlPlugin} from 'vite-plugin-html';
import * as path from 'path'
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

export default defineConfig(({command, mode}) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd(), 'APP')
    // 导出配置对象之前可以进行一些处理
    return {
        transpileDependencies: true,
        productionSourceMap: false,
        envPrefix: "APP_",
        //项目根目录
        root: process.cwd(),
        //项目部署的基础路径
        base: env.APP_NODE_ENV === "production" ? "/dist" : "/",
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
            dedupe: [],
            //解决程序包中package.json配置中的exports 字段
            conditions: [],
            //解析package.json中字段的优先级
            mainFields: ["module", "jsnext:main", "jsnext"],
            //导入时想要省略的扩展名列表
            extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
            //使Vite通过原始文件路径而不是真正的文件路径确定文件身份
            preserveSymlinks: false,
        },
        css: {
            //配置 CSS modules 的行为。选项将被传递给 postcss-modules。
            modules: {},
            // PostCSS 配置（格式同 postcss.config.js）
            // postcss-load-config 的插件配置
            postcss: {},
            //指定传递给 CSS 预处理器的选项
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/scss/themefy.scss" as *;`,
                },
            },
            //开发过程中是否启sourcemap
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
            target: "modules",
            //否自动注入 module preload 的 polyfill
            modulePreload: {
                polyfill: true
            },
            //输出路径
            outDir: "dist",
            //生成静态资源的存放路径
            assetsDir: "assets",
            //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
            assetsInlineLimit: 4096,
            //启用/禁用 CSS 代码拆分
            cssCodeSplit: true,
            //不同的浏览器target设置CSS的压缩
            cssTarget: "",
            //构建后是否生成 source map 文件
            //boolean | 'inline' | 'hidden'
            sourcemap: false,
            //自定义底层的 Rollup 打包配置
            rollupOptions: {
                //要打包的文件路径
                input: "src/main.js",
                //文件输出位置
                output: {
                    //打包生产文件路径
                    file: "dist/index.js",
                    //打包输出格式
                    // "amd", "cjs", "system", "es", "iife" or "umd
                    format: "cjs",
                    //包的全部变量名称
                    name: "bundleName",
                    //声明全局变量
                    globals: {
                        jquery: "$",
                    },
                },
                //插件
                plugins: [],
                //不需打包的文件
                external: ["lodash"],
            },
            //@rollup/plugin-commonjs 插件的选项
            commonjsOptions: {},
            //@rollup/plugin-dynamic-import-vars 选项
            dynamicImportVarsOptions: {},
            //构建的库
            lib: {
                entry: path.resolve(__dirname, "lib/main.js"),
                //暴露的全局变量
                name: "mylib",
                //'es' | 'cjs' | 'umd' | 'iife'
                formats: "es",
                //输出的包文件名
                fileName: "my-lib",
            },
            //当设置为 true，构建后将会生成 manifest.json 文件
            manifest: false,
            //当设置为 true，构建后将会生成SSR的manifest.json 文件
            ssrManifest: false,
            //生成面向 SSR 的构建
            ssr: "undefined",
            //设置为 false 可以禁用最小化混淆，
            //boolean | 'terser' | 'esbuild'
            minify: "terser",
            //传递给 Terser 的更多 minify 选项。
            terserOptions: {},
            //设置为 false 来禁用将构建后的文件写入磁盘
            write: true,
            //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
            emptyOutDir: true,
            //启用/禁用 gzip 压缩大小报告
            reportCompressedSize: true,
            //触发警告的 chunk 大小（以 kbs 为单位）
            chunkSizeWarningLimit: 500,
            //设置为 {} 则会启用 rollup 的监听器
            watch: null,
        },
    };
});
