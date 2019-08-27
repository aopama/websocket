<template>
	<div class="dialog">
		<Chead :cen='true' title="消息"></Chead>
		<mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
		  <ul>
		    <li v-for="(item,index) in getMslist" @click="linkChat(item.receive_uid,item.receive_name,item.avatar)">
				 <mt-cell-swipe :right="[
	                {
	                    content: '删除',handler: () => del(index,item.receive_uid)
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
	            				<span class="name">{{ item.receive_name }}</span>
			            		<span class="message">
			            			<em class="info">
			            				<span v-if="item.type==1" v-html='item.content'></span>
			            				<span v-else="item.type==2" >[图片]</span>
			            			</em>
			            			<em><span>·</span></em>
			            			<em><span>{{item.creat_time|houers}}</span></em>
			            		</span>
	            			</div>
			            	<span class="unread y" v-if="item.unread!=null"><em></em><i>{{item.unread > 99 ? '99+' : item.unread}}</i></span>
	            		</div>	
	            	</div>
	            </div>
	            </mt-cell-swipe>
		    </li>
		  </ul>
		  <div slot="top" class="mint-loadmore-top">
		    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
		    <span v-show="topStatus === 'loading'">Loading...</span>
		  </div>
		</mt-loadmore>
	</div>
</template>

<script>
import cc from '@/utils/collection.js';
import {mapGetters, mapState} from 'vuex';
import {sFriends,delMeet,getCacheById} from '@/api/api.js';
import Chead from '@/components/head';
	export default {
		data(){
			return{
				list:'',
            	value:true,
            	topStatus:'',
            	uid:JSON.parse(localStorage.getItem('userinfo'))[0].id,
			}
		},
		filters:{
            houers:function(data){
                return cc.fomatDate(data);
            }
        },
		mounted(){
			this.loadTop();
		},
		methods:{
			loadTop() {
				let that=this;
				sFriends({uid:this.uid}).then(res=>{
					var arr=res.data.data
					var arrys=[];
					arr.map((i,d)=>{	
						arr[d]=JSON.parse(i);
						let k='unread_'+arr[d].receive_uid+'_'+arr[d].send_uid;
						getCacheById({key:k}).then(res=>{
							arrys.push(Object.assign({},JSON.parse(i),{unread:res.data.data}))
						})
					})
					this.$store.commit('setMslist',arrys);
				});
			  	this.$refs.loadmore.onTopLoaded();
			},
			handleTopChange:function (status) {
		        this.topStatus=status;
		      },
		    del:function(index,receive_uid){
		    	this.$store.dispatch('deleteCacheById',receive_uid)//清空未读消息
		    	delMeet({key:this.uid,index:index}).then(res=>{
		    		if(res.data.status==1){//删除成功
		    			this.$store.commit('delMslistitem',index);
		    		}
		    	})
		    },
		    linkChat:function(id,receive_name,avatar){
		    	this.$router.push({path:'/chat',query:{uid:id,receive_name:receive_name,avatar:avatar}})
		    },
		    linkUser:function(){
		    	alert('个人中心')
		    }

		},
	    computed: {
		      ...mapGetters([
		        'getMslist',
		      ])
	    },
		components:{
			Chead
		}
    }
</script>

<style scoped>
    .dialog ul li  a{text-align:center;}
 	.mint-loadmore{padding-top:1.125rem;}
	.dialog,.dialog .mint-loadmore{height:90%;background:#fff;}
	.dialog ul li{height:1.6rem;line-height:1.57rem;}
	.dialog ul li,.dialog ul{width: 100%;margin:0;padding:0;}
	.dialog ul li .cont{width:100%;}
	.dialog ul li .cont .head{margin-left:0.2rem; margin-right:0.2rem; width:1.3rem;height:1.3rem;border-radius:50%;overflow: hidden;margin-top: 0.1rem;border:1px solid #efefef;}
	.dialog ul li .cont .head img{width:100%}
	.dialog ul li .cont .right{padding-right:0.3rem;/*border-bottom:1px solid #dfdfdf;*/width:7.8rem;}
	.dialog ul li .cont .right .unread{display: table-cell;}
	.dialog ul li .cont .right .unread i{font-size:0.25rem;margin-left:0.1rem;}
	.dialog ul li .cont .right .unread em{width:5px;height:5px;border-radius:50%;background:#3897f0;display: inline-block;margin-top: -1px;vertical-align: middle;}
	.dialog ul li .cont .right .cen{height:1.57rem;}
	.dialog ul li .cont .right .cen span{line-height: normal;color:#9d9d9d; display: block;text-align: left;font-size:0.35rem;}
	.dialog ul li .cont .right .cen span em{font-size:0.35rem;}
	.dialog ul li .cont .right .cen span.name{color:#262626;font-weight:500; font-size:0.4rem;margin-top:0.3rem;}
	.dialog ul li .cont .message em.info{}
	.dialog ul li .cont .message em{overflow:hidden;text-overflow:ellipsis;white-space:normal;max-width:2rem;height:0.4rem;line-height:0.4rem; display: inline-block;}
</style>

