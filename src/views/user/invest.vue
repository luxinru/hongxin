<template>
  <div class="page_root">
    <div class="boxFun">
      <div class="boxFun_container" v-for="(item, key) in data.list" :key="key">
        <div class="left">
          <div class="title">{{ item.type }}</div>
        </div>
        <div class="textBox">
          <div class="money">
            {{ item.type == 1 ? "+" : "-" }}{{ item.money }}
          </div>
          <div class="time">{{ item.time }}</div>
          <div v-if="item.errMsg" class="msg">
            <div>{{ item.errMsg }}</div>
          </div>
          <!-- <div class="msg"><div>错误</div></div> -->
          <span class="status" :style="status(item.status)">{{
            item.status == "0"
              ? "待审核"
              : item.status == "1"
              ? "已审核"
              : "失败"
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
      Fetch("/user/recharge_record").then((res) => {
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
  },
};
</script>

<style lang="less" scoped>
@import "./styles/cost";
</style>
