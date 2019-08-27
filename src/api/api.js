import Vue from 'vue'
import qs from 'querystring';
import axios from 'axios';

const node_env = {
  	node_env:'development',
	development:'http://localhost:8000/',//本地http://106.13.132.20:8000/http://localhost:8000/
}
axios.defaults.baseURL = node_env[node_env.node_env];
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * 用户名登录
 * @param user:用户名
 * @param pwd: 密码
 */
const name_login=({username,userpass})=>{
	return axios.get('/users/login',{params:{username:username,userpass:userpass}})
}
/**
 * 注册用户
 * @param user:用户名
 * @param pwd: 密码
 */
const name_reg=({username,userpass})=>{
	return axios.get('/users/reg',{params:{username:username,userpass:userpass}})
}

/**
 * 获取用户信息
 * @param id:用户id
 */
const getUserByID=({id})=>{
	return axios.get('/users/getUserByID',{params:{id:id}})
}
/**
 * 保存群组聊天记录
 */
const Groupmsg=({room_id,send_id,content,send_name,type,imgs,creat_time})=>{
	return axios.get('/users/Groupmsg',{params:{room_id:room_id,send_id:send_id,content:content,send_name:send_name,type:type,imgs:imgs,creat_time:creat_time}})
}
/**
 * 查询群组聊天记录
 */
 const searchGroupmsg=({room_id,current,index})=>{
 	return axios.get('/users/searchGroupmsg',{params:{room_id,current,index}})
 }
 /**
 * 保存私聊记录
 */

const Privatemsg=({content,send_uid,receive_uid,send_name,receive_name,creat_time,imgs,type})=>{
	return axios.post('/users/Privatemsg',qs.stringify({
		content,
		send_uid,
		receive_uid,
		send_name,
		receive_name,
		creat_time,
		imgs,
		type
	}));
}
/**
 * 查询私聊记录
 */
 const searchPrivatemsg=({send_uid,receive_uid,current,index})=>{
 	return axios.post('/users/searchPrivatemsg',qs.stringify({
 		send_uid,receive_uid,current,index
 	}))
 }
/**
 * 查询所有好友
 *param uid:用户id
 */
const searchFriends=({uid})=>{
	return axios.post('/users/searchFriends', qs.stringify({
    uid:uid
  }))
}
/**
 * 查询所有会话
 *param uid:用户id
 */
const sFriends=({uid})=>{
	return axios.post('/users/sFriends', qs.stringify({
    uid:uid
  }))
}
/**
 * 插入会话
 *param key:用户id
 */
const insertFriends=({key,value})=>{
	return axios.post('/users/insertFriends', qs.stringify({
    	key:key,
    	value:value,
  }))
}
/**
 * 删除会话
 *param uid:用户id
 */
const delMeet=({key,index})=>{
	return axios.post('/users/delMeet', qs.stringify({
    	key:key,
    	index:index,
  }))
}
/**
 * 未读消息计数
 *param key:用户id
 */
const inrcCache=({key})=>{
	return axios.post('/users/inrcCache', qs.stringify({
    	key:key
  }))
}
/**
 * 获取未读消息
 *param key:用户id
 */
const getCacheById=({key})=>{
	return axios.post('/users/getCacheById', qs.stringify({
    	key:key
  }))
}
/**
 * 清空未读消息读消息
 *param key:用户id
 */
const deleteCacheById=({key})=>{
	return axios.post('/users/deleteCacheById', qs.stringify({
    	key:key
  }))
}
/**
 * 上传头像
 *param data:图片信息
 */
const uploadAvatar=({data})=>{
	return axios.post('/users/uploadAvatar',data)
}
/**
 * 上传聊天图片
 *param data:图片信息uploadimg
 */
const uploadimg=({data})=>{
	return axios.post('/users/uploadimg',data)
}
/**
 * 发表朋友圈
 *param data:图片信息uploadimg
 */
const uploadimgs=({data})=>{
	return axios.post('/users/uploadimgs',data)
}
/**
 * 查询所有动态
 *param current:页码
 *param current:每页条数
 */
const searchAllDynamic=({uid,current,index})=>{
	return axios.post('/users/searchAllDynamic',qs.stringify({
 		uid,current,index
 	}))
}
/**
 * 查询单个动态
 *param uid:本地用户id
 *param zp_id:作品id
 */
const searchDynamic=({uid,zp_id})=>{
	return axios.post('/users/searchDynamic',qs.stringify({
 		uid,zp_id
 	}))
}
/**
 * 查询所有动态前两条最新评论
 */
const searchPltop=({zp_id,uid})=>{
	return axios.post('/users/searchPltop',qs.stringify({
 		zp_id,uid
 	}))
}
/**
 * 添加评论
 *param zp_id:作品id
 *param send_id:发送者id
 *param headurl:头像
 *param content:评论内容
 *param replay:是否回复 0 不是 1 是
 *param r_name:被回复昵称
 *param r_id:被回复id
 *param r_content:被回复内容
 *param like_num:点赞数量
 */
const addComment=({zp_id,send_id,content,replay_id,replay_name,replay_content,like_num})=>{
	return axios.post('/users/addComment',qs.stringify({
 		zp_id,
        send_id,
        content,
        replay_id,
        replay_name,
        replay_content,
        like_num
 	}))
}
/**
 * 查询zp_id所有评论
 *param current:页码
 *param current:每页条数
 */
const searchComment=({zp_id,current,index,uid})=>{
	return axios.post('/users/searchComment',qs.stringify({
 		zp_id,current,index,uid
 	}))
}
/**
 * 添加点赞
 *param zp_id:作品id
 *param type:0(作品),1(评论)
 */
const addLike=({zp_id,zp_uid,user_id})=>{
	return axios.post('/users/addLike',qs.stringify({
 		zp_id,user_id,zp_uid
 	}))
}
/**
 * 删除点赞
 *param zp_id:作品id
 *param type:0(作品),1(评论)
 */
const removeLike=({zp_id,user_id})=>{
	return axios.post('/users/removeLike',qs.stringify({
 		zp_id,user_id
 	}))
}
/**
 * 添加点赞
 *param zp_id:作品id
 *param type:0(作品),1(评论)
 */
const addLikepl=({comment_id,user_id})=>{
	return axios.post('/users/addLikepl',qs.stringify({
 		comment_id,user_id
 	}))
}
/**
 * 删除点赞
 *param zp_id:作品id
 *param type:0(作品),1(评论)
 */
const ulikes=({comment_id,user_id})=>{
	return axios.post('/users/ulikes',qs.stringify({
 		comment_id,user_id
 	}))
}
/**
 * 添加收藏
 *param zp_id:作品id
 *param type:0(作品),1(评论)
 */
const addCollect=({zp_id,user_id})=>{
	return axios.post('/users/addCollect',qs.stringify({
 		zp_id,user_id
 	}))
}
/**
 * 删除收藏
 *param zp_id:作品id
 *param type:0(作品),1(评论)
 */
const removeCollect=({zp_id,user_id})=>{
	return axios.post('/users/removeCollect',qs.stringify({
 		zp_id,user_id
 	}))
}
/**
 * 个人中心获取数据
 */
const getUser=({user_id})=>{
	return axios.post('/users/getUser',qs.stringify({
 		user_id
 	}))
}
/**
 * 查询个人所有作品
 */
const getDynamic=({user_id,type})=>{
	return axios.post('/users/getDynamic',qs.stringify({
 		user_id,type
 	}))
}
/**
 * 查询粉丝
 */
const serchFans=({user_id,current,index})=>{
	return axios.post('/users/serchFans',qs.stringify({
 		user_id,current,index
 	}))
}
/**
 * 查询关注
 */
const serchFollows=({user_id,current,index})=>{
	return axios.post('/users/serchFollows',qs.stringify({
 		user_id,current,index
 	}))
}
/**
 * 判断是否关注 相互关注0 已关注1 未关注2
 */
const isFriends=({uid,fid})=>{
	return axios.post('/users/isFriends',qs.stringify({
 		uid,fid
 	}))
}

/**
 * 添加好友
 */
const addFriends=({uid,fid})=>{
	return axios.post('/users/addFriends',qs.stringify({
 		uid,fid
 	}))
}
/**
 * 删除好友
 */
const removeFriends=({uid,fid})=>{
	return axios.post('/users/removeFriends',qs.stringify({
 		uid,fid
 	}))
}



export {
	name_login,name_reg,Groupmsg,searchGroupmsg,searchFriends,Privatemsg,
	searchPrivatemsg,sFriends,insertFriends,delMeet,inrcCache,getCacheById,
	deleteCacheById,uploadAvatar,uploadimg,uploadimgs,searchAllDynamic,
	addComment,getUserByID,searchComment,addLike,removeLike,searchPltop,
	addLikepl,ulikes,addCollect,removeCollect,getUser,getDynamic,searchDynamic,
	serchFans,serchFollows,addFriends,isFriends,removeFriends
	
}