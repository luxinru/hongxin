<template>
  <div id="app">
    <keep-alive>
      <div class="header" v-if="currentPath && title">
        <van-icon
          class="back"
          name="arrow-left"
          size="23"
          :color="color ? color : '#fff'"
          @click="handleBack"
        />
        <div
          class="head"
          :style="
            `${background ? 'background: ' + background : ''};${
              color ? 'color: ' + color : ''
            }`
          "
        >
          {{ title }}
        </div>
      </div>
    </keep-alive>
    <div style="flex: 1 0;width: 100%;overflow: scroll;">
      <router-view></router-view>
    </div>
    <div class="footer_nav" v-if="show_footer && footer_type === 'n2'">
      <router-link class="footer_item" to="/tree">
        <img
          :src="
            show_type == 'tree'
              ? require('@/assets/hongxin/1-1 首页_slices/首页P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/首页N@2x.png')
          "
        />
        <span :class="{active: show_type == 'tree'}">首页</span>
      </router-link>

      <router-link class="footer_item" to="/information">
        <img
          :src="
            show_type == 'information'
              ? require('@/assets/hongxin/1-1 首页_slices/资讯 (1).png')
              : require('@/assets/hongxin/1-1 首页_slices/资讯 (1) 拷贝.png')
          "
        />
        <span :class="{active: show_type == 'information'}">资讯</span>
      </router-link>
      
      <router-link class="footer_item" to="/item">
        <img
          :src="
            show_type == 'touzi'
              ? require('@/assets/hongxin/1-1 首页_slices/理财P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/理财N@2x.png')
          "
        />
        <span :class="{active: show_type == 'touzi'}">理财</span>
      </router-link>

      <router-link class="footer_item" to="/index">
        <img
          :src="
            show_type == 'index'
              ? require('@/assets/hongxin/1-1 首页_slices/打卡P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/打卡N@2x.png')
          "
        />
        <span :class="{active: show_type == 'index'}">打卡</span>
      </router-link>

      <router-link class="footer_item" to="/goods">
        <img
          :src="
            show_type == 'goods'
              ? require('@/assets/hongxin/1-1 首页_slices/积分P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/积分N@2x.png')
          "
        />
        <span :class="{active: show_type == 'goods'}">积分</span>
      </router-link>

      <router-link class="footer_item" to="/user">
        <img
          :src="
            show_type == 'info'
              ? require('@/assets/hongxin/1-1 首页_slices/我的P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/我的N@2x.png')
          "
        />
        <span :class="{active: show_type == 'info'}">我的</span>
      </router-link>
    </div>
    <div class="footer_nav" v-if="show_footer && footer_type === 'n1'">
      <router-link class="footer_item" to="/tree">
        <img
          :src="
            show_type == 'tree'
              ? require('@/assets/hongxin/1-1 首页_slices/首页P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/首页N@2x.png')
          "
        />
        <span :class="{active: show_type == 'tree'}">首页</span>
      </router-link>

      <router-link class="footer_item" to="/information">
        <img
          :src="
            show_type == 'information'
              ? require('@/assets/hongxin/1-1 首页_slices/资讯 (1).png')
              : require('@/assets/hongxin/1-1 首页_slices/资讯 (1) 拷贝.png')
          "
        />
        <span :class="{active: show_type == 'information'}">资讯</span>
      </router-link>
      
      <router-link class="footer_item" to="/index">
        <img
          :src="
            show_type == 'index'
              ? require('@/assets/hongxin/1-1 首页_slices/打卡P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/打卡N@2x.png')
          "
        />
        <span :class="{active: show_type == 'index'}">打卡</span>
      </router-link>

      <router-link class="footer_item" to="/goods">
        <img
          :src="
            show_type == 'goods'
              ? require('@/assets/hongxin/1-1 首页_slices/积分P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/积分N@2x.png')
          "
        />
        <span :class="{active: show_type == 'goods'}">积分</span>
      </router-link>
      
      <router-link class="footer_item" to="/user">
        <img
          :src="
            show_type == 'info'
              ? require('@/assets/hongxin/1-1 首页_slices/我的P@2x.png')
              : require('@/assets/hongxin/1-1 首页_slices/我的N@2x.png')
          "
        />
        <span :class="{active: show_type == 'info'}">我的</span>
      </router-link>
    </div>
    <kefu></kefu>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import Fetch from './utils/fetch'
import kefu from './utils/kefu.vue'
import md5 from 'js-md5'
import router from './router'
var path, title, currentPath, background, color
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  console.log(from.path, to)
  path = from.path
  currentPath = to.meta.hiddenTitle ? false : true
  title = to.meta.title
  background = to.meta.background
  color = to.meta.color
  setTimeout(() => {
    window.$('body').scrollTop(0)
  })
  next()
})
export default {
  name: 'App',
  data () {
    return {
      footer_type: 'n1',
      show_footer: false,
      show_type: 'index',
      path: '/',
      title: '',
      currentPath: '/',
      idfa: ''
    }
  },

  components: {
    kefu
  },
  beforeUpdate () {
    this.path = path
    this.title = title
    this.currentPath = currentPath
    this.background = background
    console.log('color', color)
    this.color = color
    console.log(currentPath)
  },

  created () {
    var type = localStorage.getItem('footer')
    if (type) {
      this.footer_type = type
    }
    // alert(md5("869706033336472,869706033336464".split(',')[1].toLowerCase()).toLowerCase())

    // 安卓原生
    var token = localStorage.getItem('token')
    var frist_run = localStorage.getItem('frist_run')
    if (/LT-APP/.test(navigator.userAgent)) {
      if (!token && !frist_run) {
        jsBridge.getIMEI(function (imei) {
          for (var i = 0; i < imei.split(',').length; i++) {
            // 返回了oaid
            if (imei.split(',').length == 1 && imei.length > 16) {
              Fetch('/index/tx_action', {
                type: 'Android',
                muid: imei,
                action_type: 'ACTIVATE_APP'
              })
            } else {
              Fetch('/index/tx_action', {
                type: 'Android',
                muid: md5(imei.split(',')[i].toLowerCase()).toLowerCase(),
                action_type: 'ACTIVATE_APP'
              })
            }
          }
        })

        localStorage.setItem('frist_run', 'run')
      }
    } else {
      // ios原生
      if (!token && !frist_run) {
        this.getIosIdfa()
      }
    }
  },
  mounted () {
    this.syncDevNo()
    this.timer = setInterval(() => {
      this.syncDevNo()
    }, 5000)
    window.returnIosIdfa = this.returnIosIdfa
  },
  methods: {
    //是否显示底部
    footer: function (bool, show = 'index') {
      this.show_footer = bool
      this.show_type = show
    },
    setFooterType: function (type = 'n1') {
      console.log(type)
      this.footer_type = type
      localStorage.setItem('footer', type)
    },
    getFooterType: function () {
      return this.footer_type
    },
    getIosIdfa () {
      window.webkit.messageHandlers.idfa.postMessage({ result: 'idfa' }) //app中接收到之后会回调给下面的函数
    },
    returnIosIdfa (idfa) {
      var token = localStorage.getItem('token')
      var frist_run = localStorage.getItem('frist_run')
      if (!token && !frist_run) {
        var muid = md5(idfa.toUpperCase()).toLowerCase()
        Fetch('/index/tx_action', {
          type: 'iOS',
          muid: muid,
          action_type: 'ACTIVATE_APP'
        })
      }
      localStorage.setItem('frist_run', 'run')
    },
    syncDevNo () {
      let devNo = localStorage.getItem('dev_no'),
        devType = localStorage.getItem('dev_type')
      if (devNo || 1) {
        Fetch(
          '/index/sync',
          {
            dev_no: devNo,
            dev_type: devType
          },
          null,
          false
        ).then(r => {
          this.setFooterType(r.data.footer)
          // this.setFooterType('n1')
          if (r.data.is_open_notice_dialog) {
            this.openNoticeDialog()
          }
        })
      }
    },
    openNoticeDialog () {
      Dialog.confirm({
        title: '提示',
        message: '您有新消息，是否前往查看?'
      })
        .then(() => {
          this.$router.push('/notice').catch(err => {
            err
          })
        })
        .catch(() => {
          return
        })
    },
    handleBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* .kefu {
			position: fixed;
			right: 15px;
			top: 50%;
			transform: translateY(-50%);
			background: url('./assets/icons/online.png') no-repeat center;
			width: 35px;
			height: 138px;
			z-index: 2;
			background-size: contain;
		} */

  .footer_nav {
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;

    .footer_item {
      flex: 1 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 28px;
        height: 28px;
      }

      span {
        font-size: 11px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 14px;
        margin-top: 2px;
        transform: scale(11 / 12);
      }

      .active {
        color: rgba(108, 77, 217, 1);
      }
    }
  }
}

#app ::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  flex-shrink: 0;
}

.van-field__control {
  flex: 1 0 !important;
}
</style>
