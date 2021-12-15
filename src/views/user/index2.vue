<template>
  <div class="page_root">
    <section class="header">
      <div class="bar">
        <div class="item" @click="$router.push('tree')">
          <van-icon name="wap-home-o" color="#fff" size="20px" />
          <span>主页</span>
        </div>
        个人中心
        <div class="part">
          <div class="item" @click="handleUSernnotice">
            <van-icon name="comment-o" color="#fff" size="20px" />
            <span>消息</span>
          </div>
          <!-- <div class="item" @click="handleSetting">
            <van-icon name="setting-o" color="#fff" size="20px" />
            <span>设置</span>
          </div> -->
        </div>
      </div>
    </section>

    <section class="info">
      <div class="detals">
        <img src="@/assets/hongxin/mine.png" alt="" />
        <div class="box">
          <span>{{ data.name || '-' }}</span>
          <span>{{ data.mobile }}</span>
          <span>{{ data.vip_name }} 成长值：{{data.manure}}</span>
        </div>
        <!-- <div class="btn">已签到</div> -->
      </div>
      <div class="clockin">
        <div class="item">
          <span>{{data.money}}</span>
          <span>账户余额</span>
        </div>
        <div class="item">
          <span>{{data.integral}}</span>
          <span>我的积分</span>
        </div>
        <div class="item">
          <span>{{data.ds_money}}</span>
          <span>待收本金</span>
        </div>
        <div class="item">
          <span>{{data.ds_apr_money}}</span>
          <span>待收利息</span>
        </div>
      </div>
    </section>

    <section class="baoku">
      <div class="title">
        <div>
          <img src="@/assets/hongxin/4-1 我的_slices/logo.png" alt="" />
          弘信宝
        </div>
        <div @click="$router.push('baoku')">
          进入
          <van-icon name="arrow" size="12px" />
        </div>
      </div>
      <div class="content">
        <div class="item">
          <span>余额</span>
          <span>¥{{ data.money }}</span>
        </div>
        <div class="item">
          <span>年化率</span>
          <span>{{ data.vip_rate }}%</span>
        </div>
      </div>
    </section>

    <section class="fun">
      <div class="item" @click="handleRecharge">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-我的钱包.png" alt="" />
        <span>充值</span>
      </div>

      <div class="item" @click="handleMyService('funds')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-账户记录.png" alt="" />
        <span>资金记录</span>
      </div>

      <div class="item" @click="handleMyService('touzi')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-收益记录.png" alt="" />
        <span>投资记录</span>
      </div>

      <div class="item" @click="$router.push('bank_add')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-银联绑定.png" alt="" />
        <span>银联绑定</span>
      </div>
    </section>

    <section class="features">
      <div class="item" @click="handleSetting">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-账户信息.png" alt="" />
        账号信息
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="$router.push('baoku')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-充值.png" alt="" />
        我的钱包
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleMyService('invest')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-记录.png" alt="" />
        充值记录
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleWithdraw">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-提现.png" alt="" />
        提现
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleMyService('cost')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-记录.png" alt="" />
        提现记录
        <van-icon name="arrow" size="12px" />
      </div>
    </section>

    <section class="features">
      <!-- <div class="item">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-账户信息.png" alt="">
        安全中心
        <van-icon name="arrow" size="12px" />
      </div> -->
      <div class="item" @click="handleMyService('alipay')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-支付宝.png" alt="" />
        支付宝绑定
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleMyService('touzi')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-记录.png" alt="" />
        投资记录
        <van-icon name="arrow" size="12px" />
      </div>
    </section>

    <section class="features">
      <div class="item" @click="handleMyService('about')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-关于我们.png" alt="" />
        关于我们
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleMyService('protocol')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-用户政策.png" alt="" />
        用户政策
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleMyService('privacy')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-隐私协议.png" alt="" />
        隐私协议
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="handleMyService('kefu')">
        <img src="@/assets/hongxin/4-1 我的_slices/icon-联系客服.png" alt="" />
        联系客服
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item" @click="logout()">
        <img src="@/assets/images/my-image/service-9.png" alt="" />
        退出登录
        <van-icon name="arrow" size="12px" />
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import Vue from 'vue'
import { NoticeBar } from 'vant'

Vue.use(NoticeBar)

export default {
  name: 'info',
  data() {
    return {
      data: {},
      /* 待删除 */
      bg: '',
      config: {},
    }
  },
  created() {
    if (this.$parent.getFooterType() === 'n2') {
      this.$router.replace('/user').catch((err) => {
        err
      })
    }
    this.$parent.footer(true, 'info')
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      // 修复个别手机不能滚动到顶端
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      Fetch('/user/info').then((res) => {
        this.data = res.data
        // console.log(this.data)
      })
      /* 待删除 */
      Fetch('/index/webconfig', {
        type: 'bg',
      }).then((res) => {
        this.bg = 'url("' + res.data.login + '")'
      })
      Fetch('/index/webconfig', {
        type: 'web',
      }).then((res) => {
        this.config = res.data
      })
      /* 待删除 */
    },
    logout() {
      this.$parent.setFooterType('n1')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
    // 实名认证
    handleUSerCertification() {
      this.$router.push({ name: 'auth' })
    },
    // 站内信
    handleUSernnotice() {
      this.$router.push({ name: 'notice' })
    },
    // 设置
    handleSetting() {
      // auth
      this.$router.push({ name: 'account' })
    },
    // 查看明细
    handleGoFunds() {
      this.$router.push({ name: 'funds' })
    },
    // 充值
    handleRecharge() {
      this.$router.push({ name: 'recharge' })
    },
    // 提现
    handleWithdraw() {
      this.$router.push({ name: 'cash' })
    },
    // 我的服务跳转
    handleMyService(name) {
      if (name === 'protocol') {
        this.handleGoProtocol(1)
        return
      }
      if (name === 'privacy') {
        this.handleGoProtocol(2)
        return
      }
      this.$router.push({ name: name })
    },
    // 协议
    handleGoProtocol(type) {
      if (type === 1) {
        this.$router.push({ path: this.config.user_contract_link })
      }
      if (type === 2) {
        this.$router.push({ path: this.config.user_contract_ys_link })
      }
    },
  },
}
</script>
<style lang="less" scoped>
@import 'index2';
</style>
