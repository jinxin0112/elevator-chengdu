import { observable, action, toJS } from "mobx";
import { fetchCurrent, submitCurrent, submitUser } from "../services";

const Store = observable(
  {
    currentTab: 0,
    news: [
      {
        index: 0,
        img: require("../assets/img/timg.png"),
        title: "E电梯获3000万元A轮融资瞄准1000亿电梯更新改造...",
        date: "2019-01-06",
        star: 89,
        stared: true
      },
      {
        index: 1,
        img: require("../assets/img/timg1.png"),
        title: "E电梯获3000万元A轮融资瞄准1000亿电梯更新改造...",
        date: "2018-12-01",
        star: 28,
        stared: false
      },
      {
        index: 2,
        img: require("../assets/img/timg2.png"),
        title: "E电梯获3000万元A轮融资瞄准1000亿电梯更新改造...",
        date: "2018-12-21",
        star: 39,
        stared: true
      },
      {
        index: 3,
        img: require("../assets/img/timg.png"),
        title: "E电梯获3000万元A轮融资瞄准1000亿电梯更新改造...",
        date: "2018-10-31",
        star: 72,
        stared: false
      }
    ],
    // 问卷调查 列表
    currentSurvey: [],
    canSubmit: false,
    async getCurrentSurvey() {
      const { data = [] } = (await fetchCurrent()) || {};
      this.currentSurvey = data;
    },
    handleSelectAnswer(index, answer) {
      this.currentSurvey = toJS(this.currentSurvey).map(item => {
        if (item.id === index) {
          item.answer = answer;
        }
        return item;
      });
      const count = toJS(this.currentSurvey).reduce((pre, item) => {
        if (item.answer !== null) {
          pre ++;
        }
        return pre;
      }, 0);
      console.log("count", count);
      this.canSubmit = count === this.currentSurvey.length;
    },
    changeTab(index) {
      this.currentTab = index;
    },
    toggleStar(i) {
      this.news = this.news.map(item => {
        const { star, index, stared } = item;
        if (index === i) {
          return {
            ...item,
            star: star + (stared ? -1 : 1),
            stared: !stared
          };
        } else {
          return item;
        }
      });
    },
    async submit() {
      const data = toJS(this.currentSurvey);
      const res = await submitCurrent(data);
    },
    async submitUser(data, callback) {
      const res = await submitUser(data);
      callback();
    }
  },
  {
    changeTab: action
  }
);
export default Store;
