<template>
    <div class="investment-record-detail-container">
		<div class="zhye">
			<div class="apply-form-item">
			    <div class="apply-form-item-title" style="font-size: 17px;color: #0C1D34;font-weight: bold;">账户余额</div>
			    <div class="apply-form-item-info" style="color: #53B1F2;">{{data.user_money}}</div>
			</div>
			<div class="apply-form-item">
			    <div class="apply-form-item-title">投资金额</div>
			    <div class="apply-form-item-info"> {{data.money}}</div>
			</div>
			<div class="apply-form-item">
			    <div class="apply-form-item-title">预计收益</div>
			    <div class="apply-form-item-info">{{data.apr_money}}</div>
			</div>
			<div class="apply-form-item">
			    <div class="apply-form-item-title">投资时间</div>
			    <div class="apply-form-item-info">{{data.addtime_date}}</div>
			</div>
			<div class="apply-form-item">
			    <div class="apply-form-item-title">应收时间</div>
			    <div class="apply-form-item-info">{{data.end_time_date}}</div>
			</div>
		</div>
        <div class="record-detail-list">
            <div class="record-detail-list-box">
                <div class="investment-list-box" v-for="item in data.apr_plan" :key="item.id">
                   <!-- <div class="investment-list-line">
                        <div class="investment-list-line-top"></div>
                        <div class="investment-list-line-bottom"></div>
                    </div> -->
                    <div class="investment-list-info-box">
                        <div class="list-info-top">
                            <div class="list-info-top-left">应收时间：{{item.time1}}</div>
                            <div class="list-info-top-right">{{item.time1Copy != '0000-00-00' ? '完成' : '未完成'}}</div>
                        </div>
                        <div class="investment-list-info">
                            <div class="project-name-box">
                                <div class="project-name">{{ item.title }}</div>
                                <!-- <div class="status-icon" v-if="item.status == 1"></div> -->
								<div class="project-tag-box">
								    <div class="project-tag">第{{item.num}}期</div>
								</div>
							</div>
                            <div class="tlp">
								<div class="project-money">
								    <div class="project-money-left">投资金额</div>
									<span>{{item.money2}}</span>
								</div>
								<div class="project-money">
								    <div class="project-money-left">预计收益</div>
									<span>{{item.money2}}</span>
								</div>
							</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="record-detail-list-box"> -->
        <!--<div class="record-detail-list-item" v-for="item in data.apr_plan" :key="item.id">-->
        <!--    <div class="top">-->
        <!--        <div class="top-num">第{{item.num}}期</div>-->
        <!--        <div class="top-title">{{ item.title }}</div>-->
        <!--    </div>-->
        <!--    <div class="middle">-->
        <!--        <p class="middle-time">应收时间:{{item.time1Copy}}</p>-->
        <!--        &lt;!&ndash;<p class="middle-status">{{item.status == 1 ? '已完成' : '未完成'}}</p>&ndash;&gt;-->
        <!--    </div>-->
        <!--    <div class="bottom">-->
        <!--        <div class="bottom-left">-->
        <!--            <p class="bottom-money">{{item.money2}}</p>-->
        <!--            <p class="bottom-title">应收本金(元)</p>-->
        <!--        </div>-->
        <!--        <div class="bottom-right">-->
        <!--            <p class="bottom-money">{{item.money2}}</p>-->
        <!--            <p class="bottom-title">应收利息(元)</p>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--    <div class="list-item-right">{{item.status == 1 ? '已完成' : '未完成'}}</div>-->
            <!-- <div class="list-item-box">
                <div class="list-item-left">期号</div>
                <div class="list-item-right">{{item.num}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">应收本金</div>
                <div class="list-item-right">{{item.money2}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">应收利息</div>
                <div class="list-item-right">{{item.money1}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">应收时间</div>
                <div class="list-item-right">{{item.time1Copy}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">收益时间</div>
                <div class="list-item-right">{{item.time1Copy != '0000-00-00' ? item.time1Copy : '未完成'}}</div>
            </div>
            <div class="list-item-box">
                <div class="list-item-left">状态</div>
                <div class="list-item-right">{{item.status == 1 ? '已完成' : '未完成'}}</div>
            </div> -->
            <!--<div class="list-item-title">-->
            <!--    <div class="list-item-title-left">-->
            <!--        <div class="left-num">{{item.num}}</div>-->
            <!--    </div>-->
            <!--    <div class="list-item-title-right">{{item.status == 1 ? '已完成' : '未完成'}}</div>-->
            <!--</div>-->
            <!--<div class="list-item-info">-->
            <!--    <div>-->
            <!--        <div class="list-item-info-top topNum">{{item.money2}}</div>-->
            <!--        <div><span class="list-item-info-name littleBox">应收本金</span></div>-->
            <!--    </div>-->
            <!--    <div>-->
            <!--        <div class="list-item-info-top"><span class="list-item-info-name">应收利息</span>{{item.money1}}</div>-->
            <!--        <div><span class="list-item-info-name">收益时间</span>{{item.time1Copy != '0000-00-00' ? item.time1Copy : '未完成'}}</div>-->
            <!--    </div>-->
            <!--</div>-->
            <!--<div class="bottom-name"><span >应收时间</span>{{item.time1Copy}}</div>-->
        <!--</div>-->
        <!-- </div> -->
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        components: {},
        data() {
            return {
                data: {},
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
                Fetch('/index/interest', {id: this.$router.history.current.params.id}).then(res => {
                    if (res.data && res.data.apr_plan && res.data.apr_plan.length) {
                        res.data.apr_plan.forEach(item => {
                            item.time1Copy = item.time1 ? item.time1.split(' ')[0] : '';
                            item.time2Copy = item.time1 ? item.time2.split(' ')[0] : '';
                        });
                    }
                    this.data = res.data;
                })
            },
        }
    };
</script>

<style lang="less" scoped>
    @import "itemapr";
</style>
