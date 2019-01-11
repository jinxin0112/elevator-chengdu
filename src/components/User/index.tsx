import Taro, { Component } from 'react'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import './index.less'

export default class User extends Component {
  handleClick = () => {

  }

  render() {
    return (
      <div>
        <div className="user user-bg">
          {/* <img className="user-bg" src={require('../../assets/img/user-bg.png')} /> */}
          <div className="user-avatar z-index-1" >
            <AtAvatar className="user-avatar-img" size="large" circle image={require('../../assets/img/avatar.jpg')} />
            <div className="user-title">成都电梯</div>
          </div>
        </div>
        <div className="user-list-wrapper">
          <AtList>
            <AtListItem thumb={require('../../assets/img/start.png')} title='积分' arrow='right' onClick={this.handleClick} />
            <AtListItem thumb={require('../../assets/img/right.png')} title='我的保险' arrow='right' onClick={this.handleClick} />
          </AtList>

          <AtList>
            <AtListItem thumb={require('../../assets/img/quost.png')} title='我的求助' arrow='right' onClick={this.handleClick} />
            <AtListItem thumb={require('../../assets/img/info.png')} title='我的投诉' arrow='right' onClick={this.handleClick} />
            <AtListItem thumb={require('../../assets/img/edit.png')} title='我的建议' arrow='right' onClick={this.handleClick} />
          </AtList>
        </div>

      </div>

    )
  }
}
