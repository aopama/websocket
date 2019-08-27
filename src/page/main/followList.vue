<template>
  <div class="warp">
  	<Chead :left="true" :cen='true' :title="user_id==uid?'我的关注':'Ta的关注'"></Chead>
    <loadItem :info="info" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
      <div slot="custom" slot-scope="user">
        <li class="cl" v-for="(item,index) in user.data">
          <div class="head z">
            <router-link :to="{name:'my',query:{uid:item.id}}">
              <img :src="item.avatar" alt="">
            </router-link>
          </div>
          <div class="cont z">
            <p class="name">{{item.username}}</p>
            <p class="info">{{item.info}}</p>
          </div>
          <div class="btn_warp y">
            <button class="btn follow on">
              {{item.follow=='0'?'已关注':'互相关注'}}
            </button>
          </div>
        </li>
      </div>
    </loadItem>
  </div>
</template>
<script>
import Chead from '@/components/head';
import loadItem from '@/components/loadItem';
import { Toast } from 'mint-ui'
import { serchFollows } from '@/api/api.js';
export default {
  data() {
    return {
      uid: this.$route.query.id,
      user_id: JSON.parse(localStorage.getItem('userinfo'))[0].id,
      info: '',
      current: 1,
      index:14,
    }
  },
  mounted() {
  },
  methods: {
    onPullingDown(v) {
      let that = this;
      this.current = 1;
      setTimeout(() => {
        serchFollows({ user_id: this.uid, current: this.current, index: this.index }).then((res) => {
          if (res.data.status == 1) {
            that.info = res.data.data
          }
          if(v) {
            v.finish();
          }
        })
      }, 500)
    },
    onPullingUp(v) {
      let that = this;
      this.current += 1;
      setTimeout(() => {
        serchFollows({ user_id: this.uid, current: this.current, index: this.index }).then((res) => {
          if (res.data.status == 1) {
            that.info = that.info.concat(res.data.data);
          }
          v.upfinish(res.data.data.length,that.index);
        })
      }, 500)
    },

  },
  components: {
    Chead,loadItem
  }
}

</script>
<style scoped>
.warp {
  height: 100%;
}
.fansList li {
  margin-bottom: 0.5rem;
}

.fansList li .head {
  width: 1.2rem;
  height: 1.2rem;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 0.3rem;
}

.fansList li .head img {
  width: 100%;
  height: 100%;
}

.fansList li .cont .name {
  font-size: 0.4rem;
  color: #333;
  font-weight: bold;
  padding-top: 0.1rem
}

.fansList li .cont .info {
  font-size: 0.35rem;
  color: #666;
  max-width: 5rem;
}

.fansList li .btn_warp .follow {
  font-size: 0.35rem;
  width: 1.9rem;
  border-radius: 2px;
  opacity: 1;
  height: 0.6rem;
  line-height: 0.5rem;
  margin-right: 0.4rem;
  margin-top: 0.35rem;
}

.fansList li .btn_warp .follow.on {
  background: #bfc4d9;
}

.custom-item {
  height: 8rem;
  width: 100%;
  background: #eee;
}

</style>
