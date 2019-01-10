import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import './index.less'

type PageStateProps = {
  Store: {
    currentTab: number,
  }
}

interface Index {
  props: PageStateProps;
}

@inject('Store')
@observer
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() { }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  handleClick = () => {

  }
  render() {
    const { Store: { currentTab } } = this.props
    return (
      <View className='index'>
        <Text>{currentTab}</Text>
        <AtTabBar
          tabList={[
            { title: '待办事项'},
            { title: '拍照' },
            { title: '通讯录' }
          ]}
          onClick={this.handleClick.bind(this)}
          current={currentTab}
        />
      </View>
    )
  }
}

export default Index as ComponentType
