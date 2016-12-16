/*
首先用express建立一个port为3000的server,并使用webpack去执行client的代码
,这里使用handleRender当request进来时(直接访问页面或重新整理)就会去执行fetchCount
进行处理
* */

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
    //模仿实际非同步api处理情形
    fetchCounter(apiResult => {
        //读取api提供的资料(这里我们的api是用setTimeout进行模拟非同步的情况
        // ),如网址参数有值则取值,如无值则使用api提供的随机值,都没有则为0
        const params = qs.parse(req.query);
        //parseInt 10进制转换
        const counter = parseInt(params.counter, 10) || apiResult || 0;
        //将initialState转成immutablejs和符合state设计的格式
        const initialState = fromJS({
            count: counter,
        })
    });
    //建立一个redux store
    const store = configureStore(initialState);
    //使用renderToString讲component转成string
    const html = renderToString(
        <Provider store={store}>
            <CounterContainer />
        </Provider>
    );
    //从建立的redux store中取得initialState
    const finalState = store.getState();
    //将HTML和initaiState传到client-side
    res.send(renderFullPage(html, finalState));
}

//HTML Markup,同时也把preloadedState转成字符串(stringify)传到client-side
//又称为dehydration(脱水)
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
//使用middleware与webpack去进行hot module reloading
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {noInfo: true,publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
//每次server接到request都会呼叫handleRender
app.use(handleRender);

//监听server状况
app.listen(port, (error) => {
    if(error){
        console.error(error);
    }else{
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    }
});
