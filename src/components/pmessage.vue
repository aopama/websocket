<template>
  <div class="cl" ref="msg"> 
    <div :class="[sendname==username ? 'self' : 'others']">
        <div class="cl">
            <div class="bubble z">
                <span class="chatBubble" v-if="type==1" v-html='msg'></span>
                <img class="imgs" v-if="type==2" :src="imgs" alt="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: ['msg','username','sendname','type','imgs'],
    mounted() {
     this.$refs.msg.scrollIntoView();
    }
	}
</script>

<style scoped>
.bubble{border-radius: 0.6rem;
    margin-top:0.15rem;
  padding:0.35rem 0.45rem;
  display: inline-block;
  position: relative;
  background-color:#efefef;
  max-width:5rem;}
.imgs{max-width:5rem;}
.chatBubble {
  display: block;
  word-break:break-word;
  overflow: hidden;
  text-align: left;
  font-size:0.4rem;
  color:#262626;
}
.self {
  float: right;
  padding-right:0.3rem;
}
.others {
  float: left;
  padding-left:0.3rem;
}
</style>