<template>
  <div class="item">
    <div class="top cl">
      <div class="avatar z">
        <router-link :to="{name:'my',query:{uid:uid}}">
          <img :src="headurl" onerror="" alt="">
        </router-link>
      </div>
      <div class="name z">{{uname}}</div>
      <div v-if="Follow!=1&&luid!=uid" @click="follow(uid,luid)" class="follow z"><em>·</em>关注</div>
      <div class="more y">
        <i class="iconfont icongengduo"></i>
      </div>
    </div>
    <div  class="img_list" v-if="type==1">
       <span class="cont">{{content}}</span>
    </div>
    <div class="img_list" v-if="type==0">
  		<div :class="`swiper-container${id}`">
  		    <div class="swiper-wrapper">
            <div v-for="obj in imgs.split('--')" class="swiper-slide">
              <img :src="obj" alt="">
            </div>
  		    </div>
  		    <!-- 如果需要分页器 -->
  		    <div class="swiper-pagination"></div>
  		    <!-- 如果需要导航按钮 -->
  		    <div class="swiper-button-prev"><i class="iconfont iconshangyige"></i>  </div>
  		    <div class="swiper-button-next">
            <i class="iconfont iconxiayige"></i>  
          </div>
  		</div>
    </div>
    <div class="bot_box">
      <div class="handle cl">
        <div class="left z">
        	<Likes :zp_id="id" :zp_uid="uid" @likesNum='likesNum' :isLike="isLike" :type="0" class="big"></Likes>
          	<router-link 
              :to="{
                name:'comment',
                query:{
                  zpid:id,
                  headurl:headurl,
                  name:uname,
                  content:content,
                  time:creatime,
                }
              }">
              <i class="iconfont iconxiaoxi"></i>
            </router-link>
        </div>
        <div class="right y">
          <Collect :zp_id="id" :isCollect="isCollect"></Collect>
        </div>
      </div>
      <div class="zan">{{like}}次赞</div>
      <div class="des_info">
      	<span class="send_name">{{uname}}</span>
      	<span>
      		{{content}}
      	</span>
      </div>
      <div class="comment">
        <router-link 
              :to="{
                name:'comment',
                query:{
                  zpid:id,
                  headurl:headurl,
                  name:uname,
                  content:content,
                  time:creatime,
                }
              }" class="link">
        <div v-if="commentNum>2" class="title">全部<em>{{commentNum}}</em>条评论</div>
        </router-link>
        <ul>
          <li class="cl" v-for="item in comments">
              <div class="uname z">{{item.username}}：</div>
            <div class="cont z">{{item.content}}</div>
            <div class="zan y">
             <Likes :isLike="item.isLike" :comment_id="item.comment_id" :type="1" ></Likes>
            </div>
          </li>
        </ul>
      </div>
      <div class="data_time">{{creatime|houers}}</div>
    </div>
  </div>
</template>

<script>
import { searchPltop,addFriends } from '@/api/api.js';
import {Toast} from 'mint-ui'
import cc from '@/utils/collection.js';
import Likes from '@/components/like';
import Collect from '@/components/Collection';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
	export default{
		data(){
			return{
				like_flag:false,
				clas:'icondianzan1',
        bgColor:["#00CC99","#00FF99","#00FFFF","#00CCFF","#33FFCC","#6699FF","#FF6666","#FF9966","#FF99CC"],   //背景颜色
        like:this.likes,
        comments:'',
        user_id:this.uid,
        Follow:this.isFollow,
			}
		},
		props: ['id','uid','uname','headurl','imgs','content','creatime','likes','isLike','commentNum','isCollect','isFollow','luid','type'],
    filters:{
            houers:function(data){
                return cc.fomatDate(data);
            }
        },
		mounted(){
      let that=this;
      //轮播
			new Swiper ('.swiper-container'+this.id, {
			    loop:false,
			    pagination: {
				    el: '.swiper-pagination',
				     renderBullet: function (index, className) {
			          return '<span style="width:5px;height:5px;" class="' + className + '"></span>';
			        },
				  },
			    navigation: {
			      nextEl: '.swiper-button-next',
			      prevEl: '.swiper-button-prev',
			    },
          on:{
             imagesReady: function(){
              let H=this.height-3;
              let bgColor=that.bgColor[Math.round(Math.random()*(that.bgColor.length-1))];
              this.el.childNodes[0].childNodes.forEach(function(el) {
                  el.style.cssText="height:" + H + "px;line-height:" + H + "px;background:" + bgColor + ";";
              })
            }
          },
			  })    
      //前两条最新评论获取
      searchPltop({zp_id:this.id,uid:this.user_id}).then((res)=>{
        if(res.data.status==1){
          that.comments=res.data.data
        }
      })
		},
		methods:{
      likesNum(n){
        if(n==1){
          this.like++;
        }else{
          this.like--;
        }
      },
      follow(uid,luid){
        let that=this;
        addFriends({uid:luid,fid:uid}).then((res)=>{
          if(res.data.status==1){
            that.Follow=1;
            Toast('已关注')
          }
        })
      }
		},
		components:{
			Likes,Collect
		}
	}
</script>
<style scoped>
.index .img_list{max-height:520px;overflow: hidden;}
.item{padding-bottom:0.2rem;}
.item .top{padding:0.2rem 0.3rem;}
.item .avatar{width:0.8904rem;height:0.8904rem;overflow: hidden;border-radius:50%;}
.item .avatar img{width:100%;}
.item .img_list{position: relative;}
.item .img_list .cont{padding:0.3rem 0.3rem;}
.item .img_list img{width:100%}
.item .bot_box{padding:0.3rem;}
.item .bot_box .handle{position: relative;z-index:10;}
.item .top i,.item .handle i{font-size: 0.75rem;color: #262626;display: inline-block;}
.item .handle i.icondianzan{color:#ea5f5f;}
.item .name{line-height: 0.8904rem;color:#262626;font-weight:600;font-size:0.4rem;margin-left:0.2rem;}
.item .follow{line-height: 0.8904rem;color:#49a0f1;}
.item .follow em{line-height: 0.8904rem;color:#262626;font-weight:600;font-size:0.6rem;margin:0 0.2rem;}
.item .zan{font-size:0.4rem;text-align: left;color:#262626;font-weight:bold;}
.comment .title{font-weight:bold;color:#9e9e9e;text-align: left;font-size:0.35rem;padding:0.1rem 0;}
.comment ul li{font-size:0.3rem;padding:0.1rem 0;}
.comment ul li .uname{font-weight: bold;}
.comment ul li .cont{line-height:0.5rem;}
.item .data_time{text-align: left;color:#9e9e9e;font-size:0.35rem;padding:0.1rem 0;}
.des_info .send_name{font-weight: bold;}
/*轮播覆盖样式*/
.swiper-button-next,.swiper-button-prev{outline: none;}
.swiper-container-ios{}
.swiper-container-ios i{color:#fff;opacity:0.8;font-size:0.65rem;}
.swiper-button-next, .swiper-container-rtl .swiper-button-prev{background-image: none;}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next{background-image: none;}
.swiper-button-prev, .swiper-container-rtl .swiper-button-next:active{background-image: none;}
.swiper-container-horizontal > .swiper-pagination-bullets{bottom:-20px;}
.item .img_list img{vertical-align: middle;}
.link{color:write;cursor:none;text-decoration:none;}
</style>
