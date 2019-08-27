<template>
	<div>
     <div v-if="allLoaded" v-show="show_bottom" style="text-align:center;" class="data-none">{{txt}}</div>
        <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
            <span v-show="bottomStatus === 'loading'">
              <span v-show="bottomStatus == 'loading'">
                <div class="mint-spinner-snake" style="border-top-color: rgb(38, 162, 255);border-left-color: rgb(38, 162, 255); border-bottom-color: rgb(38, 162, 255); height: 28px; width: 28px;"></div>
              </span>
            </span>
        </div>
	</div>
</template>

<script>
	export default{
		props:['bottomStatus','allLoaded','show_bottom','txt'],
	}
</script>

<style scoped>
.mint-spinner-snake {
  margin: 0 auto;
}
</style>