// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import 'mint-ui/lib/style.css';
import socket from '@/api/socket.js';
import mintui from 'mint-ui';

import {insertFriends,sFriends,inrcCache,getCacheById} from '@/api/api.js';

import global_ from '@/components/tool/Global';
Vue.prototype.GLOBAL = global_;

Vue.config.productionTip = false;

socket.on('connect', () => {console.log('连接成功!');})
socket.emit('begin',store.state.userinfo.userinfo.id);
socket.on('logins', (obj) => {
	store.commit('setindex');
	store.commit('addRoomDetailInfos',obj);
})
//通知新消息
socket.on('chat_m', (obj) => {
	//对方id和本地id
	let k='unread_'+obj.send_uid+'_'+obj.receive_uid;
	inrcCache({key:k}).then(res=>{});
	let uid=JSON.parse(localStorage.getItem('userinfo'))[0].id;
 	//解构赋值
let {content,creat_time,receive_name,receive_uid,send_name,send_uid,imgs,type,avatar}=
	{
		content:obj.content,creat_time:obj.creat_time,receive_name:obj.send_name,receive_uid:obj.send_uid,send_name:obj.receive_name,send_uid:obj.receive_uid,imgs:obj.imgs,type:obj.type,
		avatar:obj.avatar,
	}
getCacheById({key:k}).then(res=>{//获取最新未读消息数
	let unread=res.data.data;
	let objs={content,creat_time,receive_name,receive_uid,send_name,send_uid,imgs,type,unread:unread,avatar}
	//存入/更新redis数据列表
	 	insertFriends({key:uid,value:JSON.stringify(objs)}).then(res=>{
	 		let arr=store.state.userinfo.mslist;
	 		//置顶消息
			arr.map((i,d,arr)=>{
				if(i.receive_name==objs.receive_name){
					arr.splice(d,1)[0];
				}
			})
			store.state.userinfo.mslist.unshift(objs);
	 		store.dispatch('updataMslist');
	 	})
	})
 });
Vue.use(VueSocketio, socketio('http://localhost:8000/'));
Vue.use(mintui)//全局引入
/* eslint-disable no-new */ 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

