<template>
  <div class="page_root">
    <section class="box">
      <section class="header">
        <van-icon name="arrow-left" color="#fff" @click="$router.go(-1)" />
      </section>

      <div class="content">
        您已成功打卡<span>{{ qiandaoNum }}</span
        >天
      </div>
      
      <div class="commit" @click="checkin2">立即签到</div>

      <section class="good_list">
        <div class="title">签到好礼</div>

        <div class="list">
          <div class="item" v-for="item in goods" :key="item.id">
            <img :src="item.goods_pic" alt="" />
            <span class="name">{{ item.goods_name }}</span>
            <div class="days">
              连续签到<span>{{ item.num }}天</span>
            </div>
            <div class="btn" @click="exchangegoods(item.id)">立即领取</div>
          </div>
        </div>
      </section>
    </section>
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
          question: '',
        },
      ],
      qiandaoNum: 0,
      qiandaoallNum: 0,
      countNum: 0,
      goods: [],
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
    var that = this
    var bslua = navigator.userAgent
    if (bslua.indexOf('bsl') != -1) {
      that.down_show = false
    }
    this.get_num()
  },
  methods: {
    get_num() {
      Fetch('/user/info').then((res) => {
        Fetch('/user/qiandaonum', {
          username: this.data.username,
          password: this.data.password,
        }).then((res) => {
          (this.qiandaoNum = res.data.qdnum),
            (this.qiandaoallNum = res.data.allqdnum),
            (this.countNum = res.data.countnum)
        })
        // console.log(this.data)
      })
    },
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
          this.get_num()
          this.$notify({
            background: '#07c160',
            message: '签到成功 +' + res.data.reward + '元，8积分',
          })
        }
      })
    },
    checkin3() {
      Fetch('/user/sign3').then((res) => {
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
          this.get_num()
          this.$notify({
            background: '#07c160',
            message: '连续签到3天送现金28元.',
          })
        }
      })
    },
    checkin7() {
      Fetch('/user/sign7').then((res) => {
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
          this.get_num()
          this.$notify({
            background: '#07c160',
            message: '连续签到7天送现金68元.',
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
      Fetch('/user/qiandaogoodslist').then((res) => {
        this.goods = res.data.list
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
    exchangegoods(id = 1) {
      Fetch('/user/qiandao', {
        type: id,
      }).then((res) => {
        if (res.code == 1) {
          Dialog.alert({
            title: '提示',
            message: res.info,
            showCancelButton: false,
            confirmButtonText: '确定',
          })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  padding: 0;
  height: 812px;
  background: #fff;

  .box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('~@/assets/hongxin/2-5 签到_slices/每日签到领2元红包 拷贝.png')
      no-repeat;
    background-size: 100% 100%;
  }
  .header {
    position: relative;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;

    i {
      position: absolute;
      left: 10px;
    }
  }

  .content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    margin-top: 284px;
    span {
      color: RGBA(254, 204, 72, 1);
      margin: 0 4px;
    }
  }

  .commit {
    margin-top: 18px;
    font-size: 16px;
    padding: 4px 12px;
    background: #FFDF3B;
    border-radius: 50px;
    color: rgba(0, 0, 0, 0.7)
  }

  .good_list {
    margin-top: 20px;
    width: 100%;
    flex: 1 0;
    display: flex;
    flex-direction: column;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: 18px;
      font-weight: 500;
      color: #ffffff;
      opacity: 0.8;
    }

    .list {
      flex: 1 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0 20px 20px;
      justify-content: space-between;

      .item {
        width: 157px;
        min-height: 224px;
        background: #ffffff;
        box-shadow: 0px 4px 12px 0px rgba(19, 19, 19, 0.09);
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        margin-top: 20px;

        img {
          width: 100%;
          height: 109px;
        }

        .name {
          width: 100%;
          font-size: 14px;
          font-weight: 500;
          color: #323232;
          line-height: 16px;
          margin-top: 12px;
        }

        .days {
          width: 100%;
          font-size: 11px;
          font-weight: 400;
          color: #989898;
          margin-top: 10px;

          span {
            color: RGBA(242, 81, 50, 1);
            margin-left: 4px;
          }
        }

        .btn {
          width: 84px;
          height: 27px;
          background: #F25132;
          border-radius: 13px;
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  }
}
</style>
