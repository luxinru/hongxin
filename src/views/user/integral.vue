<template>
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data.list" :key="key">
     
      <div class="left">
        <div class="title">{{ item.reason }}</div>
        <!-- <div class="time">{{ item.time }}</div> -->
      </div>
      <div class="textBox">
          <div class="money">{{ item.type == 1 ? "+" : "-" }}{{ item.money }}</div>
          <div class="time">{{ item.time }}</div>
      </div>
      
      <!-- <div class="box">
        <div class="content">

          <div class="desc">
            <span>{{ item.reason }}</span>
          </div>
          <div class="time">{{ item.time }}</div>
        </div>
        <div class="money">
          <span :style="item.type == 2 ? 'color:#E85420' : 'color:#6AAF99'"
            >{{ item.type == 1 ? "+" : "-" }}{{ item.money }}</span
          >
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
import moment from "moment";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format("YYYY.MM.DD hh:mm");
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/user/getIntegral").then((res) => {
        this.data = res.data;
        console.log(this.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
  @import './styles/mingxiItem';
// .boxFun{
//   background-color: #F5F5F5;
//   min-height: 100%;
//   font-weight: bold;
//   padding: 26px 13px;
//   .container{
//     background-color: #FFFFFF;
//     border-radius: 13px;
//     padding: 19px 17px 23px;
//     margin-top: 13px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     &:first-child{
//       margin-top: 0;
//     }
//     .title{
//       font-size: 15px;
//       font-family: PingFang SC;
//       color: #000000;
//     }
//     .time{
//       font-size: 15px;
//       font-family: DIN Alternate;
//       color: #A7A2A6;
//       margin-top: 10px;
//     }
//     .money{
//       flex-shrink: 0;
//       font-size: 21px;
//       font-family: DIN Alternate;
//     }
//   }
// }
</style>
