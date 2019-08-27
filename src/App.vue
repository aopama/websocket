<template>
  <div id="app">
      <Tabs v-if="this.$store.state.userinfo.footnav"></Tabs>
      <transition  name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import Tabs from './components/Tabs'
export default {
  name:'app',
  data(){
    return {
      
    }
  },
  mounted(){
  },
  components:{
    Tabs
  }
}
</script>

<style>
html{background:#eee;}
#app{max-width:800px;margin:0 auto;}
</style>
