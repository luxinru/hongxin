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
      Fetch("/user/funds").then((res) => {
        this.data = res.data;
        console.log(this.data);
      });
    },
  },
};
</script>

<style lang="less" scoped>
  @import './styles/mingxiItem';

// .desc {
// //   word-wrap: break-word;
// 	font-size: 15px;
// 	font-family: PingFang SC;
// 	font-weight: 500;
// 	color: #000000;
//   // padding-left: 18px;
//   span{
//     line-height: 20px;
//   }
// }

// .time {
// 	margin-top: 11.3px;
//   font-size: 13px;
//   font-family: PingFang SC;
//   font-weight: 500;
//   color: #CCCCCC;
// }

// .money {
//   padding-right: 10px;
//   span{
// 	  font-size: 17px;
// 	font-family: PingFang SC;
// 	font-weight: bold;
// 	// color: #E85420 !important;
//   }

// }

// .content {
//   width: 70%;
//   font-size: 12px;
//   line-height: 17px;
//   color: #252525;
//   font-family: Helvetica Neue, Helvetica, sans-serif;
//   flex: 1;
//   padding: 12px 0;
// //   height: 78px;
//   img{
// 	  width: 35.68px;
// 	  float: left;
// 	  margin-right: 16px;
//   }
// }

// .box {
//   border-bottom: 0.2px solid #F0F0F0 !important;
//   align-items: center;
//   justify-content: space-between;
//   position: relative;
//   display: flex;
//   min-height: 50px;
//   background-color: #fff;
//   font-size: 13px;
//   padding: 10px;
// }
// .boxFun{
//   padding: 10px;
//   background: #FFFFFF;
//   width: 94%;
//   margin: 10px auto;
//   box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
//   border-radius: 7px;
// }
// .container {
//   display: block;
//   font-size: 13px;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
//   // padding:0 15px;
// }

// .fund_wrap .table tr {
//   width: 100%;
// }

// .fund_wrap .table .header {
//   width: 100%;
//   height: 34px;
//   background-image: -webkit-gradient(
//     linear,
//     left top,
//     right top,
//     from(#666666),
//     to(#262627)
//   );
//   background-image: -o-linear-gradient(left, #666666, #262627);
//   background-image: linear-gradient(to right, #666666, #262627);
//   border: 0;
// }

// .fund_wrap .table tr .first {
//   border-radius: 10px 0 0 10px;
// }

// .fund_wrap .table tr .last {
//   border-radius: 0 10px 10px 0;
//   border: 0;
// }

// .fund_wrap .table tr th {
//   font-size: 14px;
//   color: #e8c27d;
//   width: 33.333%;
//   border-right: 1px solid #666666;
// }

// .fund_wrap .table .tab.tab_2 {
//   border-left: 1px solid #7b7b7b;
//   border-right: 1px solid #7b7b7b;
// }

// .fund_wrap .table {
//   table-layout: fixed;
//   width: 92%;
//   margin: 15px auto;
// }

// .fund_wrap .table tbody tr {
//   margin: 0 auto;
//   border-bottom: 1px solid #ededed;
// }

// /*.fund_wrap .table tbody tr td:first-child {*/
// /*    text-align: left;*/
// /*}*/

// /*.fund_wrap .table tbody tr td:last-child {*/
// /*    text-align: left;*/
// /*}*/

// .fund_wrap .table tbody tr td {
//   padding: 0 5px;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   width: 33.333%;
//   text-align: center;
//   font-size: 14px;
//   line-height: 26px;
//   padding-bottom: 10px;
//   padding-top: 24px;
//   color: #333333;
// }

// .fund_wrap .table tbody tr .td_3 {
//   color: #dfba7b;
// }
</style>
