import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabBar } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './index.less'
import Info from '../../components/Info'
import Help from '../../components/Help'
import User from '../../components/User'

const components = [Info, Help, User]

type PageStateProps = {
  Store: {
    currentTab: number,
    changeTab: Function,
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
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 stringez
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  handleClick = (value) => {
    const { Store } = this.props;
    Store.changeTab(value);
  }
  render() {
    const { Store: { currentTab } } = this.props;
    const CurPage = components[currentTab];
    const tabList = [
      { title: '信息专区', iconPrefixClass: 'iconfont', iconType: 'xinxizhuanqu' },
      { title: '求助建议', iconPrefixClass: 'iconfont', iconType: 'qiuzhujianyi' },
      { title: '个人中心', iconPrefixClass: 'iconfont', iconType: 'gerenzhongxin' }
    ]
    return (
      <View className='index'>
        <View>
          <CurPage/>
        </View>
        <AtTabBar
          fixed
          tabList={tabList}
          color='#A6A7AF'
          selectedColor='#0094FF'
          fontSize={12}
          onClick={this.handleClick.bind(this)}
          current={currentTab}
        />
      </View>
    )
  }
}

export default Index as ComponentType
