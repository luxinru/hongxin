<template>
  <div class="page_root">
    <section class="header">
      <van-icon name="arrow-left" color="#000" @click="$router.go(-1)" />
    </section>
    <img :src="image" alt="" />
    <div class="goods-info-box">
      <div class="goods-integral">
        {{ integral }}
        <span>积分</span>
      </div>
      <div class="goods-name">{{ title }}</div>
    </div>
    <div v-if="content" class="goods_d_content">
      <div class="title">
        <span></span>
        商品详情
      </div>
      <div class="content" v-html="content"></div>
    </div>
    <div class="dh-btn" @click="category_btn($route.params.id, no)">
      立即兑换
    </div>
  </div>
</template>

<script>
import Fetch from '../../utils/fetch'

export default {
  name: 'shop',
  components: {},
  data() {
    return {
      title: '',
      content: '',
      num: '',
      image: '',
      integral: '',
    }
  },
  computed: {
    no() {
      return this.$route.query.num
    },
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    Fetch('/index/goods_detail', {
      id: this.$router.history.current.params.id,
    }).then((res) => {
      this.title = res.data.title
      this.image = res.data.img
      this.content = res.data.content
      this.num = res.data.num
      this.integral = res.data.integral
    })
  },
  methods: {
    start() {
      Fetch('/user/info').then((res) => {
        this.mydata = res.data
      })
      // 兑换信息
      Fetch('/index/goods_list').then((res) => {
        this.category_data = res.data
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
.page_root {
  padding: 0;

  .header {
    position: absolute;
    top: 0;
    left: 0;
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

  img {
    width: 100%;
    height: 375px;
  }
  .goods-info-box {
    width: 100%;
    padding: 16px;
    border-radius: 0 0 16px 16px;
    background-color: #ffffff;
    .goods-integral {
      font-size: 26px;
      font-weight: 500;
      color: #eb3143;
      span {
        font-size: 15px;
        font-weight: 500;
        color: #eb3143;
        margin-left: 5px;
      }
    }
    .goods-name {
      font-size: 18px;
      font-weight: 500;
      color: #1c1d38;
      margin-top: 16px;
    }
  }
  .dh-btn {
    position: fixed;
    bottom: 12px;
    width: 351px;
    height: 55px;
    background: linear-gradient(90deg, #6c4dd9 0%, #4d5bd9 100%);
    border-radius: 50px;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.goods_d_content {
  margin-top: 16px;
  width: 100%;
  background: #fff;
  border-radius: 16px 16px 0 0;
  padding: 16px 16px 83px 16px;

  .title {
    width: 100%;
    display: flex;
    align-items: center;

    span {
      width: 3px;
      height: 25px;
      background-color: rgba(108, 77, 217, 1);
      margin-right: 5px;
    }

    font-size: 18px;
    font-weight: 500;
    color: #1c1d38;
  }

  .content {
    padding: 20px 0;
  }
}
</style>
