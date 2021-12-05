<template>
	<div class="mobile">
		<div class="header">
			<div class="head">
                <div @click="$router.push('/tree')"><van-icon name="arrow-left" size="20" color="#ffffff" style="vertical-align: middle;"/></div>
				<!--<span class="back" @click="$router.push('/tree')"></span>-->
				<div>积分商城</div>
				<div></div>
			</div>
		</div>
		<div class="goods-header-box">
			 <div class="integral-info">
				 <p style="padding: 57px 0 19px 0;font-size: 33px;font-weight: bold;">{{mydata.integral}}</p>
				 <p>当前积分</p>
			</div>
		</div>
        <div class="goods-content-box">
            <!-- <div class="goods-content-img"><div class="goods-content-img-back"></div></div> -->
            <div class="my-integral-info-box">
                <!-- <img class="giftImg" src="./../../assets/images/shufeng/goods/gift.png" alt="" srcset=""> -->
               
                <div class="address-btn-box">
					<div class="address-btn" @click="$router.push('/qiandao')">
						<img src="./image/gs1.png" >
						<p>每日签到</p>
					</div>
					<div class="address-btn" @click="$router.push('/address')">
						<img src="./image/gs2.png" >
						<p>发货地址</p>
					</div>
                    <div class="address-btn" @click="$router.push('/integral')">
						<img src="./image/gs3.png" >
						<p>积分明细</p>
					</div>
                    <div class="address-btn" @click="$router.push('/order')">
						<img src="./image/gs4.png" >
						<p>我的订单</p>
					</div>
                </div>
            </div>
            
        </div>
		<div class="goodsBox">
			
			<!-- <div class="qd-list-title">签到好礼</div> -->
			<div class="qd-list" v-for="(item,j) in category_data.category" v-bind:style="{display: j === dh_index ? 'block' : 'none'}" :key="j">
				<div class="items" v-for="(item2,j_num) in item.list" :key="j_num" style="margin-bottom: 10px;">
					<!-- <div > -->
					<img :src="item2.img" />
					<div >
						<p class="name">{{item2.title}}</p>
						<p class="qd">限量500份</p>
						<div class="qd-box">
							<div class="qd-left">
								<p class="qd-title1">234人已领</p>
								<p class="qd-title2">{{item2.integral}} 积分</p>
							</div>
							<div class="btn" @click="category_btn(item2.id,dh_num[j][j_num])">立即兑换</div>
							</div>
						
						</div>
					<!-- </div> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Fetch from '../../utils/fetch';

	export default {
		name: "shop",
		data() {
			return {
				mydata: {},
				data: {},
				dh_index: 0,
				horn_block: false,
				category_data: {},
				is_sleep: false,
				show_water: true,
				show_manure: true,
				treeImg: '',
				dh_num: [],
				only_num: 1,
				sign_ok: false,
				new_sign_ok: false,
				shop_show: false,
				show_apple: false,
				rule_mask: false,
				add_res: false,
				only_money: false,
				money_icon_show: false,
				show_delay_animate: '',
				level_lc: 'lv2',
				horn_msg: '',
				jump_url: '/item',
				fly_go: '',
				hide_tree: [],
				progress: '0%',
				notice_num: 1,
				mp3: '',
				sign_money: 0,
				dh_btn_type: '',
				water_time: '每日0点—24点',
				water_rule: 'cs2',
				rule_dh: false,
				rule_msg: 'cs'
			};
		},
		created() {
			this.$parent.footer(false);
		},
		mounted() {
			setTimeout(function() {
				document.getElementById('app').style.marginBottom = 0;
			}, 100)
			this.mp3 = require('./image/didi.mp3');
			this.start();
			if (location.href.indexOf('openshop') != -1) {
				this.shop_show = true;
			}


			// $(window).resize(function(){
			// 	set();
			// });

			// set();
			// this.start();
		},
		methods: {
			start() {
				Fetch('/user/info').then(res => {
					this.mydata = res.data;
				})
				// 兑换信息
				Fetch('/index/goods_list').then(res => {

					this.category_data = res.data;
					console.log(this.category_data);
					for (var i = 0; i < res.data.category.length; i++) {
						this.dh_num.push([]);
						for (var j = 0; j < res.data.category[i].list.length; j++) {
							this.dh_num[i].push(1);
						};
					};
					if (res.data.exchange_rules.content || res.data.exchange_rules.title) {
						this.rule_msg = res.data.exchange_rules.content || res.data.exchange_rules.title;
					}
				});

			},
			category_btn(id, num) {
				Fetch('/index/shop_exchange', {
					gid: id,
					num: num
				}).then((res) => {
					this.$notify({
						background: '#07c160',
						message: res.info
					});
					this.start();
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.qd-box{
		margin-top: 20px;
		width: 220px;
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.qd-left{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.qd-title1{
			font-size: 10px;
			font-family: PingFang SC;
			color: #CCCCCC;
		}
		.qd-title2{
			font-size: 18px;
			font-family: PingFang SC;
			font-weight: bold;
			color: #F54029;
		}
	}
	.goodsBox{
		// width: 375px;
		// height: 437px;
		// background: #F6F8FD;
		margin-top: 20px;
		border-radius: 13px 13px 0px 0px;
		.qd-list{
			border-radius: 7px;
			background-color: #fff;
			// margin: 0 12px 80px;
			display: flex;
			flex-wrap: wrap;
			.items{
				width: 100%;
				// height: 224px;
				background: #FFFFFF;
				// box-shadow: 0px 3px 5px 0px rgba(44, 106, 231, 0.2);
				border-radius: 5px;
				padding-top: 28px;
				padding-bottom: 16px;
				padding: 28px 13px 16px;
				margin-bottom: 12px;
				display: flex;
				&:nth-child(2n) {
					margin-left: 7px;
				}
				img{
					width: 101px;
					height: 101px;
					margin-right: 20px;
					// margin-left: 50%;
					// transform: translateX(-50%);
				}
				.name{
					margin-top: 13px;
					font-size: 15px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #121D31;
					font-weight: bold;
				}
				.qd{
					width: 81px;
					height: 18px;
					line-height: 18px;
					text-align: center;
					background: rgba(245, 64, 41, 0);
					border: 1px solid #F54029;
					border-radius: 2px;
					font-size: 12px;
					font-family: PingFang SC;
					color: #F54029;
					margin-top: 10px;
					// span{
					// 	color: #3A7CFF;
					// 	margin-left: 7px;
					// }
				}
				.btn{
					width: 77px;
					height: 28px;
					line-height: 28px;
					background: #FFEBE8;
					border-radius: 7px;
					font-size: 13px;
					font-family: PingFang SC;
					font-weight: bold;
					color: #E9353E;
					text-align: center;
				}
			}
		}
	}
	.mobile {
        height: 100%;
		font-size: 16px;
        padding-bottom: 30px;
        font-family: PingFang SC;
		background-color: #F5F5F5;
	}
	.header .head{
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 750px;
		margin: 0 auto;
		z-index: 10;
		height: 50px;
		text-align: center;
		background: #1595cb;
		line-height: 50px;
		color: #fff;
		font-weight: 550;
		font-size: 5vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 13px;
	}
	.header .head .back {
	    display: inline-block;
	    width: 18px;
	    height: 18px;
	    /*background: url(../index/image/back.png) no-repeat center;*/
	    /*background-size: contain;*/
        background-image: none;
	    position: absolute;
	    top: 27px;
	    left: 20px;
	    z-index: 2;
	}
    .goods-header-box {
        width: 375px;
        height: 178px;
        background: linear-gradient(0deg, #41C9E7 0%, #0F93CB 100%);
		color: #fff;
		text-align: center;
    }
    .goods-content-box {
        // padding: 0 13px;
        // margin-top: -50px;
        .goods-content-img {
            height: 150px;
            overflow: hidden;
            border-radius: 7px;
            margin-bottom: 14px;
            > img {
                width: 100%;
                height: 100%;
                border-radius: 7px;
            }
            &-back {
                height: 150px;
                background-image: url("./../../assets/images/shufeng/goods/goods-1.png");
                background-size: cover;
                background-repeat: no-repeat;
            }
        }
        .my-integral-info-box {
            // width: 348px;
            // height: 90px;
            background: #FFFFFF;
            // box-shadow: 0px 3px 12px 0px rgba(39, 52, 125, 0.1);
            // border-radius: 7px;
            padding: 18px 18px 21px;
            position: relative;

            .giftImg{
                position: absolute;
                top: -45px;
                right: 10px;
                width: 81px;
            }
            .integral-info {
                font-size: 16px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #F63931;
                > span {
                    font-size: 13px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #1D1D1D;
                    padding-right: 10px;
                    vertical-align: middle;
                }
            }
            .address-btn-box {
                display: flex;
				justify-content: space-around;
                align-items: center;
                padding-top: 20px;
                .address-btn {
					img{
						width: 46px;
						height: 43px;
					}
					p{
						text-align: center;
						margin-top: 11px;        
						font-size: 12px;
						font-family: PingFang SC;
						font-weight: 400;
						color: #868686;
					}
                }
            }
        }
        .goods_list {
            background: #F8F9FC;
            // border-radius: 7px;
            margin-top: 13px;
            // padding: 4px 4px;
        }
    }
	.right_list {
        position: relative;
        height: 100%;
        border-radius: 7px;
        // padding-bottom: 55px;
        background: #FFFFFF;
        overflow: hidden;
        padding-top: 10px;
	}

	.shop_pic img {
		//width: 95%;
	}

	.shop_detail {
        text-align: center;
        .list_title {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #232323;
            line-height: 18px;
            padding: 4px 16px;
            text-align: left;
        }

	}
    .list-footer {
        // position: absolute;
        // bottom: 0;
        // left: 0;
        // right: 0;
        .list-integral {
            padding: 0 16px;
            // background: #F5D81A;
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ED1920;
            text-align: left;
        }
    }

	.dh_btn {
		// height: 32px;
        line-height: 29px;
        text-align: center;
        // background: #0F79FF;
        border-radius: 0 0 7px 7px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        width: 103px;
        height: 29px;
        background: #023EFE;
        border-radius: 15px;
        margin: 13px auto;
	}
</style>
