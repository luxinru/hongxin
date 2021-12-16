<template>
  <div class="page_root">
    <div class="header">
      <van-icon
        name="arrow-left"
        @click="$router.go(-1)"
        size="16px"
        color="#fff"
      />
      收货地址
      <van-icon
        name="plus"
        @click="$router.push('/editaddress')"
        size="16px"
        color="#fff"
      />
    </div>
    <div class="address_wrap">
      <template v-if="data.list && data.list.length">
        <div class="item" v-for="(v, k) in data.list" :key="k">
          <!-- :class="v.is_default === 'Y' ? 'item_default' : ''" -->
          <div class="center_top">
            <span class="item_name">{{ v.name }}</span
            ><span class="item_mobile">{{ v.tel }}</span>
          </div>
          <div class="center_bottom">
            {{ v.province }} {{ v.city }} {{ v.county }} {{ v.address }}
          </div>
          <div class="footer">
            <van-checkbox
              v-model="v.selected"
              checked-color="RGBA(108, 77, 217, 1)"
              icon-size="16px"
              >默认地址</van-checkbox
            >
            <van-icon
              name="edit"
              size="16px"
              @click="$router.push('/editaddress/' + v.id)"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="no_data">
          <img
            src="@/assets/hongxin/2-11 🆕 地址-无地址_slices/Delivery address-rafiki 1.png"
            alt=""
          />

          <div class="btn" @click="$router.push('/editaddress')">
            添加收货地址
          </div>
        </div>
      </template>
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
      money_info: '',
      money: '',
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {
    this.start()
  },
  methods: {
    start() {
      Fetch('/user/address').then((res) => {
        if (res.data.list && res.data.list.length) {
          res.data.list.forEach((item) => {
            item.selected = item.is_default === 'Y'
          })
        }

        this.data = res.data
      })
    },
  },
}
</script>

<style lang="less" scoped>
.page_root {
  padding: 48px 12px;
  .header {
    position: fixed;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background: RGBA(108, 77, 217, 1);
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
  }

  .address_wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item {
      width: 351px;
      background: #ffffff;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      margin-top: 12px;

      .center_top {
        width: 100%;
        display: flex;
        align-items: flex-end;

        .item_name {
          font-size: 16px;
          font-weight: 500;
          color: #333333;
        }

        .item_mobile {
          font-size: 14px;
          font-weight: 400;
          color: #1c1d38;
          margin-left: 8px;
        }
      }

      .center_bottom {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        margin-top: 8px;
      }

      .footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 16px;
        border-top: 1px solid rgba(242, 242, 242, 1);
        margin-top: 16px;
        font-size: 14px;
        font-weight: 400;
        color: #666666;
      }
    }
  }

  .no_data {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 250px;
      height: 250px;
      margin-top: 101px;
    }

    .btn {
      width: 295px;
      height: 55px;
      background: linear-gradient(90deg, #6c4dd9 0%, #4d5bd9 100%);
      border-radius: 50px;
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>