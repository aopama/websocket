<template>
	<div class="input_main">
		<div class="main cl">
			<div class="input" placeholder='发消息...' @keyup="keyup" @keypress="keypress"  
			 contenteditable="true" @keydown='send($event)'></div>
			 <div class="send_cont">
			 	<transition name="fade">
			 		<button v-if="!show"  class="send" @click='send_to'>发送</button>
				</transition>
			</div>
			 <div class="more">
		 		<div class="item-cont cl" v-if="show">
		 			<div class="item">
		 				<i class="iconfont iconyuyin"></i>
		 			</div>
		 			<div class="item" @click="imgupload">
				 		<input ref='inputFile' name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera"
		                style="display: none" @change="fileup">
		 				<i class="iconfont icontupianimgyulan"></i>
		 			</div>
		 			<transition name="fade">
	 					<div v-if="rotate" class="list z"> 
			 				<div class="item">
				 				<i class="iconfont iconxiaoxi"></i>
				 			</div>
				 			<div class="item">
				 				<i class="iconfont iconjia"></i>
				 			</div>
				 		</div>
				 	</transition>
		 			<div class="item" @click="more">
		 				<i :class="[rotate?'rotate45':'']" class="iconfont iconwuuiconxiangjifangda"></i>
		 			</div>
		 		</div>
			 </div>
		</div>
	</div>
</template>

<script>
	import { uploadimg } from '@/api/api.js'
	import { mapGetters, mapState } from 'vuex';
	import socket from '@/api/socket.js';
	import { insertFriends } from '@/api/api.js'
	export default{
		props: ['send_uid','receive_uid','send_name','receive_name','avatar','type','roomid'],
		data(){
			return{
				flag:false,
				show:true,
				rotate:false,
				user_id: JSON.parse(localStorage.getItem('userinfo'))[0].id,
			}
		},
		mounted() {
		},
		methods:{
			keypress(){
				if(this.flag){
					event.preventDefault();
				}else{
					this.flag=true
				}
			},
			keyup(){
				let dom=document.querySelector(".input").innerHTML;
				if(dom){
					this.show=false;
				}else{
					this.show=true;
				}
				this.flag=false;
			},
			send(e){
				var ev = (typeof event!= 'undefined') ? window.event : e;
				if(ev.keyCode == 13 && !ev.shiftKey) {
					window.event.returnValue = false;
					this.send_to();
				}else if(ev.keyCode == 13 &&ev.shiftKey){
					window.event.returnValue = true;
				}
			},
			send_to(){
				let msg=document.querySelector(".input").innerHTML;
				if(this.type==1){//群聊
					this.$emit('send',msg);
				}else{//私聊
					this.$emit('sends',msg);
				}
				document.querySelector(".input").innerHTML='';
				this.show=true;
				this.rotate=false;
			},
			more(){
				this.rotate=!this.rotate;
			},
			imgupload(){
				const file = this.$refs.inputFile;
        		file.click()
			},
			fileup(){
				const that = this;
				const files = this.$refs.inputFile.files[0];
				if (files.size > 3 * 1024 * 1024) {
			        alert('图片大小必须小于3M!')
			        return false;
			      }
				if (files&&this.type!=1) {//私聊
					const fr = new window.FileReader()
					fr.onload = function () {
			      		let data = {
				          send_uid:that.send_uid, //发送方
				          receive_uid:that.receive_uid, //接收方
				          send_name:that.send_name, //发送方name
				          receive_name:that.receive_name, //接受放name
				          avatar:that.avatar,
				          content:'', //消息内容
				          creat_time: Date.now(), //时间);
				          imgs:fr.result,
				          type:'2',
				        };
				        const formdata = new window.FormData()
				        formdata.append('file', files);
				        formdata.append('send_uid',that.send_uid);
				        formdata.append('receive_uid',that.receive_uid);
				        formdata.append('send_name',that.send_name);
				        formdata.append('receive_name',that.receive_name);
				        formdata.append('type',data.type);
				        that.$store.commit('addRoomDetailInfos', data);
				        that.$store.dispatch('uploadImg',formdata)

				        insertFriends({ key: that.user_id, value: JSON.stringify(data) }).then(res => {
				          that.$store.dispatch('updataMslist');
				        })
				        socket.emit('chat', data);
				     	that.$emit('tops');
			          }
			          fr.readAsDataURL(files)
				}else if (files&&this.type==1) {//群聊
					const fr = new window.FileReader()
					fr.onload = function () {
			      		let data = {
			      			send_name:that.send_name,
			      			send_id:that.send_uid,
			                content:'',
			                roomid:that.roomid,
			                creat_time: new Date(),
			                avatar:that.avatar,
					        imgs:fr.result,
					        type:'2',
				        };
				        const formdata = new window.FormData()
				        formdata.append('file', files);
				        formdata.append('types',that.type);
				        formdata.append('send_id',that.send_uid);
				        formdata.append('roomid',that.roomid);
				        formdata.append('send_name',data.send_name);
				        formdata.append('type',data.type);
				        that.$store.dispatch('uploadImg',formdata)
				        socket.emit('login',data);
			          }
			          fr.readAsDataURL(files)
				}
			}
		}
	}
</script>

<style scoped>
	.input_main{position:fixed;z-index:10; bottom:0.27rem;padding-top: 0.2rem;background: #fff;}
	.input_main .main{position: relative; min-height:auto;width:9.4rem;border:1px solid #dbdbdb;margin-left:0.28rem;border-radius:26px;text-align: left;}
	.input_main .main .input{vertical-align:bottom; border:none; display: inline-block; outline:none;width:6.8rem;display: inline-block;margin-left:0.8rem;line-height:0.6rem;padding:0.2rem 0;min-height:0.6rem;max-height:2rem;overflow:hidden;overflow-y:scroll;letter-spacing: 0.1px;}
     .input:empty::before{content: attr(placeholder);}
     .more{position:absolute;top:0.12rem;right:0.2rem;}
     .send_cont{display: inline-block;vertical-align:bottom;}
     .send_cont .send{color:#49a0f1;font-size:0.4rem;margin-bottom: 0.24rem;margin-left:0.3rem;}
     .item-cont .item{float: left;margin-left:0.3rem;margin-top:0.03rem;}
     .item-cont .item i{transition: all .2s;color:#262626;font-size:0.4rem;font-size:0.6rem;display: inline-block;}
</style>