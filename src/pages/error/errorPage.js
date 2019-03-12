import taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from 'taro-ui'
import './errorPage.less';

export default class ErrorPage extends Component {

  redirect = () => {
    taro.redirectTo({ url: 'pages/survey/index' });
  }

  render() {
    return (
      <View className="error-page">
        <View className='parent' >
          <div className='child'>
            <p>
              您的网络不太顺畅
            </p>
            <p>
              请检查网络后重试
             </p>
            <div>
              <AtButton className="button-error" type='primary' size='small' onClick={this.redirect}>重新加载</AtButton>
            </div>
          </div>
        </View>
      </View>
    )
  }
}
