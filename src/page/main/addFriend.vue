<template>
	<div>
		<Chead :left="true" :cen="true" title="添加好友"></Chead>
		<input type="text">
		<button>搜索</button>
	</div>
</template>

<script>
import {searchFriends} from '@/api/api.js';
import Chead from '@/components/head';
	export default {
		data(){
			return{
			
			}
		},
		mounted(){	
		
		},
		components:{
			Chead
		}
    }
</script>

<style scoped>
	
</style>

