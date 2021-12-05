<template>
	
	<div class="register-container">
		<!-- <img src="../../assets/icons/qianhai.png" class="icon" /> -->
		<!-- <div class="slogan">
			<p class="welcome">欢迎加入我们</p>
			<p class="login-info">请填写以下注册信息。</p>
		</div> -->
		<!-- <div class="register-header"> -->
			<!-- <div class="register-header-title">
				<span class="login" @click="handleLogin()">登录</span>
				<span class="regist">手机号注册</span>
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
			<div class="register-box">
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
					<input type="number" v-model="data.mobile" placeholder="手机号码">
				</div>
				<div class="item">
					<!-- <div class="left">密码</div> -->
					<!-- <img src="./images/xg/pwd.png" /> -->
					<input type="password" v-model="data.password" placeholder="密码">
					<!-- <input type="password" v-model="data.spassword" placeholder="请再次输入"> -->
				</div>
				<div class="item">
					<!-- <div class="left">密码</div> -->
					<!-- <img src="./images/xg/pwd.png" /> -->
					<!-- <input type="password" v-model="data.password" placeholder="请输入密码"> -->
					<input type="password" v-model="data.spassword" placeholder="再次输入">
				</div>
				<!-- <div class="item">
					<div class="left">确认密码</div>
					<input type="password" v-model="data.spassword" placeholder="请再次确认密码">
				</div> -->
				<div class="item">
					<!-- <div class="left">验证码</div> -->
					<!-- <img src="./images/xg/code.png" /> -->
					<div class="code-btn-cont">
						<input v-model="data.code" placeholder="验证码">
						<div class="code-btn" @click="sendcode()">{{timeData.seconds > 0 ? timeData.seconds : '获取验证码'}}</div>
					</div>
				</div>
				<div class="item">
					<!-- <div class="left">邀请码</div> -->
					<!-- <img src="./images/xg/invite.png" /> -->
					<input v-model="data.t_mobile" placeholder="邀请码(可不填)">
				</div>
			</div>
			<div class="register-btn" @click="handleSubmit">注 册</div>
			<div class="login-btn" @click="handleLogin()">已有账号</div>
			<!-- <div class="register-footer">
				<div>注册即代表同意</div>
				<div class="footer-link" @click="handleGoUserTerms">用户协议</div>
				<div>与</div>
				<div class="footer-link" @click="handleGoPrivacyPolicy">隐私政策</div>
			</div> -->
			<!-- <div class="register-form-box">
				<form class="form" @submit.prevent="handleSubmit">
					<van-field v-model="data.telAddress" label-width="1.7rem" label="国家/地区" readonly @click-right-icon="handleSelectArea" input-align="right" right-icon="arrow" />
					<van-field v-model="data.mobile" label-width="1.7rem" :label="formAreaLabel" type="tel" placeholder="请输入您的手机号码" />
					<van-field v-model="data.password" label-width="1.7rem" label="登陆密码" type="password" placeholder="请输入登陆密码" />
					<van-field v-model="data.spassword" label-width="1.7rem" label="确认密码" type="password" placeholder="请再次输入密码" />
					<van-field v-model="data.code" label-width="1.7rem" center clearable label="验证码" placeholder="请输入验证码">
						<template #button>
							<div class="code-btn" @click="sendcode()">{{timeData.seconds > 0 ? timeData.seconds : '获取验证码'}}</div>
						</template>
					</van-field>
					<van-field v-model="data.t_mobile" label-width="1.7rem" label="邀请码" placeholder="请输入邀请码（可不填）" />
					<div class="register-form-item">
						<div @click="handleLogin()">已有账号？登陆</div>
					</div>
					<div class="register-form-btn" @click="handleSubmit">立即注册</div>
					<div class="register-form-footer">
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
	import Vue from 'vue';
	import qs from 'qs';
	import md5 from 'js-md5';
	import {
		CountDown,
		Checkbox
	} from 'vant';
	import Fetch from '../../utils/fetch'

	Vue.use(CountDown).use(Checkbox);

	export default {
		name: "index",
		data() {
			return {
				time: 0,
				bg: '',
				data: {
					telAddress: '中国大陆（+86）',
					mobile: '',
					password: '',
					spassword: '',
					code: '',
					t_mobile: '',
				},
				base64Image: '',
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
				formAreaLabel: '+86',
				actionsList: [
					{name: '中国大陆（+86）', labelName: '+86', type: 1},
					{name: '中国澳门（+853）', labelName: '+853', type: 2},
					{name: '中国香港（+852）', labelName: '+852', type: 3},
					{name: '中国台湾（+886）', labelName: '+886', type: 4},
				],
			}
		},
		created() {
			this.$parent.footer(false);
		},
		mounted() {

			const params = location.search.replace('?', '').replace('/', '');
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
				Fetch('/index/webconfig', {
					type: 'bg'
				}).then(res => {
					this.bg = 'url("' + res.data.reg + '")';
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
					mobile: this.data.mobile
				}).then(() => {
					this.time = 60 * 1000;
					this.$notify({
						background: '#07c160',
						message: '发送成功'
					});
				}).catch(() => {
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
					this.data.mobile_system = 2
				} else {
					try {
						var ASIdentifierManager = plus.ios.importClass('ASIdentifierManager');
						var sharedManager = ASIdentifierManager.sharedManager();
						var idfa = sharedManager.advertisingIdentifier().UUIDString();
						var iuid = md5(idfa.toUpperCase()).toLowerCase()
						this.data.mobile_system = 1
					} catch (e) {
						//TODO handle the exception
						var u = navigator.userAgent;
						if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
							this.data.mobile_system = 2
						} else if (u.indexOf('iPhone') > -1) {
							this.data.mobile_system = 1
						}
					}
				}
				Fetch("/index/register", {
					...this.data
				}).then((res) => {
					if (res.data.token) {
						localStorage.setItem('token', res.data.token);
					}
					this.$notify({
						background: '#07c160',
						message: '注册成功'
					});
                    this.$router.replace('/tree');
					// 安卓原生
					if (/LT-APP/.test(navigator.userAgent)) {
						jsBridge.getIMEI(function(imei) {
							for (var i = 0; i < imei.split(',').length; i++) {
								Fetch("/index/test_imei", {
									imei: imei.split(',')[i],
									muid: md5(imei.split(',')[i].toLowerCase()).toLowerCase(),
								});

								// 返回了oaid
								if ((imei.split(',').length == 1) && imei.length > 16) {
									Fetch("/index/tx_action", {
										type: 'Android',
										muid: imei,
										action_type: "REGISTER",
									});
								} else {
									Fetch("/index/tx_action", {
										type: 'Android',
										muid: md5(imei.split(',')[i].toLowerCase()).toLowerCase(),
										action_type: "REGISTER",
									});
								}
							}
						});
						this.$router.replace('/tree');
					} else {
						
						this.getIosIdfa()
						
					}
				})
			},
			getIosIdfa(){
				window.webkit.messageHandlers.idfa.postMessage({'result':'idfa'});  //app中接收到之后会回调给下面的函数
			},
			returnIosIdfa(idfa){
			
					var muid = md5(idfa.toUpperCase()).toLowerCase()
					Fetch("/index/tx_action", {
						type: 'iOS',
						muid: muid,
						action_type: "REGISTER",
						mobile: this.data.mobile,
					});
				this.$router.replace('/tree');
			},
			// 登录
			handleLogin() {
				this.$router.push({name: 'login'});
			},
			// 隐私协议
			handleGoPrivacyPolicy() {
				this.$router.push({path: this.config.user_contract_ys_link});
			},
			// 用户条款
			handleGoUserTerms() {
				this.$router.push({path: this.config.user_contract_link});
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
				this.$router.push({name: 'login'});
			}
		}
	};
</script>

<style lang="less" scoped>
	@import "register";
	/*.main {*/

	/*	.contract {*/

	/*		display: flex;*/
	/*		flex-direction: row;*/
	/*		align-items: center;*/
	/*		width: 100%;*/
	/*		padding: 10px 0 20px 0;*/
	/*		color: #000000;*/
	/*		font-size: 12px;*/

	/*		>a {*/
	/*			color: #a9fffc;*/
	/*		}*/

	/*		/deep/ .van-checkbox .van-checkbox__label {*/
	/*			color: #ffffff;*/
	/*		}*/
	/*	}*/

	/*	.user {*/
	/*		font-size: 14px;*/
	/*		color: #ffffff;*/
	/*	}*/

	/*	position: relative;*/
	/*	padding-top: 1px;*/
	/*	padding-bottom: 20px;*/

	/*	.image_code {*/
	/*		border-radius: 10px;*/
	/*	}*/

	/*	.bg {*/
	/*		position: fixed;*/
	/*		z-index: 1;*/
	/*		top: 0;*/
	/*		bottom: 0;*/
	/*		right: 0;*/
	/*		left: 0;*/
	/*		background: no-repeat center;*/
	/*		background-size: cover;*/
	/*	}*/

	/*	.back {*/
	/*		display: inline-block;*/
	/*		width: 28px;*/
	/*		height: 28px;*/
	/*		background: url(images/back.png) no-repeat center;*/
	/*		background-size: contain;*/
	/*		position: absolute;*/
	/*		top: 24px;*/
	/*		left: 20px;*/
	/*		z-index: 2;*/
	/*	}*/

	/*	.form {*/
	/*		width: 85%;*/
	/*		position: relative;*/
	/*		margin: 20% auto 0 auto;*/
	/*		z-index: 2;*/
	/*		padding: 16px 14px 20px;*/
	/*	}*/

	/*	.form .form_bg {*/
	/*		position: absolute;*/
	/*		top: 0;*/
	/*		right: 0;*/
	/*		bottom: 0;*/
	/*		left: 0;*/
	/*		background: #fff;*/
	/*		opacity: 0.16;*/
	/*		z-index: -1;*/
	/*		border-radius: 20px;*/
	/*		-webkit-box-shadow: 0 0 10px 4px #343656;*/
	/*		box-shadow: 0 0 10px 4px #343656;*/
	/*	}*/

	/*	.form .content {*/
	/*		width: 100%;*/
	/*		border-bottom: 1px solid #b5b4b4;*/
	/*		-webkit-box-sizing: border-box;*/
	/*		box-sizing: border-box;*/
	/*		-webkit-box-align: center;*/
	/*		-ms-flex-align: center;*/
	/*		align-items: center;*/
	/*		padding: 6px 10px 38px 10px;*/
	/*		position: relative;*/
	/*		z-index: 4;*/
	/*		margin-bottom: 26px;*/
	/*	}*/

	/*	.form .content .left_icon {*/
	/*		float: left;*/
	/*		width: 18px;*/
	/*		height: 18px;*/
	/*		background-repeat: no-repeat;*/
	/*		background-size: contain;*/
	/*		background-position: center;*/
	/*	}*/

	/*	.form .content .phone_icon {*/
	/*		background-image: url(images/mobile.png);*/
	/*	}*/

	/*	.form .content .pwd_icon {*/
	/*		background-image: url(images/pwd.png);*/
	/*	}*/

	/*	.form .content .captcha_icon {*/
	/*		background-image: url(images/captcha.png);*/
	/*	}*/

	/*	.form .content .sms_icon {*/
	/*		background-image: url(images/sms.png);*/
	/*	}*/

	/*	.form .content .right {*/
	/*		float: right;*/
	/*	}*/

	/*	.form .content .right_icon {*/
	/*		display: inline-block;*/
	/*		width: 16px;*/
	/*		height: 16px;*/
	/*		background-repeat: no-repeat;*/
	/*		background-size: contain;*/
	/*		background-position: center;*/
	/*	}*/

	/*	.form .content .clear_icon {*/
	/*		background-image: url(images/clear.png);*/
	/*	}*/

	/*	.form .content .show_icon {*/
	/*		background-image: url(images/hidepwd.png);*/
	/*	}*/

	/*	.form .content .invite_icon {*/
	/*		background-image: url(images/invite.png);*/
	/*	}*/

	/*	.form .content .getsms {*/
	/*		display: inline-block;*/
	/*		width: 88px;*/
	/*		height: 28px;*/
	/*		line-height: 28px;*/
	/*		border-radius: 28px;*/
	/*		text-align: center;*/
	/*		background: #c0bfc8;*/
	/*		color: #464765;*/
	/*		font-size: 12px;*/
	/*	}*/

	/*	.form .content .captcha_img {*/
	/*		display: inline-block;*/
	/*		width: 88px;*/
	/*		height: 28px;*/
	/*	}*/

	/*	.form .content .inp {*/
	/*		float: left;*/
	/*		padding: 0 8px;*/
	/*		font-size: 14px;*/
	/*		background: transparent;*/
	/*		color: #fff;*/
	/*	}*/

	/*	.form .content .inp1 {*/
	/*		width: 50%;*/
	/*	}*/

	/*	.form .content .inp2 {*/
	/*		width: 80%;*/
	/*	}*/

	/*	.form .btn {*/
	/*		display: block;*/
	/*		width: 60.8%;*/
	/*		height: 57px;*/
	/*		line-height: 57px;*/
	/*		border-radius: 57px;*/
	/*		text-align: center;*/
	/*		color: #363957;*/
	/*		font-size: 20px;*/
	/*		margin: 0 auto;*/
	/*		background: #fff;*/
	/*	}*/

	/*	@media (max-width: 360px) {*/
	/*		.form .content .getsms {*/
	/*			width: 74px;*/
	/*		}*/

	/*		.form .content .captcha_img {*/
	/*			width: 74px;*/
	/*		}*/
	/*	}*/

	/*	.login {*/
	/*		display: block;*/
	/*		width: 120px;*/
	/*		margin: 0 auto;*/
	/*		color: #6b6a6b;*/
	/*		font-size: 13px;*/
	/*		margin-top: 8%;*/
	/*		position: relative;*/
	/*		z-index: 2;*/
	/*	}*/
	/*}*/
</style>
