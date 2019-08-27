//用户登录状态管理
import {searchGroupmsg,searchPrivatemsg,sFriends,delMeet,deleteCacheById,uploadimg} from '@/api/api.js';
import { Indicator ,Toast} from 'mint-ui';
const state={
	footnav:false,//底部导航
	islogin:false,  //是否登录
	userinfo:{
		id:window.localStorage.userinfo==undefined?'':JSON.parse(window.localStorage.userinfo)[0].id,
	},
	// 存放房间信息
	roomdetail: {
      id: '',
      users: {},
      infos: [],
      index:10,
    },
    // 存放聊天列表信息
    mslist:'',
    count:'',
};
const getters={
	getInfos: state => state.roomdetail.infos,
	getMslist:state=> state.mslist
};
const mutations={
	changetab(e,f){
		state.footnav=f;
	},
	changelogin(state,flag){
		state.islogin=flag
	},
	setnullindex(data){
		state.roomdetail.index=10;
	},
	setindex(data){
		state.roomdetail.index++;
	},
	setUserInfo(data) {
      state.userinfo.id = data;
    },
	addRoomDetailInfos(state, data) {
      state.roomdetail.infos.push(data);
    },
    addRoomDefatilInfosHis(state, data) {
      const list = state.roomdetail.infos;
      state.roomdetail.infos = data.concat(list);
    },
    setRoomDetailInfos(state) {
      state.roomdetail.infos = []
    },
    //聊天列表
    setMslist(state,data){
    	state.mslist=data;
    },
    delMslistitem(data,index){
    	state.mslist.splice(index,1)[0];
    }
};

const actions={
	changelogin({commit}){
		commit('changelogin',true);
	},
	getAllMessHistory({commit},data){
		searchGroupmsg({room_id:data.roomid,current:data.current,index:data.index}).then(res=>{
			if(res.data.status==1){
				commit('addRoomDefatilInfosHis', res.data.data);
			}
		})
	},
	getPrivatehistory({commit},data){//私聊
		searchPrivatemsg({send_uid:data.send_uid,receive_uid:data.receive_uid,current:data.current,index:data.index}).then(res=>{
			commit('addRoomDefatilInfosHis', res.data.data);
		})
	},
	updataMslist({commit}){//更新会话 过滤重复会话/删除
		sFriends({uid:state.userinfo.id}).then(res=>{
			var arr=res.data.data;
			arr.map((i,d)=>{
				arr[d]=JSON.parse(i);
				let lone=arr[0].receive_uid;
				if(lone==arr[d].receive_uid&&d!=0){
					delMeet({key:state.userinfo.id,index:d}).then(res=>{})
				}
			})
		});
	},
	deleteCacheById({commit},data){//删除未读消息
		let keys='unread_'+data+'_'+state.userinfo.id
		deleteCacheById({key:keys}).then(res=>{})
	},
	uploadImg({commit},data){
        uploadimg({data:data}).then((res)=>{
          if(res.status==200){
            Toast(res.data.msg);
          }else{
            Toast(res.data.msg);
          }
        })
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}







