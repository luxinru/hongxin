<template>
  <div class="btn_root" @click="onClick" :style="style">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Btn',

  props: {
    background: {
      type: String,
      default () {
        return 'rgba(108, 77, 217, 1)'
      }
    }
  },

  computed: {
    style () {
      return {
        background: this.background
      }
    }
  },

  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.btn_root {
  width: 325px;
  height: 50px;
  background: linear-gradient(90deg, #6C4DD9 0%, #4D5BD9 100%);
  border-radius: 8px;
  font-size: 21px;
  font-family: PingFang SC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px auto;
}
</style>