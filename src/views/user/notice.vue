<template>
  <div class="notice-page">
    <div class="nav-bar">
      <div :class="0 === selectIndex ? 'selected' : ''" @click="changeBar(0)">
        全部消息
      </div>
      <div :class="1 === selectIndex ? 'selected' : ''" @click="changeBar(1)">
        <p></p>
        收益提醒
      </div>
      <div :class="2 === selectIndex ? 'selected' : ''" @click="changeBar(2)">
        财务通知
      </div>
      <div :class="3 === selectIndex ? 'selected' : ''" @click="changeBar(3)">
        系统消息
      </div>
    </div>
    <div
      class="notice-box"
      v-for="(v, k) in data.list"
      :key="k"
      @click="$router.push('/notice/' + v.id)"
    >
      <div class="time">{{ v.time | dateFormat }}</div>

      <span class="title">{{ v.title }}</span>
      <span class="msg">{{ v.content }}</span>
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
import moment from "moment";

export default {
  name: "login",
  data() {
    return {
      data: [],
      selectIndex: 0,
    };
  },
  created() {
    this.$parent.footer(false);
  },
  filters: {
    dateFormat(time) {
      return moment(time).format("YYYY-MM-DD");
    },
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/user/notice").then((r) => {
        this.data = r.data;
      });

      console.log(this.data);
    },
    onClickLeft() {
      this.$router.back();
    },
    back() {
      this.$router.back();
    },
    changeBar(index) {
      console.log(1);
      this.selectIndex = index;
    },
  },
};
</script>

<style lang="less" scoped>
.notice-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  background: RGBA(242, 242, 242, 1);
  .nav-bar {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    font-size: 15px;
    background: #fff;
    font-size: 16px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #818c99;

    div {
      flex: 1 0;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .selected {
      font-size: 16px;
      font-weight: 500;
      color: #000000;
      border-bottom: 3px solid rgba(108, 77, 217, 1);
    }
  }

  .notice-box {
    position: relative;
    width: 351px;
    height: 78px;
    background: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 12px auto;
    padding: 16px;

    .title {
      font-size: 16px;
      font-weight: 500;
      color: #333333;
    }

    .msg {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      margin-top: 6px;
    }

    .time {
      position: absolute;
      top: 16px;
      right: 33px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>