<template>
    <div class="page">
        <template v-if="data.list && data.list.length > 0">
            <div :class="['card-item', select == k ? 'select' : '']" v-for="(v ,k) in data.list" :key="k" @click="selectCard(k)">
                <img class="bank-bg" src="../../assets/bank/bank_bg2.png" />
                <div class="bank-info">
                    <img class="bank-icon" src="../../assets/bank/icon2.png" />
                    <div class="bank-name">
						<span>{{v.bank}}</span>
						<span style="margin-top: 5px;">储蓄卡</span>
					</div>
					
                    <div class="edit" @click="delBank(v.id)">
						<img style="width: 20px;height: 20px;"src="../../assets/bank/edit.png" >
					</div>
                </div>
                <p class="card">{{editCardNum(v.account)}}</p>
            </div>
            <div class="add-bank-btn has-card" @click="addBank">添加银行卡</div>
        </template>
        <template v-else>
            <img src="../../assets/bank/bank2.png" class="none-bank-icon" />
            <!-- <p class="none-bank-text">暂无银行卡</p> -->
            <div class="add-bank-btn noCard" @click="addBank">添加银行卡</div>
        </template>
        <!-- <div class="header">
            <div class="head">
                <a @click="$router.back()" class="back"></a>
                银行卡
            </div>
        </div>
        <div class="bank_wrap">
            <div class="bank_title">
                <span class="info1">我的卡</span>
                <span class="info2">共{{data.count}}张</span>
            </div>
            <div class="ctn">
                <div class="item" v-for="(v,k) in data.list" :key="k">
                    <div class="logo bc"></div>
                    <div class="bank_info">
                        <div class="bank_name">{{v.bank}}</div>
                        <div class="bank_card">
                            <span class="bank_type">储蓄卡</span>
                            <span class="bank_number">{{v.account}}</span>
                        </div>
                    </div>
                    <span class="delete_btn" @click="delBank(v.id)">删除此卡</span>
                    <div class="big_logo bc"></div>
                </div>
            </div>
            <div class="addbank_box" @click="showAdd()">
                <span class="add_icon">+</span>
                <span class="add_info">新增卡</span>
            </div>
        </div>
        <div class="dock" v-if="is_show"></div>
        <div class="addbank_popup" v-if="is_show">
            <form method="post" class="form" @submit.prevent="handleSubmit">
                <div class="item">
                    <span class="icon icon_name"></span>
                    <input type="text" class="inp inp_name" v-model.trim="bank.bank" placeholder="请输入银行名称">
                </div>
                <div class="item">
                    <span class="icon icon_name"></span>
                    <input type="text" class="inp inp_number" v-model.trim="bank.area" placeholder="请输入支行名称">
                </div>
                <div class="item">
                    <span class="icon icon_number"></span>
                    <input type="text" class="inp inp_number" v-model.trim="bank.card" placeholder="请输入储蓄卡号">
                </div>

                <div class="btn_box">
                    <button type="submit" class="btn sbtn">提交</button>
                    <button type="button" class="btn cancel" @click="close">取消</button>
                </div>
            </form>
        </div> -->
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        data() {
            return {
                data: {},
                select: 0
                // bank: {
                //     card: '',
                //     area: '',
                //     bank:'',
                // },
                // is_show: false,
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            this.start();
        },
        methods: {
            delBank(id) {
                Fetch('/user/bank_remove', {id: id}).then(() => {
                    this.start()
                });
            },
            // close() {
            //     this.is_show = false
            // },
            // showAdd() {
            //     this.is_show = true;
            // },
            start() {

                Fetch('/user/bank').then(res => {
					console.log(res.data);
                    this.data = res.data;
                })
            },
            selectCard(i) {
                this.select = i
            },
            editCardNum(id) {
                const len = id.length
                const reLastNum = `${id.charAt(len - 1)}${id.charAt(len - 2)}${id.charAt(len - 3)}${id.charAt(len - 4)}`
                const newId = reLastNum.padEnd(len, '*').replace(/(.{4})/g, "$1 ")
                return newId.split('').reverse().join('')
            },
            // handleSubmit() {
            //     if (!this.bank.bank.replace(/\s/g, "")) {
            //         this.$notify("请输入银行名称");
            //         return;
            //     }
            //     // if (!this.bank.area.replace(/\s/g, "")) {
            //     //     this.$notify("请输入支行名称");
            //     //     return;
            //     // }
            //     if (!this.bank.card.replace(/\s/g, "")) {
            //         this.$notify("请输入银行卡号");
            //         return;
            //     }
            //     Fetch("/user/bank_add", {
            //         ...this.bank
            //     }).then(() => {
            //         this.$notify({
            //             background: '#07c160',
            //             message: '添加成功'
            //         });
            //         this.is_show = false;
            //         this.start();
            //     })
            // },
            addBank() {
                this.$router.push('/bank_add')
            }
        }
    };
</script>

<style lang="less" scoped>
.page{
    min-height: 100%;
    background-color: #F5F4FA;
    font-family: PingFang SC;
    border: 1px solid transparent;
    box-sizing: border-box;
    .none-bank-icon{
        width: 105px;
        // height: 97px;
        margin-top: 164px;
        margin-left: 135px;
    }
    .none-bank-text{
        font-size: 18px;
        font-weight: 500;
        color: #BFBFBF;
        text-align: center;
        margin-top: 31px;
    }
    .card-item{
        margin-top: 17px;
        margin-left: 14px;
        width: 347px;
        // height: 84px;
        overflow: hidden;
        position: relative;
        // border-radius: 13px;
        padding: 22px 24px 27px 28px;
        font-weight: bold;
        color: #FFFFFF;
        .bank-bg{
            position: absolute;
            width: 347px;
            // height: 183px;
            top: 0;
            left: 0;
            z-index: -1;
        }
        .bank-info{
            display: flex;
            align-items: center;
            .bank-icon{
                width: 36px;
                // height: 36px;
                // border-radius: 50%;
            }
            .bank-name{
				display: flex;
				flex-direction: column;
                margin-left: 10px;
               font-size: 13px;
                // font-family: PingFang SC;
                // font-weight: bold;
                color: #424242 ;
            }
            .edit{
                // margin-left: 180px;
				position: absolute;
				right: 20px;
                font-size: 14px;
                opacity: 0.5;
            }
        }
        .card{
            margin-top: 25px;
            // margin-right: 8px;
            text-align: right;
           font-size: 24px;
            font-family: inpinheiti;
            font-weight: bold;
            color: #424242 ;
        }
    }
    .select{
        height: 134px;
        // border-radius: 13px 13px 0px 0px;
    }
    .add-bank-btn{
        // width: 351px;
        // height: 43px;
        line-height: 43px;
        text-align: center;
        // background: linear-gradient(90deg, #3D8BFF 1%, #52A9FF 100%);
        // border-radius: 7px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FF7045;
        margin: 12px auto;
        
        width: 314px;
        height: 48px;
        background: url(../../assets/bank/btn.png) no-repeat;
		background-size: contain;
        border-radius: 7px 7px 7px 7px;
    }
    .has-card{
        margin-top: 23px;
    }
    .noCard{
        margin-top: 36px;
        // width: 223px;
       width: 314px;
       height: 48px;
       background: url(../../assets/bank/btn.png) no-repeat;
       background-size: contain;
        border-radius: 7px 7px 7px 7px;

    }
}

    // .bank_wrap {
    //     width: 94%;
    //     margin: 0 auto;
    // }

    // .bank_wrap .bank_title {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-align: baseline;
    //     -ms-flex-align: baseline;
    //     align-items: baseline;
    //     margin: 24px auto 18px auto;
    // }

    // .bank_wrap .bank_title .info1 {
    //     font-size: 20px;
    //     color: #343434;
    //     margin-right: 15px;
    // }

    // .bank_wrap .bank_title .info2 {
    //     font-size: 14px;
    //     color: #929292;
    // }

    // .bank_wrap .ctn {
    //     margin-bottom: 14px;
    //     -webkit-box-shadow: 0 1px 8px 0 #f1f1f1;
    //     box-shadow: 0 1px 8px 0 #f1f1f1;
    // }

    // .bank_wrap .ctn .item {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    //     position: relative;
    //     padding: 18px 15px 80px 15px;
    //     overflow: hidden;
    //     margin-top: -70px;
    //     border-radius: 6px;
    // }

    // .bank_wrap .ctn .item .logo {
    //     -webkit-box-flex: 0;
    //     -ms-flex: 0 0 36px;
    //     flex: 0 0 36px;
    //     height: 36px;
    //     background: #fff;
    //     border-radius: 100%;
    //     margin-right: 24px;
    //     border: 2px solid #fff;
    //     background-repeat: no-repeat;
    //     background-size: 100% 100%;
    //     background-position: center;
    // }

    // .bank_wrap .ctn .item .logo.abc {
    //     background-image: url(images/ABC.svg);
    // }

    // .bank_wrap .ctn .item .bank_info {
    //     -webkit-box-flex: 1;
    //     -ms-flex: 1 1 auto;
    //     flex: 1 1 auto;
    // }

    // .bank_wrap .ctn .item .bank_info .bank_name {
    //     font-size: 16px;
    //     margin-bottom: 8px;
    // }

    // .bank_wrap .ctn .item .bank_info .bank_card {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-pack: justify;
    //     -ms-flex-pack: justify;
    //     justify-content: space-between;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    // }

    // .bank_wrap .ctn .item .logo.bc {
    //     background-image: url(images/yl.svg);
    // }

    // .bank_wrap .ctn .item .bank_info .bank_card .bank_type {
    //     font-size: 16px;
    // }

    // .bank_wrap .ctn .item .bank_info .bank_card .bank_number {
    //     font-size: 14px;
    // }

    // .bank_wrap .ctn .item .delete_btn {
    //     width: 60px;
    //     height: 22px;
    //     line-height: 22px;
    //     text-align: center;
    //     font-size: 12px;
    //     color: #ffffff;
    //     border-radius: 6px 0 0 6px;
    //     position: absolute;
    //     right: 0;
    //     top: 12px;
    // }

    // .bank_wrap .ctn .item .big_logo {
    //     display: block;
    //     width: 120px;
    //     height: 120px;
    //     background-repeat: no-repeat;
    //     background-size: contain;
    //     background-position: center;
    //     position: absolute;
    //     right: -10px;
    //     top: 48px;
    //     opacity: 0.3;
    //     -webkit-filter: grayscale(100%);
    //     -moz-filter: grayscale(100%);
    //     -ms-filter: grayscale(100%);
    //     -o-filter: grayscale(100%);
    //     filter: grayscale(100%);
    //     -webkit-filter: gray;
    //     filter: gray;
    // }

    // .bank_wrap .ctn .item .big_logo.bc {
    //     background-image: url(images/yl.svg);
    // }

    // .bank_wrap .ctn .item:nth-child(odd) {
    //     background-image: -webkit-gradient(linear, left top, right top, from(#666666), to(#262627));
    //     background-image: -o-linear-gradient(left, #666666, #262627);
    //     background-image: linear-gradient(to right, #666666, #262627);
    // }

    // .bank_wrap .ctn .item:nth-child(odd) .bank_info {
    //     color: #efeff4;
    // }

    // .bank_wrap .ctn .item:nth-child(odd) .delete_btn {
    //     background: #e8c27d;
    // }

    // .bank_wrap .ctn .item:nth-child(even) {
    //     background-image: -webkit-gradient(linear, left top, right top, from(#eed3a2), to(#e8c27d));
    //     background-image: -o-linear-gradient(left, #eed3a2, #e8c27d);
    //     background-image: linear-gradient(to right, #eed3a2, #e8c27d);
    // }

    // .bank_wrap .ctn .item:nth-child(even) .bank_info {
    //     color: #323132;
    // }

    // .bank_wrap .ctn .item:nth-child(even) .delete_btn {
    //     background: #3a3a3a;
    // }

    // .bank_wrap .ctn .item:first-child {
    //     margin-top: 0;
    // }

    // .bank_wrap .addbank_box {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    //     width: 100%;
    //     height: 60px;
    //     padding-left: 24px;
    //     -webkit-box-shadow: 0 1px 8px 0 #f1f1f1;
    //     box-shadow: 0 1px 8px 0 #f1f1f1;
    // }

    // .bank_wrap .addbank_box .add_icon {
    //     font-size: 27px;
    //     font-weight: 300;
    //     margin-right: 14px;
    //     margin-top: -3px;
    // }

    // .bank_wrap .addbank_box .add_info {
    //     font-size: 16px;
    //     color: #373636;
    // }

    // .addbank_popup {
    //     position: fixed;
    //     z-index: 200;
    //     background: #fff;
    //     border-radius: 16px;
    //     width: 70%;
    //     top: 50%;
    //     left: 50%;
    //     -webkit-transform: translate(-50%, -50%);
    //     -ms-transform: translate(-50%, -50%);
    //     transform: translate(-50%, -50%);
    // }

    // .addbank_popup .form {
    //     padding: 58px 5.7% 40px 5.7%;
    // }

    // .addbank_popup .form .item {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    //     height: 36px;
    //     border-radius: 36px;
    //     background: #f5f5f5;
    //     margin-bottom: 25px;
    //     padding: 0 16px;
    // }

    // .addbank_popup .form .item .icon {
    //     -webkit-box-flex: 0;
    //     -ms-flex: 0 0 18px;
    //     flex: 0 0 18px;
    //     height: 18px;
    //     background-repeat: no-repeat;
    //     background-size: contain;
    //     background-position: center;
    //     margin-right: 8px;
    // }

    // .addbank_popup .form .item .icon.icon_name {
    //     background-image: url(images/bank_name.svg);
    // }

    // .addbank_popup .form .item .icon.icon_number {
    //     background-image: url(images/bank_number.svg);
    // }

    // .addbank_popup .form .item .inp {
    //     -webkit-box-flex: 1;
    //     -ms-flex: 1 1 auto;
    //     flex: 1 1 auto;
    //     font-size: 13px;
    //     color: #141415;
    // }

    // .addbank_popup .form .btn_box {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    //     -webkit-box-pack: justify;
    //     -ms-flex-pack: justify;
    //     justify-content: space-between;
    // }

    // .addbank_popup .form .btn_box .btn {
    //     -webkit-box-flex: 0;
    //     -ms-flex: 0 0 40%;
    //     flex: 0 0 40%;
    //     height: 28px;
    //     line-height: 28px;
    //     text-align: center;
    //     color: #fff;
    //     font-size: 12px;
    //     border-radius: 28px;
    //     background: #544a5e;
    // }

    // .addbank_popup .form .btn_box .btn.sbtn {
    //     background: #e9c47d;
    // }

    // .dock {
    //     position: fixed;
    //     top: 0;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     background: rgba(55, 54, 54, 0.6);
    //     z-index: 100;
    // }
</style>