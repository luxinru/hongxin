<template>
  <div class="page_root">
    <div class="container">
      <section class="header">
        <van-icon
          class="back"
          name="arrow-left"
          size="23"
          color="#fff"
          @click="$router.go(-1)"
        />
      </section>

      <section class="content">
        <div class="item" v-for="index in 10" :key="index">
          <div class="left">
            <span>无碳可再生能源将成为未 来发展的主导能源</span>
            <span>2021/12/19 17:00:00</span>
          </div>
          <img src="" alt="" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
    return {}
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.page_root {
  padding: 0;

  .container {
    width: 100%;
    height: 812px;
    background: url('~@/assets/hongxin/头图.png') no-repeat;
    background-size: 100% 812px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      margin-top: 248px;
      width: 335px;
      height: 495px;
      background: #ffffff;
      border-radius: 7px;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      padding: 0 16px;

      .item {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 23px 0 18px 0;
        display: flex;
        .left {
          flex: 1 0;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          span {
            font-size: 16px;
            font-weight: 500;
            color: #323641;

            &:last-child { 
              font-size: 13px;
              font-weight: 400;
              color: #B9B9B9;
            }
          }
        }

        img {
          width: 110px;
          height: 86px;
          border-radius: 4px;
          margin-left: 16px;
        }
      }
    }
  }
}
</style>
