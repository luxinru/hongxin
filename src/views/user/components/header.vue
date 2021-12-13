<template>
  <div class="headerBox">
    <div class="header">
      <van-icon name="arrow-left" @click="routerFun()" color="#fff" />
      <span>{{ title }}</span>
      <div></div>
    </div>
    <div class="tips">
      {{ title == '充值详情' ? '充值金额(元）' : '账户余额(元）' }}
    </div>
    <div class="money">{{ money }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    money: {
      type: String,
      default: ''
    }
  },
  methods: {
    routerFun () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.item-header-icon {
  /deep/ .van-icon {
    color: #000;
  }
}

.headerBox {
  width: 100%;
  height: 227px;
  background: linear-gradient(180deg, #6c4dd9 80%, rgba(108, 77, 217, 0) 100%);
  margin: 0 auto 0;
  // padding: 32px;
  .header {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
  }
  .tips {
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    line-height: 12px;
    margin: 12px 0 0 12px;
  }
  .money {
    font-size: 34px;
    font-weight: 600;
    color: #ffffff;
    line-height: 40px;
    margin: 6px 0 0 12px;

    &::before {
      content: '¥';
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      margin-right: 4px;
    }
  }
}
</style>
