<template>
  <div>
  <header class="header cl">
      <div class="left" >
        <i @click="goback()" class="iconfont iconfanhui"></i>
      </div>
      <div class="uinfo">
        <div class="cl">
            <div class="head z">
              <div class="crt">
                 <img :src="avatar" alt="">
              </div>
            </div>
            <div class="name z">{{receive_name}}</div>
        </div>
      </div>
  </header>
  	<div class="main">
        <div class="chat_cont">
      		 <pmessage
                  v-for="obj in getInfos"
                  :key="obj.msg_id"
                  :msg="obj.content"
                  :sendname="obj.send_name"
                  :sendid="obj.send_id"
                  :receivename="obj.receive_name"
                  :receiveid="obj.receive_id"
                  :username="username"
                  :type="obj.type"
                  :imgs="obj.imgs"
      		 ></pmessage>
      </div>

    </div>
    <sendInput @sends="sends" 
      :send_name="username"
      :receive_name="receive_name"
      :send_uid="user_id"
      :receive_uid="uid"
      :avatar="avatar"
      v-on:tops="tops"
     ></sendInput>
  	</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import pmessage from '@/components/pmessage';
import sendInput from '@/components/sendInput';
import socket from '@/api/socket.js';
import debounce from 'lodash/debounce';
import { Toast, Indicator } from 'mint-ui';
import { Privatemsg, searchPrivatemsg, insertFriends } from '@/api/api.js'

export default {
  data() {
    return {
      title: '私',
      container: {},
      current: 1,
      index: 15,
      username: JSON.parse(localStorage.getItem('userinfo'))[0].username,
      user_id: JSON.parse(localStorage.getItem('userinfo'))[0].id,
      uid: this.$route.query.uid, //要发送到达用户的id
      receive_name: this.$route.query.receive_name, //对方name
      avatar:this.$route.query.avatar,
      socketid: '',
    }
  },
  mounted() {
    this.$store.dispatch('deleteCacheById', this.uid); //清空未读消息
    this.container = document.querySelector('.chat_cont')
    this.$store.commit('setRoomDetailInfos');
    Indicator.open();
    setTimeout(async() => {
      const data = {
        current: +this.current,
        index: this.index,
        send_uid: this.user_id,
        receive_uid: this.uid,
      }
      this.$store.dispatch('getPrivatehistory', data);
      Indicator.close();
      this.$nextTick(() => {
        this.container.scrollTop = 10000
      })
    }, 500)
    //对方消息
    socket.on('chat_m', (obj) => {
      if (obj.send_name == this.receive_name) {
        this.$store.dispatch('deleteCacheById', this.uid); //清空未读消息
        this.index++;
        this.$store.commit('addRoomDetailInfos', obj);
      }
    });
    //监听到顶部请求
    this.container.addEventListener('scroll', debounce(async(e) => {
      if (e.target.scrollTop === 0 && this.getInfos.length >= 10) {
        this.current++
          const data = {
            current: +this.current,
            index: this.index,
            send_uid: this.user_id,
            receive_uid: this.uid,
          }
        await this.$store.dispatch('getPrivatehistory', data);
      }
    }, 100), true)
  },
  methods: {
    goback() {
      //清空未读消息
      this.$store.dispatch('deleteCacheById', this.uid);
      this.uid = '';
      this.receive_name = '';
      // this.$router.go(-1);
      this.$router.push({ path: '/diaLog' });
    },
    sends(msg) {
      if (msg) {
        //要发送给对方的数据
        let data = {
          send_uid: this.user_id, //发送方
          receive_uid: this.uid, //接收方
          send_name: this.username, //发送方name
          receive_name: this.receive_name, //接受放name
          content: msg, //消息内容
          creat_time: Date.now(), //时间);
          imgs:'',
          avatar:this.avatar,
          type:'1',
        };
        let that = this;
        insertFriends({ key: this.user_id, value: JSON.stringify(data) }).then(res => {
          this.$store.dispatch('updataMslist');
        })

        Privatemsg({ content: data.content, send_uid: data.send_uid, receive_uid: data.receive_uid, send_name: data.send_name, receive_name: data.receive_name, creat_time: data.creat_time,imgs:data.imgs,type:data.type}).then(res => {
          if (res.data.status == 1) {
            that.index++;
            this.$store.commit('addRoomDetailInfos', data)
            socket.emit('chat', data);
          }
        })
      }
    },tops(){
     this.$nextTick(() => {
        this.container.scrollTop =100000
      })
    },
  },
  computed: {
    ...mapGetters([
      'getInfos',
    ]),
  },
  components: {
    pmessage,
    sendInput
  }
}

</script>


<style scoped>
.chat_cont{
    width: 100%;position:absolute;
    overflow-y: scroll;
    overflow-x: hidden;
    top:1.1rem;
    bottom:1.5rem;
  }
@media screen and (min-width:520px) {
  .chat_cont{width:800px;}
}
  .chat_cont::-webkit-scrollbar {display:none}
.header{height:1.1rem;line-height:1.1rem; font-size:0.45rem;font-weight:500; width:100%;background:#fafafa;text-align: center;position: relative;border-bottom:1px solid #e4e4e4;color:#262626;}
  .left{position:absolute;top:0;left:0.4rem;}
  .left i{font-size:0.75rem;color:#262626; font-weight:200;}
  .header .uinfo{margin-left:1.2rem;}
.header .uinfo .head{width:0.8rem;height:0.8rem; border-radius:50%;border:1px solid #cecece;overflow: hidden;text-align: center;margin-top:0.1rem;margin-right:0.15rem;}
.header .uinfo .head .crt{width:0.65rem;height:0.65rem;border-radius:50%;margin-top:0.05rem; border:1px solid #cecece;overflow: hidden;display:inline-block;}
.header .uinfo .head img{width:110%;height:110%;}
.header .uinfo .name{font-size:0.42rem;color:#262626;font-weight:400;}


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