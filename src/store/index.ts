import { observable, action } from 'mobx'


const Store = observable({
  currentTab: 0,
  changeTab(index){
    this.currentTab = index;
  }
}, {
  changeTab: action
})
export default Store