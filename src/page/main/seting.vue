<template>
  <div class="my_warp">
    <Chead :cen='true' :left='true' title="设置"></Chead>
    <div class="main">
      <div class="items">
        <router-link to="/avatar">
          <div class="item cl">
            <div class="name">修改头像</div>
            <i class="iconfont iconright-arr-gary"></i>
          </div>
        </router-link>
        <div class="item cl">
          <div class="name">账号设置</div>
          <i class="iconfont iconright-arr-gary"></i>
        </div>
      </div>
    <div class="items">
      <button class="btn out" @click="logout()">退出登录</button>
    </div>
    </div>
  </div>
</template>

<script>
import socket from '@/api/socket.js';
import Chead from '@/components/head';
export default {
  data () {
    return {
      userinfo:"",
    }
  },
  mounted(){

  },methods:{
    logout(){
      socket.emit('close');
      localStorage.removeItem('userinfo');
      this.$router.push({path:'/Login'});
    }
  },
    components:{
      Chead
    }
}
</script>
<style scoped>
.my_warp{height:100%;background:#ededed;}
.my_warp a{text-decoration:none;}

.main{padding-top:1.2rem;}
.items{background:#fff;margin-bottom:10px;border-top:1px solid #ececec;border-bottom:1px solid #ececec;}
.items .item{padding-left:0.4rem;position: relative;}
.items .item .iconright-arr-gary{font-size:0.4rem;color:#b3b3b3;display: inline-block;
position: absolute;top:0.5rem;right:0.4rem;}
.items .item .name{color:#333;font-size:0.45rem;line-height:1.45rem;border-bottom:1px solid #ececec;margin-left:0.2rem;}
.items .item:last-child .name{border:none;}
.items .icondianzan1{color:#ea5f5f;}
.items .out{border-radius:0;background:red;color:#fff;}
</style>
