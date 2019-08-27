<template>
  <div class="warp">
    <Chead :cen='true' title="广场" :publish='true'></Chead>
      <loadItem :info="info" @pulling-down="onPullingDown" @pulling-up="onPullingUp">
        <div slot="custom" slot-scope="user">
           <Item v-for="(obj,index) in user.data"
          :key="obj.zid"
          :id="obj.zid"
          :uid="obj.uid"
          :uname="obj.username"
          :headurl="obj.avatar"
          :imgs="obj.imgs"
          :content="obj.content"
          :creatime="obj.creatime"
          :likes="obj.likes"
          :isCollect="obj.isCollect"
          :isLike="obj.isLike"
          :isFollow="obj.isFollow"
          :commentNum="obj.commentNum"
          :luid="uid"
          :type="obj.type"
          ></Item>
        </div>
       </loadItem>
  </div>
</template>
<script>
import Chead from '@/components/head';
import loadItem from '@/components/loadItem';
import Item from '@/components/item';
import { searchAllDynamic } from '@/api/api.js'
export default {
  name: '',
  data() {
    return {
      msg: '首页',
      uid:JSON.parse(localStorage.getItem('userinfo'))[0].id,
      current:1,
      index:'3',
      info:'',
    }
  },
  mounted() {
    
  },
  methods: {
    onPullingDown(v) {
      let that=this;
      that.current=1;
      setTimeout(() => {
        searchAllDynamic({uid:that.uid,current:that.current,index:that.index}).then(res=>{
            if(res.data.status==1){
              that.info=res.data.data
            }
             if(v) {
              v.finish();
            }
          })
      },500)   
    },
    onPullingUp(v) {
      let that=this;
      this.current += 1;
      setTimeout(() => {
          searchAllDynamic({uid:that.uid,current:that.current,index:that.index}).then(res=>{
            if(res.data.status==1){
              if(res.data.data.length<that.index){
                this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
              }
              that.info=that.info.concat(res.data.data);
            }
          v.upfinish(res.data.data.length,that.index);
          })

      }, 500);
    }
  },
  components: {
    Chead,Item,loadItem
  }
}

</script>
<style scoped>
body{touch-action: none;}
  .warp{height:100%}
</style>
