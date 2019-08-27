<template>
  <div>
    <Chead :left="true" :cen='true' title="评论"></Chead>
    <div class="main">
      <div class="list_main">
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false">
          <div class="item cl">
            <div class="head z">
              <img :src="headurl" alt="">
            </div>
            <div class="right z">
              <div class="info">
                <div class="cont">
                  <span class="name">{{name}}</span>
                  {{content}}
                </div>
              </div>
              <div class="time">{{time|houers}}</div>
            </div>
          </div>
          <div class="conts">
            <div v-for="(item,index) in commentList" @click="replay(item.zp_id,item.username,item.content)" class="item cl">
              <div class="head z">
                <img :src="item.avatar" alt="">
              </div>
              <div class="right z">
                <div class="info">
                  <div class="cont">
                    <span class="name">{{item.username}}</span>
                    {{item.content}}
                  </div>
                  <div v-if="item.replay_id!=0" class="replay">
                    <div class="cont">
                      <span class="name">{{item.replay_name}}</span>
                      {{item.replay_content}}
                    </div>
                  </div>
                </div>
                <div class="time">{{item.datatime|houers}}</div>
              </div>
              <div class="like z">
                <Likes @likesNum='likesNum' :isLike="item.isLike" :comment_id="item.comment_id" :type="1"></Likes>
                <em :id="item.comment_id" class="num">{{item.like_num}}</em>
              </div>
            </div>
          </div>
          <loadTop slot="top" :topStatus="topStatus"></loadTop>
          <loadBottom slot="bottom" :bottomStatus='bottomStatus' :allLoaded='allLoaded' :show_bottom="show_bottom" txt="没有更多评论了"></loadBottom>
        </mt-loadmore>
      </div>
      <div class="push_main cl">
        <div class="head z">
          <img :src="uhead" alt="">
        </div>
        <div class="right z">
          <div class="input_warp cl">
            <div class="input" @keyup.8="del()" id="input" placeholder='添加评论...' contenteditable="true"></div>
            <a class="" @click="Publish">发布</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Chead from '@/components/head';
import loadTop from '@/components/loadTop';
import loadBottom from '@/components/loadBottom';
import cc from '@/utils/collection.js';
import Likes from '@/components/like';
import { Toast } from "mint-ui";
import { addComment, searchComment } from '@/api/api.js'
export default {
  data() {
    return {
      zpid: this.$route.query.zpid, //作品id
      headurl: this.$route.query.headurl, //作者头像
      name: this.$route.query.name, //作者昵称
      content: this.$route.query.content, //原文
      time: this.$route.query.time, //发表时间
      uid: JSON.parse(localStorage.getItem('userinfo'))[0].id, //发表人id
      uhead: JSON.parse(localStorage.getItem('userinfo'))[0].avatar, //发表人头像
      replay_id: '',
      replay_name: '',
      replay_content: '',
      commentList: '',
      current: 1,
      index: '10',
      topStatus: '',
      allLoaded: false, //数据是否加载完毕
      bottomStatus: '', //底部上拉加载状态
      show_bottom:true,
      replays:'',
    }
  },
  filters: {
    houers: function(data) {
      return cc.fomatDate(data);
    }
  },
  mounted() {
    this.loadTop();
  },
  methods: {
    Publish() {
      let that = this;
      let content = document.querySelector(".input").innerHTML;
      if (!content) {
        Toast('请填写评论内容!');
        return false;
      }
      if(content.length>300){
        Toast('评论内容超出限制!')
        return false;
      }
      //回复
      if(this.replays){
        let n=content.indexOf(':');
        content=content.substring(n+1,content.length)
      }
      let obj={
          avatar:that.uhead,
          comment_id:'',
          content:content,
          datatime:new Date(),
          id:'',
          like_num:0,
          replay_content:that.replay_content,
          replay_id:that.replay_id,
          replay_name: that.replay_name,
          send_id: that.uid,
          username:JSON.parse(localStorage.getItem('userinfo'))[0].username,
          zp_id:that.zpid,
      }
      addComment({
        zp_id: that.zpid,
        send_id: that.uid,
        content: content,
        replay_id: that.replay_id,
        replay_name: that.replay_name,
        replay_content: that.replay_content,
        like_num: '0',
      }).then((res) => {
        if (res.data.status==1) {
          that.commentList.unshift(obj);
        }
        document.querySelector(".input").innerHTML = '';
      })
    },
    replay(replay_id, replay_name, replay_content) {
      document.querySelector(".input").innerHTML='@'+replay_name+':';
      this.replays='@'+replay_name+':';
      setTimeout(()=>{
         this.keepLastIndex(document.querySelector(".input"))
      },5)
      this.replay_id=replay_id
      this.replay_name=replay_name
      this.replay_content=replay_content
    },
    del(){
      if(document.querySelector(".input").innerHTML.length<this.replays.length){
        document.querySelector(".input").innerHTML='';
        this.replays='';
        this.replay_id= ''
        this.replay_name=''
        this.replay_content=''
      }
    },
    keepLastIndex(obj) {
        if (window.getSelection) { //ie11 10 9 ff safari
            obj.focus(); //解决ff不获取焦点无法定位问题
            var range = window.getSelection(); //创建range
            range.selectAllChildren(obj); //range 选择obj下所有子内容
            range.collapseToEnd(); //光标移至最后
        } else if (document.selection) { //ie10 9 8 7 6 5
            var range = document.selection.createRange(); //创建选择对象
            range.moveToElementText(obj); //range定位到obj
            range.collapse(false); //光标移至最后
            range.select();
        }
    },
    loadTop() {
      let that = this;
      that.current = 1;
      this.allLoaded = false;
      setTimeout(() => {
        searchComment({ zp_id: that.zpid,uid:that.uid,current: that.current, index: that.index }).then(res => {
          if (res.data.status == 1) {
            that.commentList = res.data.data
          }
          if (that.commentList.length < 10) {
            this.allLoaded = true;
            this.show_bottom = false;
          }
        })
        this.$refs.loadmore.onTopLoaded();
      }, 500)
    },
    handleTopChange: function(status) {
      this.topStatus = status;
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      let that = this;
      this.handleBottomChange("loading"); //上拉时 改变状态码
      this.current += 1;
      setTimeout(() => {
        searchComment({ zp_id: that.zpid,uid:that.uid,current: that.current, index: that.index }).then(res => {
          if (res.data.status == 1) {
            if (res.data.data.length < that.index) {
              this.allLoaded = true; //模拟数据加载完毕 禁用上拉加载
            }
            that.commentList = that.commentList.concat(res.data.data);
          }
        })
        this.handleBottomChange("loadingEnd"); //数据加载完毕 修改状态码
        this.$refs.loadmore.onBottomLoaded();
      }, 500);
    },//点赞
    likesNum(n,comment_id){
      let dom=document.getElementById(comment_id).innerHTML;
      if(n==1){
        document.getElementById(comment_id).innerHTML=parseInt(dom)+1;
      }else{
        document.getElementById(comment_id).innerHTML=parseInt(dom)-1;
      }
    }
  },
  components: {
    Chead,
    Likes,
    loadTop,
    loadBottom
  }
}

</script>
<style scoped>
.main {
  padding-top: 1.1rem;
}

.push_main {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.2rem 0.4rem;
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}

.push_main .right .input_warp {
  border: 1px solid #e0e0e0;
  border-radius: 0.8rem;
  line-height: 1.1rem;
  background: #fff;
}

.push_main .right .input {
  max-height: 4.1rem;
  border: none;
  outline: none;
  display: inline-block;
  line-height: 0.6rem;
  min-height: 0.6rem;
  overflow: hidden;
  overflow-y: scroll;
  letter-spacing: 0.1px;
  width: 5.4rem;
  vertical-align: middle;
  padding: 0.15rem 0rem 0.2rem 0.5rem;
}

.push_main .right .input:empty::before {
  content: attr(placeholder);
  color: #666;
}

.input_warp a {
  font-size: 0.4rem;
  color: #0084ff;
  padding: 0 0.45rem;
  vertical-align: bottom;
}

.push_main .head {
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 0.4rem;
}

.push_main .head img {
  width: 100%;
  height: 100%;
}

.list_main {
  padding-bottom: 1.8rem;
}

.list_main .item {
  border-bottom: 1px solid #f3f3f3;
  padding: 0.2rem 0.4rem;
  padding-right: 0;
}

.list_main .item .head {
  width: 0.9rem;
  height: 0.9rem;
  overflow: hidden;
  border-radius: 50%;
  margin-right: 0.4rem;
}

.list_main .item .head img {
  width: 100%;
  height: 100%;
}

.conts {
  min-height: 13rem;
}

.list_main .item .right {
  width: 6.8rem;
}

.list_main .item .right .info {
  font-size: 0.35rem;
  color: #333;
}

.list_main .item .right .info .name {
  font-size: 0.37rem;
  font-weight: bold;
  margin-right: 0.1rem;
  letter-spacing: 1px;
}

.list_main .item .right .time {
  color: #b3b3b3;
  font-size: 0.35rem;
  margin-top: 0.2rem;
}

.list_main .item .like {
  text-align: center;
  width: 1.4rem;
}

.list_main .item .like i {
  font-size: 0.35rem;
  display: inline-block;
}

.list_main .item .like em {
  display: inline-block;
  width: 100%;
  color: #262626;
  font-size: 0.3rem;
}

.list_main .item .right .replay {
  padding: 0.1rem 0 0.1rem 0.3rem;
  margin-top: 0.1rem;
  border-left: 1px solid #262626;
}

</style>
