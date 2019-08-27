<template>
  <div class="btn_warp">
      <div class="cl" v-if="uid!=fid" :class="flag?'':'on'">
        <div  @click="btn_cont(state)" class="btn_cont cl" >
          <span class="send_message follow z">关注</span>
        </div>
        <div class="btn_cont cl">
           <router-link :to="{
                  name:'Chat',
                  query:{
                    uid:fid,
                    receive_name:username,
                    avatar:avatar,
                  }
                }">
            <span class="send_message z">发消息</span>
          </router-link>
          <span class="right z"  @click="btn_cont(state)">
            <i v-if="fidFollow==0" class="iconfont iconyiguanzhu"></i>
            <i v-if="fidFollow==1" class="iconfont iconhuxiangguanzhu"></i>
          </span>
        </div>
      </div>
  </div>
</template>
<script>
import { isFriends,removeFriends,addFriends } from '@/api/api.js'
export default {

  props: ['uid','fid',"username","avatar"],
  data() {
    return {
        state:'',
        flag:'',
        fidFollow:'',
    }
  },
  mounted() {
    let that=this;
    isFriends({uid:this.uid,fid:this.fid}).then((res)=>{
      if(res.data.status==1){
          that.fidFollow=res.data.data[0].fidFollow
          that.state=res.data.data[0].state
          if(res.data.data[0].state==2){
            that.flag=false;
          }else{
            that.flag=true;
          }
        }
      })
  },
  methods:{
    btn_cont(state){
      let that=this;
      if(state==2){
        addFriends({uid:that.uid,fid:that.fid}).then((res)=>{
          if(res.data.status==1){
            this.flag=!this.flag;
          }
        })
      }else{
        removeFriends({uid:that.uid,fid:that.fid}).then((res)=>{
          if(res.data.status==1){
            this.flag=!this.flag;
          }
        })
      }
    }
  },
}

</script>
<style scoped>
.btn_warp{position: relative;width:2.4rem;overflow:hidden;}
.btn_warp>div{width:4.8rem;-webkit-transform: translate(0rem,0);transition:all .2s;}
.btn_warp>div.on{-webkit-transform: translate(-2.35rem,0);transition:all .2s;}
.btn_warp .btn_cont{float:right;margin-right:0.1rem}
.btn_warp span{
  color:#fff;
  text-align: center;
  display: inline-block;
  font-size: 0.35rem;
  font-weight: bold;
  border-radius: 2px;
  opacity: 1;
  height: 0.7rem;
  line-height: 0.7rem;
  background: #bfc4d9;
}
.btn_warp .send_message{
  width:1.5rem;
}
.btn_warp .right{width:0.65rem;margin-left:0.1rem;}
.btn_warp .follow{background:#0084ff;opacity:0.8;width:2.3rem;}
.btn_warp .btn_cont span i{color:#fff;font-size: 0.4rem;font-weight: bold;}
</style>
