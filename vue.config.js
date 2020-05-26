const path = require('path')
//去console插件
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    configureWebpack: config => {
        let plugins = [
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         compress: {
            //             warnings: false,
            //             drop_debugger: true,
            //             drop_console: true,
            //         },
            //     },
            //     sourceMap: false,
            //     parallel: true,
            // }),
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' +
                    ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
        if (process.env.NODE_ENV !== 'development') {
            config.plugins = [...config.plugins, ...plugins]
        }
    },
    chainWebpack: config => {
        // config.module.rule('js').use('babel-loader')
    },
    productionSourceMap: true,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8082,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => { }
    },
}