<template>
    <div class="project-item-container">
        <div class="project-img-box">
            <img :src="investInfo.thumb" alt=""/>
			<div class="qx">
				<span>期限（天）</span>
				<span style="margin-top:5px;font-size: 13px;font-weight: bold;">{{ investInfo.day }}</span>
			</div>
			<div class="zz">
				项目规模：{{ investInfo.total }}万元
			</div>
        </div>
        <div class="project-item-header">
            <div class="project-name">{{ investInfo.title }}</div>
            
        </div>
        <div class="project-tag-box">
            <div class="project-tag-item bq1">{{ investInfo.type_name }}</div>
            <div class="project-tag-item bq2">{{ investInfo.min }}起投</div>
        </div>
        <div class="project-info-list">
            <div class="project-info-list-item">
                <div class="project-info-list-item-bottom one-bottom">{{ investInfo.rate }}%</div>
                <div class="project-info-list-item-top">日利率</div>
            </div>
            <div class="project-info-list-item">
                <div class="project-info-list-item-bottom">{{ investInfo.apr_money }}</div>
                <div class="project-info-list-item-top">每日分红(元)</div>
            </div>
            <div class="project-info-list-item">
                <div class="project-info-list-item-bottom">{{ investInfo.sun_apr_money }} </div>
                <div class="project-info-list-item-top">总分红（元）</div>
            </div>
        </div>
        <div class="project-progress-warp">
            <div class="project-progress-box">
                <div class="project-progress" :style="schedule(investInfo.schedule)"></div>
            </div>
            <!-- <div class="progress-value">{{investInfo.schedule}}%</div> -->
        </div>
        <div class="project-footer">
            <div class="project-btn-box">
                <div class="project-btn">立即投资</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        investInfo: {
            type: Object,
            default: () => {
            },
        },
        showBtn: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        schedule(schedule) {
            return {
                width: schedule + '%',
            };
        },
    },
};
</script>
<style lang="less" scoped>
.project-item-container {
    background: #FFFFFF;
    box-shadow: 0px 0px 13px 0px rgba(0, 4, 26, 0.05);
    border-radius: 13px;
    margin-top: 13px;
    overflow: hidden;
    font-family: PingFang SC;
    .project-img-box {
		position: relative;
        height: 178px;
        //background-color: red;
        //border-radius: 13px;

        > img {
            width: 100%;
            height: 100%;
            //border-radius: 7px;
        }
    }
	.qx{
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		position: absolute;
		top:0;
		right: 20px;
		padding: 15px 13px;
		color:#fff;
		font-size: 11px;
		text-align: center;
		background: url(../images/qx.png) no-repeat;
		background-size: contain;
	}
	.zz{
		position: absolute;
		top: 144px;
		width: 100%;
		height: 35px;
		background: #000000;
		opacity: 0.8;
		color:#fff;
		font-size: 13px;
		line-height: 35px;
		padding-left: 15px;
	}
    .project-item-header {
        display: flex;
        justify-content: space-between;
        padding: 18px 24px 15px 15px;
        .project-name {
            font-size: 15px;
            font-weight: bold;
            color: #333B4C;
            padding-right: 10px;
            line-height: 20px;
        }

        .project-number {
            height: 18px;
            line-height: 18px;
            padding: 0 8px;
            background: #0F79FF;
            border-radius: 3px;
            font-size: 10px;
            font-weight: 400;
            color: #FFFFFF;
        }
    }
	
    .project-tag-box {
        display: flex;
        align-items: center;
        padding: 0px 24px 15px 15px;

        .project-tag-item {
            height: 33px;
            line-height: 33px;
            text-align: center;
            font-size: 11px;
            font-weight: 500;
            color: #fff;
            margin-right: 10px;
        }
		.bq1{
			width: 194px;
			background: url(../images/bq1.png) no-repeat;
			background-size: contain;
		}
		.bq2{
			width: 138px;
			background: url(../images/bq2.png) no-repeat;
			background-size: contain;
		}
    }

    .project-info-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px 21px 15px;

        &-item {
            &-top {
                font-size: 13px;
                font-weight: 500;
                color: #7F848F;
                padding-top: 9px;
            }

            &-bottom {
                font-size: 25px;
                font-weight: bold;
                color: #333B4C;
                >span {
                    font-size: 13px;
                }

                &.one-bottom {
                    color: #EE4034;
                }
            }
        }
    }

    .project-progress-warp {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 19px 17px;
        .project-progress-box {
            flex: 1;
            height: 8px;
            border-radius: 4px;
            border: 1px solid #FF7D4D;
            background-color: #fff;

            .project-progress {
                height: 6px;
                border-radius: 4px;
                background-color: #FF7D4D;
            }
        }
        .progress-value {
            width: auto;
            font-size: 12px;
            font-weight: 500;
            color: #023EFE;
            padding-left: 12px;
        }
    }

    .project-footer {
        padding: 0 19px 16px;
        .project-btn-box {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .project-size {
                font-size: 13px;
                font-weight: 500;
                color: #3E3E3E;
                > span {
                    color: #023EFE;
                }
            }

            .project-btn {
				margin:0 auto;
                width: 216px;
                height: 47px;
                background: #FF6D42;
                border-radius: 23px;
                line-height: 47px;
                text-align: center;
                font-size: 13px;
                font-weight: 400;
                color: #FFFFFF;
            }
        }
    }
}
</style>
