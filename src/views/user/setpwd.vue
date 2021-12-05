<template>
    <div class="page">
        <!-- <div class="header">
            <div class="head">
                <router-link to="/account" class="back"></router-link>
                设置登录密码
            </div>
        </div>
        <div class="resetpaypwd_wrap">
            <form class="form" @submit.prevent="handleSubmit">
                <label class="item">
                    <span class="info">旧密码</span>
                    <input type="password" class="inp oldpwd" v-model.trim="passwd" placeholder="请输入">
                </label>
                <label class="item">
                    <span class="info">新密码</span>
                    <input type="password" class="inp newpwd" v-model.trim="npasswd" placeholder="请输入">
                </label>
                <label class="item">
                    <span class="info">确认新密码</span>
                    <input type="password" class="inp confirm_newpwd" v-model.trim="snpasswd" placeholder="请输入">
                </label> -->
<!--                <div class="forget_box">-->
<!--                    <router-link to="/forgetpwd" class="forget"><span class="icon">&nbsp;?</span><span class="info">忘记密码</span></router-link>-->
<!--                </div>-->
                <!-- <button type="submit" class="sbtn">确定修改</button>
            </form>
        </div> -->

        <!-- <div class="header">
            <img src="../../assets/icons/back_black.png" @click="$router.back()" class="back">
            <p>设置登录密码</p>
        </div> -->
        <div class="main">
            <div class="item">
                <div class="left">
                    <!-- <img src="./images/login-icon.png" /> -->
                    <span>旧密码</span>
                </div>
                <input type="password" v-model.trim="passwd" placeholder="请输入您的密码">
            </div>
            <div class="item">
                <div class="left">
                    <!-- <img src="./images/login-icon.png" /> -->
                    <span>登录密码</span>
                </div>
                <input type="password" v-model.trim="npasswd" placeholder="请输入新的密码">
            </div>
            <div class="item">
                <div class="left">
                    <!-- <img src="./images/name-icon.png" /> -->
                    <span>确认密码</span>
                </div>
                <input type="password" v-model.trim="snpasswd" placeholder="请再次输入密码">
            </div>
        </div>
        <div class="btn" @click="handleSubmit">确认修改</div>
    </div>
</template>

<script>

    import Fetch from '../../utils/fetch'

    export default {
        name: "index",
        components: {},
        data() {
            return {
                passwd: '',
                npasswd: '',
                snpasswd: '',
            };
        },
        created() {
            this.$parent.footer(false);
        },
        mounted() {
            //this.start();
        },
        methods: {
            handleSubmit() {

                if (!this.passwd) {
                    this.$notify("请输入登录密码");
                    return;
                }

                if (!this.npasswd) {
                    this.$notify("请输入新登录密码");
                    return;
                }

                if (!this.snpasswd) {
                    this.$notify("请输入确认密码");
                    return;
                }

                if (this.npasswd !== this.snpasswd) {
                    this.$notify("新密码和确认密码不一致");
                    return;
                }

                Fetch("/user/repasswd", {
                    passwd: this.passwd,
                    npasswd: this.npasswd
                }).then(() => {
                    this.$notify({
                        background: '#07c160',
                        message: '修改成功'
                    });
                    this.$router.back();
                });
            }
        }
    };
</script>

<style lang="less" scoped>

.page{
    min-height: 100%;
    background-color: #F5F4FA;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 400;
    // padding-top: 13px;
    // .header{
    //     position: relative;
    //     background-color: white;
    //     .back{
    //         position: absolute;
    //         width: 9px;
    //         height: 17px;
    //         top: 20px;
    //         left: 15px;
    //     }
    //     p{
    //         text-align: center;
    //         font-size: 17px;
    //         font-weight: bold;
    //         color: #000000;
    //         line-height: 57px;
    //     }
    // }
    .main{
        // box-sizing: border-box;
        // margin-top: 12px;
        background-color: white;
        padding: 0 12px;
        // font-size: 16px;
        // border-radius: 13px;
        // font-weight: 400;
        // color: #000000;
        .item{
            // padding: 21px 0;
            padding-bottom: 16px;
            padding-top: 18px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.14);
            display: flex;
            align-items: center;
            &:last-child{
                border-bottom: none;
            }
            .left{
                width: 110px;
                // font-weight: 500;
                color: #000;
                // display: flex;
                // align-items: center;
                // img{
                //     width: 14px;
                //     height: 17px;
                //     margin-right: 14px;
                // }
            }
            input{
                // margin-left: 44px;
                // line-height: normal;
                // font-weight: 400;
                color: #A3A3A3;
            }
        }
        // .new-psw-info{
        //     padding-bottom: 16px;
        //     padding-top: 18px;
        //     // padding: 15px;
        //     border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        //     input{
        //         margin-left: 44px;
        //         line-height: normal;
        //     }
        // }
        // .confirm-psw-info{
        //     padding-bottom: 16px;
        //     padding-top: 18px;
        //     // padding: 15px;
        //     input{
        //         margin-left: 15px;
        //         line-height: normal;
        //     }
        // }
    }
    .btn{
        width: 351px;
        line-height: 43px;
        background: linear-gradient(-16deg, #3280E6 0%, #06AEE3 100%);
        border-radius: 24px 24px 24px 24px;
        text-align: center;
        margin-top: 16px;
        margin-left: 12px;
        font-size: 16px;
        color: #FFFFFF;
    }
}
    // .resetpaypwd_wrap .form {
    //     display: block;
    //     width: 92.8%;
    //     margin: 0 auto;
    //     padding-top: 15px;
    // }

    // .resetpaypwd_wrap .form .item {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-pack: justify;
    //     -ms-flex-pack: justify;
    //     justify-content: space-between;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    //     width: 100%;
    //     position: relative;
    //     height: 48px;
    // }

    // .resetpaypwd_wrap .form .item .info {
    //     font-size: 15px;
    //     color: #303442;
    // }

    // .resetpaypwd_wrap .form .item .inp {
    //     font-size: 15px;
    //     color: #303442;
    //     text-align: right;
    //     padding: 0 16px;
    //     line-height: 17px;
    // }

    // .resetpaypwd_wrap .form .item:after {
    //     position: absolute;
    //     content: "";
    //     width: 100%;
    //     border-bottom: 1px solid #f3f3f3;
    //     left: 0;
    //     bottom: 0;
    // }

    // .resetpaypwd_wrap .form .forget_box {
    //     width: 100%;
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-pack: end;
    //     -ms-flex-pack: end;
    //     justify-content: flex-end;
    //     margin: 16px auto 26px auto;
    // }

    // .resetpaypwd_wrap .form .forget_box .forget {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    // }

    // .resetpaypwd_wrap .form .forget_box .forget .icon {
    //     display: -webkit-box;
    //     display: -ms-flexbox;
    //     display: flex;
    //     width: 18px;
    //     height: 18px;
    //     -webkit-box-align: center;
    //     -ms-flex-align: center;
    //     align-items: center;
    //     -webkit-box-pack: center;
    //     -ms-flex-pack: center;
    //     justify-content: center;
    //     font-size: 16px;
    //     color: #fff;
    //     background: #e9c37d;
    //     border-radius: 18px;
    //     margin-right: 6px;
    // }

    // .resetpaypwd_wrap .form .forget_box .forget .info {
    //     font-size: 13px;
    //     color: #303442;
    // }

    // .resetpaypwd_wrap .form .sbtn {
    //     display: block;
    //     width: 100%;
    //     height: 42px;
    //     line-height: 42px;
    //     text-align: center;
    //     background: #e8c27d;
    //     border-radius: 2px;
    //     font-size: 16px;
    //     color: #fff;
    //     -webkit-box-shadow: 0 2px 10px 0 #f2dbb2;
    //     box-shadow: 0 2px 10px 0 #f2dbb2;
    // }
</style>