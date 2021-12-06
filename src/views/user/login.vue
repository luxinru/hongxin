<template>
  <div class="login-container">
    <!-- <div class="slogan">
			<p class="welcome">欢迎加入我们</p>
			<p class="login-info">请填写以下登陆信息。</p>
		</div> -->
    <!-- <div class="login-header"> -->
    <!-- <div class="login-header-title">
				<span class="login">登录</span>
				<span class="regist" @click="handleGoRegister">手机号注册</span>
			</div> -->

    <div class="logo"></div>

    <div class="login-box">
      <!-- <div class="item" style="display:none;">
				<div class="left">国家/地区</div>
				<div class="right" @click="handleSelectArea">
					<span>{{data.telAddress}}</span>
					<van-icon name="arrow" size="18" color="#A8A8A8"/>
				</div>
			</div> -->
      <div class="item">
        <div class="left">手机号码</div>
        <!-- <img src="./images/xg/mobile.png" /> -->
        <input type="number" v-model="data.username" placeholder="手机号码" />
      </div>
      <div class="item">
        <div class="left">密码</div>
        <!-- <img src="./images/xg/pwd.png" /> -->
        <input type="password" v-model="data.password" placeholder="密码" />
      </div>

      <Btn @click="handleSubmit">登陆</Btn>

      <section class="footer">
        <div @click="handleForgetPassword"><span>忘记密码</span></div>
        <div @click="handleGoRegister">还没有账户？<span>注册</span></div>
      </section>
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {
        telAddress: "中国大陆（+86）",
        username: "",
        password: "",
      },
      loginTerms: true,
      bg: "",
      config: {},
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
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/webconfig", {
        type: "bg",
      }).then((res) => {
        this.bg = 'url("' + res.data.login + '")';
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

    handleSubmit() {
      if (!this.data.username) {
        this.$notify("请输入您的手机号");
        return;
      }

      if (!this.data.password) {
        this.$notify("请输入登录密码");
        return;
      }

      Fetch("/index/login", {
        username: this.data.username,
        password: this.data.password,
      })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
          this.$parent.setFooterType(res.data.footer);
          this.$notify({
            background: "#07c160",
            message: "登录成功",
          });
        })
        .then(() => {
          this.$router.replace({
            path: /* this.$router.history.current.query.redirect || */ "/tree",
          });
        });
    },
    // 隐私协议
    handleGoPrivacyPolicy() {
      this.$router.push({ path: this.config.user_contract_ys_link });
    },
    // 用户条款
    handleGoUserTerms() {
      this.$router.push({ path: this.config.user_contract_link });
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ name: "forgetpwd" });
    },
    // 注册
    handleGoRegister() {
      this.$router.push({ name: "register" });
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
  },
};
</script>

<style lang="less" scoped>
@import "login";
</style>
