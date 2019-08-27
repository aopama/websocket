<template>
  <div>
    <header class="header">
      <div class="left">
        <i @click="goback()" class="iconfont iconfanhui"></i>
      </div>
      <div class="cen">
        <span>群聊</span>
      </div>
  </header>
  	<div class="main">
        <div class="chat_cont">
      		 <message
                  v-for="obj in getInfos"
                  :key="obj.msg_id"
                  :avatar="obj.avatar"
                  :uid="obj.id"
                  :msg="obj.content"
                  :sendname="obj.send_name"
                  :username="username"
                  :type="obj.type"
                  :imgs="obj.imgs"
      		 ></message>
      </div>
      <sendInput 
      @send="send" 
      :avatar="avatar"
      :type="1" 
      :send_name='username' 
      :roomid='roomid'
      :send_uid='user_id'
      ></sendInput>
  	</div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import sendInput from '@/components/sendInput';
import message from '@/components/message';
import socket from '@/api/socket.js';
import store from '@/vuex/store'
import debounce from 'lodash/debounce';
import {Toast,Indicator} from 'mint-ui';
import {Groupmsg} from '@/api/api.js'

	export default {
	    data (){
        return {
            msg:"",
            title:'天',
            msgs:[],
            container: {},
            current:1,
            username:JSON.parse(localStorage.getItem('userinfo'))[0].username,
            user_id:JSON.parse(localStorage.getItem('userinfo'))[0].id,
            roomid:'room'+this.$route.query.roomid,
            avatar:JSON.parse(localStorage.getItem('userinfo'))[0].avatar,
        }
    },
    mounted(){
      this.container = document.querySelector('.chat_cont');
      this.$store.commit('setnullindex');
      this.$store.commit('setRoomDetailInfos');
      Indicator.open();
      setTimeout( async ()=>{
        const data={
          current:+this.current,
          roomid:this.roomid,
          index:store.state.userinfo.roomdetail.index
        }
        this.$store.dispatch('getAllMessHistory',data);
        Indicator.close();
        this.$nextTick(() => {
          this.container.scrollTop = 10000
        })
      },500)
       const obj = {
        name:this.username,
        roomid:this.roomid,
      }
      //加入房间
      socket.emit('room', obj);
      //监听到顶部请求
      this.container.addEventListener('scroll', debounce(async (e) => {
        if (e.target.scrollTop === 0&&this.getInfos.length>=10) {
          this.current++
          const data = {
            current: +this.current,
            roomid: this.roomid,
            index:store.state.userinfo.roomdetail.index,
          }
          await this.$store.dispatch('getAllMessHistory', data);
        }
      }, 100),true)
    },
    methods:{
      goback(){
        const obj = {
          name: this.user_id,
          roomid: this.roomid
        }
        socket.emit('leave',obj);
        this.$router.go(-1);
      },
        send(msg){
            if(msg){
                const obj = {
                  send_name:this.username,
                  content:msg,
                  roomid: this.roomid,
                  creat_time: new Date(),
                  avatar:this.avatar,
                  imgs:'',
                  type:'1',
                }
                let that=this;
                Groupmsg({
                      room_id:obj.roomid,send_id:this.user_id,content:obj.content,send_name:obj.send_name,creat_time:obj.creat_time,avatar:obj.avatar,type:obj.type,imgs:obj.imgs
                  }).then(res=>{
                    if(res.data.status==1){//插入数据库成功
                      this.$store.commit('setindex');
                      socket.emit('login',obj);
                    }else{
                      return false;
                    }
                  })
                this.msg='';
            }else{
                Toast("不能发空!");
                return false;
            }
        }
    },
    computed: {
      ...mapGetters([
        'getInfos',
      ]),
    },
    components:{
      message,sendInput
      }
    }
</script>

<style scoped>
  .header{height:1.1rem;line-height:1.1rem; font-size:0.45rem;font-weight:500; width:100%;background:#fafafa;text-align: center;position: fixed;border-bottom:1px solid #e4e4e4;color:#262626;z-index: 999;max-width:800px;}
   .header .left{position:absolute;top:0;left:0.4rem;}
  .addfriend{position:absolute;top:0;right:0.4rem;}
  .left i,.addfriend i{font-size:0.75rem;color:#262626; font-weight:200;}
.chat_cont{
    width: 100%;position:absolute;
    overflow-y: scroll;
    overflow-x: hidden;
    top:1.25rem;
    bottom:1.5rem;}
@media screen and (min-width:520px) {
  .chat_cont{width:800px;}
}

  .left{position:absolute;top:0;left:0;}
	.inputcount {
  height:1.5rem;
  width:10rem;
  position:fixed;
  bottom: 0;
  display: -webkit-flex;
  display: flex;
}
.msgInput{
  width:8rem;
  height:1.5rem;
  border: 1px solid #eee;
  caret-color: rgb(62, 141, 231);
  color: rgb(55, 125, 182);
  border-right:none;
}
.input{
    display: block;
    border: none;
    margin:0;
    padding:0;
    padding-left:.3rem;
    outline: none;
    width:8rem;
    line-height:1.5rem; 
    font-size:0.4rem;
}
.button{
    font-size:0.4rem;
    width:2rem;
    border:none;
    outline: none;
    color: #fff;
    height: 1.5rem;background:#2196f3;
}
</style>