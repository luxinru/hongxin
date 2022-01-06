<template>
  <div class="page_root">
    <headers title="立即投标" :money="data.user_money"></headers>
    <div class="apply-form-money">
      <div class="apply-form-money-title">
        投资金额（元）
        <div class="apply-form-money-sub-title">{{ data.min }} 元起投</div>
      </div>
      <div class="apply-form-money-input">
        <van-field
          v-model="money"
          @input="changeInput()"
          readonly
          type="number"
          label-class="transaction-input"
          placeholder="请输入金额"
        />
        <span @click="setNum(Number(data.min))">+</span>
        <span style="margin-left: 24px;" @click="setNum(Number(data.min), 2)">-</span>
      </div>
    </div>
    <div class="zhye">
      <div class="apply-form-item">
        <div class="apply-form-item-title">项目名称</div>
        <div class="apply-form-item-info">{{ data.title }}</div>
      </div>
      <div class="apply-form-item">
        <div class="apply-form-item-title">项目可投</div>
        <div class="apply-form-item-info">{{ data.kt_money }}元</div>
      </div>
      <div class="apply-form-item">
        <div class="apply-form-item-title">结息时间</div>
        <div class="apply-form-item-info">满24小时自动结息</div>
      </div>
      <div class="apply-form-item">
        <div class="apply-form-item-title">代金券</div>
        <div class="apply-form-item-info" style="color: #fe5a2d">
          -{{ j_money }}
        </div>
      </div>
      <div class="apply-form-item">
        <div class="apply-form-item-title">实际支付</div>
        <div class="apply-form-item-info" style="color: rgba(235, 49, 67, 1);">{{ real_money }}</div>
      </div>
      <div class="apply-form-item">
        <div class="apply-form-item-title">支付密码</div>
        <div class="apply-form-item-info">
          <van-field
            v-model="passwd"
            type="password"
            placeholder="请输入交易密码"
          />
        </div>
      </div>
    </div>
    <div class="transaction-sub-title" @click="handleForgetPassword">
      忘记密码
    </div>
    <div class="transaction-btn" @click="handleSubmit">立即投标</div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import headers from '@/views/user/components/header.vue'

export default {
  name: 'index',
  components: {
    headers,
  },
  data() {
    return {
      data: {},
      money: 0,
      passwd: '',
      id: 0,
      j_money: 0,
      real_money: 0,
      real_jifen: 0,
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.id = this.$router.history.current.params.id
    this.start()
  },
  methods: {
    setNum(num, type = 1) {
      if (type === 1) {
        this.money = Number(this.money) + num;
      } else {
        this.money = Number(this.money) - num;
      }
      this.changeInput()
    },
    start() {
      Fetch('/index/item_view', {
        id: this.id,
      }).then((res) => {
        this.data = res.data.view
        this.money = Number(res.data.view.min)
        Fetch('/user/get_item_voucher', {
          id: this.id,
        }).then((r) => {
          // 优惠券
          this.j_money = r.data.voucher_money
          this.real_money = this.money - this.j_money
        })
      })
    },
    back() {
      this.$router.push('/item/' + this.id).catch((err) => {
        err
      })
    },
    getClass(channel) {
      return 'recharge_online_' + channel
    },
    handleSubmit() {
      if (!this.money) {
        this.$notify('请输入投入金额')
        return
      }

      if (!this.passwd) {
        this.$notify('请输入交易密码')
        return
      }

      Fetch('/index/item_apply', {
        id: this.id,
        money: this.money,
        pwd: this.passwd,
        vid: this.j_money == 0 ? 1 : 2,
      }).then(() => {
        this.$notify({
          background: '#07c160',
          message: '投资成功',
        })
        this.$router.replace('/touzi')
      })
    },
    changeInput() {
      if (this.money > 0) {
        this.real_money = this.money - this.j_money
        this.real_jifen = Math.floor(this.money * this.data.jfbl)
      } else {
        this.money = Number(this.data.min)
      }
    },
    // 忘记密码
    handleForgetPassword() {
      this.$router.push({ name: 'resetpaypwd' })
    },
  },
}
</script>

<style lang="less" scoped>
@import 'apply';
</style>
