import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtButton, AtInput, AtGrid } from 'taro-ui'
import './index.less'

export default class Info extends Component {
  render() {
    return (
      <ScrollView 
        scrollY
        className="help-page"
      >
        <View className="help-card help-onekey">
            <View className="title">一键求助</View>
            <View className="des">电梯被困、撞击、坠落、挤压、火灾、电击、由于机械损伤、磨损和锈蚀引起的材料失效、人为因素等问题</View>
            <AtButton>一键求助</AtButton>
        </View>
        <View className="help-card help-find">
            <View className="title">电梯查询</View>
            <AtInput 
                name='value'
                type='number'
                placeholder='请输入电梯编码…'
            />
            <AtButton>一键查询</AtButton>            
        </View>
        <View className="help-card help-grids">
            <AtGrid hasBorder={false} columnNum={3} mode="rect" data={
                [
                {
                    image: require('../../assets/img/grid5.png'),
                    value: '意见反馈'
                },
                {
                    image: require('../../assets/img/grid6.png'),
                    value: '电梯报修'
                },
                {
                    image: require('../../assets/img/grid7.png'),
                    value: '投诉评价'
                },
                {
                    image: require('../../assets/img/grid8.png'),
                    value: '省特检'
                },
                {
                    image: require('../../assets/img/grid9.png'),
                    value: '市特检'
                },
                {
                    image: require('../../assets/img/grid10.png'),
                    value: '省特协'
                }
                ]
            } />        
        </View>
      </ScrollView>
    )
  }
}
