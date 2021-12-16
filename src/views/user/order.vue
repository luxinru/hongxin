<template>
  <div class="page_root order">
    <div class="header">
      <van-icon
        name="arrow-left"
        @click="$router.go(-1)"
        size="16px"
        color="#fff"
      />
    </div>
    <div class="tab_box">我的订单({{ data.list.length || 0 }})</div>
    <van-tabs
      v-model="active"
      background="RGBA(108, 77, 217, 1)"
      title-inactive-color="rgba(255, 255, 255, 0.7)"
      title-active-color="rgba(255, 255, 255, 1)"
    >
      <van-tab title="全部">
        <div class="order_wrap">
          <template v-if="data.list && data.list.length">
            <div class="item" v-for="(v, k) in data.list" :key="k">
              <div class="title">订单号：{{ v.id }}</div>
              <div class="info">
                <img class="left" :src="v.img" />
                <div class="right">
                  <div class="right_title">{{ v.goods }}×{{ v.num }}</div>
                  <div class="price_box">
                    {{ v.integral }}
                    <span>积分</span>
                  </div>
                </div>
              </div>
              <div class="sub">
                <span class="label">创建时间:</span>
                <span class="value">{{ v.time }}</span>
              </div>
            </div>
          </template>
          <template v-if="data.count === 0">
            <div class="order_wrap">
              <img
                class="nodata"
                src="@/assets/hongxin/2-11 🆕 地址-无地址_slices/Delivery address-rafiki 1.png"
                alt=""
              />
              <div class="sub">您目前还没有兑换记录</div>
            </div>
          </template>
        </div>
      </van-tab>
      <van-tab title="待发货">
        <div class="order_wrap">
          <img
            class="nodata"
            src="@/assets/hongxin/2-11 🆕 地址-无地址_slices/Delivery address-rafiki 1.png"
            alt=""
          />
          <div class="sub">您目前还没有兑换记录</div>
        </div>
      </van-tab>
      <van-tab title="已发货">
        <div class="order_wrap">
          <img
            class="nodata"
            src="@/assets/hongxin/2-11 🆕 地址-无地址_slices/Delivery address-rafiki 1.png"
            alt=""
          />
          <div class="sub">您目前还没有兑换记录</div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div class="order_wrap">
          <img
            class="nodata"
            src="@/assets/hongxin/2-11 🆕 地址-无地址_slices/Delivery address-rafiki 1.png"
            alt=""
          />
          <div class="sub">您目前还没有兑换记录</div>
        </div>
      </van-tab>
    </van-tabs>
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
      data: {
        config: {
          status: {},
        },
      },
      active: 0,
      status: 'S',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    /* start(status = 'S') {
                this.status = status;
                Fetch('/user/shop_order', {status: status}).then(res => {
                    this.data = res.data;
                })
            }, */
    start() {
      this.status = status
      Fetch('/user/shop_order').then((res) => {
        this.data = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  padding: 48px 0 0 0;
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background: RGBA(108, 77, 217, 1);
  }

  .tab_box {
    width: 375px;
    height: 43px;
    background: RGBA(108, 77, 217, 1);
    padding: 0 16px;
    font-size: 24px;
    font-weight: 500;
    color: #ffffff;
  }

  .order_wrap {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
      width: 351px;
      background: #fff;
      margin-top: 16px;
      border-radius: 16px;
      overflow: hidden;

      .title {
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        width: 100%;
        height: 47px;
        display: flex;
        align-items: center;
        background-color: RGBA(249, 247, 255, 1);
        padding: 0 12px;
      }

      .info {
        width: 100%;
        height: 95px;
        padding: 12px;
        background: #fff;
        display: flex;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        .left {
          width: 95px;
          height: 100%;
        }

        .right {
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 12px;
          &_title {
            font-size: 18px;
            font-weight: 500;
            color: #1c1d38;
          }

          .price_box {
            width: 100%;
            font-size: 18px;
            font-weight: 500;
            color: #eb3143;
            display: flex;
            align-items: flex-end;

            span {
              font-size: 10px;
              font-weight: 500;
              color: #eb3143;
              margin-left: 5px;
            }
          }
        }
      }

      .sub {
        width: 100%;
        display: flex;
        align-items: center;
        margin: 15px 0 12px;
        padding: 0 12px;
        .label {
          font-size: 12px;
          font-weight: 400;
          color: #999999;
        }

        .value {
          font-size: 12px;
          font-weight: 400;
          color: #1c1d38;
          margin-left: 12px;
        }
      }
    }

    .nodata {
      width: 250px;
      height: 250px;
    }

    .sub {
      font-size: 16px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>

<style lang="less">
.order {
  .van-tabs {
    width: 100%;
  }

  .van-field__body {
    display: flex;
  }
}
</style>