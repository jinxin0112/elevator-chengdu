import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView, Button } from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import {
  AtButton,
  AtInput,
  AtGrid,
  AtModal,
  AtModalHeader,
  AtModalAction
} from "taro-ui";
import { fetchTicket } from "../../services";
import "./index.less";
import sha1 from "sha1";

function randomString(len = 32) {
  let $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  let maxPos = $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

@inject("Store")
@observer
class Help extends Component {
  state = {
    value: "",
    isFaildOpened: false
  };
  componentDidMount() {
    this.weixinConfig();
    this.timeout = setInterval(this.weixinConfig, 7200 * 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }
  weixinConfig = async () => {
    let appId = "wxb5ffc223ee417f24";
    let nonceStr = randomString(16); //随机串
    let res = await fetchTicket(); //jsapi_ticket
    let ticket = res.data.ticket;
    let timestamp = Date.parse(new Date()) / 1000;
    let string1 = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${
      location.href.split("#")[0]
    }`;
    let signature = sha1(string1);
    const config = {
      debug: false,
      appId: appId, // 必填，公众号的唯一标识
      timestamp: timestamp, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ["scanQRCode", "translateVoice"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    }
    // alert(location.href.split("#")[0]);
    wx.config(config);
  };

  handleCall = () => {
    Taro.makePhoneCall({
      phoneNumber: "96933"
    });
  };
  handleBlur = () => {
    setTimeout(() => {
      const scrollHeight =
        document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
  };
  handleClick = (_, index) => {
    switch (index) {
      case 3:
        window.location.href = "http://www.scsei.org.cn/";
        break;
      case 4:
        window.location.href =
          "http://stjy.everythingnewell.com/web/Query.aspx?from=singlemessage";
        break;
      case 5:
        window.location.href =
          "http://zc.sctzsbhy.com/register/front/query/index.htm?from=singlemessage";
        break;
      default:
        break;
    }
  };
  handleChange = value => {
    this.setState({
      value
    });
  };
  handlSearch = () => {
    const { Store } = this.props;
    if (this.state.value) {
      Store.smElevator(
        {
          num: this.state.value
        },
        () => {
          this.setState({
            isFaildOpened: true
          });
        }
      );
    } else {
      wx.ready(() => {
        wx.scanQRCode({
          needResult: 1,
          desc: "scanQRCode desc",
          success: res => {
            if(res.resultStr){
              Store.smElevator(
                {
                  num: res.resultStr
                },
                () => {
                  this.setState({
                    isFaildOpened: true
                  });
                }
              );
            }
          }
        });
      });
    }
  };
  render() {
    const { isFaildOpened } = this.state;
    return (
      <ScrollView scrollY className="help-page">
        <View className="help-card help-onekey">
          <View className="title">一键求助</View>
          <View className="des">
            电梯被困、撞击、坠落、挤压、火灾、电击、由于机械损伤、磨损和锈蚀引起的材料失效、人为因素等问题
          </View>
          <AtButton onClick={this.handleCall}>一键求助</AtButton>
        </View>
        <View className="help-card help-find">
          <View className="title">电梯查询</View>
          <AtInput
            name="value"
            type="number"
            placeholder="请输入电梯编码…"
            value={this.state.value}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          <AtButton onClick={this.handlSearch}>一键查询</AtButton>
        </View>
        <View className="help-card help-grids">
          <AtGrid
            onClick={this.handleClick}
            hasBorder={false}
            columnNum={3}
            mode="rect"
            data={[
              {
                image: require("../../assets/img/grid5.png"),
                value: "意见反馈"
              },
              {
                image: require("../../assets/img/grid6.png"),
                value: "电梯报修"
              },
              {
                image: require("../../assets/img/grid7.png"),
                value: "投诉评价"
              },
              {
                image: require("../../assets/img/grid8.png"),
                value: "省特检"
              },
              {
                image: require("../../assets/img/grid9.png"),
                value: "市特检"
              },
              {
                image: require("../../assets/img/grid10.png"),
                value: "省特协"
              }
            ]}
          />
        </View>
        <AtModal isOpened={isFaildOpened}>
          <AtModalHeader className="res faild">
            <View className="succTip">暂无相关电梯信息</View>
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
      </ScrollView>
    );
  }
}

export default Help;
