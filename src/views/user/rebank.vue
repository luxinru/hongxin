<template>
    <div class="recharge-centre-container">
        <!-- <div class="recharge-centre-info"> -->
            <!-- <div class="recharge-centre-info-header-box">
                <div class="recharge-centre-info-header">
                    <div>转账金额</div>
                    <div class="info-header-money">{{money}}</div>
                </div>
            </div> -->
            <!-- <div class="recharge-centre-title-box">
                <div class="recharge-centre-title-line"></div>
                <div>付款信息</div>
            </div> -->
        <!-- <div class="money-cont">
            <p class="title">充值金额</p>
            <p class="money">{{money}}</p>
        </div> -->
         <headers title="充值详请" :money='money'  />
        <div class="main">
            <div class="recharge-centre-info-form-box">
                <!-- <div class="recharge-centre-info-form"> -->
                <div class="info-form-item infoBox">
                    <div class="info-form-item-left">收款银行</div>
                    <div class=" infoRight">
                        <div>{{bank_name}}</div>
                        <!-- <div class="right-icon"></div> -->
                    </div>
                </div>
                <div class="info-form-item">
                    <div class="info-form-item-left">收款人</div>
                    <div class="info-form-item-right rightFlex">
                        
                        <div class="copy-cont" v-clipboard="() => bank_user" v-clipboard:success="copy">
                            <img src="./images/sf/copy2.png" />
                            <span class="copyText">复制</span>
                        </div>
                        <span class="fontcolor">{{bank_user}}</span>
                        <!-- <div class="right-icon" v-clipboard="() => bank_user" v-clipboard:success="copy"></div>
                        <span class="copyText" v-clipboard="() => bank_user" v-clipboard:success="copy">复制</span> -->
                    </div>
                </div>
                <div class="info-form-item">
                    <div class="info-form-item-left">收款账号</div>
                    <div class="info-form-item-right">
                        <!-- <div>{{bank_card}}</div> -->
                        <span>{{bank_card}}</span>
                        <div class="copy-cont" v-clipboard="() => bank_card" v-clipboard:success="copy">
                            <img src="./images/sf/copy2.png" />
                            <span class="copyText">复制</span>
                        </div>
                        <!-- <div class="right-icon" v-clipboard="() => bank_card" v-clipboard:success="copy"></div>
                        <span class="copyText" v-clipboard="() => bank_card" v-clipboard:success="copy">复制</span> -->
                    </div>
                </div>
                <div class="info-form-item">
                    <div class="info-form-item-left">付款人</div>
                    <div class="info-form-item-right">
                        <input type="text" class="remark-input" v-model="pay_user" placeholder="请输入付款人"/>
                    </div>
                </div>
                <div class="info-form-item">
                    <div class="info-form-item-left">转账附言</div>
                    <div class="info-form-item-right">
                        <input type="text" class="remark-input" v-model="pay_remark" placeholder="请输入转账附言"/>
                    </div>
                </div>
                <!-- </div> -->
                <div class="precautions-text">注意:请复制下面专属账号,打开您的网银或手机银行进行转账汇款!</div>
            </div>
            <!-- <img src="./images/sf/step.png" class="step" /> -->
                <!-- <div class="stepBox">
                    <div class="everyStep">
                        <div class="numB">1</div>
                        <div class="text">打开手机银行APP或支付宝</div>
                        <div class="linef"></div>
                    </div>
                    <div class="everyStep">
                        <div class="numB">2</div>
                        <div class="text">转账{{money}}元到{{bank_name}}（{{bank_user}}）</div>
                        <div class="linef"></div>
                    </div>
                    <div class="everyStep">
                        <div class="numB">3</div>
                        <div class="text">确认转账成功，点击下面按钮提交审核</div>
                    </div>
                </div> -->

                <!-- <div class="transfer-instructions">*如何用微信/付宝银行卡充值说明(重要)</div> -->
            <div class="info-form-btn" @click="submit">确认</div>
                
            
            <!-- </div> -->
        </div>
        <!-- </div> -->
    </div>
</template>
<script>
    import Vue from "vue";
    import {NavBar, Button} from "vant";
    import Fetch from '../../utils/fetch'
    import Clipboard from 'v-clipboard'
    import headers from './components/header.vue'
    Vue.use(NavBar).use(Button).use(Clipboard);
    export default {
        components: {headers},
        data() {
            return {
                bank_name: '',
                bank_user: '',
                bank_card: '',
				bank_remark: '',
                pay_user: '',
                pay_remark: '',
                money: 0,
				rid: 0
            }
        },
        mounted() {
            this.money = this.$route.query.money;
            this.getData();
        },
        methods: {
            onClickLeft() {
                this.$router.replace('/recharge')
            },
            copy() {
                this.$notify({
                    background: '#07c160',
                    message: '复制成功'
                })
            },
            submit() {
                Fetch("/user/bank_apply", {
                    money: this.money,
                    remark: this.pay_remark,
                    name: this.pay_user,
					rid: this.rid
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '提交成功'
                    });
                    this.$router.push('/user').catch (err => {});;
                })
            },
            getData() {
                Fetch("/user/recharge_type",{type: this.$route.query.type,money:this.$route.query.money}).then(res => {
                    this.bank_user = res.data.bank_user;
                    this.bank_card = res.data.bank_card;
                    this.bank_name = res.data.bank_name;
					this.bank_remark = res.data.bank_remark;
					this.rid = res.data.rid
                })
            },
        }
    }
</script>
<style lang="less" scoped>
 .fontcolor{
    margin-right: 10px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #767676;
}
.recharge-centre-container{
    background-color: #F5F5F5;
    // padding-top: 20px;
    font-family: PingFang SC;
    .money-cont{
        height: 147px;
        background-image: url('./images/sf/money_bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        padding-top: 44px;
        color: #FFFFFF;
        .title{
            font-size: 13px;
            font-weight: 500;
        }
        .money{
            font-size: 33px;
            font-family: DIN Alternate;
            font-weight: bold;
            color: #DEB55B;
            margin-top: 17px;
        }
    }
    .main{
        margin-top: -25px;
        background-color: #F5F5F5;
        padding: 13px;
        .recharge-centre-info-form-box{
			margin-top: 40px;
            background-color: #FFFFFF;
            border-radius: 13px;
            padding: 0 20px;
            .info-form-item{
                padding: 18px 0;
                display: flex;
                align-items: center;
                border-bottom: solid 1px #E9EAEC;
                .info-form-item-left{
                    font-size: 15px;
                    font-weight: 400;
                    color: #848486;
                    width: 90px;
                    flex-shrink: 0;
                }
                .info-form-item-right{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 15px;
                    font-weight: 400;
                    color: #000000;
                    width: 100%;
                    .copy-cont{
                        display: flex;
                        align-items: center;
                        img{
                            width: 14px;
                            height: 15px;
                        }
                        span{
                            font-size: 13px;
                            font-weight: 400;
                            text-decoration: underline;
                            color: #FF7045;
                            margin-left: 4px;
                        }
                       
                    }
                }
            }
            .infoBox{
                justify-content: space-between;
            }
            .infoRight{
                font-size: 15px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #767676;
            }
            .rightFlex{
                flex-direction:row-reverse;
                justify-content: end !important;
            }
            .precautions-text{
                font-size: 13px;
                font-family: PingFang SC;
                font-weight: 400;
                text-decoration: underline;
                color: #80838E;
                line-height: 18px;
                margin-top: 10px;
                padding-bottom: 20px;
            }
        }
        .step{
            width: 100%;
            margin-top: 13px;
        }
        .info-form-btn{
           width: 306px;
            height: 52px;
            background: #FF7045;
            border-radius: 26px;
            line-height: 52px;
            // background-color: #0F79FF;
            // border-radius: 13px;
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            color: #FFFFFF;
            margin: 17px auto;
        }
    }
}
    // .stepBox{
    //     padding: 13px 0;
    //     .everyStep{
    //         position: relative;
    //         display: flex;
    //         justify-content: flex-start;
    //         margin-top: 10px;
    //         .numB{
    //             width: 22px;
    //             height: 22px;
    //             background: #3574F1;
    //             border-radius: 50%;
    //             font-size: 16px;
    //             font-family: PingFang SC;
    //             font-weight: 500;
    //             color: #FFFFFF;
    //             line-height: 22px;
    //             text-align: center;
    //             position: relative;
    //             top: 12px;
    //         }
    //         .linef{
    //             width: 1px;
    //             height: 25px;
    //             background: #3574F1;
    //             position: absolute;
    //             left: 11px;
    //             bottom: -16px;
    //         }
    //         .text{
    //             // display: inline-block;
    //             background-image: url('../../assets/images/step.png');
    //             background-repeat: no-repeat;
    //             background-size: cover;
    //             font-size: 15px;
    //             font-family: PingFang SC;
    //             font-weight: 400;
    //             color: #212121;
    //             width: 300px;
    //             height: 46px;
    //             line-height: 46px;
    //             padding-left: 27px;
    //             margin-left: 11px;
    //             flex: 1;
    //         }
  

    //     }

    // }
    // .copyText{
    //     font-size: 13px;
    //     font-family: PingFang SC;
    //     font-weight: 400;
    //     text-decoration: underline;
    //     color: #3E8CFF; 
    //     margin-left: 4px;
    // }
    // .recharge-centre-container {
    //     .recharge-centre-info {
    //         padding-bottom: 30px;
    //         .recharge-centre-info-header-box {
    //             // padding: 10px 13px 10px;
                
    //             background-color: #fff;
    //             .recharge-centre-info-header {
    //                 display: flex;
    //                 flex-direction: column;
    //                 height: 138px;
    //                 padding: 38px 14px;
    //                 background: #3574F1;
    //                 font-size: 17px;
    //                 color: #ffffff;
    //                 border-radius: 4px;
    //                 .info-header-money {
    //                     font-size: 30px;
    //                     font-family: PingFang SC;
    //                     font-weight: bold;
    //                     color: #FFFFFF;
    //                     margin-top: 15px;
    //                 }
    //             }
    //         }
    //         .recharge-centre-title-box {
    //             display: flex;
    //             align-items: center;
    //             padding: 15px 13px;
    //             background-color: #F4F4F4;
    //             font-size: 16px;
    //             color: #676767;
    //             .recharge-centre-title-line {
    //                 width: 3px;
    //                 height: 10px;
    //                 background-color: #D9A973;
    //                 margin-right: 10px;
    //             }
    //         }
    //         .right-icon {
    //             width: 11px;
    //             height: 12px;
    //             background-image: url("./../../assets/images/recharge-img/juchuan-1.png");
    //             background-size: cover;
    //             background-repeat: no-repeat;
    //             margin-left: 7px;
    //         }
    //         .recharge-centre-info-form-box {
    //             padding: 20px 29px 0;
    //             background: #FFFFFF;
    //             border-radius: 13px 13px 0px 0px;
    //             position: relative;
    //             top: -12px;
    //             .recharge-centre-info-form {
    //                 .info-form-item {
    //                     display: flex;
    //                     justify-content: space-between;
    //                     align-items: center;
    //                     padding-bottom: 18px;
    //                     margin-bottom: 16px;
    //                     border-bottom: 1px solid #F5F4FA;
    //                     font-size: 14px;
    //                     color: #212121;
    //                     &-left {
    //                         width: 70px;
    //                         margin-right: 20px;
    //                     }
    //                     &-right {
    //                         flex: 1;
    //                         display: flex;
    //                         align-items: center;
    //                         text-align: left;
                            
    //                         .remark-input {
    //                             width: 100%;
    //                         }
    //                     }
    //                 }
    //             }
    //             .transfer-instructions {
    //                 font-size: 13px;
    //                 font-family: PingFang SC;
    //                 font-weight: 400;
    //                 text-decoration: underline;
    //                 color: #3E8CFF;
    //                 text-decoration: underline;
    //                 margin-bottom: 24px;
    //             }
    //             .info-form-btn {
    //                 width: 348px;
    //                 height: 47px;
    //                 background: linear-gradient(-90deg, #3471F1, #47DDF5);
    //                 border-radius: 24px 24px 24px 24px;
    //                 // height: 41px;
    //                 line-height: 47px;
    //                 text-align: center;
    //                 // color: #6A532C;
    //                 font-size: 16px;
    //                 // background: linear-gradient(-90deg, #EBD18F 0%, #F4E5BD 100%);
    //                 // border-radius: 4px;
    //                 margin-bottom: 18px;
    //                 position: fixed;
    //                 bottom: 0;
    //                 left: 13px;
    //                 color: #fff;
    //             }
    //             .precautions-text {    
    //                 font-size: 13px;
    //                 font-family: PingFang SC;
    //                 font-weight: 400;
    //                 text-decoration: underline;
    //                 color: #3E8CFF;
    //                 line-height: 18px;
    //             }
    //             .tipsInfo{  
    //                 font-size: 16px;
    //                 font-family: PingFang SC;
    //                 font-weight: 500;
    //                 color: #000000;
    //                 // line-height: 18px;  
    //                 margin-bottom: 17px; 
    //             }
    //         }
    //     }
    // }
    /*.container {*/
    /*    position: fixed;*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    min-height: 100%;*/
    /*    //background: #8b50f8 url('./images/bg.png') no-repeat left 45px;*/
    /*    background-size: contain;*/
    /*    padding-top: 45px;*/

    /*    .header {*/
    /*        position: fixed;*/
    /*        width: 100%;*/
    /*        top: 0;*/
    /*    }*/

    /*    .money {*/
    /*        background-color: #fff;*/
    /*        padding: 20px 20px;*/
    /*        border-radius: 8px;*/
    /*        margin: 15px;*/
    /*        margin-top: 20px;*/
    /*        font-size: 14px;*/
    /*        display: flex;*/
    /*        align-items: center;*/
    /*        justify-content: space-between;*/

    /*        .inp {*/
    /*            font-size: 24px;*/

    /*            > span {*/
    /*                font-size: 14px;*/
    /*                display: inline-block;*/
    /*                margin-left: 10px;*/
    /*            }*/
    /*        }*/
    /*    }*/

    /*    .infos {*/
    /*        background-color: #fff;*/
    /*        border-radius: 8px;*/
    /*        margin: 15px;*/
    /*        margin-top: 20px;*/
    /*        font-size: 14px;*/

    /*        > div, label {*/
    /*            display: flex;*/
    /*            width: 100%;*/
    /*            height: 40px;*/
    /*            line-height: 40px;*/
    /*            padding: 0 15px;*/
    /*            align-items: center;*/
    /*            justify-content: space-between;*/
    /*        }*/

    /*        .copy {*/
    /*            color: #ffffff;*/
    /*            width: 50px;*/
    /*            border-radius: 10em;*/
    /*            background: rgb(125, 81, 252);*/
    /*            height: 25px;*/
    /*            line-height: 10px;*/
    /*        }*/
    /*    }*/

    /*    > p {*/
    /*        font-size: 12px;*/
    /*        line-height: 1.8;*/
    /*        margin: 0 15px;*/
    /*        color: #c1c1c1;*/
    /*    }*/
    /*}*/
</style>
