<template>
  <div>
    <div class="main">
      <!--<img style="width: 100%;" src="@/assets/images/sport.jpg" alt="">-->
      <!-- <div class = "ddates">倒计时：<span style="color: red;font-weight: 700; font-size: 4vw;">{{minutes}}:{{seconds}}</span></div> -->
      <div class="lists-box" v-for="(item, key) in data" :key="key">
        <div class="lists">
          <div class="info_box">
            <div class="sport_infos-box">
              <p class="sport_infos">{{ item.title }}</p>
              <p class="dates">完成时间{{ item.date }}分钟</p>
            </div>
            <div
              class="buts actions"
              v-if="item.status == '0'"
              @click="takeExercises(item.id)"
            >
              {{ item.status_text }}
            </div>
            <div
              class="buts receive"
              v-else-if="item.status == '1'"
              @click="receiveRewardsExercises(item.id)"
            >
              {{ item.status_text }}
            </div>
            <div class="buts noaction" v-else-if="item.status == '2'">
              {{ item.status_text }}
            </div>
            <div class="buts nowaction" v-else-if="item.status == '3'">
              {{ item.status_text }}
            </div>
          </div>
          <img :src="item.image" class="iocs" />
        </div>
      </div>
    </div>
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
      minutes: 0, //分
      seconds: 0, //秒
      status: false,
      action: false,
    }
  },
  created() {
    this.$parent.footer(false)
  },
  methods: {
    start() {
      Fetch('/index/getSportEventList').then((res) => {
        this.data = res.data.list
        this.minutes = res.data.m
        this.seconds = res.data.s
        if (this.seconds > 0 || this.minutes > 0) {
          this.seconds = this.seconds + 1
          this.status = true
          if (this.action == false) {
            this.timer(true)
          }
        } else {
          this.action = false
        }
      })
    },
    takeExercises(id) {
      Fetch('/index/takeExercises', { sid: id }).then((res) => {
        this.$notify({
          background: '#07c160',
          message: res.info,
        })
        this.start()
      })
    },
    receiveRewardsExercises(id) {
      Fetch('/index/receiveRewardsExercises', { sid: id }).then((res) => {
        this.$notify({
          background: '#07c160',
          message: res.info,
        })
        this.start()
      })
    },
    // 倒计时
    num(n) {
      if (this.minutes === 0 && this.seconds === 0 && this.status == true) {
        this.start()
        this.status = false
      }
      return n < 10 ? '0' + n : '' + n
    },
    // 倒计时
    timer(is_action = false) {
      if (is_action) {
        this.action = true
      }
      var _this = this
      var time = window.setInterval(function () {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59
          _this.minutes -= 1
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0
          window.clearInterval(time)
        } else {
          _this.seconds -= 1
        }
      }, 1000)
    },
  },
  mounted() {
    // 倒计时
    this.start()
  },
  watch: {
    // 倒计时
    second: {
      handler(newVal) {
        this.num(newVal)
      },
    },
    // 倒计时
    minute: {
      handler(newVal) {
        this.num(newVal)
      },
    },
  },
  computed: {
    // 倒计时
    second: function () {
      return this.num(this.seconds)
    },
    minute: function () {
      return this.num(this.minutes)
    },
  },
}
</script>

<style scoped lang="less">
/* .ddates{
		width: 100%;
		text-align: center;
		margin: 2vw 0;
	} */
.main {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  padding: 14px 14px 30px;
  height: 100%;
  background-color: #f5f5f5;
  font-family: PingFang SC;
}
.lists-box {
  width: 348px;
  height: 118px;
  background: #ffffff;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 13px;
  &:nth-of-type(2n) {
    padding-right: 0;
    padding-left: 6px;
  }
}
.lists {
  position: relative;
  height: 100%;
  border-radius: 7px;
  display: flex;
  align-items: center;

  .info_box {
    flex: 1 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .iocs {
    width: 175px;
    height: 100%;
  }
}
.sport_infos-box {
  margin: 12px 0 0 12px;
  .sport_infos {
    font-size: 16px;
    font-weight: bold;
    color: #050505;
    line-height: 20px;
    padding-bottom: 10px;
  }
  .dates {
    font-size: 13px;
    font-weight: 500;
    color: #cccccc;
  }
}
.buts {
  margin: 0 0 12px 12px;
  border-radius: 19px;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  width: 103px;
  height: 29px;
  background: #6c4dd9;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.actions {
  //background-color: #FFFFFF;
}
.noaction {
  background-color: #d3d3d3;
}
.receive {
  background-color: #cc0001;
}
.nowaction {
  background-color: #808a87;
}
</style>
