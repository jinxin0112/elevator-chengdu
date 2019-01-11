import { observable, action } from 'mobx'


const Store = observable({
  currentTab: 0,
  news:[
    {
      index: 0,
      img: '',
      title: 'E电梯获3000万元A轮融资瞄准1000亿电梯更新改造...',
      date: '2019-01-01',
      star: 88
    },
    {
      index: 1,
      img: '',
      title: 'E电梯获3000万元A轮融资瞄准1000亿电梯更新改造...',
      date: '2019-01-01',
      star: 88
    }    
  ],
  changeTab(index){
    this.currentTab = index;
  }
  toggleStar(i) {
    this.news = this.news.map((item)=>{
      const {star,index} = item;
      return {
        ...item,
        star: star===88&&index===i ? 89: 88
      }
    })
  }
}, {
  changeTab: action
})
export default Store