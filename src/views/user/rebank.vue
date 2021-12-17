<template>
  <div class="page_root">
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
    <headers title="充值详情" :money="money" />
    <div class="main">
      <div class="recharge-centre-info-form-box">
        <!-- <div class="recharge-centre-info-form"> -->
        <div class="info-form-item infoBox">
          <div class="info-form-item-left">收款银行</div>
          <div class="infoRight">
            <div>{{ bank_name }}</div>
            <!-- <div class="right-icon"></div> -->
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">收款人</div>
          <div class="info-form-item-right rightFlex">
            <div
              class="copy-cont"
              v-clipboard="() => bank_user"
              v-clipboard:success="copy"
            >
              <img src="./images/sf/copy2.png" />
              <span class="copyText">复制</span>
            </div>
            <span class="fontcolor">{{ bank_user }}</span>
            <!-- <div class="right-icon" v-clipboard="() => bank_user" v-clipboard:success="copy"></div>
                        <span class="copyText" v-clipboard="() => bank_user" v-clipboard:success="copy">复制</span> -->
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">收款账号</div>
          <div class="info-form-item-right">
            <!-- <div>{{bank_card}}</div> -->
            <span>{{ bank_card }}</span>
            <div
              class="copy-cont"
              v-clipboard="() => bank_card"
              v-clipboard:success="copy"
            >
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
            <input
              type="text"
              class="remark-input"
              v-model="pay_user"
              placeholder="请输入付款人"
            />
          </div>
        </div>
        <div class="info-form-item">
          <div class="info-form-item-left">转账附言</div>
          <div class="info-form-item-right">
            <input
              type="text"
              class="remark-input"
              v-model="pay_remark"
              placeholder="请输入转账附言"
            />
          </div>
        </div>
        <!-- </div> -->
        <div class="precautions-text">
          注意:请复制下面专属账号,打开您的网银或手机银行进行转账汇款!
        </div>
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
import Vue from 'vue'
import { NavBar, Button } from 'vant'
import Fetch from '../../utils/fetch'
import Clipboard from 'v-clipboard'
import headers from './components/header.vue'
Vue.use(NavBar).use(Button).use(Clipboard)
export default {
  components: { headers },
  data() {
    return {
      bank_name: '',
      bank_user: '',
      bank_card: '',
      bank_remark: '',
      pay_user: '',
      pay_remark: '',
      money: 0,
      rid: 0,
    }
  },
  mounted() {
    this.money = this.$route.query.money
    this.getData()
  },
  methods: {
    onClickLeft() {
      this.$router.replace('/recharge')
    },
    copy() {
      this.$notify({
        background: '#07c160',
        message: '复制成功',
      })
    },
    submit() {
      Fetch('/user/bank_apply', {
        money: this.money,
        remark: this.pay_remark,
        name: this.pay_user,
        rid: this.rid,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '提交成功',
        })
        this.$router.push('/user').catch((err) => {})
      })
    },
    getData() {
      Fetch('/user/recharge_type', {
        type: this.$route.query.type,
        money: this.$route.query.money,
      }).then((res) => {
        this.bank_user = res.data.bank_user
        this.bank_card = res.data.bank_card
        this.bank_name = res.data.bank_name
        this.bank_remark = res.data.bank_remark
        this.rid = res.data.rid
      })
    },
  },
}
</script>
<style lang="less" scoped>
.fontcolor {
  margin-right: 10px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #767676;
}
.page_root {
  padding: 0;
  .money-cont {
    height: 147px;
    background-image: url('./images/sf/money_bg.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: center;
    padding-top: 44px;
    color: #ffffff;
    .title {
      font-size: 13px;
      font-weight: 500;
    }
    .money {
      font-size: 33px;
      font-family: DIN Alternate;
      font-weight: bold;
      color: #deb55b;
      margin-top: 17px;
    }
  }
  .main {
    background-color: #f5f5f5;
    padding: 13px;
    .recharge-centre-info-form-box {
      margin-top: -48px;
      background-color: #ffffff;
      border-radius: 13px;
      padding: 0 20px;
      .info-form-item {
        padding: 16px 0;
        display: flex;
        align-items: center;
        border-bottom: solid 1px #e9eaec;
        .info-form-item-left {
          font-size: 15px;
          font-weight: 400;
          color: #848486;
          width: 90px;
        }
        .info-form-item-right {
          flex: 1 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 15px;
          font-weight: 400;
          color: #000000;
          .copy-cont {
            display: flex;
            align-items: center;
            img {
              width: 14px;
              height: 15px;
            }
            span {
              font-size: 13px;
              font-weight: 400;
              text-decoration: underline;
              color: #ff7045;
              margin-left: 4px;
            }
          }
        }
      }
      .infoBox {
        justify-content: space-between;
      }
      .infoRight {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #767676;
      }
      .rightFlex {
        flex-direction: row-reverse;
        justify-content: end !important;
      }
      .precautions-text {
        font-size: 13px;
        font-family: PingFang SC;
        font-weight: 400;
        text-decoration: underline;
        color: #80838e;
        line-height: 18px;
        margin-top: 10px;
        padding-bottom: 20px;
      }
    }
    .step {
      width: 100%;
      margin-top: 13px;
    }
    .info-form-btn {
      width: 307px;
      height: 61px;
      background: linear-gradient(90deg, #6C4DD9 0%, #4D5BD9 100%);
      border-radius: 50px;
      font-size: 17px;
      font-weight: 500;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 16px auto;
    }
  }
}
</style>
