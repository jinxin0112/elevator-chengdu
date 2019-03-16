import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView ,Button} from "@tarojs/components";
import { observer, inject } from "@tarojs/mobx";
import { AtButton, AtInput, AtGrid,  AtModal,
    AtModalHeader,
    AtModalAction, } from "taro-ui";
import "./index.less";

@inject("Store")
@observer
class Help extends Component {
  state = {
    value: "",
    isFaildOpened: false
  };
  handleCall = () => {
    Taro.makePhoneCall({
        phoneNumber: '96933'
    })
  }
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
  handleChange = (value)=> {
      this.setState({
        value
      })
  }
  handlSearch = () => {
      const {Store} = this.props;
    if(this.state.value){
        Store.smElevator({
            num: this.state.value
        },()=>{
            this.setState({
                isFaildOpened: true
            })
        });
    }
  };
  render() {
      const {isFaildOpened} = this.state;
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
                <View className="succTip">
                  暂无相关电梯信息
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
      </ScrollView>
    );
  }
}

export default Help;
