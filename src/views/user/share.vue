<template>
  <div class="page">
    <div class="header">
      <van-icon
        name="arrow-left"
        size="16px"
        color="#fff"
        @click="$router.go(-1)"
      />
    </div>
    <div class="code">
      <div class="item">
        <span class="title">Android二维码</span>
        <img src="@/assets/hongxin/安卓二维码.png" alt="" />
      </div>
      <div class="item">
        <span class="title">IOS二维码</span>
        <img src="@/assets/hongxin/苹果.png" alt="" />
      </div>
    </div>

    <div class="tip">邀请好友扫码下载完成后，填写好友用户名（手机号码）即可完成好友邀请！</div>
    <!-- <div class="main-cont">
      <div class="content">
        <img src="@/assets/hongxin/1-12 🆕 邀请_slices/我的邀请-头部.png" alt="">
        <div class="title">
          <div class="left">推广会员</div>
          <div class="right">注册时间</div>
        </div>
        <div class="item-cont">
          <div class="item" v-for="(item, key) in data.share_user" :key="key">
            <div class="left">{{ item.phone }}</div>
            <div class="right">{{ item.time }}</div>
          </div>
        </div>
        <div class="btn" @click="showShare">立即邀请</div>
      </div>
    </div>

    <div class="qrcode_box" v-if="is_show_share">
      <div class="content">
        <img :src="data.share_image_url" class="qrcode" />
        <p class="qrcode_tips">好友扫描以上专属二维码<br />可直接注册</p>
        <div class="qrcode_btn" @click="close">好的</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      data: {},
      is_show_share: false,
      uid: 'test_data',
      img: 'test_data',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    close() {
      this.is_show_share = false
    },
    showShare() {
      this.is_show_share = true
    },
    start() {
      Fetch('/user/share').then((res) => {
        this.data = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/hongxin/1-12 🆕 邀请_slices/bg-邀请.png');
  background-size: 100% 600px;
  background-repeat: no-repeat;
  box-sizing: border-box;
  background-color: RGBA(238, 70, 21, 1);
  overflow: scroll;
}
.header {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: absolute;
  left: 10px;
}
.code {
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 280px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 16px;
      margin: 16px 0;
      color: rgba(255, 255, 255, 1);
    }

    img {
      width: 160px;
      height: 160px;
    }
  }
}

.tip {
  width: 100%;
  padding: 0 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 24px;
}
// .main-cont {
//   position: relative;
//   top: 331px;
//   left: 9px;
//   width: 356px;
//   height: 427px;
//   background-color: #fff;
//   border-radius: 7px;
//   .content {
//     img {
//       width: 100%;
//       height: 24px;
//       margin-top: -16px;
//     }
//     .title {
//       font-size: 15px;
//       font-weight: 500;
//       color: #ff524e;
//       padding-top: 16px;
//       display: flex;
//       text-align: center;
//       div {
//         width: 50%;
//       }
//     }
//     .item-cont {
//       font-size: 13px;
//       font-weight: 400;
//       color: #939393;
//       text-align: center;
//       margin-top: 19px;
//       height: 350px;
//       overflow: auto;
//       .item {
//         display: flex;
//         margin-top: 15px;
//         justify-content: space-between;
//         text-align: center;
//         div {
//           width: 50%;
//         }
//       }
//       .item:first-child {
//         margin-top: 0;
//       }
//     }
//     .btn {
//       width: 343px;
//       height: 53px;
//       background: #FFDA4B;
//       border-radius: 27px;
//       font-size: 16px;
//       font-weight: 500;
//       color: #F0410A;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin: 14px auto;
//     }
//   }
// }

// .qrcode_box {
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   top: 0;
//   left: 0;
//   z-index: 99;
//   .content {
//     width: 294px;
//     box-sizing: border-box;
//     border-radius: 7px;
//     margin-top: 110px;
//     margin-left: 40px;
//     background-color: white;
//     padding-top: 49px;
//     padding-bottom: 33px;
//     .qrcode {
//       width: 173px;
//       height: 173px;
//       margin-left: 60px;
//     }
//     .qrcode_tips {
//       text-align: center;
//       line-height: 20px;
//       margin-top: 46px;
//       font-size: 15px;
//       font-weight: 500;
//       color: #000000;
//     }
//     .qrcode_btn {
//       width: 235px;
//       height: 49px;
//       background: #FFDA4B;
//       border-radius: 27px;
//       font-size: 16px;
//       font-weight: 500;
//       color: #F0410A;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       margin: 16px auto 0;
//     }
//   }
// }
</style>