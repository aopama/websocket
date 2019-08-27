<template>
	<header class="header">
		<div class="left" v-if="left">
			<i @click="goback()" class="iconfont iconfanhui"></i>
		</div>
		<div class="cen" v-if="cen">
			<span>{{title}}</span>
		</div>
		<div class="addfriend" v-if="addfriend">
			<router-link to="/addFriend" tag="i" class="iconfont iconjia"></router-link>
		</div>
		<div class="addfriend" v-if="publish">
			<router-link to="/Publish" tag="i" class="iconfont iconjia"></router-link>
		</div>
	</header>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		props:['left','cen','addfriend','title','publish'],
		methods:{
			goback(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style scoped>
	.header{height:1.1rem;line-height:1.1rem; font-size:0.45rem;font-weight:500; width:100%;background:#fafafa;text-align: center;position: fixed;border-bottom:1px solid #e4e4e4;color:#262626;z-index: 999;max-width:800px;}
	.left{position:absolute;top:0;left:0.4rem;}
	.addfriend{position:absolute;top:0;right:0.4rem;}
	.left i,.addfriend i{font-size:0.75rem;color:#262626; font-weight:200;}
</style>