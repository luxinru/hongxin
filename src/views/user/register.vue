<template>
  <div class="login-container">
    <div class="login-box">
      <div class="item">
        <div class="left">手机号码</div>
        <input type="number" v-model="data.mobile" placeholder="手机号码" />
      </div>
      <div class="item">
        <div class="left">密码</div>
        <input
          type="password"
          v-model="data.password"
          placeholder="请输入密码"
        />
        <!-- <input type="password" v-model="data.spassword" placeholder="请再次输入"> -->
      </div>
      <div class="item" style="margin-top: 0">
        <!-- <div class="left">密码</div> -->
        <!-- <input type="password" v-model="data.password" placeholder="请输入密码"> -->
        <input
          type="password"
          v-model="data.spassword"
          placeholder="请再次输入密码"
        />
      </div>
      <!-- <div class="item">
					<div class="left">确认密码</div>
					<input type="password" v-model="data.spassword" placeholder="请再次确认密码">
				</div> -->
      <div class="item">
        <div class="left">手机验证码</div>
        <!-- <img src="./images/xg/code.png" /> -->
        <div class="code">
          <input v-model="data.code" placeholder="验证码" />
          <div class="code_text" @click="sendcode()">
            {{ timeData.seconds > 0 ? timeData.seconds : "获取验证码" }}
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">邀请码</div>
        <!-- <img src="./images/xg/invite.png" /> -->
        <input v-model="data.t_mobile" placeholder="邀请码(可不填)" />
      </div>

      <Btn @click="handleSubmit">注册</Btn>

      <section class="footer">
        <div></div>
        <div @click="handleLogin()">
          已有账户？
          <span>登陆</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import md5 from "js-md5";
import { CountDown, Checkbox } from "vant";
import Fetch from "../../utils/fetch";

Vue.use(CountDown).use(Checkbox);

export default {
  name: "index",
  data() {
    return {
      time: 0,
      bg: "",
      data: {
        telAddress: "中国大陆（+86）",
        mobile: "",
        password: "",
        spassword: "",
        code: "",
        t_mobile: "",
      },
      base64Image: "",
      is_t_inp: false,
      is_send: false,
      checked: true,
      config: {},
      // 用户隐私条款
      loginTerms: false,
      timeData: {
        seconds: 0,
      },
      isShowAction: false,
      formAreaLabel: "+86",
      actionsList: [
        { name: "中国大陆（+86）", labelName: "+86", type: 1 },
        { name: "中国澳门（+853）", labelName: "+853", type: 2 },
        { name: "中国香港（+852）", labelName: "+852", type: 3 },
        { name: "中国台湾（+886）", labelName: "+886", type: 4 },
      ],
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    const params = location.search.replace("?", "").replace("/", "");
    var query = qs.parse(params);
    /* this.data.t_mobile = query.m;
			if (query.m) {
			    this.is_t_inp = true;
			} */
    this.data.t_mobile = this.$route.query.m;
    if (this.$route.query.m) {
      this.is_t_inp = true;
    }

    this.start();
    window.returnIosIdfa = this.returnIosIdfa;
    // this.getImageCode();
  },
  methods: {
    // getImageCode() {
    //     Fetch("/api/api/imageCode").then(res => {
    //         this.base64Image = res.data.code
    //     });
    // },
    start() {
      Fetch("/index/webconfig", {
        type: "bg",
      }).then((res) => {
        this.bg = 'url("' + res.data.reg + '")';
      });
      Fetch("/index/webconfig", {
        type: "web",
      }).then((res) => {
        this.config = res.data;
      });
    },
    clear() {
      this.data.username = "";
    },
    timeCall() {
      this.is_send = false;
      this.time = 0;
    },
    sendcode() {
      if (this.is_send) {
        return;
      }

      if (!this.config.sms_verify) {
        return;
      }

      if (!this.data.mobile) {
        this.$notify("请输入手机号");
        return;
      }

      // if (!this.data.image_code) {
      //     this.$notify("请输入图片验证码");
      //     return;
      // }

      this.is_send = true;

      Fetch("/index/register_code", {
        mobile: this.data.mobile,
      })
        .then(() => {
          this.time = 60 * 1000;
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

      if (!this.data.password) {
        this.$notify("请输入登录密码");
        return;
      }

      if (this.data.password !== this.data.spassword) {
        this.$notify("两次输入的密码不一至");
        return;
      }

      if (!this.data.code && this.config.sms_verify) {
        this.$notify("请输入验证码");
        return;
      }

      if (!this.checked) {
        this.$notify("请同意用户协议");
        return;
      }

      if (/LT-APP/.test(navigator.userAgent)) {
        this.data.mobile_system = 2;
      } else {
        try {
          var ASIdentifierManager = plus.ios.importClass("ASIdentifierManager");
          var sharedManager = ASIdentifierManager.sharedManager();
          var idfa = sharedManager.advertisingIdentifier().UUIDString();
          var iuid = md5(idfa.toUpperCase()).toLowerCase();
          this.data.mobile_system = 1;
        } catch (e) {
          //TODO handle the exception
          var u = navigator.userAgent;
          if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
            this.data.mobile_system = 2;
          } else if (u.indexOf("iPhone") > -1) {
            this.data.mobile_system = 1;
          }
        }
      }
      Fetch("/index/register", {
        ...this.data,
      }).then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        this.$notify({
          background: "#07c160",
          message: "注册成功",
        });
        this.$router.replace("/tree");
        // 安卓原生
        if (/LT-APP/.test(navigator.userAgent)) {
          jsBridge.getIMEI(function (imei) {
            for (var i = 0; i < imei.split(",").length; i++) {
              Fetch("/index/test_imei", {
                imei: imei.split(",")[i],
                muid: md5(imei.split(",")[i].toLowerCase()).toLowerCase(),
              });

              // 返回了oaid
              if (imei.split(",").length == 1 && imei.length > 16) {
                Fetch("/index/tx_action", {
                  type: "Android",
                  muid: imei,
                  action_type: "REGISTER",
                });
              } else {
                Fetch("/index/tx_action", {
                  type: "Android",
                  muid: md5(imei.split(",")[i].toLowerCase()).toLowerCase(),
                  action_type: "REGISTER",
                });
              }
            }
          });
          this.$router.replace("/tree");
        } else {
          this.getIosIdfa();
        }
      });
    },
    getIosIdfa() {
      window.webkit.messageHandlers.idfa.postMessage({ result: "idfa" }); //app中接收到之后会回调给下面的函数
    },
    returnIosIdfa(idfa) {
      var muid = md5(idfa.toUpperCase()).toLowerCase();
      Fetch("/index/tx_action", {
        type: "iOS",
        muid: muid,
        action_type: "REGISTER",
        mobile: this.data.mobile,
      });
      this.$router.replace("/tree");
    },
    // 登录
    handleLogin() {
      this.$router.push({ name: "login" });
    },
    // 隐私协议
    handleGoPrivacyPolicy() {
      this.$router.push({ path: this.config.user_contract_ys_link });
    },
    // 用户条款
    handleGoUserTerms() {
      this.$router.push({ path: this.config.user_contract_link });
    },
    // 选择地区
    handleSelectArea() {
      this.isShowAction = true;
    },
    handleSelectAction(item) {
      this.formAreaLabel = item.labelName;
      this.data = Object.assign({}, this.data, {
        telAddress: item.name,
      });
    },
    handleCancelAction() {
      this.isShowAction = false;
    },
    handleBack() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="less" scoped>
@import "login";
</style>
