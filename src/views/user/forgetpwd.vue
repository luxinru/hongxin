<template>
  <div class="login-container">
    <div class="login-box">
      <div class="item">
        <div class="left">手机号码</div>
        <!-- <img src="./images/xg/mobile.png" /> -->
        <input v-model.trim="data.mobile" type="text" placeholder="手机号码" />
      </div>
      <div class="item">
        <div class="left">密码</div>
        <!-- <img src="./images/xg/pwd.png" /> -->
        <input
          v-model.trim="data.passwd"
          type="password"
          placeholder="请输入新密码"
        />
        <!-- <input class="right" v-model.trim="data.npasswd" type="password" placeholder="请再次输入"> -->
      </div>
      <div class="item" style="margin-top: 0">
        <!-- <div class="left">密码</div> -->
        <!-- <img src="./images/xg/pwd.png" /> -->
        <!-- <input class="right" v-model.trim="data.passwd" type="password" placeholder="请输入密码"> -->
        <input
          v-model.trim="data.npasswd"
          type="password"
          placeholder="请再次输入新密码"
        />
      </div>
      <!-- <div class="item">
                <div class="left">确认密码</div>
                <input class="right" v-model.trim="data.npasswd" type="password" placeholder="请再次确认密码">
            </div> -->
      <div class="item">
        <div class="left">手机验证码</div>
        <!-- <img src="./images/xg/code.png" /> -->
        <div class="code" @click="sendcode">
          <input v-model.trim="data.code" type="text" placeholder="验证码" />
          <van-count-down :time="time" @finish="timeCall">
            <template v-slot="timeData">
              <span class="code_text">
                {{ time > 0 ? timeData.seconds : "获取验证码" }}
              </span>
            </template>
          </van-count-down>
        </div>
      </div>
      <Btn @click="handleSubmit">立即修改</Btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Fetch from "../../utils/fetch";
import { CountDown } from "vant";

Vue.use(CountDown);

export default {
  name: "index",
  data() {
    return {
      bg: "",
      data: {},
      base64Image: "",
      time: 0,
      is_send: false,
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/webconfig", { type: "bg" }).then((res) => {
        this.bg = 'url("' + res.data.forget + '")';
      });
    },
    timeCall() {
      this.is_send = false;
      this.time = 0;
    },
    sendcode() {
      if (this.is_send) {
        return;
      }

      if (!this.data.mobile) {
        this.$notify("请输入手机号");
        return;
      }

      this.is_send = true;
      Fetch("/index/code", {
        type: "forgetpwd",
        mobile: this.data.mobile,
      })
        .then(() => {
          this.time += 60 * 1000;
          this.$notify({
            background: "#07c160",
            message: "发送成功",
          });
        })
        .catch(() => {
          this.is_send = false;
        });
    },
    handleSubmit() {
      if (!this.data.mobile) {
        this.$notify("请输入您的手机号");
        return;
      }

      if (!this.data.passwd) {
        this.$notify("请输入新密码");
        return;
      }

      if (this.data.passwd !== this.data.npasswd) {
        this.$notify("两次密码不一致");
        return;
      }

      Fetch("/index/forgetpwd", {
        type: "forgetpwd",
        phone: this.data.mobile,
        password: this.data.passwd,
        code: this.data.code,
      })
        .then(() => {
          this.$notify({
            background: "#07c160",
            message: "修改成功",
          });
        })
        .then(() => {
          this.$router.replace({
            path: this.$router.history.current.query.redirect || "/",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "login";
</style>


