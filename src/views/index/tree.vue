<template>
  <div class="page_root">
    <section class="header">
      <img
        class="logo"
        src="@/assets/hongxin/1-1 首页_slices/logo@2x.png"
        alt=""
      />
      <div class="login" @click="logout">
        <img src="@/assets/hongxin/1-1 首页_slices/Frame@2x.png" alt="" />
        <span>登录</span>
      </div>
    </section>

    <section class="banner">
      <van-swipe @change="onChange" :autoplay="5000">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img
            style="width: 100%; height: 100%"
            :src="image.thumb"
            @click="$router.push({ path: image.url.replace('#/', '') })"
          />
        </van-swipe-item>
      </van-swipe>
    </section>

    <section class="fuc_bar">
      <div class="item" @click="handleTreeListItemClick(6)">
        <img src="@/assets/hongxin/1-1 首页_slices/积分@2x.png" alt="" />
        <span>积分</span>
      </div>
      <div class="item" @click="handleTreeListItemClick(14)">
        <img src="@/assets/hongxin/1-1 首页_slices/闯关@2x.png" alt="" />
        <span>闯关</span>
      </div>
      <div class="item" @click="handleTreeListItemClick(11)">
        <img src="@/assets/hongxin/1-1 首页_slices/排行@2x.png" alt="" />
        <span>关于我们</span>
      </div>
      <div class="item" @click="$router.push('index')">
        <img src="@/assets/hongxin/1-1 首页_slices/更多@2x.png" alt="" />
        <span>更多</span>
      </div>
    </section>

    <section class="tree-notice">
      <img
        class="img"
        src="@/assets/hongxin/1-1 首页_slices/头条@2x.png"
        alt=""
      />
      <van-notice-bar
        background="#ffffff"
        color="rgba(50, 51, 63, 1)"
        :text="data.notice"
      >
        <template #left-icon>
          <span class="icon">热门</span>
        </template>
      </van-notice-bar>
    </section>
    <!-- <section class="tree-notice" style="margin-top: 3px;">
      <img
        class="img"
        src="@/assets/hongxin/1-1 首页_slices/动态@2x.png"
        alt=""
      />
      <van-notice-bar
        background="#ffffff"
        color="rgba(50, 51, 63, 1)"
        :text="data.notice"
      >
        <template #left-icon>
          <span class="icon">热门</span>
        </template>
      </van-notice-bar>
    </section> -->

    <section class="taps">
      <div class="left" @click="handleTreeListItemClick(3)">
        <div class="title">
          今日运动<img
            src="@/assets/hongxin/1-1 首页_slices/hot@2x.png"
            alt=""
          />
        </div>
        <span>叫上好友，健康打卡</span>
      </div>
      <div class="right">
        <div class="top" @click="handleTreeListItemClick(10)">
          <div class="title">绑定支付宝</div>
          <span>绑定支付宝，额外奖金</span>
        </div>
        <div class="bottom" @click="handleTreeListItemClick(13)">
          <div class="title">邀请福利</div>
          <span>现金多多</span>
        </div>
      </div>
    </section>

    <!-- <section class="ad">
      <img src="@/assets/hongxin/1-1 首页_slices/Frame 2787@2x.png" alt="" />
      <img src="@/assets/hongxin/1-1 首页_slices/Frame 2787@2x.png" alt="" />
      <img src="@/assets/hongxin/1-1 首页_slices/Frame 2787@2x.png" alt="" />
    </section> -->

    <section class="mission" @click="$router.push('index')">
      <div class="title">
        <span>任务中心</span>
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="img">
        <span>弘信·任务大师</span>
        <span>任务列表里的任务</span>
        <span>都对应着丰富奖励</span>
        <span>GO<van-icon name="arrow" size="12px" /></span>
      </div>
    </section>

    <!-- <section class="recommend">
      <div class="title">
        <span>今日推荐</span>
        <van-icon name="arrow" size="12px" />
      </div>
      <div class="item">
        <div class="item_title">
          弘信5G物联产业布局项目
          <div>
            <img
              v-for="index in 5"
              :key="index"
              src="@/assets/hongxin/1-1 首页_slices/icon／star@2x.png"
              alt=""
            />
            热推指数
          </div>
        </div>
        <div class="item_tips">
          <span>按天付息，到期还本</span>
          <div class="tags">
            <span class="tag">每日分红</span>
            <span class="tag">盈利期</span>
          </div>
        </div>
        <div class="item_content">
          <div class="left">
            <span>1.30</span>
            <span>预期日化收益率</span>
          </div>
          <div class="right">
            <span>7</span>
            <span>投资期限</span>
          </div>
        </div>
        <div class="item_btns">
          <span>剩余可投金额20万</span>
          <span class="btn">立即购入</span>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import { Dialog } from 'vant'
export default {
  name: 'index',
  components: {},
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            src: 'https://rcguanjia.com/mp4/zhounianqing.mp4', // 路径
            type: 'video/mp4', // 类型
          },
        ],
        // poster: "https://www.njmbttd.com/upload/dongli.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      footer_type: 'n1',
      data: {
        app: {},
        notice: '',
      },
      down_show: true,
      link_width: 0,
      banner: [],
      notice: '',
      links: [],
      type: 'n1',
      ad: {},
      ad_show: false,
      examinationData: [
        {
          id: '1',
          name: 'one',
          question: '...',
        },
      ],
      indexMenuType: 1,
    }
  },
  computed: {
    indexMenuInfoBackClasses() {
      return `info-back-class-${this.indexMenuType}`
    },
  },
  created() {
    if (this.$parent.getFooterType() === 'n1') {
      this.$router.push('/tree').catch((err) => {
        err
      })
      this.$parent.footer(true, 'tree')
    } else {
      this.$parent.footer(true, 'tree')
      this.$data.footer_type = 'n2'
    }
  },
  mounted() {
    this.start()
    var that = this
    var bslua = navigator.userAgent
    if (bslua.indexOf('bsl') != -1) {
      that.down_show = false
    }
  },
  methods: {
    getIputValue(index) {
      // console.log(index + 1 + "题" + this.radio);
      this.allRadio[index] = this.radio[index] // 将数据存入提交给后台的数据中
      console.log(this.allRadio)
      // console.log(this.radio)
    },
    toBox(title = '', contain = '') {
      var newsBox = document.getElementsByClassName('modal')[0]
      newsBox.style.display = 'block'

      var bodyBox = document.getElementsByClassName('body-box')[0]
      bodyBox.innerHTML = contain
      var newsTitle = document.getElementsByClassName('news-title')[0]
      newsTitle.innerText = title
    },
    checkin2() {
      Fetch('/user/sign').then((res) => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: '提示',
            message: res.info,
            showCancelButton: true,
            confirmButtonText: '去认证',
          })
            .then(() => {
              this.$router.push('/auth')
            })
            .catch(() => {})
        } else {
          this.sign_money = res.data.reward
          this.new_sign_ok = true
          this.$notify({
            background: '#07c160',
            message: '签到成功：已获得现金2元和8积分！',
          })
        }
      })
    },
    closeBox() {
      var newsBox = document.getElementsByClassName('modal')[0]
      newsBox.style.display = 'none'
    },

    appdown_close() {
      this.data.app.is_disable = 'N'
    },
    goAd() {
      // this.close();
      // this.$router.push(this.ad.url).catch(err => {err});
      this.close()
      this.$router.push(this.ad.url)
    },
    close() {
      this.ad_show = false
    },
    start() {
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      this.type = this.$parent.getFooterType()
      Fetch('/index/int').then((res) => {
        this.ad = res.data.ad
        this.data = res.data

        if (res.data.ad.activity_status == 1) {
          this.ad_show = true
        } else {
          this.ad_show = false
        }
      })

      /* Fetch('/api/api/image', {type: 'links'}).then(res => {
                    this.links = res.data;
					this.link_width = res.data.length * 23 + (res.data.length-1)*2+"%"
                }); */

      Fetch('/index/banner', {
        type: 'banner',
      }).then((res) => {
        this.banner = res.data
      })
    },
    onChange(index) {
      let els = this.$refs.dian.querySelectorAll('div')
      for (let i = 0; i < els.length; i++) {
        els[i].className = ''
      }
      els[index].className = 'selected'
    },
    schedule(schedule) {
      return {
        width: schedule + '%',
      }
    },
    schedule_left(schedule) {
      if (schedule > 80) {
        return {
          left: schedule - 30 + '%',
          color: '#fff',
        }
      } else {
        return {
          left: schedule.slice(0, 5) + '%',
        }
      }
    },
    handleTreeListItemClick(type = 1) {
      switch (type) {
        case 1:
          this.$router.push({ name: 'qiandao' })
          break
        case 2:
          this.$router.push({ name: 'scratch_card' })
          break
        case 3:
          this.$router.push({ name: 'sport_event' })
          break
        case 4:
          this.$router.push({ name: 'start' })
          break
        case 5:
          this.$router.push({ name: 'prize' })
          break
        case 6:
          this.$router.push({ name: 'goods' })
          break
        case 7:
          this.$router.push({ name: 'item' })
          break
        case 8:
          this.$router.push({ name: 'baoku' })
          break
        case 9:
          this.$router.push({ name: 'qiandao' })
          break
        case 10:
          this.$router.push({ name: 'alipay' })
          break
        case 11:
          this.$router.push({ name: 'about' })
          break
        case 12:
          this.$router.push({ name: 'auth' })
          break
        case 13:
          this.$router.push({ name: 'share' })
          break
        case 14:
          this.$router.push({ name: 'wenjuan' })
          break
      }
    },
    handleMenuSwitch(type) {
      if (this.indexMenuType === type) return
      this.indexMenuType = type
    },
    goToDetail() {
      if (this.indexMenuType == 1) {
        this.handleTreeListItemClick(9)
      }
      if (this.indexMenuType == 2) {
        this.$router.push('/question_type')
      }
      if (this.indexMenuType == 3) {
        this.$router.push('/share')
      }
      if (this.indexMenuType == 4) {
        this.$router.push('/alipay')
      }
    },
    logout() {
      this.$parent.setFooterType('n1')
      localStorage.removeItem('token')
      this.$router.replace('/login')
    },
  },
}
</script>

<style lang="less" scoped>
@import 'tree';
</style>

<style lang="less">
.van-swipe {
  height: 152px;
}

.van-notice-bar {
  flex: 1 0;
  padding: 0;
  height: 21px;
}
</style>
