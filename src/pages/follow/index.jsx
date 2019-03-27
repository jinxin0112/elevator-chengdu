// 关注

import Taro, { Component } from "@tarojs/taro";
import { observer, inject } from "@tarojs/mobx";
import { toJS } from "mobx";
import {
  Swiper,
  SwiperItem,
  View,
  Image,
  ScrollView,
  Button
} from "@tarojs/components";
import {
  AtGrid,
  AtIcon,
  AtButton,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
  AtInput
} from "taro-ui";
import "./index.less";

class FollowItem extends Component {
  render() {
    const { deviceId, buildingName, fix_Addr } = this.props;
    return (
      <View className="follow-card">
        <View className="follow-card-left">
          <Image src={require("../../assets/img/timg.png")} />
        </View>
        <View className="follow-card-right">
          <View className="follow-card-code">
            <h3>电梯编号：{deviceId}</h3>
            <View className="follow-card-btn">
              <Button>取消关注</Button>
            </View>
          </View>
          <View className="follow-card-add">楼盘名称：{buildingName}</View>
          <View className="follow-card-add">地址：{fix_Addr}</View>
        </View>
      </View>
    );
  }
}

@inject("Store")
@observer
class Follow extends Component {
  state = {
    isOpened: false
  };
  componentDidMount() {
    const { Store } = this.props;
    Store.getFollowList();
  }
  toggleModal = flag => {
    this.setState({
      isOpened: flag
    });
  };
  handleSubmit = () => {};
  handleBlur = () => {
    setTimeout(() => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
  };
  render() {
    const { Store } = this.props;
    const { followList } = Store;
    const { isOpened } = this.state;
    return (
      <ScrollView className="follow-page" scrollY>
        {followList.length === 0 ? (
          <View>加载中...</View>
        ) : (
          <View>
            {followList.map(item => (
              <FollowItem {...item}>hello</FollowItem>
            ))}
            <AtButton
              type="primary"
              className="follow-submit"
              onClick={() => {
                this.toggleModal(true);
              }}
            >
              添加电梯关注
            </AtButton>
            <AtModal isOpened={isOpened}>
              <AtModalHeader>电梯编号：</AtModalHeader>
              <AtModalContent>
                <AtInput
                  name="name"
                  type="text"
                  placeholder="请输入电梯编号"
                  value={name}
                  onBlur={this.handleBlur}
                />
              </AtModalContent>
              <AtModalAction>
                {" "}
                <Button
                  onClick={() => {
                    this.toggleModal(false);
                  }}
                >
                  关闭
                </Button>{" "}
                <Button
                  onClick={() => {
                    this.toggleModal(false);
                  }}
                >
                  提交
                </Button>{" "}
              </AtModalAction>
            </AtModal>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default Follow;
