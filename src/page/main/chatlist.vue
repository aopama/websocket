<template>
 <div class="dialog">
  <Chead :addfriend="true" :cen='true' title="好友"></Chead>
  <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
    <div class="rooms cl">
      <div class="title">群组</div>
      <ul>
        <li v-for="item in rooms" @click="chatql(item.roomid,item.type)">
          <div class="mint-cell-title">1</div>
          <div class="cont cl">
            <div class="head z">
              <img src="../../../src/assets/logo.png" alt="">
            </div>
            <div class="right z">
              <div class="cl">
                <div class="cen z">
                  <span class="name">{{ item.roomname }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="contlist">
      <div class="title">好友</div>
      <ul>
        <li v-for="(item,index) in slist" :class="item.state==1?'on':''" :id="item.id" @click="chatsl(item.id,item.username,item.avatar)">
          <mt-cell-swipe :right="[
	                {
	                    content: '删除',handler: () => del(index,item.id)
	                }
	            ]">
            <div class="mint-cell-title">1</div>
            <div class="cont cl">
              <div class="head z">
                <img :src="item.avatar" alt="">
              </div>
              <div class="right z">
                <div class="cl">
                  <div class="cen z">
                    <span class="name">{{ item.username }}</span>
                  </div>
                </div>
              </div>
            </div>
          </mt-cell-swipe>
        </li>
      </ul>
    </div>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
</div>

</template>
<script>
import Chead from '@/components/head';
import { searchFriends } from '@/api/api.js';
import socket from '@/api/socket.js';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      rooms: [{
        roomname: '房间1',
        roomid: '1',
        type: '1'
      }, {
        roomname: '房间2',
        roomid: '2',
        type: '1'
      }],
      uid: JSON.parse(localStorage.getItem('userinfo'))[0].id,
      islogin: this.$store.state.userinfo.islogin,
      active: false,
      slist: '',
      topStatus: '',
    }
  },
  created() {

  },
  mounted() {
    //更新好友上线列表
    socket.on('uplistchat', (data) => {
      let stat = 0;
      if (data.type == 'join') { stat = 1; } else { stat = 0; }
      let uid = data.uid;
      this.slist.map((el, i) => {
        if (uid == el.id) {
          el.state = stat;
        }
      })
    })
    this.loadTop();
  },
  methods: {
    loadTop() {
    	searchFriends({ uid: this.uid }).then(res => {
	      this.slist = res.data.data;
	    })
      this.$refs.loadmore.onTopLoaded();
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    chatql(roomid, type) {
      if (this.islogin) {
        this.$router.push({ path: '/chats', query: { type: type, roomid: roomid } })
      }
    },
    chatsl(uid, receive_name,avatar) {
      if (this.islogin) {
        this.$router.push({ path: '/chat', query: { uid: uid, receive_name: receive_name,avatar:avatar } })
      }
    },
    del(){
      Toast('暂无功能')
    }
  },
  components: {
    Chead
  }
}

</script>


<style scoped>
  .mint-loadmore{padding-top:1.125rem;}
	.dialog .title{text-align:left;color:#262626;padding:0.2rem 0.4rem;border-bottom:1px solid #dfdfdf;}
	.contlist li.on .name{color:#4df965!important;}
	.dialog,.dialog .mint-loadmore{height:90%;background:#fff;}
	.dialog ul li{height:1.6rem;line-height:1.57rem;}
	.dialog ul li,.dialog ul{width: 100%;margin:0;padding:0;}
  .dialog ul li a{text-align: center;}
	.dialog ul li .cont{width:100%;}
	.dialog ul li .cont .head{margin-left:0.2rem; margin-right:0.2rem; width:1.3rem;height:1.3rem;border-radius:50%;overflow: hidden;margin-top: 0.1rem;border:1px solid #efefef;}
	.dialog ul li .cont .head img{width:100%}
	.dialog ul li .cont .right{padding-right:0.3rem;/*border-bottom:1px solid #dfdfdf;*/width:7.8rem;}
	.dialog ul li .cont .right .unread{display: table-cell;}
	.dialog ul li .cont .right .unread i{font-size:0.25rem;margin-left:0.1rem;}
	.dialog ul li .cont .right .unread em{width:5px;height:5px;border-radius:50%;background:#3897f0;display: inline-block;margin-top: -1px;vertical-align: middle;}
	.dialog ul li .cont .right .cen{height:1.57rem;}
	.dialog ul li .cont .right .cen span{line-height: normal;color:#9d9d9d; display: block;text-align: left;font-size:0.35rem;}
	.dialog ul li .cont .right .cen span em{padding:0 0.1rem;font-size:0.4rem;}
	.dialog ul li .cont .right .cen span.name{color:#262626;font-weight:500; font-size:0.4rem;margin-top:0.3rem;}
</style>

