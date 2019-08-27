import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/main/index'
import Login from '@/page/main/login'
import Chats from '@/page/main/chats'
import Chat from '@/page/main/chat'
import Reg from '@/page/main/reg'
import store from '@/vuex/store'
import Chatlist from '@/page/main/chatlist'
import addFriend from '@/page/main/addFriend'
import diaLog from '@/page/main/diaLog'
import my from '@/page/main/my'
import avatar from '@/page/main/avatar'
import seting from '@/page/main/seting'
import Publish from '@/page/main/Publish'
import comment from '@/page/main/comment'
import fansList from '@/page/main/fansList'
import followList from '@/page/main/followList'
import dynamicInfo from '@/page/main/dynamicInfo'

Vue.use(Router)

let router = new Router({
  routes: [
    {//首页
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
      	requireAuth:true,
        footab:true,
      }
    },{//发表评论、评论列表
      path: '/comment',
      name: 'comment',
      component: comment,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//登录
    	path:'/Login',
    	name:'Login',
    	component:Login,
      meta:{
        requireAuth:false,
        footab:false,
      }
    },{//群聊
      path:'/Chats',
      name:'Chats',
      component:Chats,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//私聊
      path:'/Chat',
      name:'Chat',
      component:Chat,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//注册
      path:'/Reg',
      name:'Reg',
      component:Reg,
       meta:{
        requireAuth:false,
        footab:false,
      }
    },{//好友列表
      path:'/Chatlist',
      name:'Chatlist',
      component:Chatlist,
      meta:{
        requireAuth:true,
        footab:true,
      }
    },{//添加好友
      path:'/addFriend',
      name:'addFriend',
      component:addFriend,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//发布消息
      path:'/Publish',
      name:'Publish',
      component:Publish,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//会话
      path:'/diaLog',
      name:'diaLog',
      component:diaLog,
      meta:{
        requireAuth:true,
        footab:true,
      }
    },{//我的个人中心
      path:'/my',
      name:'my',
      component:my,
      meta:{
        requireAuth:true,
        footab:true,
      }
    },{//修改头像
      path:'/avatar',
      name:'avatar',
      component:avatar,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//设置
      path:'/seting',
      name:'seting',
      component:seting,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//粉丝列表
      path:'/fansList',
      name:'fansList',
      component:fansList,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },{//关注列表
      path:'/followList',
      name:'followList',
      component:followList,
      meta:{
        requireAuth:true,
        footab:false,
      }
    },
    {//作品详情
      path:'/dynamicInfo',
      name:'dynamicInfo',
      component:dynamicInfo, 
      meta:{
        requireAuth:true,
        footab:false,
      }
    },
  ]
})
//判断没有登录跳转登录
router.beforeEach((to,from,next)=>{
  //判断是否需要显示底部导航
  store.commit('changetab',to.meta.footab)
	if(to.meta.requireAuth){//判断路由是否需要登录
		if(localStorage.getItem('userinfo')!=null){
      store.state.userinfo.islogin=true;
		}else{
      store.state.userinfo.islogin=false;
      next({
          path:"/Login",
          query: {redirect: to.fullPath}//将目的路由地址存入login的query中
        })
    }
	}
	next();
})
export default router;