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
		<div class="login_title">
		  <div class="login_title_top">
		  	<img src="./images/logo.png" style="width:38px;height:38px"class="icon" />
		  	<p class="title">鸿答APP</p>
		  </div>
		  <div class="login_title_top" style="margin-top: 12px;font-size: 16px;">
			  <span>因为专业</span>
			  <span>所以放心</span>
		  </div>
		</div>
		
		<div class="login-box">
			<!-- <div class="item" style="display:none;">
				<div class="left">国家/地区</div>
				<div class="right" @click="handleSelectArea">
					<span>{{data.telAddress}}</span>
					<van-icon name="arrow" size="18" color="#A8A8A8"/>
				</div>
			</div> -->
			<div class="item">
				<!-- <div class="left">手机号码</div> -->
				<!-- <img src="./images/xg/mobile.png" /> -->
				<input type="number" v-model="data.username" placeholder="手机号码">
			</div>
			<div class="item">
				<!-- <div class="left">密码</div> -->
				<!-- <img src="./images/xg/pwd.png" /> -->
				<input type="password" v-model="data.password" placeholder="密码">
			</div>
		</div>
		<div class="login-btn" @click="handleSubmit">登陆</div>
		<div class="footer-btn-cont">
			<div class="forget" @click="handleForgetPassword">忘记密码</div>
			<div class="register" @click="handleGoRegister"><span>注册账户</span></div>
		</div>
		<!-- <div class="login-footer">
			<div>登录即代表同意</div>
			<div class="footer-link" @click="handleGoUserTerms">用户协议</div>
			<div>与</div>
			<div class="footer-link" @click="handleGoPrivacyPolicy">隐私政策</div>
		</div> -->
			<!-- <div class="login-form-box">
				<form class="form" @submit.prevent="handleSubmit">
					<van-field v-model="data.telAddress" label-width="1.7rem" label="国家/地区" readonly @click-right-icon="handleSelectArea" input-align="right" right-icon="arrow" />
					<van-field v-model="data.username" label-width="1.7rem" :label="formAreaLabel" type="number" placeholder="请输入您的手机号码" />
					<van-field v-model="data.password" label-width="1.7rem" label="登录密码" type="password" placeholder="请输入登陆密码" />
					<div class="login-form-item">
						<div @click="handleGoRegister">注册</div>
						<div @click="handleForgetPassword">忘记密码？</div>
					</div>
					<div class="login-form-btn" @click="handleSubmit">立即登录</div>
					<div class="login-form-footer">
						<div class="footer-checkbox"><van-checkbox v-model="loginTerms" shape="square"></van-checkbox></div>
						<div>我已阅读并接受</div>
						<div class="footer-link" @click="handleGoUserTerms">条款及细则</div>
						<div>与</div>
						<div class="footer-link" @click="handleGoPrivacyPolicy">客户隐私政策</div>
					</div>
				</form>
			</div> -->
		<!-- </div> -->
		<van-action-sheet v-model="isShowAction" :actions="actionsList" cancel-text="取消" close-on-click-action @select="handleSelectAction" @cancel="handleCancelAction"/>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';

	export default {
		name: "index",
		components: {},
		data() {
			return {
				data: {
					telAddress: '中国大陆（+86）',
					username: '',
					password: '',
				},
				loginTerms: true,
				bg: '',
				config: {},
				isShowAction: false,
				formAreaLabel: '+86',
				actionsList: [
					{name: '中国大陆（+86）', labelName: '+86', type: 1},
					{name: '中国澳门（+853）', labelName: '+853', type: 2},
					{name: '中国香港（+852）', labelName: '+852', type: 3},
					{name: '中国台湾（+886）', labelName: '+886', type: 4},
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
				Fetch('/index/webconfig', {
					type: 'bg'
				}).then(res => {
					this.bg = 'url("' + res.data.login + '")';
				})
				Fetch('/index/webconfig', {
					type: 'web'
				}).then(res => {
					this.config = res.data
				})
			},
			clear() {
				this.data.username = '';
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
					password: this.data.password
				}).then((res) => {
					if (res.data.token) {
						localStorage.setItem('token', res.data.token);
					}
					this.$parent.setFooterType(res.data.footer);
					this.$notify({
						background: '#07c160',
						message: '登录成功'
					});

				}).then(() => {
					this.$router.replace({
						path: /* this.$router.history.current.query.redirect || */"/tree"
					});
				})
			},
			// 隐私协议
			handleGoPrivacyPolicy() {
				this.$router.push({path: this.config.user_contract_ys_link});
			},
			// 用户条款
			handleGoUserTerms() {
				this.$router.push({path: this.config.user_contract_link});
			},
			// 忘记密码
			handleForgetPassword() {
				this.$router.push({name: 'forgetpwd'});
			},
			// 注册
			handleGoRegister() {
				this.$router.push({name: 'register'});
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
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "login";



	/*.contract {*/

	/*	display: flex;*/
	/*	flex-direction: row;*/
	/*	align-items: center;*/
	/*	width: 100%;*/
	/*	padding: 10px 5px 20px 20px;*/
	/*	color: #fff;*/
	/*	font-size: 12px;*/

	/*	>a {*/
	/*		color: #a9fffc;*/
	/*	}*/

	/*	/deep/ .van-checkbox .van-checkbox__label {*/
	/*		color: #ffffff;*/
	/*	}*/
	/*}*/

	/*.main {*/
	/*	position: relative;*/
	/*	padding-top: 1px;*/
	/*	padding-bottom: 20px;*/


	/*}*/

	/*.main .bg {*/
	/*	position: fixed;*/
	/*	z-index: 1;*/
	/*	top: 0;*/
	/*	left: 0;*/
	/*	right: 0;*/
	/*	bottom: 0;*/
	/*	background: no-repeat center;*/
	/*	background-size: cover;*/
	/*}*/

	/*.main .back {*/
	/*	display: inline-block;*/
	/*	width: 28px;*/
	/*	height: 28px;*/
	/*	background: url(images/back.png) no-repeat center;*/
	/*	background-size: contain;*/
	/*	position: absolute;*/
	/*	top: 24px;*/
	/*	left: 20px;*/
	/*	z-index: 2;*/
	/*}*/

	/*.form {*/
	/*	width: 72%;*/
	/*	position: relative;*/
	/*	margin: 33% auto 0 auto;*/
	/*	z-index: 2;*/
	/*}*/

	/*.form .item {*/
	/*	position: relative;*/
	/*	margin-bottom: 26px;*/
	/*	overflow: hidden;*/
	/*}*/

	/*.form .item .logo {*/
	/*	display: block;*/
	/*	width: 42.8%;*/
	/*	margin: 0 auto;*/
	/*}*/

	/*.form .item .item_bg {*/
	/*	position: absolute;*/
	/*	top: 0;*/
	/*	bottom: 0;*/
	/*	left: 0;*/
	/*	right: 0;*/
	/*	background: #fff;*/
	/*	opacity: 0.1;*/
	/*	border-radius: 38px;*/
	/*	z-index: 3;*/
	/*}*/

	/*.form .item .content {*/
	/*	width: 100%;*/
	/*	height: 38px;*/
	/*	border-radius: 38px;*/
	/*	border: 1px solid #fff;*/
	/*	display: -webkit-box;*/
	/*	display: -ms-flexbox;*/
	/*	display: flex;*/
	/*	-webkit-box-sizing: border-box;*/
	/*	box-sizing: border-box;*/
	/*	-webkit-box-align: center;*/
	/*	-ms-flex-align: center;*/
	/*	align-items: center;*/
	/*	-webkit-box-pack: justify;*/
	/*	-ms-flex-pack: justify;*/
	/*	justify-content: space-between;*/
	/*	padding: 10px 16px;*/
	/*	position: relative;*/
	/*	z-index: 4;*/
	/*}*/

	/*.form .item .content .left_icon {*/
	/*	display: inline-block;*/
	/*	width: 18px;*/
	/*	height: 18px;*/
	/*	background-repeat: no-repeat;*/
	/*	background-size: contain;*/
	/*	background-position: center;*/
	/*}*/

	/*.form .item .content .phone_icon {*/
	/*	background-image: url(images/phone.png);*/
	/*}*/

	/*.form .item .content .pwd_icon {*/
	/*	background-image: url(images/pwd.png);*/
	/*}*/

	/*.form .item .content .right_icon {*/
	/*	display: inline-block;*/
	/*	width: 16px;*/
	/*	height: 16px;*/
	/*	background-repeat: no-repeat;*/
	/*	background-size: contain;*/
	/*	background-position: center;*/
	/*}*/

	/*.form .item .content .clear_icon {*/
	/*	background-image: url(images/clear.png);*/
	/*}*/

	/*.form .item .content .show_icon {*/
	/*	background-image: url(images/hidepwd.png);*/
	/*}*/

	/*.form .item .content .inp {*/
	/*	-webkit-box-flex: 1;*/
	/*	-ms-flex: 1;*/
	/*	flex: 1;*/
	/*	padding: 0 8px;*/
	/*	font-size: 14px;*/
	/*	background: transparent;*/
	/*	color: #fff;*/
	/*}*/

	/*.form .item_pwd {*/
	/*	margin-bottom: 10px;*/
	/*}*/

	/*.form .item_forget {*/
	/*	margin-bottom: 35px;*/
	/*}*/

	/*.form .item_forget .forgetpwd {*/
	/*	color: #fff;*/
	/*	font-size: 12px;*/
	/*	float: right;*/
	/*	padding-right: 10px;*/
	/*}*/

	/*.form .item .btn {*/
	/*	display: block;*/
	/*	width: 100%;*/
	/*	height: 36px;*/
	/*	border-radius: 36px;*/
	/*	color: #18192e;*/
	/*	position: relative;*/
	/*	z-index: 4;*/
	/*	text-align: center;*/
	/*	line-height: 36px;*/
	/*	font-size: 15px;*/
	/*}*/

	/*.form .item .loginbtn {*/
	/*	background: #fff;*/
	/*}*/

	/*.form .item .item_bg_gray {*/
	/*	position: absolute;*/
	/*	top: 0;*/
	/*	bottom: 0;*/
	/*	left: 0;*/
	/*	right: 0;*/
	/*	background: #fff;*/
	/*	opacity: 0.5;*/
	/*	border-radius: 36px;*/
	/*	z-index: 3;*/
	/*}*/
</style>
