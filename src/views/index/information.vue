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
        <div class="item" v-for="(item, index) in list" :key="index" @click="toDetails(item.index)">
          <div class="left">
            <span>{{ item.title }}</span>
            <span>{{ item.time }}</span>
          </div>
          <img :src="item.img" alt="" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info',
  data() {
    return {
      list: [
        {
          title: '2021年四川电力市场十大难忘交易场景',
          img: require('@/assets/hongxin/资讯/e678cded6c564bc9c57dbd1b0eef55ae.jpg'),
          time: '2021-12-22 10:06:16',
          index: 1
        },
        {
          title: '电能替代产业发展高峰论坛在京举办',
          img: require('@/assets/hongxin/资讯/2877c71477d9d8f7264f77381e4cb08f.jpg'),
          time: '2021-12-22 10:06:16',
          index: 2
        },
        {
          title: '全球锂矿产能不足 电动汽车供应链压力将进一步加剧',
          img: require('@/assets/hongxin/资讯/3cea19bf5fca9cf0c43564ad75840f6e.jpg'),
          time: '2021-12-22 10:06:15',
          index: 3
        },
        {
          title: '宁德时代全球布局最大单体项目在福鼎投产',
          img: require('@/assets/hongxin/资讯/2877c71477d9d8f7264f77381e4cb08f.jpg'),
          time: '2021-12-22 10:06:15',
          index: 4
        },
        {
          title: '储能闲置频现，如何避免劣币驱逐良币？',
          img: require('@/assets/hongxin/资讯/ffbc24af5771cbe79d0da9aafa0f7b4b.jpg'),
          time: '2021-12-22 10:06:15',
          index: 5
        },
        {
          title: '比克大圆柱电池将通过经济性、高能量密度和快充电性能助力中高端纯电汽车',
          img: require('@/assets/hongxin/资讯/f83771abff1836a14f842eba50d6775a.jpg'),
          time: '2021-12-22 10:06:16',
          index: 6
        }
      ]
    }
  },
  created() {
    this.$parent.footer(false)
  },
  mounted() {},
  methods: {
    toDetails(index) {
      this.$router.push({
        name: 'information_details',
        params: {
          index
        }
      })
    }
  },
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
      max-height: 495px;
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

        &:last-child {
          border-bottom: none;
        }
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
              margin-top: 16px;
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
