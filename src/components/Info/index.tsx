import Taro, { Component } from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { Swiper, SwiperItem, View, Image, ScrollView } from '@tarojs/components'
import { AtGrid,AtIcon } from "taro-ui"
import './index.less'

interface IFItem {
  data: Array<object>,
  toggleStar: any
}

class Item extends Component<IFItem,any> {
  toggleStar = ()=> {
    const {Store,data} = this.props;
    const {index} = data;
    Store.toggleStar(index)
  }
  render() {
    const { data } = this.props;
    const {title, date, star, img} = data
    return (
    <View className='at-row news-item'>
      <View className='at-col at-col-4'>
        <Image src={img} />
      </View>
      <View className='at-col at-col-8'>
        <View className='news-title'>{title}</View>
        <View className='news-date-star'>
        <View className='news-date'>{date}</View>
        <View className='news-star' onClick={this.toggleStar}>
        <AtIcon value={`heart${star==88?'':'-2'}`} size='16' color='#F00'></AtIcon>
          <span>{star}</span>
        </View>
        </View>
      </View>
    </View>
    )
  }
}
@inject('Store')
@observer
export default class Info extends Component {
  componentDidMount() {
    setTimeout(() => {
      document.querySelector('.swiper-container').classList.add('swiper')
    }, 1200)
  }
  handleScrollToLower = ()=> {
      alert('到底了');
  }
  render() {
    const {Store} = this.props;
    const {news} = Store;
    return (
      <ScrollView
        className='info-scroll-view'
        scrollY
        onScrollToLower={this.handleScrollToLower}
      >
        <Swiper
          className='swiper-info'
          indicatorColor='#808891'
          indicatorActiveColor='#fff'
          circular
          indicatorDots
          autoplay
        >
          <SwiperItem>
            <Image className='image-0' src={require('../../assets/img/swiper0.png')} />
          </SwiperItem>
          <SwiperItem>
            <Image className='image-1' src={require('../../assets/img/swiper0.png')} />
          </SwiperItem>
          <SwiperItem>
            <Image className='image-2' src={require('../../assets/img/swiper0.png')} />
          </SwiperItem>
        </Swiper>
        <View className="grid-box">
          <AtGrid hasBorder={false} columnNum={4} data={
            [
              {
                image: require('../../assets/img/grid1.png'),
                value: '法律法规'
              },
              {
                image: require('../../assets/img/grid2.png'),
                value: '最新资讯'
              },
              {
                image: require('../../assets/img/grid3.png'),
                value: '最新政策'
              },
              {
                image: require('../../assets/img/grid4.png'),
                value: '企业名单'
              }
            ]
          } />
        </View>

        <View className='panel'>
          <View className='panel__title'>新闻资讯</View>
          <View className='panel__content'>
              {
                news.map((item,index)=><Item key={index} data={item} Store={Store}/>)
              }
          </View>
        </View>
        <View className="bottom-line">
          我也是有底线的哟～
        </View>
      </ScrollView>
    )
  }
}
