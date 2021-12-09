<template>
  <div class="page_root">
    <section class="banner">
      <van-swipe @change="onChange" :autoplay="5000">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img
            style="width:100%;height: 100%;"
            :src="image.thumb"
            @click="$router.push({ path: image.url.replace('#/', '') })"
          />
        </van-swipe-item>
      </van-swipe>
    </section>

    <section class="fuc_bar">
      <div class="item">
        <img src="@/assets/hongxin/3-1 理财_slices/icon-公告@2x.png" alt="" />
        <span>弘信公告</span>
      </div>
      <div class="item">
        <img src="@/assets/hongxin/3-1 理财_slices/icon-签到福利@2x.png" alt="" />
        <span>签到福利</span>
      </div>
      <div class="item">
        <img src="@/assets/hongxin/3-1 理财_slices/icon-新手指引@2x.png" alt="" />
        <span>新手指引</span>
      </div>
      <div class="item">
        <img src="@/assets/hongxin/3-1 理财_slices/icon-活动红包@2x.png" alt="" />
        <span>活动红包</span>
      </div>
    </section>

    <section class="tree-notice">
      <van-notice-bar
        background="#ffffff"
        color="rgba(50, 51, 63, 1)"
        :text="horn_msg"
      >
        <template #left-icon>
          <img src="@/assets/hongxin/3-1 理财_slices/最新公告@2x.png" alt="">
        </template>
      </van-notice-bar>
    </section>

    <section class="novice">
      <div class="title">
        <span></span>
        <div>新手理财</div>
        <div>新手优选理财·超高利率</div>
      </div>
      <div class="content">
        <div>
          <span>4.88</span>
          <span>日化收益率</span>
        </div>
        <div>
          <span>1</span>
          <span>到期还本还利</span>
        </div>
      </div>
      <div class="btn">
        立即购买
      </div>
    </section>

    <section class="projects">
      <div class="title">
        <span :class="{active: projectType === 1}" @click="projectType = 1">普通项目</span>
        <span :class="{active: projectType === 2}" @click="projectType = 2">体验项目</span>
      </div>
      <template v-for="(item, index) in list">
        <div :key="item.id" @click="goToDetail(item.id)" :class="index === 0 ? 'item' : 'item item_border'">
            <InvestItem :invest-info="item"></InvestItem>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'
import { Dialog } from 'vant'
import InvestItem from "@/views/item/compoents/InvestItem.vue";

export default {
  name: 'index',
  components: {
    InvestItem
  },
  data () {
    return {
      projectType: 1, // 1 || 2
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
            src: 'https://rcguanjia.com/mp4/zhufu.mp4', // 路径
            type: 'video/mp4' // 类型
          }
        ],
        // poster: "https://www.njmbttd.com/upload/dongli.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      list: [],
      data: { list: [] },
      down_show: true,
      link_width: 0,
      banner: [],
      notice: '',
      links: [],
      ad: {},
      ad_show: false,
      horn_msg: '',
      horn_block: false,
      notice_num: 1,
      currentRate: 0,
      active: 0,
      tabStatus: ['正在进行', '已完成']
    }
  },
  created () {
    this.$parent.footer(true, 'touzi')
  },
  mounted () {
    this.start()
  },
  methods: {
    onChange (index) {
      let els = this.$refs.dian.querySelectorAll('div')
      for (let i = 0; i < els.length; i++) {
        els[i].className = ''
      }
      els[index].className = 'selected'
    },
    start () {
      // 修复个别手机不能滚动到顶端
      setTimeout(() => {
        var element = document.getElementById('app')
        element.scrollIntoView()
      }, 0)
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      Fetch('/index/item').then(res => {
        this.data = res.data
        this.filterList()
      })

      Fetch('/index/banner', {
        type: 'banner'
      }).then(res => {
        this.banner = res.data
      })

      Fetch('/index/tree').then(res => {
        // 首页公告 图标
        if (res.data.notice && this.notice_num == 1) {
          this.notice_num = 2
          this.horn_block = true
          this.horn_msg = res.data.notice
          // setTimeout(function() {
          // 	that.move();
          // }, 1000);
        }
      })
    },
    // schedule(schedule) {
    // 	return {
    // 		width: schedule + '%'
    // 	};
    // },
    filterList () {
      if (this.active) {
        this.list = this.data.list.filter(item => item.schedule === 100)
      } else {
        this.list = this.data.list.filter(item => item.schedule < 100)
      }
    },
    goToDetail (id) {
      // this.$router.replace('/item/' + id);
      this.$router.push('/item/' + id)
    },
    move () {
      var m_l = 50
      var width = document.getElementById('horn_go1').getBoundingClientRect()
        .width
      var box = document.getElementById('horn_go1')
      var box2 = document.getElementById('horn_go2')
      box2.style.left = width + m_l + 'px'
      box2.style.display = 'block'
      var distance = 10
      var distance2 = m_l + width
      // 设置位移
      setInterval(function () {
        distance = distance - 1
        distance2 = distance2 - 1
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= width + m_l) {
          distance = width + m_l
        }
        if (-distance2 >= width + m_l) {
          distance2 = width + m_l
        }
        box.style.left = distance + 'px'
        box2.style.left = distance2 + 'px'
      }, 40)
    },
    schedule_left (schedule) {
      if (schedule > 80) {
        return {
          left: schedule - 30 + '%',
          color: '#fff'
        }
      } else {
        return {
          left: schedule.slice(0, 5) + '%'
        }
      }
    },
    checkin2 () {
      Fetch('/user/sign').then(res => {
        if (res.data.coss == 1) {
          Dialog.alert({
            title: '提示',
            message: res.info,
            showCancelButton: true,
            confirmButtonText: '去认证'
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
            message: '签到成功：已获得现金2元和8积分！'
          })
        }
      })
    },
    handleTreeListItemClick (type = 1) {
      switch (type) {
        case 1:
          this.checkin2()
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
          this.$router.push({ name: 'share' })
          break
        case 12:
          this.$router.push({ name: 'auth' })
          break
        case 13:
          this.$router.push({ name: 'share' })
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>

<style lang="less">
.van-swipe {
  height: 180px;
}

.van-notice-bar {
  flex: 1 0;
  padding: 0;
}
</style>
