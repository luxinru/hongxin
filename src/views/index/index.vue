<template>
  <div class="page_root">
    <section class="header">
      <div class="title">任务中心</div>
      <img src="@/assets/hongxin/2-2 积分等级_slices/积分bg.png" alt="">
      <span class="value">{{ data.integral || 0 }}</span>
      <span class="label">当前积分</span>
    </section>

    <section class="content">
      <div class="item">
        <img src="@/assets/images/shufeng/task/task2.png" alt="">
        <div class="info">
          <span>连续打卡</span>
          <span>连续打卡赢奖金</span>
        </div>
        <div
          class="btn"
          :class="{ 'active-btn': mission.qiandao_status }"
          @click="checkin2()"
        >
          {{ mission.qiandao_status ? '已完成' : '去完成' }}
        </div>
      </div>

      <div class="item">
        <img src="@/assets/images/shufeng/task/task3.png" alt="">
        <div class="info">
          <span>邀请好友</span>
          <span>领取5元红包</span>
        </div>
        <div
          class="btn"
          :class="{ 'active-btn': mission.invest_status }"
          @click="handleTaskListItem(1)"
        >
          {{ mission.invest_status ? '已完成' : '去完成' }}
        </div>
      </div>

      <div class="item" v-if="footer_type === 'n2'">
        <img src="@/assets/images/shufeng/task/task4.png" alt="">
        <div class="info">
          <span>存入宝库</span>
          <span>领取2元红包</span>
        </div>
        <div
          class="btn"
          :class="{ 'active-btn': mission.yue_bao_status }"
          @click="handleTaskListItem(2)"
        >
          {{ mission.yue_bao_status ? '已完成' : '去完成' }}
        </div>
      </div>

      <div class="item">
        <img src="@/assets/images/shufeng/task/task5.png" alt="">
        <div class="info">
          <span>新人认证</span>
          <span>奖励500积分</span>
        </div>
        <div
          class="btn"
          :class="{ 'active-btn': mission.auth_status }"
          @click="handleTaskListItem(3)"
        >
          {{ mission.auth_status ? '已完成' : '去完成' }}
        </div>
      </div>

      <div class="item" v-if="footer_type === 'n2'">
        <img src="@/assets/images/shufeng/task/task6.png" alt="">
        <div class="info">
          <span>参与投资</span>
          <span>奖励500积分</span>
        </div>
        <div
          class="btn"
          @click="handleTaskListItem(4)"
        >
          去完成
        </div>
      </div>

      <div class="item">
        <img src="@/assets/images/shufeng/task/task7.png" alt="">
        <div class="info">
          <span>运动加油</span>
          <span>积分奖励</span>
        </div>
        <div
          class="btn"
          :class="{ 'active-btn': mission.answer_status }"
          @click="handleTaskListItem(6)"
        >
          {{ mission.answer_status ? '已完成' : '去完成' }}
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
export default {
  name: 'info',
  data () {
    return {
      data: {},
      footer_type: 'n1',
      mission: {},
      signInList: [
        { id: 1, name: '周一', isSignIn: true },
        { id: 2, name: '周二', isSignIn: true },
        { id: 3, name: '周三', isSignIn: true },
        { id: 4, name: '周四', isSignIn: false },
        { id: 5, name: '周五', isSignIn: false },
        { id: 6, name: '周六', isSignIn: false },
        { id: 7, name: '周日', isSignIn: false }
      ]
    }
  },
  created () {
    // if (this.$parent.getFooterType() === 'n2') {
    // 	this.$router.replace('/user');
    // }
    this.$parent.footer(true, 'index')

    var type = localStorage.getItem('footer')
    if (type) {
      this.footer_type = type
    }
  },
  mounted () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    this.start()
  },
  methods: {
    dati () {
      Fetch('/index/getAnswer').then(() => {
        this.$router.replace('/exam')
      })
    },
    checkin2 () {
      this.$router.push('qiandao')
      // Fetch('/user/sign').then(res => {
      //   if (res.data.coss == 1) {
      //     Dialog.alert({
      //       title: '提示',
      //       message: res.info,
      //       showCancelButton: true,
      //       confirmButtonText: '去认证'
      //     })
      //       .then(() => {
      //         this.$router.push('/auth')
      //       })
      //       .catch(() => {})
      //   } else {
      //     this.sign_money = res.data.reward
      //     this.new_sign_ok = true
      //     this.$notify({
      //       background: '#07c160',
      //       message: '签到成功：已获得现金2元和8积分！'
      //     })
      //   }
      // })
    },
    start () {
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      Fetch('/user/info').then(res => {
        this.data = res.data
      })

      Fetch('/index/getStstusAll').then(res => {
        this.mission = res.data
        console.log(this.mission)
      })
    },
    logout () {
      this.$parent.setFooterType('n1')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
    handleTaskListItem (type = 1) {
      switch (type) {
        case 1:
          if (this.mission && this.mission.invest_status == false) {
            this.$router.push({ name: 'share' })
          }
          break
        case 2:
          if (this.mission && this.mission.yue_bao_status == false) {
            this.$router.push({ name: 'baoku' })
          }
          break
        case 3:
          if (this.mission && this.mission.auth_status == false) {
            this.$router.push({ name: 'auth' })
          }
          break
        case 4:
          this.$router.push({ name: 'item' })
          break
        case 5:
          this.$router.push({ name: 'start' })
          break
        case 6:
          this.$router.push({ name: 'sport_event' })
          break
        case 7:
          this.$router.push({ name: 'question_type' })
          break
      }
    }
  }
}
</script>
<style>
#app {
  height: 100% !important;
}
</style>
<style lang="less" scoped>
@import 'index';
</style>
