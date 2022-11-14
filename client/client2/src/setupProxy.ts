import {createProxyMiddleware} from 'http-proxy-middleware';

module.exports = function (app: any) {
    app.use(
        createProxyMiddleware("/server", {
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );
};