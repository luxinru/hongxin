<template>
  <div class="boxFun">
    <div class="container" v-for="(item, key) in data.list" :key="key">
      <div class="left">
        <div class="title">{{ item.reason }}</div>
        <div class="time">{{ item.time }}</div>
      </div>
      <div class="money">
          {{ item.type == 1 ? "+" : "-" }}{{ item.money }}
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
@import "./styles/mingxiItem";
</style>
