<template>
  <div class="mains">
    <div class="verify_wrap">
      <form class="form">
        <div class="item">
          <div class="left">
            <!-- <img src="./images/people.png" /> -->
            <span>姓名</span>
          </div>
          <input
            type="text"
            v-model.trim="data.name"
            :readonly="data.is_auth === 'Y'"
            placeholder="请输入您的姓名"
          />
        </div>
        <div class="item">
          <div class="left">
            <!-- <img src="./images/people.png" /> -->
            <span>支付宝账号</span>
          </div>
          <input
            type="text"
            v-model.trim="data.alipay"
            :readonly="data.is_auth === 'Y'"
            placeholder="请输入您的支付宝账号"
          />
        </div>

        <Btn v-if="data.is_alipay !== 'N'" background="rgba(47, 128, 237, 1)" @click="handleSubmit">立即绑定</Btn>
      </form>
    </div>
    <div class="recharge-remark-box">
      <p>温馨提示:</p>
      <p>
        该绑定仅用于小额提现时系统自动转账到用户所需的支付宝账号；该绑定并非授权，不会自动扣费，请您放心使用。
      </p>
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
      money_info: "",
      money: "",
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
      Fetch("/user/alipay").then((res) => {
        this.data = res.data;
      });
    },
    handleSubmit() {
      if (!this.data.name) {
        this.$notify("请输入姓名");
        return;
      }

      if (!this.data.alipay) {
        this.$notify("请输入支付宝账号");
        return;
      }

      Fetch("/user/set_alipay", {
        ...this.data,
      }).then(() => {
        this.$notify({
          background: "#07c160",
          message: "操作成功",
        });
        this.$router.replace({
          path: this.$router.history.current.query.redirect || "/info",
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.item{
    background: #ffffff;
    // padding: 15px 14px 14px;
    height: 51px;
    padding-top: 18px;
    // padding-bottom: 16px;
    // padding: 21px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.14);
    display: flex;
    align-items: center;

    .left{
        width: 110px;
        // font-weight: 500;
        color: #000
        // display: flex;
        // align-items: center;
        // img{
        //     width: 16px;
        //     margin-right: 14px;
        // }
    }
    input{
        // width: 200px;
        // margin-left: 59px;
        // line-height: normal;
        // font-weight: 400;
        color: #A3A3A3;
    }
}
.recharge-remark-box {
  font-size: 12px;
  font-weight: 500;
  color: #1C1D38;
  line-height: 14px;
  display: flex;
  flex-direction: column;
  margin-top: 33px;
  padding: 0 12px;

  p {
    &:first-child {
      color: rgba(28, 29, 56, 1);
      margin-bottom: 4px;
      font-weight: 600;
    }
  }
}
.mains{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  background: url('~@/assets/hongxin/bg-支付宝绑定@2x.png') no-repeat;
  background-size: 100% 366px;
  background-color: rgba(242, 242, 242, 1);
}

    .verify_wrap {
      margin-top: 289px;
      width: 351px;
      background: #FFFFFF;
      border-radius: 10px;
    }

    .verify_wrap .form {
        display: block;
        width: 100%;
        padding-top: 13px;
    }

    .verify_wrap .form .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        border-bottom: 1px solid #EDEDED;
        font-size: 14px;
        padding: 6px 4.3% 6px 7.4%;
        // margin-bottom: 22px;
    }

    .verify_wrap .form .item .inp {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        text-align: right;
		padding-right:10px;
    }

    .verify_wrap .form .warming {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #D62C3A;
        padding: 19px 0 15px;
        text-align: center;
    }



    .verify_wrap .form .success_box {
        margin: 80px auto 40px auto;
    }

    .verify_wrap .form .success_box .ok {
        display: block;
        width: 68%;
        margin: 0 auto;
    }
    .btn {
        display: block;
        width: 351px;
        height: 43px;
        background: #023EFE;
        border-radius: 7px 7px 7px 7px;
       
        text-align: center;
        z-index: 1;
        margin: 0 auto;
        margin-bottom: 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
    }
</style>