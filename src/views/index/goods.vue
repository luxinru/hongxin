<template>
  <div class="page_root">
    <section class="header">
      <div class="title">
        <van-icon
          name="arrow-left"
          size="16px"
          color="#fff"
          @click="$router.go(-1)"
        />
        积分商城
      </div>
      <span class="label">我的积分</span>
      <span class="value">{{ mydata.integral }}</span>
      <div class="footer" v-if="footer_type === 'n2'">
        <div class="item">
          <img src="@/assets/hongxin/2-7 积分商城_slices/积分奖励.png" alt="" />
          现在投资有积分奖励
        </div>
        <div class="item">
          立即投资
          <van-icon name="arrow" size="12px" />
        </div>
      </div>
    </section>

    <section class="content">
      <div class="title">
        <span></span>
        弘信·商城
        <span></span>
      </div>
      <div
        class="list"
        v-for="(item, j) in category_data.category"
        v-bind:style="{ display: j === dh_index ? 'flex' : 'none' }"
        :key="j"
      >
        <div class="item" v-for="(item2, j_num) in item.list" :key="j_num">
          <img :src="item2.img" alt="" />
          <span class="item_title">{{ item2.title }}</span>
          <span class="item_value">{{ item2.integral }}积分</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'shop',
  data() {
    return {
      mydata: {},
      data: {},
      dh_index: 0,
      horn_block: false,
      category_data: {},
      is_sleep: false,
      show_water: true,
      show_manure: true,
      treeImg: '',
      dh_num: [],
      only_num: 1,
      sign_ok: false,
      new_sign_ok: false,
      shop_show: false,
      show_apple: false,
      rule_mask: false,
      add_res: false,
      only_money: false,
      money_icon_show: false,
      show_delay_animate: '',
      level_lc: 'lv2',
      horn_msg: '',
      jump_url: '/item',
      fly_go: '',
      hide_tree: [],
      progress: '0%',
      notice_num: 1,
      mp3: '',
      sign_money: 0,
      dh_btn_type: '',
      water_time: '每日0点—24点',
      water_rule: 'cs2',
      rule_dh: false,
      rule_msg: 'cs',
    }
  },
  computed: {
    footer_type() {
      return localStorage.getItem('footer')
    },
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    setTimeout(function () {
      document.getElementById('app').style.marginBottom = 0
    }, 100)
    this.mp3 = require('./image/didi.mp3')
    this.start()
    if (location.href.indexOf('openshop') != -1) {
      this.shop_show = true
    }

    // $(window).resize(function(){
    // 	set();
    // });

    // set();
    // this.start();
  },
  methods: {
    start() {
      Fetch('/user/info').then((res) => {
        this.mydata = res.data
      })
      // 兑换信息
      Fetch('/index/goods_list').then((res) => {
        this.category_data = res.data
        console.log(this.category_data)
        for (var i = 0; i < res.data.category.length; i++) {
          this.dh_num.push([])
          for (var j = 0; j < res.data.category[i].list.length; j++) {
            this.dh_num[i].push(1)
          }
        }
        if (res.data.exchange_rules.content || res.data.exchange_rules.title) {
          this.rule_msg =
            res.data.exchange_rules.content || res.data.exchange_rules.title
        }
      })
    },
    category_btn(id, num) {
      Fetch('/index/shop_exchange', {
        gid: id,
        num: num,
      }).then((res) => {
        this.$notify({
          background: '#07c160',
          message: res.info,
        })
        this.start()
      })
    },
  },
}
</script>

<style scoped lang="less">
@import 'goods.less';
</style>
