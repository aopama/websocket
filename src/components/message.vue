<template>
  <div class="cl" ref="msg">
    <div :class="[sendname==username ? 'self' : 'others']">
      <div class="cl">
        <div class="bubble z">
          <span class="chatBubble" v-if="type==1" v-html='msg'></span>
          <img class="imgs" v-if="type==2" :src="imgs" alt="">
          <div class="triangle"></div>
        </div>
        <div class="avatar z">
          <router-link :to="{name:'my',query:{uid:uid}}">
            <div class="c_name">
              <div class="name">{{sendname}}</div>
            </div>
            <img :src="avatar" alt="">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['msg', 'username', 'sendname', 'avatar','uid','type','imgs'],
  mounted() {
    this.$refs.msg.scrollIntoView();
  }
}

</script>
<style scoped>
.bubble {
  border-radius: 0.3rem;
  margin-top: 0.6rem;
  padding: 0.3rem;
  display: inline-block;
  position: relative;
  background-color: rgb(198, 205, 243);
  max-width: 5rem;
  z-index: 1;
}

.self .bubble {
  margin-right: 0.4rem;
}

.others .bubble {
  margin-left: 0.4rem;
}

.chatBubble {
  display: block;
  word-break: break-word;
  overflow: hidden;
  text-align: left;
  font-size: 0.4rem;
  color: #fff;

}

.avatar img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #7cfacc;
}

.avatar .c_name {
  position: relative;
  height: 0.5rem;
}

.avatar .name {
  font-size: .4rem;
  position: absolute;
  top:-0.1rem;
  z-index:8;
  color:#333;
  left: 0;
  max-width: 7rem;
  height: 0.5rem;
  overflow: hidden;
}
.imgs{max-width:5rem;}
.msgItem {
  padding-bottom: .2rem
}

.self .name {
  right: 0;
  left: auto;
}

.self {
  float: right;
  padding-right: .5rem;
  margin-bottom: 0.2rem;
}

.others {
  float: left;
  padding-left: 1.5rem;
  margin-bottom: 0.2rem;
}

.others .avatar {
  margin-left: -1rem;
}

.others .bubble {
  float: right;
}

.self .triangle {
  position: absolute;
  z-index: -1;
  right: -0.2rem;
  top: 0.2rem;
  border-left: 0.625rem solid rgb(198, 205, 243);
  border-bottom: 0.625rem solid transparent;
}

.others .triangle {
  position: absolute;
  z-index: -1;
  left: -0.2rem;
  top: 0.2rem;
  border-right: 0.625rem solid rgb(198, 205, 243);
  border-bottom: 0.625rem solid transparent;
}

</style>
