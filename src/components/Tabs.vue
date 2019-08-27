<template>
  <div class="tabs bt_top">
    <ul>
      <router-link :to="{name:'Index'}" tag="li" exact>
        <div>
          <i class="iconfont iconhome"></i>
        </div>
      </router-link>
      <router-link :to="{name:'diaLog'}" tag="li" exact>
        <div>
          <i class="iconfont iconxiaoxi"></i>
        </div>
      </router-link>
      <router-link :to="{name:'Chatlist'}" tag="li" exact>
        <div>
          <i class="iconfont iconfriend"></i>
        </div>
      </router-link>
      <router-link :to="{name:'my'}" tag="li" exact>
        <div>
          <i class="iconfont iconziyuan"></i>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {}
</script>
<style>
.iconfont{}
.tabs{position:fixed;bottom: 0;left:0;right:0;margin-right:auto;margin-left:auto;max-width:800px; z-index:999;width:100%;height:1.1rem;background:#fafafa;}
.tabs ul{display: flex;}
.tabs li.router-link-active i{font-weight:bold;}
.tabs li{flex:1;line-height:1rem;text-align: center;}
.tabs li i{color:#262626;font-size:0.6rem;display:inline-block;vertical-align: middle;}
.tabs li i.iconxiaoxi{font-size:0.65rem;}
</style>