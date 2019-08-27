<template>
	<div>
		<div  class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
            <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
	</div>
</template>

<script>
	export default{
		props:['topStatus'],
	}
</script>

<style scoped>
</style>