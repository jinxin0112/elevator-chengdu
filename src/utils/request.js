import Taro from '@tarojs/taro';
const config = require('../../config');
const { noConsole, env } = config(Object.assign);

const events = new Taro.Events();

events.on('error', (arg) => {
  Taro.redirectTo({
    url: 'pages/error/errorPage'
  })
})

export default (options = { method: 'GET', data: {} }) => {

  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  return Taro.request({
    url: env.baseUrl + options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
    dataType: 'json',
  })
  .then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
      }
      // if (data.status !== 'ok') {
      //   Taro.showToast({
      //     title: `${res.data.error.message}~` || res.data.error.code,
      //     icon: 'none',
      //     mask: true,
      //   });
      // }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  })
  .catch((err) => {
    events.trigger('error', err)
  })
}
