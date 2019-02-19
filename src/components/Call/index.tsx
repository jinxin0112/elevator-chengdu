import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import './index.less'

export default class Call extends Component {
  handleClick=(_, index)=>{
    switch (index) {
        case 3:
            window.location.href = 'http://www.scsei.org.cn/'
            break;  
        case 4:
            window.location.href = 'http://stjy.everythingnewell.com/web/Query.aspx?from=singlemessage'
            break;
        case 5:
            window.location.href = 'http://zc.sctzsbhy.com/register/front/query/index.htm?from=singlemessage'
            break;    
        default:
            break;
    }
  }
  handleCall = () => {
    Taro.makePhoneCall({
        phoneNumber: '96933'
    })
  }
  render() {
    return (
      <ScrollView 
        scrollY
        className="call-page"
      >
        <View className="call-card call-onekey">
            <View className="title">一键求助</View>
            <View className="des">如被困电梯，请按轿厢內“紧急呼叫”报警按钮或拨打本市<span style={{color:'#F2A355'}}>96933</span>电梯应急救援电话。电梯没有窒息危险，强行扒门极其危险，请耐心等待专业维保人员救援。</View>
            <AtButton onClick={this.handleCall}><span className="call-phone" src={require('../../assets/img/phone.png')}>拨打96933</span></AtButton>
        </View>
      </ScrollView>
    )
  }
}
