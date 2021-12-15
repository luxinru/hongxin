<template>
  <div class="page_root">
    <div class="about-list-box">
      <div
        class="about-list-item"
        v-for="(item, key) in data"
        :key="key"
        @click="handleAboutJump(item.id)"
      >
        <div>{{ item.title }}</div>
        <div><van-icon name="arrow" size="18" color="#C3C3C6" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from "../../utils/fetch";

export default {
  name: "index",
  components: {},
  data() {
    return {
      data: {},
    };
  },
  created() {
    this.$parent.footer(false);
  },
  mounted() {
    this.start();
  },
  methods: {
    start() {
      Fetch("/index/about").then((res) => {
        console.log(res)
        this.data = res.data.list;

        if (this.$parent.getFooterType() === "n1") {
          this.data = this.data.slice(7, this.data.length);
        }
        console.log(this.data)
        // console.log(this.data.slice(7,this.data.length))
      });
    },
    handleAboutJump(id) {
      this.$router.push({ path: `/art/${id}` });
    },
  },
};
</script>

<style lang="less" scoped>
@import "about";
</style>
