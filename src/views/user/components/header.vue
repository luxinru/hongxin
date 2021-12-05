<template>
    <div>
        <!-- <div class="item-header header">
            <div class="item-header-icon">
                <van-nav-bar
                class="navbar"
                :fixed="true"
                :border="false"
                left-text=""
                :title="title"
                left-arrow
                @click-left="$router.go(-1)"
                />
            </div>
        </div> -->
        <div class="headerBox">
            <div class="header">
				<div class="head" >
					<van-icon class="iconLeft" name="arrow-left" @click="routerFun()"  />
					<span>{{title}}</span>
					<div>
						<!-- <img class="question" src="./image/question.png" alt="" @click="handleGoBaoKugz"> -->
					</div>
				</div>
				
			</div>
            <div class="money">{{money}}</div>
            <div class="tips">{{title == '充值详情'?'充值金额(元）':'账户余额(元）'}} </div>
        </div>
    </div>
  
</template>

<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        },
        money:{
            type:String,
            default:''
        }
    },
    methods:{
        routerFun(){
            this.$router.back()
        }
    }

}
</script>

<style lang="less" scoped>
    .item-header-icon {
        /deep/ .van-icon{
            color: #000;
        }
    }

    .headerBox{
        width: 100%;
        height: 302px;
        background-image: url(../../../assets/images/cash/headBac2.png);
        background-repeat: no-repeat;
        background-size: cover;
        margin: 0 auto 0;
        // padding: 32px;
        text-align: center;
        .money{
            font-size: 33px;
            font-family: DIN Alternate;
            font-weight: bold;
            color: #DEB55B;
            margin-top: 100px;
        }
        .tips{
            font-size: 15px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #DEB55B;
            line-height: 5px;
            margin-top: 16px;
        }
    }
	.head{
		display: flex;
		justify-content: space-between;
		padding: 0 13px;
        background-color: rgba(0, 0, 0, 0);
		border: none;
		color: #000;
		.iconLeft{
			position: relative;
			top: 12px;
			font-size: 22px;
		}
        
		.question{
			width: 19px;
		}
        >div,>i,>span{
            width: 150px;
            text-align: center;
        }
        >i{
            text-align: left;
        }

	}
</style>