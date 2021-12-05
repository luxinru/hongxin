<template>
	<div class="tree-container">
		<div class="tree-header">
            <!-- <div class="tree-header-swipe">
                <div class="bannerSwp">
                    <van-swipe @change="onChange" :autoplay="5000">
                        <van-swipe-item v-for="(image, index) in banner" :key="index">
                            <a :href="image.url">
                                <img style="width:100%;height: 100%;" :src="image.thumb" />
                            </a>
                        </van-swipe-item>
                        <div ref="dian" class="custom-indicator" slot="indicator">
                            <div v-for="(img, x) in banner" :key="x" :class="x==0?'selected':''"></div>
                        </div>
                    </van-swipe>
                </div>
            </div> -->
			<div class="index-head">
				 <a :href="banner[0].url">
				<img style="width:100%;height:100%" :src="banner[0].thumb" />
				</a>
			</div>
			<div class="index-center">
				<div class="index-menu-list">
				    <div class="index-menu-list-item" @click="handleTreeListItemClick(1)">
				        <div class="index-menu-list-item-icon one-icon"></div>
				        <div class="index-menu-list-item-text">每日签到</div>
				    </div>
				    <div class="index-menu-list-item" @click="handleTreeListItemClick(4)">
				        <div class="index-menu-list-item-icon two-icon"></div>
				        <div class="index-menu-list-item-text">看图猜谜</div>
				    </div>
				    <div class="index-menu-list-item" @click="handleTreeListItemClick(13)">
				        <div class="index-menu-list-item-icon three-icon"></div>
				        <div class="index-menu-list-item-text">邀请好友</div>
				    </div>
				    <div class="index-menu-list-item" @click="handleTreeListItemClick(10)">
				        <div class="index-menu-list-item-icon four-icon"></div>
				        <div class="index-menu-list-item-text">绑支付宝</div>
				    </div>
				</div>
				<div class="tree-notice-box">
					<div class="tree-notice">
						<van-notice-bar background="#ffffff" color="#1B0A1C" :text="data.notice">
				            <template #left-icon>
				                <img src="./../../assets/images/shufeng/index/laba.png" style="width:17px;height:14px" alt=""/>
				            </template>
				        </van-notice-bar>
					</div>
				</div>
			</div>
            
		</div>
        <!--<div class="index-menu-list-box">-->
        <!--    <div class="index-menu-list">-->
        <!--        <div class="index-menu-list-item" @click="handleMenuSwitch(1)">-->
        <!--            <div class="index-menu-list-item-icon one-icon"></div>-->
        <!--            <div class="index-menu-list-item-text">每日签到</div>-->
        <!--        </div>-->
        <!--        <div class="index-menu-list-item" @click="handleMenuSwitch(2)">-->
        <!--            <div class="index-menu-list-item-icon two-icon"></div>-->
        <!--            <div class="index-menu-list-item-text">闯关答题</div>-->
        <!--        </div>-->
        <!--        <div class="index-menu-list-item" @click="handleMenuSwitch(3)">-->
        <!--            <div class="index-menu-list-item-icon three-icon"></div>-->
        <!--            <div class="index-menu-list-item-text">邀请好友</div>-->
        <!--        </div>-->
        <!--        <div class="index-menu-list-item" @click="handleMenuSwitch(4)">-->
        <!--            <div class="index-menu-list-item-icon four-icon"></div>-->
        <!--            <div class="index-menu-list-item-text">绑支付宝</div>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--    <div class="index-menu-info">-->
        <!--        <div class="index-menu-info-back" :class="indexMenuInfoBackClasses" @click="goToDetail"></div>-->
        <!--    </div>-->
        <!--</div>-->

        <div class="tree-list-box">
			<!--<div class="tree-header-swipe-box">-->
            <!--    <video-player  class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>-->
            <!--</div>-->
			<div class="tree-list-info-bottom">
			    <div class="tree-list-info-bottom-back" @click="handleTreeListItemClick(1)"></div>
			</div>
            <div class="tree-list-info">
                <div class="tree-list-info-back left-back"><div @click="handleTreeListItemClick(11)"></div></div>
                <div class="tree-list-info-back right-back"><div @click="handleTreeListItemClick(14)"></div></div>
            </div>
            
        </div>
        <!--<div class="tree-list-box"  v-if="footer_type === 'n2'">
            <div class="tree-list-title">
                <div class="title-line"></div>
                <div class="title-name">精选专区</div>
            </div>
            <div class="tree-list-item one-item" @click="handleTreeListItemClick(7)">
                <div class="tree-list-item-text">
                    <div class="tree-list-item-text-name">项目专区</div>
                    <div>稳健项目  天天赚钱</div>
                </div>
            </div>
            <div class="tree-list-item two-item" @click="handleTreeListItemClick(8)">
                <div class="tree-list-item-text">
                    <div class="tree-list-item-text-name">我的宝库</div>
                    <div>灵活支取  方便快捷</div>
                </div>
            </div>
        </div>-->
		<!--<div class="tree-bar-notice" v-if="footer_type === 'n2'">-->
		<!--	<div class="tree-bar">-->
		<!--		<img src="../../assets/images/image/bar_l.png" @click="$router.push('/item')" />-->
		<!--		<img src="../../assets/images/image/bar_r.png" @click="$router.push('/baoku')" />-->
		<!--	</div>-->
		<!--</div>-->
		<!--<div class="tree-list-box">-->
		<!--	<div class="tree-list-item one" @click="handleTreeListItemClick(1)">-->
        <!--        <div class="left-info-title">每日签到</div>-->
		<!--	</div>-->
		<!--	&lt;!&ndash; <div class="tree-list-item two" @click="handleTreeListItemClick(2)"  v-if="footer_type === 'n2'">-->
		<!--		<img class="left-icon" src="../../assets/images/image/icon_2.png" />-->
		<!--		<div class="list-info">-->
		<!--			<div class="left-info-title">刮刮卡</div>-->
		<!--			<div class="left-info-slogan">幸运大奖刮出来</div>-->
		<!--		</div>-->
		<!--		<div class="right-btn btn-two">立即参与</div>-->
		<!--	</div> &ndash;&gt;-->
		<!--	<div class="tree-list-item three" @click="handleTreeListItemClick(3)">-->
		<!--		<img class="left-icon" src="../../assets/images/image/icon_3.png" />-->
		<!--		<div class="list-info">-->
		<!--			<div class="left-info-title">运动加油站</div>-->
		<!--			<div class="left-info-slogan">运动加油站 运动赚大钱</div>-->
		<!--		</div>-->
		<!--		<div class="right-btn btn-three">立即参与</div>-->
		<!--	</div>-->
		<!--	<div class="tree-list-item four" @click="handleTreeListItemClick(4)">-->
		<!--		<img class="left-icon" src="../../assets/images/image/icon_4.png" />-->
		<!--		<div class="list-info">-->
		<!--			<div class="left-info-title">趣味答题</div>-->
		<!--			<div class="left-info-slogan">百万大奖 等您瓜分</div>-->
		<!--		</div>-->
		<!--		<div class="right-btn btn-four">立即参与</div>-->
		<!--	</div>-->
		<!--	&lt;!&ndash; <div class="tree-list-item five" @click="handleTreeListItemClick(5)"  v-if="footer_type === 'n2'">-->
		<!--		<img class="left-icon" src="../../assets/images/image/icon_5.png" />-->
		<!--		<div class="list-info">-->
		<!--			<div class="left-info-title">幸运转盘</div>-->
		<!--			<div class="left-info-slogan">高额奖金</div>-->
		<!--		</div>-->
		<!--		<div class="right-btn btn-five">立即参与</div>-->
		<!--	</div> &ndash;&gt;-->
		<!--	<div class="tree-list-item six" @click="handleTreeListItemClick(6)"  v-if="footer_type === 'n2'">-->
		<!--		<img class="left-icon" src="../../assets/images/image/icon_6.png" />-->
		<!--		<div class="list-info">-->
		<!--			<div class="left-info-title">积分商城</div>-->
		<!--			<div class="left-info-slogan">千款产品 任您挑选</div>-->
		<!--		</div>-->
		<!--		<div class="right-btn btn-six">了解更多</div>-->
		<!--	</div>-->
		<!--</div>-->
		<!-- <div class="tree-notice-box">
			<van-notice-bar background="#fff" color="#3E3E3E" :text="data.notice">
				<template #left-icon>
					<van-icon name="volume-o" size="18" color="#30A2FF" style="margin-right: 10px;"/>
				</template>
			</van-notice-bar>
		</div> -->
		<!-- <div class="tree-list-box">
			<div class="tree-list-item" @click="handleTreeListItemClick(1)">
				<div class="tree-list-item-left">
					<div class="left-icon left-icon-one"></div>
					<div class="left-info">
						<div class="left-info-top left-info-top-one">每日签到</div>
						<div class="left-info-bottom">Daily sign in</div>
					</div>
				</div>
				<div class="tree-list-item-right">
					<div class="right-icon">
						<van-icon name="arrow" size="12" color="#666"/>
					</div>
				</div>
			</div>
			<div class="tree-list-item" @click="handleTreeListItemClick(2)">
				<div class="tree-list-item-left">
					<div class="left-icon left-icon-two"></div>
					<div class="left-info">
						<div class="left-info-top left-info-top-two">运动加油站</div>
						<div class="left-info-bottom">Sports gas station</div>
					</div>
				</div>
				<div class="tree-list-item-right">
					<div class="right-icon">
						<van-icon name="arrow" size="12" color="#666"/>
					</div>
				</div>
			</div>
			<div class="tree-list-item" @click="handleTreeListItemClick(3)">
				<div class="tree-list-item-left">
					<div class="left-icon left-icon-three"></div>
					<div class="left-info">
						<div class="left-info-top left-info-top-three">趣味答题</div>
						<div class="left-info-bottom">Interesting answers</div>
					</div>
				</div>
				<div class="tree-list-item-right">
					<div class="right-icon">
						<van-icon name="arrow" size="12" color="#666"/>
					</div>
				</div>
			</div>
			<div class="tree-list-item" @click="handleTreeListItemClick(4)">
				<div class="tree-list-item-left">
					<div class="left-icon left-icon-four"></div>
					<div class="left-info">
						<div class="left-info-top left-info-top-four">积分商城</div>
						<div class="left-info-bottom">Points mall</div>
					</div>
				</div>
				<div class="tree-list-item-right">
					<div class="right-icon">
						<van-icon name="arrow" size="12" color="#666"/>
					</div>
				</div>
			</div>
		</div> -->
		<div class="mask" v-show="ad_show" z-index="999">
			<div class="ops">
				<div class="close">
					<div @click="close()">关闭</div>
				</div>
				<a @click="goAd()">
					<img :src="ad.activity_img" />
				</a>
			</div>

		</div>
	</div>
</template>


<script>
	import Fetch from '../../utils/fetch'
	import {Dialog} from 'vant';
	import { videoPlayer } from 'vue-video-player'
	import 'video.js/dist/video-js.css'
	import 'vue-video-player/src/custom-theme.css'
	export default {
		name: "index",
		components: {videoPlayer},
		data() {
			return {
				playerOptions : {
				        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				        autoplay: false, //如果true,浏览器准备好时开始回放。
				        muted: false, // 默认情况下将会消除任何音频。
				        loop: false, // 导致视频一结束就重新开始。
				        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				        language: 'zh-CN',
				        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				        sources: [{
				          src: 'https://rcguanjia.com/mp4/zhounianqing.mp4',  // 路径
				          type: 'video/mp4'  // 类型
				        }],
				        // poster: "https://www.njmbttd.com/upload/dongli.jpg", //你的封面地址
				        // width: document.documentElement.clientWidth,
				        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				        controlBar: {
				          timeDivider: true,
				          durationDisplay: true,
				          remainingTimeDisplay: false,
				          fullscreenToggle: true,  //全屏按钮
				        }
				    },
				footer_type: 'n1',
				data: {
					app: {},
					notice: '',
				},
				down_show: true,
				link_width: 0,
				banner: [],
				notice: '',
				links: [],
				type: 'n1',
				ad: {},
				ad_show: false,
				examinationData: [{
					id: "1",
					name: "one",
					question: "...",
				}, ],
                indexMenuType: 1,
			};
		},
        computed: {
		    indexMenuInfoBackClasses() {
		        return `info-back-class-${this.indexMenuType}`;
            }
        },
		created() {
			if (this.$parent.getFooterType() === 'n1') {
				this.$router.push('/tree').catch(err => {
					err
				});
				this.$parent.footer(true, 'tree');
			} else {
				this.$parent.footer(true, 'tree');
				this.$data.footer_type = 'n2'
			}


		},
		mounted() {
			this.start();
			var that = this;
			var bslua = navigator.userAgent;
			if (bslua.indexOf('bsl') != -1) {
				that.down_show = false;
			}

		},
		methods: {
			getIputValue(index) {
				// console.log(index + 1 + "题" + this.radio);
				this.allRadio[index] = this.radio[index]; // 将数据存入提交给后台的数据中
				console.log(this.allRadio);
				// console.log(this.radio)
			},
			toBox(title = '', contain = '') {
				var newsBox = document.getElementsByClassName("modal")[0];
				newsBox.style.display = "block";

				var bodyBox = document.getElementsByClassName("body-box")[0];
				bodyBox.innerHTML = contain;
				var newsTitle = document.getElementsByClassName("news-title")[0];
				newsTitle.innerText = title;
			},
			checkin2() {
				Fetch('/user/sign').then((res) => {
					if(res.data.coss == 1){
								Dialog.alert({
								    title: '提示',
								    message: res.info,
								    showCancelButton: true,
								    confirmButtonText: "去认证",
								}).then(() => {
								    this.$router.push('/auth');
								}).catch(() => {

								})
					}else{
						this.sign_money = res.data.reward;
						this.new_sign_ok = true;
						this.$notify({
							background: '#07c160',
							message: '签到成功：已获得现金2元和8积分！'
						});
					}
				})
			},
			closeBox() {
				var newsBox = document.getElementsByClassName("modal")[0];
				newsBox.style.display = "none";
			},

			appdown_close() {
				this.data.app.is_disable = 'N';
			},
			goAd() {
				// this.close();
				// this.$router.push(this.ad.url).catch(err => {err});
				this.close();
				this.$router.push(this.ad.url);
			},
			close() {
				this.ad_show = false
			},
			start() {
				setTimeout(() => {
					var element = document.getElementById("app");
					element.scrollIntoView();
				}, 0)
				this.type = this.$parent.getFooterType();
				Fetch('/index/int').then(res => {
					this.ad = res.data.ad;
					this.data = res.data;

					if (res.data.ad.activity_status == 1) {
						this.ad_show = true
					} else {
						this.ad_show = false
					}
				});

				/* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

				Fetch('/index/banner', {
					type: 'banner'
				}).then(res => {
					this.banner = res.data;
				})
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
					width: schedule + '%'
				};
			},
			schedule_left(schedule) {
				if (schedule > 80) {
					return {
						left: (schedule - 30) + '%',
						color: '#fff'
					}
				} else {
					return {
						left: schedule.slice(0, 5) + '%'
					}
				}
			},
			handleTreeListItemClick(type = 1) {
				switch (type) {
					case 1:
						this.$router.push({name: 'qiandao'});
						break;
					case 2:
						this.$router.push({name: 'scratch_card'});
						break;
					case 3:
						this.$router.push({name: 'sport_event'});
						break;
					case 4:
						this.$router.push({name: 'start'});
						break;
					case 5:
						this.$router.push({name: 'prize'});
						break;
					case 6:
						this.$router.push({name: 'goods'});
						break;
                    case 7:
                        this.$router.push({name: 'item'});
                        break;
                    case 8:
                        this.$router.push({name: 'baoku'});
                        break;
					case 9:
                        this.$router.push({name: 'qiandao'});
                        break;
					case 10:
                        this.$router.push({name: 'alipay'});
                        break;
                    case 11:
                        this.$router.push({name: 'about'});
                        break;
                    case 12:
                        this.$router.push({name: 'auth'});
                        break;
                    case 13:
                        this.$router.push({name: 'share'});
                        break;
					case 14:
					    this.$router.push({name: 'wenjuan'});
					    break;	
				}
			},
            handleMenuSwitch(type) {
			    if (this.indexMenuType === type) return;
			    this.indexMenuType = type;
            },
			goToDetail() {
				if(this.indexMenuType == 1){
					this.handleTreeListItemClick(9);
				}
				if (this.indexMenuType == 2) {
					this.$router.push('/question_type')
				}
				if (this.indexMenuType == 3) {
					this.$router.push('/share')
				}
				if (this.indexMenuType == 4) {
					this.$router.push('/alipay')
				}
			}
		},
	};
</script>

<style lang="less" scoped>
	@import "tree";
</style>
