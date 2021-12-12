<template>
  <div class="page_root">
    <section class="header">
      <van-icon name="arrow-left" color="#fff" @click="$router.go(-1)" />
      每日签到
    </section>

    <div class="logo" @click="checkin2">签到</div>

    <div class="content">
      <div class="calendar">
        <span class="label">已连续签到</span>
        <span class="value">{{ qiandaoNum }}天</span>
      </div>
    </div>

    <section class="count_bar">
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 0 }">+20</div>
        <div class="label">第1天</div>
      </div>
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 1 }">+20</div>
        <div class="label">第2天</div>
      </div>
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 2 }">+20</div>
        <div class="label">第3天</div>
      </div>
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 3 }">+2</div>
        <div class="label">第4天</div>
      </div>
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 4 }">+2</div>
        <div class="label">第5天</div>
      </div>
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 5 }">+2</div>
        <div class="label">第6天</div>
      </div>
      <div class="item">
        <div class="value" :class="{ active: qiandaoNum > 6 }">+2</div>
        <div class="label">第7天</div>
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";
import { Dialog } from "vant";
export default {
  name: "index",
  components: {},
  data() {
    return {
      footer_type: "n1",
      data: {
        app: {},
        notice: "",
      },
      down_show: true,
      link_width: 0,
      banner: [],
      notice: "",
      links: [],
      type: "n1",
      ad: {},
      ad_show: false,
      examinationData: [
        {
          id: "1",
          name: "one",
          question: "",
        },
      ],
      qiandaoNum: 0,
      qiandaoallNum: 0,
      countNum: 0,
      goods: [],
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.start();
    var that = this;
    var bslua = navigator.userAgent;
    if (bslua.indexOf("bsl") != -1) {
      that.down_show = false;
    }
    this.get_num();
  },
  methods: {
    get_num() {
      Fetch("/user/info").then((res) => {
        Fetch("/user/qiandaonum", {
          username: this.data.username,
          password: this.data.password,
        }).then((res) => {
          (this.qiandaoNum = res.data.qdnum),
            (this.qiandaoallNum = res.data.allqdnum),
            (this.countNum = res.data.countnum);
        });
        // console.log(this.data)
      });
    },
    getIputValue(index) {
      // console.log(index + 1 + "题" + this.radio);
      this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
      console.log(this.allRadio);
      // console.log(this.radio)
    },
    toBox(title = "", contain = "") {
      var newsBox = document.getElementsByClassName("modal")[0];
      newsBox.style.display = "block";

      var bodyBox = document.getElementsByClassName("body-box")[0];
      bodyBox.innerHTML = contain;
      var newsTitle = document.getElementsByClassName("news-title")[0];
      newsTitle.innerText = title;
    },
    checkin2() {
      Fetch("/user/sign").then((res) => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "去认证",
          })
            .then(() => {
              this.$router.push("/auth");
            })
            .catch(() => {});
        } else {
          this.sign_money = res.data.reward;
          this.new_sign_ok = true;
          this.get_num();
          this.$notify({
            background: "#07c160",
            message: "签到成功 +" + res.data.reward + "元，8积分",
          });
        }
      });
    },
    checkin3() {
      Fetch("/user/sign3").then((res) => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "去认证",
          })
            .then(() => {
              this.$router.push("/auth");
            })
            .catch(() => {});
        } else {
          this.sign_money = res.data.reward;
          this.new_sign_ok = true;
          this.get_num();
          this.$notify({
            background: "#07c160",
            message: "连续签到3天送现金28元.",
          });
        }
      });
    },
    checkin7() {
      Fetch("/user/sign7").then((res) => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: true,
            confirmButtonText: "去认证",
          })
            .then(() => {
              this.$router.push("/auth");
            })
            .catch(() => {});
        } else {
          this.sign_money = res.data.reward;
          this.new_sign_ok = true;
          this.get_num();
          this.$notify({
            background: "#07c160",
            message: "连续签到7天送现金68元.",
          });
        }
      });
    },
    closeBox() {
      var newsBox = document.getElementsByClassName("modal")[0];
      newsBox.style.display = "none";
    },

    appdown_close() {
      this.data.app.is_disable = "N";
    },
    goAd() {
      // this.close();
      // this.$router.push(this.ad.url).catch(err => {err});
      this.close();
      this.$router.push(this.ad.url);
    },
    close() {
      this.ad_show = false;
    },
    start() {
      setTimeout(() => {
        var element = document.getElementById("app");
        element.scrollIntoView();
      }, 0);
      this.type = this.$parent.getFooterType();
      Fetch("/index/int").then((res) => {
        this.ad = res.data.ad;
        this.data = res.data;

        if (res.data.ad.activity_status == 1) {
          this.ad_show = true;
        } else {
          this.ad_show = false;
        }
      });

      /* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

      Fetch("/index/banner", {
        type: "banner",
      }).then((res) => {
        this.banner = res.data;
      });
      Fetch("/user/qiandaogoodslist").then((res) => {
        this.goods = res.data.list;
      });
    },
    onChange(index) {
      let els = this.$refs.dian.querySelectorAll("div");
      for (let i = 0; i < els.length; i++) {
        els[i].className = "";
      }
      els[index].className = "selected";
    },
    schedule(schedule) {
      return {
        width: schedule + "%",
      };
    },
    schedule_left(schedule) {
      if (schedule > 80) {
        return {
          left: schedule - 30 + "%",
          color: "#fff",
        };
      } else {
        return {
          left: schedule.slice(0, 5) + "%",
        };
      }
    },
    exchangegoods(id = 1) {
      Fetch("/user/qiandao", {
        type: id,
      }).then((res) => {
        if (res.code == 1) {
          Dialog.alert({
            title: "提示",
            message: res.info,
            showCancelButton: false,
            confirmButtonText: "确定",
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page_root {
  padding: 0;
  background: url("~@/assets/hongxin/2-5 签到_slices/bg.png") no-repeat;
  background-size: 100% 349px;

  .header {
    position: relative;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;

    i {
      position: absolute;
      left: 10px;
    }
  }

  .logo {
    width: 172px;
    height: 172px;
    margin-top: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #6c4dd9;
    background: url("~@/assets/hongxin/2-5 签到_slices/签到按钮.png") no-repeat;
    background-size: cover;
  }

  .content {
    width: 100%;
    padding: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 20px 20px 0 0;

    .calendar {
      width: 241px;
      height: 145px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: url("~@/assets/hongxin/2-5 签到_slices/日历.png") no-repeat;
      background-size: cover;
      padding-top: 36px;

      .label {
        font-size: 10px;
        font-weight: 400;
        color: #333333;
        line-height: 12px;
      }

      .value {
        font-size: 29px;
        font-weight: 500;
        color: #6c4dd9;
        line-height: 34px;
        margin-top: 6px;
      }
    }
  }
  .count_bar {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 40px;
    padding: 0 16px;

    .item {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .value {
        width: 30px;
        height: 30px;
        background: #999999;
        border-radius: 50%;
        font-size: 10px;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .active {
        background: #6C4DD9;
      }

      .label {
        font-size: 10px;
        font-weight: 400;
        color: #999999;
        margin-top: 12px;
      }
    }
  }
}
</style>
