<template>
  <div class="wenjuanBox">
    <div class="header">
      <van-icon name="arrow-left" @click="$router.back()" />
      <div class="logo_box">
        <img src="@/assets/hongxin/1-5 答题_slices/logo.png" alt="" />
        <div>
          <span>答题请勿退出</span>
          <span>弘信为您加油</span>
        </div>
      </div>
    </div>

    <div class="clock">
      <van-count-down
        :time="data.m"
        @finish="stop"
        ref="countDown"
      >
        <template v-slot="timeData">
          <span class="mm">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <div class="main">
      <!-- <div style="text-align: center;" ><img class="logo" src="./image/wenjuan.png" alt=""></div>         -->
      <!-- <div class="tips">
            欢迎参加学霸奖金挑战游戏，挑战成功将会立即获得现金红包，一秒到账支付宝账户，百万奖金等你来！
        </div> -->
      <div class="rule_box">
        <div class="rule_title">{{ data.title }}</div>
        <div class="rule_info_box">
          <div
            ref="anwser"
            class="anwser_item"
            v-for="(v, k) in data.values"
            :key="k"
            @click="apply(v.id, $event)"
          >
            {{ v.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { CountDown } from "vant";
import { Dialog } from "vant";

Vue.use(CountDown);

export default {
  name: "index",
  data() {
    return {
      data: {
        askid: 0,
        title: "",
        values: [],
        m: 60 * 1000,
        type: 1,
        images: "",
      },
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.$refs.countDown.pause();
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/getask").then((res) => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "去认证",
          }).then(() => {
            this.$router.push("/auth");
          });
        } else if (res.data.alipay == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "绑定支付宝",
          })
            .then(() => {
              this.$router.push("/alipay");
            })
            .catch(() => {});
        } else {
          this.data.askid = res.data.id;
          this.data.title = res.data.title;
          this.data.values = res.data.values;
          this.data.images = res.data.image;
          this.$refs.countDown.reset();
          Dialog.alert({
            message: (res.data.status = res.info),
          });
        }
      });
    },
    apply(key, event) {
      this.setStyle();
      event.target.style.background = "#5538A6";
      event.target.style.color = "#fff";
      this.stop(key);
    },
    setStyle() {
      this.$refs.anwser.forEach((v) => {
        v.style.background = "#F4FAFD";
        v.style.color = "#212C67";
      });
    },
    stop(key = 0) {
      let id = this.data.askid;
      this.$refs.countDown.pause();
      Fetch("/index/getask", { id: id, key: key }).then((res) => {
        this.data.askid = res.data.id;
        this.data.title = res.data.title;
        this.data.values = res.data.values;
        this.data.images = res.data.image;
        this.$refs.countDown.reset();
        Dialog.alert({
          message: (res.data.status = res.info),
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;

  .logo_box {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }

    div {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      font-weight: 500;
      color: #FFFFFF;
    }
  }
}

.clock {
  width: 80px;
  height: 80px;
  background: url('~@/assets/hongxin/1-5 答题_slices/闹钟.png') no-repeat;
  background-size: cover;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px 0;
  margin: 48px auto 0;

  .mm {
    font-size: 29px;
    font-weight: 500;
    color: #5538A6;
  }
}
.wenjuanBox {
  background: url("~@/assets/hongxin/1-5 答题_slices/bg1.png") no-repeat;
  background-size: 100% 642px;
  background-color: RGBA(90, 71, 160, 1);
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.main {
  padding: 16px 25px 0;
  margin-top: 115px;
  .mt3 {
    // width: 313px;
    height: 53px;
    padding: 0 6px;
    // margin-left: 31px;
    // background-image: url('./image/sf/time_bg.png');
    background-size: 100% 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #ffffff;
    // height: 33px;
    span {
      color: #ffffff;
      font-size: 16px;
    }
  }
  .rule_box {
    // position: absolute;
    // background-image: url('./image/hgy/q_bg.png');
    // background-size: 100% 100%;
    // width: 335px;
    // height: 465px;
    // left: 20px;
    // right: 20px;
    // top: 300px;
    // background-color: #FFFFFF;
    border-radius: 7px;
    padding: 25px 14px;
    margin-top: 20px;
    .rule_title {
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4c4d52;
      line-height: 24px;
    }
    .rule_info_box {
      // padding: 0 20px;
      // margin-top: 30px;
      margin-top: 35px;
      .anwser_item {
        width: 291px;
        height: 44px;
        background: #e5ebff;
        border-radius: 4px;
        // width: 277px;
        line-height: 44px;
        // background-color: #F4FAFD;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #5538A6;
        text-align: center;
        margin-bottom: 12px;
      }
      // .select{
      //     background: #6CD75E;
      //     color: #FFFFFF;
      // }
    }
  }
}
</style>