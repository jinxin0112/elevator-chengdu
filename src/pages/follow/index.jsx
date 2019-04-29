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
  AtInput,
  AtActivityIndicator
} from "taro-ui";
import "./index.less";

class FollowItem extends Component {
  removeFollow = num => {
    const { Store } = this.props;
    Store.removeFollowList(num);
  };
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
              <Button
                onClick={() => {
                  this.removeFollow(deviceId);
                }}
              >
                取消关注
              </Button>
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
    isOpened: false,
    num: ""
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
  handleSubmit = () => {
    const { Store } = this.props;
    this.toggleModal(false);
    Store.putFollowList(this.state.num);
  };
  handleBlur = () => {
    setTimeout(() => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
  };
  handleChange = num => {
    this.setState({
      num
    });
  };
  render() {
    const { Store } = this.props;
    const { followList, loading } = Store;
    const { isOpened, num } = this.state;
    return (
      <ScrollView className="follow-page" scrollY>
        <View>
          {followList.map(item => (
            <FollowItem {...item} Store={Store} />
          ))}
          <AtButton
            type="primary"
            className={`follow-submit ${followList.length === 0 &&
              "follow-submit-nodata"}`}
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
                type="number"
                placeholder="请输入电梯编号"
                value={num}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
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
              <Button onClick={this.handleSubmit}>提交</Button>{" "}
            </AtModalAction>
          </AtModal>
        </View>
      </ScrollView>
    );
  }
}

export default Follow;
