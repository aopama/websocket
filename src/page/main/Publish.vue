<template>
	<div>
		<Chead :left="true" :cen="true" title="发布消息"></Chead>
		<div class="main">
			 <mt-field class='txta'  v-model="dynamicContent" placeholder="发表您的动态" type="textarea" rows="5" ></mt-field>
			 <uploader @getFiles='getImageList' @removeFiles='removeImage'></uploader>
			<button class="btn" @click='send'>发布</button>
		</div>
	</div>
</template>

<script>
import {searchFriends,uploadimgs} from '@/api/api.js';
import Chead from '@/components/head';
import uploader from '@/components/Upload';
import { Indicator, Toast } from "mint-ui";
	export default {
		data(){
			return{
				dynamicContent: "", //动态内容
				imgList:[],
				FilecodeList: [],
				flag:false,
				user_id: JSON.parse(localStorage.getItem('userinfo'))[0].id,
				uname:JSON.parse(localStorage.getItem('userinfo'))[0].username,
				headurl:JSON.parse(localStorage.getItem('userinfo'))[0].avatar,
			}
		},
		mounted(){	
			
		},
		methods:{
			getImageList(files) {
		      this.$nextTick(() => {
		        for (let i = 0, len = files.length; i < len; i++) {
		          this.imgList.push(files[i].src.split("base64,")[1]);
		          this.FilecodeList.push(files[i])
		        }
		      });
		    },
		    //删除图片
		    removeImage(index) {
		      this.imgList.splice(index, 1);
		      this.FilecodeList.splice(index, 1);
		    },
		    async send(){
		    	let self = this;
		    	let type =0;
		    	if (this.imgList.length === 0) {
		    		type =1;
		    	}
		    	if (this.dynamicContent.trim() == "" && this.imgList.length === 0) {
		    		Toast('写点心情吧写个哇塞也是可以的。');
		    		return false;
		    	}
		    	Indicator.open();
		    	const formdata = new window.FormData();
		    	formdata.append('content',self.dynamicContent);
		    	formdata.append('uid',self.user_id);
		    	formdata.append('type',type);
		    	self.FilecodeList.forEach(function (file) {
                	formdata.append('file',file.file);
            	})
		    	await uploadimgs({data:formdata}).then((res)=>{
		        	Indicator.close();
		          if(res.data.status==1){
		            Toast(res.data.msg);
		            self.$router.push({path:'/'});
		          }else{
		            Toast(res.data.msg);
		          }
		        })
		    },
		},
		components:{
			Chead,uploader
		}
    }
</script>

<style scoped>
	.main{padding:1.5rem 0.4rem 0.4rem 0.4rem;}
</style>

