import Taro, { Component } from "@tarojs/taro";
import { AtList, AtListItem } from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
import {
  Swiper,
  SwiperItem,
  View,
  Image,
  ScrollView,
  Button
} from "@tarojs/components";
import { toJS } from "mobx";
import "./index.less";

const topData = [
  {
    label: "安装地址",
    value: "fix_Addr"
  },
  {
    label: "楼盘",
    value: "buildingName"
  },
  {
    label: "栋",
    value: "building"
  },
  {
    label: "单元",
    value: "unit"
  },
  {
    label: "使用单位",
    value: "wgCompanyName"
  },
  {
    label: "检验人员",
    value: "inspector"
  },
  {
    label: "下次检验日期",
    value: "nextInspectDate"
  }
];
const bottomData = [
  {
    label: "上次运维时间",
    value: "subTime"
  },
  {
    label: "上次运维种类",
    value: "maintainTypecode"
  },
  {
    label: "维保单位",
    value: "maintenUnit"
  },
  {
    label: "维保单位电话",
    value: "telephonemobile"
  },
  {
    label: "运维人员",
    value: "userName"
  },
  {
    label: "运维人员联系电话",
    value: "telephonemobile"
  },
  {
    label: "运维人员移动电话",
    value: "contactPhone"
  }
];
@inject("Store")
@observer
class Service extends Component {
  render() {
    const {
      Store: { serviceData }
    } = this.props;
    const data = toJS(serviceData);
    return (
      <ScrollView>
        <View className="panel">
          <View className="panel__title">电梯信息</View>
          <View className="panel__content">
            <AtList>
              {topData.map((item, index) => {
                const { value, label } = item;
                return (
                  <AtListItem
                    title={label}
                    key={index}
                    extraText={serviceData[value]}
                  />
                );
              })}
            </AtList>
          </View>
        </View>
        <View className="panel bottom-panel">
          <View className="panel__title">维保信息</View>
          <View className="panel__content">
            <AtList>
              {bottomData.map((item, index) => {
                const { value, label } = item;
                return (
                  <AtListItem
                    title={label}
                    key={index}
                    extraText={serviceData[value]}
                  />
                );
              })}
            </AtList>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Service;
