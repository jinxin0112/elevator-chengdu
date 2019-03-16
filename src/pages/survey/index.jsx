// 问卷

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

class Icon extends Component {
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        className="survey-icon"
      >
        <circle className="outerCircle" cx="10" cy="10" r="6" />
        {this.props.checked ? (
          <circle className="innerCircle" cx="10" cy="10" r="4" />
        ) : null}
      </svg>
    );
  }
}

@inject("Store")
class Radio extends Component {
  state = {
    answer: null
  };
  handleSelect = answer => {
    const { index, onSelectAnswer, Store } = this.props;
    this.setState({
      answer
    });
    Store.handleSelectAnswer(index, answer);
  };
  render() {
    const { options } = this.props;
    const { answer } = this.state;
    return (
      <View className="radio-container">
        {options.map((item, index) => {
          const { label, value } = item;
          return (
            <View
              className="radio-item"
              onClick={() => {
                this.handleSelect(index);
              }}
            >
              <View className="radio-icon">
                <Icon checked={index === answer} />
              </View>
              <View className="radio-label">{label}</View>
            </View>
          );
        })}
      </View>
    );
  }
}

@inject("Store")
@observer
class Survey extends Component {
  state = {
    isOpened: false,
    isResOpened: false,
    isFaildOpened: false,
    address: "",
    mobile: "",
    name: ""
  };
  handleFormChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };
  componentDidMount() {
    const { Store } = this.props;
    Store.getCurrentSurvey();
  }
  toggleModal = flag => {
    this.setState({
      isOpened: flag
    });
  };
  handleSubmit = () => {
    console.log({ name, mobile, address });
  };
  handleBlur = () => {
    console.log("handleBlur");
    setTimeout(() => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      console.log("scrollHeight", scrollHeight);
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
  };
  render() {
    const { Store } = this.props;
    const { currentSurvey, canSubmit } = Store;
    const {
      isOpened,
      address,
      mobile,
      name,
      isResOpened,
      isFaildOpened
    } = this.state;
    return (
      <ScrollView className="info-scroll-view" scrollY>
        {currentSurvey.length === 0 ? (
          <View>加载中...</View>
        ) : (
          <View>
            <Image
              src={require("../../assets/img/surBg.png")}
              className="survey-bg"
            />
            {toJS(currentSurvey).map((item, index) => {
              const { question, id } = item;
              const realItem = toJS(item);
              const choicesLabel = ["A", "B", "C", "D"];
              const choices = Object.keys(realItem)
                .reduce((pre, cur) => {
                  if (/choice/.test(cur)) {
                    pre = [
                      ...pre,
                      {
                        label: realItem[cur],
                        value: id
                      }
                    ];
                  }
                  return pre;
                }, [])
                .map((item, index) => ({
                  ...item,
                  label: `${choicesLabel[index]}、${item.label}`
                }));
              return (
                <View className="survey-card" key={index}>
                  {index === 0 ? (
                    <View className="title">
                      正确回答问题提交后,可以参加本微信公众号组织的抽奖活动哦,快来试试吧。
                    </View>
                  ) : null}
                  <View className="survey-question">{`${index +
                    1}、${question}`}</View>
                  <View className="survey-answer">
                    <Radio options={choices} index={id} />
                  </View>
                </View>
              );
            })}
            <AtButton
              type="primary"
              className="survey-submit"
              disabled={!canSubmit}
              onClick={() => {
                Store.submit(
                  () => {
                    this.toggleModal(true);
                  },
                  () => {
                    this.setState({
                      isFaildOpened: true
                    });
                  }
                );
              }}
            >
              提交
            </AtButton>

            <AtModal isOpened={isOpened}>
              <AtModalHeader>
                恭喜您获得抽奖资格，请完善个人信息，等待主办方跟您联系。
              </AtModalHeader>
              <AtModalContent>
                <AtInput
                  name="name"
                  title="姓名："
                  type="text"
                  placeholder="请输入姓名"
                  value={name}
                  onChange={this.handleFormChange.bind(null, "name")}
                  onBlur={this.handleBlur}
                />
                <AtInput
                  name="mobile"
                  title="手机号："
                  type="number"
                  placeholder="请输入手机号"
                  value={mobile}
                  onChange={this.handleFormChange.bind(null, "mobile")}
                  onBlur={this.handleBlur}
                />
                <AtInput
                  name="address"
                  title="地址："
                  type="text"
                  placeholder="请输入地址"
                  value={address}
                  onChange={this.handleFormChange.bind(null, "address")}
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
                    const { name, mobile, address } = this.state;
                    if (name && mobile && address) {
                      Store.submitUser({ name, mobile, address }, () => {
                        this.toggleModal(false);
                        this.setState({
                          isResOpened: true
                        });
                      });
                    }
                  }}
                >
                  提交
                </Button>{" "}
              </AtModalAction>
            </AtModal>
            <AtModal isOpened={isResOpened} onClose={() => {}}>
              <AtModalHeader className="res">
                <Image src={require("../../assets/img/succ.png")} />
                <View className="succTip">提交成功</View>
                <View className="subSuccTip">感谢您的持续关注</View>
                <span
                  className="closebtn"
                  onClick={() => {
                    this.setState({
                      isResOpened: false
                    });
                  }}
                >
                  x
                </span>
              </AtModalHeader>
            </AtModal>
            <AtModal isOpened={isFaildOpened}>
              <AtModalHeader className="res faild">
                <View className="succTip">
                  很遗憾，您的答题不理想，请再接再厉!
                </View>
              </AtModalHeader>
              <AtModalAction>
                <Button
                  onClick={() => {
                    this.setState({
                      isFaildOpened: false
                    });
                  }}
                >
                  关闭
                </Button>
              </AtModalAction>
            </AtModal>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default Survey;
