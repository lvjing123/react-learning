const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function (app) {
    app.use(createProxyMiddleware('/api', {
        target: 'https://test.com/', //接口地址
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/api": "/api"
            }
        })
    )
}