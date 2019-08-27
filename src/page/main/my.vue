<template>
  <div class="my_warp">
    <div class="top" :class="{on:ishow}">
      <div class="head" v-if="ishow">
        <div class="back">
          <i @click="goback()" class="iconfont iconfanhui"></i>
        </div>
        <div class="set">
          <router-link to="/seting">
            <i class="iconfont iconshezhi1"></i>
          </router-link>
        </div>
      </div>
      <div class="set" v-if="!ishow">
        <router-link to="/seting">
          <i class="iconfont iconshezhi1"></i>
        </router-link>
      </div>
      <div class="top_main cl">
        <div class="avatar">
          <img :src="userinfo.avatar" alt="">
        </div>
        <div class="cen z">
          <div class="name">{{userinfo.username}}</div>
          <div class="num">嘟嘟号：{{userinfo.id}}</div>
        </div>
      </div>
      <div class="top_bot">
        <div class="list cl">
          <router-link :to="{
                  name:'fansList',
                  query:{
                    id:userinfo.id,
                  }
                }"><em>{{userinfo.fans}}</em>粉丝</router-link>
          <router-link :to="{
                  name:'followList',
                  query:{
                    id:userinfo.id,
                  }
                }"><em>{{userinfo.follow}}</em>关注</router-link>
          <a href="javascript:;"><em>{{userinfo.likes}}</em>获赞</a>
        </div>
      </div>
      <div class="relation">
        <ButtonF :uid="uid" :fid="sid" :username="userinfo.username" :avatar="userinfo.avatar"></ButtonF>
      </div>
    </div>
    <div class="content">
      <div class="tab">
        <span v-for="(item,index) in tabs" @click="stabs(index)" :class="{on:cur==index}">
          <i class="iconfont" :class="item"></i>
        </span>
      </div>
      <div class="cont">
        <ul>
          <li v-for="(item,index) in contlist">
            <router-link :to="{
                name:'dynamicInfo',
                query:{
                  zp_id:item.zid,
                }
              }">
              <img v-lazy="item.imgs.split('--')[0]" alt="">
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ButtonF from '@/components/button-follow';
import socket from '@/api/socket.js';
import { Lazyload } from 'mint-ui';
import { getUser, getDynamic } from '@/api/api.js'

export default {
  data() {
    return {
      avatar: JSON.parse(localStorage.getItem('userinfo'))[0].avatar,
      username: JSON.parse(localStorage.getItem('userinfo'))[0].username,
      uid: JSON.parse(localStorage.getItem('userinfo'))[0].id,
      sid: '',
      tabs: ['iconfangkuaizhanshi', 'icondianzan1', 'iconshoucang'],
      cur: 0,
      ishow: false,
      userinfo: '',
      contlist: '',
    }
  },
  created() {
    if (this.$route.query.uid == this.uid || this.$route.query.uid == undefined) { //是本人
      this.sid = this.uid;
      this.ishow = false;
      this.$store.commit('changetab', true)
    } else { //不是本人
      this.sid = this.$route.query.uid;
      this.ishow = true;
      this.$store.commit('changetab', false)
    }
  },
  mounted() {
    this.getUser();
    this.getDynamic(0);
  },
  methods: {
    logout() {
      socket.emit('close');
      localStorage.removeItem('userinfo');
      this.$router.push({ path: '/Login' });
    },
    stabs(index) {
      this.cur = index;
      this.getDynamic(index);
    },
    goback() {
      this.$router.go(-1);
    },
    getUser() {
      let that = this;
      getUser({ user_id: that.sid }).then((res) => {
        if (res.data.status == '1') {
          that.userinfo = res.data.data[0]
        } else {
          alert('重新登录！')
        }
      })
    },
    getDynamic(type) {
      getDynamic({ user_id: this.sid, type: type }).then((res) => {
        if (res.data.status == '1') {
          this.contlist = res.data.data
        } else {
          alert('重新登录！')
        }
      })
    },
  },
  components: {
    ButtonF
  }
}

</script>
<style scoped>
img[lazy=loading] {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #eee;
}

.my_warp {
  height: 100%;
  background: #fafafa;
}

.my_warp a {
  text-decoration: none;
}

.top {
  position: relative;
  background: #fff;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #efefef;
}

.top.on {
  background: #fafafa;
}

.top.on .avatar {
  top: 1.5rem;
}

.top.on .cen {
  padding-top: 0.9rem;
}

.top .avatar {
  position: absolute;
  top: 1rem;
  left: 0.7rem;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  border-radius: 50%;
}

.top .avatar img {
  width: 100%;
  height: 100%;
}

.top .cen {
  padding-top: 1.4rem;
  padding-left: 3.3rem;
}

.top .cen .name {
  color: #000;
  font-size: 0.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  text-decoration: none;
  padding-bottom: 0.2rem;
}

.top .cen .num {
  color: #7f7f7f;
  font-size: 0.4rem;
}

.top .more i {
  font-size: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 2rem;
  display: inline-block;
  color: #b3b3b3;
}

.items {
  background: #fff;
  margin-top: 10px;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}

.items .item {
  padding-left: 0.4rem;
  position: relative;
}

.items .item .iconright-arr-gary {
  font-size: 0.4rem;
  color: #b3b3b3;
  display: inline-block;
  position: absolute;
  top: 0.5rem;
  right: 0.4rem;
}

.items .item .name {
  color: #333;
  font-size: 0.45rem;
  line-height: 1.45rem;
  border-bottom: 1px solid #ececec;
  margin-left: 1.2rem;
}

.items .item:last-child .name {
  border: none;
}

.items .ic i {
  font-size: 0.7rem;
  margin-top: 0.35rem;
  display: inline-block;
}

.items .icondianzan1 {
  color: #ea5f5f;
}

.top_bot .list {
  padding-top: 0.6rem;
  padding-left: 0.8rem;
}

.top_bot .list a {
  color: #333;
  font-size: 0.4rem;
  margin-left: 0.2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.top_bot .list a em {
  padding: 0 0.1rem;
}

.content .tab {
  border-bottom: 1px solid #efefef;
  padding: 0.3rem;
  display: flex;
  justify-content: space-around;
}

.content .tab i {
  font-size: 0.7rem;
  color: #666;
}

.content .tab .on i {
  color: #0084ff;
}

.content .cont {
  padding: 0.2rem;
}

.content .cont ul {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

.content .cont ul:after {
  content: "";
  width: 3.1rem;
}

.content .cont ul li {
  width: 3.1rem;
  height: 4rem;
  padding-bottom: 0.2rem;
}

.content .cont ul li img {
  width: 100%;
  height: 100%;
}

.head {
  background: #fff;
  border-bottom: 1px solid #efefef;
  height: 1.1rem;
}

.back {
  position: absolute;
  top: 0.1rem;
  left: 0.2rem;
}

.back i {
  font-size: 0.85rem;
  color: #999
}

.top .set {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
}

.top .set i {
  font-size: 0.65rem;
  color: #999
}
.relation{position:absolute;top:2.8rem;right:0.8rem;height:0.8rem;display: inline-block;}
</style>
