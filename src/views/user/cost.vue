<template>
<div class="page_root">
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data.list" :key="key">
      <div class="left">
        <div class="title">{{ getTitle(item.channel) }}</div>
      </div>
      <div class="textBox">
        <div class="money">
          {{ item.type == 1 ? "+" : "-" }}{{ item.money }}
        </div>
        <div class="time">{{ item.time }}</div>
        <div v-if="item.errMsg" class="msg">
          <div>{{ item.errMsg }}</div>
        </div>
        <span class="status" :style="status(item.status)">{{
          item.status == "0" ? "待审核" : item.status == "1" ? "已审核" : "失败"
        }}</span>
      </div>
    </div>
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
      return moment(time).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/user/cash_record").then((res) => {
        this.data = res.data;
      });
    },
    status(v) {
      if (v == "0") {
        return "color: #0093F1;";
      }

      if (v == "1") {
        return "color: #5ECE79;";
      }

      if (v == "2") {
        return "color: #FE5656;";
      }
    },
    getTitle(channel) {
      return "提现至银行卡";
      // switch (channel) {
      //     case 0:
      //         return '提现至微信';
      //     case 1:
      //         return '提现至支付宝';
      //     case 2:
      //         return '提现至银行卡';
      //     case 3:
      //         return '微信转银行卡';
      // }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./styles/cost";
</style>