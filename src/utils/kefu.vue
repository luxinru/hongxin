<template>
    <div v-if='msg_show' class="kefu" :class="show_kefu?'':'kefu_hide'" @click="kefu_to">
    	<img class="kefu_img" src="../assets/images/kefufixed.png">
    </div>
</template>

<script>
    export default {
        name: "kefu",
		props:{},
        data() {
			return {
				show_kefu:false,
				msg_show: true
			};
        },
		watch: {
		    $route(t,f) {
				if( t.path.indexOf('kefu')!=-1){
					this.msg_show = false;
				}else{
					this.msg_show = true;
				}
		    }
		  },
		mounted() {
		    var that = this;
		    window.addEventListener("scroll",function(){
		    	if(!that.show_kefu){
		    		return;
		    	}
		    	that.show_kefu = false;
		    },false);
			document.addEventListener('click',function(ev){
				if(ev.target.className != 'kefu_img'){
					that.show_kefu = false;
				}
			},false);
		},
        methods: {
			kefu_to(){
				if(this.show_kefu){
					this.$router.push('/kefu');
				}
				this.show_kefu = !this.show_kefu;
				// window.location = "http://www.baidu.com"
			},
        },
    };
</script>

<style lang="less" scoped>
	.kefu{
		width: 90px;
		height: 90px;
		position: fixed;
		z-index: 10;
		right: 13px;
		bottom: 120px;
		transition: all 1s;
		opacity: 1;
		transform: translateX(0);
		img{
			width: 100%;
			height: 100%;
		}
	}
	.kefu.kefu_hide{
		transform: translateX(70%);
		opacity: 0.5;
	}
</style>