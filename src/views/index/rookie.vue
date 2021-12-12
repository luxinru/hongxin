<template>
  <div class="page_root">
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)" />
      新手指引
    </div>
    <img class="logo" src="@/assets/hongxin/3-5 🆕 活动红包_slices/bg-新手上.png" alt="">

    <img class="logo2" src="@/assets/hongxin/3-5 🆕 活动红包_slices/Frame 2743.png" alt="">

    <img class="logo3" src="@/assets/hongxin/3-5 🆕 活动红包_slices/引导图.png" alt="">

    <img class="logo4" src="@/assets/hongxin/3-5 🆕 活动红包_slices/bg-新手下.png" alt="">
  </div>
</template>

<script>
export default {
  name: "Rookie",
  components: {},
  data() {
    return {};
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.page_root {
  padding: 0;
  background: RGBA(164, 183, 255, 1);

  .header {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #1c1d38;

    i {
      position: absolute;
      left: 10px;
    }
  }

  .logo {
    width: 100%;
    height: 209px;
  }

  .logo2 {
    width: 342px;
    height: 42px;
    margin-top: 40px;
  }

  .logo3 {
    width: 342px;
    height: 1087px;
    z-index: 1;
  }

  .logo4 {
    width: 100%;
    height: 417px;
    margin-top: -340px;
  }
}
</style>
