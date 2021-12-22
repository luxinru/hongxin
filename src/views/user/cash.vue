<template>
  <div class="page_root">
    <headers title="提现" :money="data.money" />

    <div class="main">
      <div class="inputBox">
        <p>提现金额</p>
        <div class="inputBoxs">
          <span>¥</span>
          <input type="number" name="money" v-model="money" placeholder="" />
        </div>
      </div>

      <div class="textBox">
        <p class="cash-type">提现至</p>
        <div class="bank-info-box" @click="show = true" ref="add">
          <div class="select-bank-card">提现银行</div>
          <div class="leftBox">
            <img class="bank-info-icon" src="./images/sf/bank_icon.png" />
            <div class="bank-info-name">{{ bank.bank }}</div>
          </div>
        </div>
        <p class="pwd-tips">支付密码</p>
        <input
          type="password"
          class="pwd-input"
          step="0.01"
          name="money"
          v-model="passwd"
          placeholder=""
        />
        <!-- <p class="forget-pwd" @click="handleForgetPassword">忘记密码？</p> -->
      </div>
      <div class="cash-btn" @click="handleSubmit">去提现</div>
    </div>

    <div class="cash-tips-cont">
      <p class="cash-title">提现说明</p>
      <div>
        <p>1.注册、签到、实名认证赠送的现金为系统福利</p>
        <p>
          2.工作时间提现,9:30-22:00,都是即时到账，夜间提现,次日处理。因公司账户跨行转账,要具体根据您的银行卡到账时间为准,正常是两个小时内到账
        </p>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" style="height: 60%">
      <bank-select :onChange="selected" />
    </van-popup>
  </div>
</template>

<script>
import headers from './components/header.vue'
import Vue from 'vue'
import Fetch from '../../utils/fetch'
import { Popup } from 'vant'
import select from './select'

Vue.use(Popup)

export default {
  name: 'index',
  components: {
    'bank-select': select,
    headers,
  },
  data() {
    return {
      show: false,
      data: {},
      bank: {},
      bank_id: 0,
      money: '',
      passwd: '',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      Fetch('/user/cost_bank').then((res) => {
        this.data = res.data
        this.bank = res.data.bank
      })

      // 先选择银行卡
      if (!this.bank.id && this.bank.id != 0) {
        this.$refs.add.click()
      }
    },
    handleSubmit() {
      if (!this.bank.id && this.bank.id != 0) {
        this.$notify('请选择提现银行卡')
        return
      }

      if (!this.money) {
        this.$notify('请输入提现金额')
        return
      }

      Fetch('/user/cost_apply', {
        money: this.money,
        bank_id: this.bank.id,
        passwd: this.passwd,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '提现申请成功',
        })

        this.$router.back()
      })
    },
    editCardNum(id) {
      if (!id) return ''
      const len = id.length
      const reLastNum = `${id.charAt(len - 1)}${id.charAt(len - 2)}${id.charAt(
        len - 3
      )}${id.charAt(len - 4)}`
      const newId = reLastNum.padEnd(len, '*').replace(/(.{4})/g, '$1 ')
      return newId.split('').reverse().join('')
    },
    selected(bank) {
      this.show = false
      this.bank = bank
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ name: 'resetpaypwd' })
    },
  },
}
</script>

<style lang="less" scoped>
.textBox {
  width: 100%;
  background-color: #ffffff;
  margin-top: 16px;
}

.inputBox {
  width: 100%;
  display: flex;
  flex-direction: column;
  p {
    font-size: 10px;
    font-weight: 400;
    color: #1c1d38;
  }
  .inputBoxs {
    width: 100%;
    height: 42px;
    margin-top: 16px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  span {
    font-size: 30px;
    font-weight: 400;
    color: #1c1d38;
    margin-right: 4px;
  }
  input {
    flex: 1 0;
    height: 100%;
    font-size: 30px;
    font-weight: 400;
    color: #1c1d38;
    background: transparent;
  }
}
.select-bank-card {
  font-size: 15px;
  font-weight: 500;
  color: #414141;
}
.leftBox {
  display: flex;
}
.page_root {
  padding: 0;
  .main {
    width: 351px;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    background: #fff;
    margin-top: -100px;
    .cash-btn {
      width: 311px;
      height: 49px;
      background: linear-gradient(90deg, #6c4dd9 0%, #4d5bd9 100%);
      border-radius: 27px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
      margin: 20px 0 0 0;
    }
    .cash-type,
    .pwd-tips {
      margin-top: 16px;
      font-size: 14px;
      font-weight: 400;
      color: #999999;
    }
    .cash-type {
      margin-top: 0;
    }
    .bank-info-box {
      margin-top: 16px;
      padding: 16px;

      width: 100%;
      height: 48px;
      background: #fbfbfe;
      // border: 1px solid #e1e1e1;
      // border-radius: 23px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .bank-info-icon {
        width: 20px;
        height: 15px;
      }
      .bank-info-name {
        margin-left: 18px;
        font-size: 15px;
        font-weight: 400;
        color: #2e2e2e;
      }
    }
    .pwd-input {
      margin-top: 17px;
      padding: 16px 25px;
      width: 299px;
      height: 43px;
      background: #f9f6ef;
      border-radius: 7px;
      // border-radius: 7px;
      font-size: 15px;
      font-weight: 500;
      color: #c1c1c1;
    }
    .forget-pwd {
      margin-top: 14px;
      font-size: 13px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ff7045;
      text-align: right;
    }
  }

  .cash-tips-cont {
    margin-top: 16px;
    padding: 0 12px;
    .cash-title {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 16px;
      margin-bottom: 12px;
    }
    div {
      font-size: 12px;
      font-weight: 400;
      color: #666666;
      line-height: 16px;

      span {
        color: rgba(108, 77, 217, 1);
      }
    }
  }
}
</style>
