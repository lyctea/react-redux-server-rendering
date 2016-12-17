import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import configureStore from '../common/store/configureStore';
import CounterContainer from '../common/containers/CounterContainer';

import { fetchCounter } from '../common/api/counter';

const app = new Express();
const port = 3000;

function handleRender(req, res) {
    // 模仿实际非同步 api 处理情形
    fetchCounter(apiResult => {
        // 读取 api 提供的资料（这边我们 api 是用 setTimeout 进行模仿非同步状况），若网址参数有值择取值，若无则使用 api 提供的随机值，若都没有则取 0
        const params = qs.parse(req.query);
        const counter = parseInt(params.counter, 10) || apiResult || 0;
        // 将 initialState 转成 immutable 和符合 state 设计的格式
        const initialState = fromJS({
            counterReducers: {
                count: counter,
            }
        });
        // 建立一个 redux store
        const store = configureStore(initialState);
        // 使用 renderToString 将 component 转为 string
        const html = renderToString(
            <Provider store={store}>
                <CounterContainer />
            </Provider>
        );
        // 从建立的 redux store 中取得 initialState
        const finalState = store.getState();
        // 将 HTML 和 initialState 传到 client-side
        res.send(renderFullPage(html, finalState));
    })
}

// HTML Markup，同时也把 preloadedState 转成字串（stringify）传到 client-side，又称为 dehydration（脱水）
function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

// 使用 middleware 于 webpack 去进行 hot module reloading 
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
// 每次 server 接到 request 都会呼叫 handleRender
app.use(handleRender);

// 监听 server 状况
app.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    }
});