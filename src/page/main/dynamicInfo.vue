<template>
  <div>
   <Chead :left="true" :cen='true' title="详情"></Chead>
   <div class="main">
          <Item v-for="obj in getInfos"
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
  </div>
</template>

<script>
import Chead from '@/components/head';
import {Toast} from 'mint-ui'
import { searchDynamic } from '@/api/api.js';
import Item from '@/components/item';
export default {
  data() {
    return {
      uid:JSON.parse(localStorage.getItem('userinfo'))[0].id,
      getInfos:'',
    }
  },
  mounted() {
    let zp_id=this.$route.query.zp_id;
    if(this.$route.query.zp_id==undefined){
      Toast('error');
       this.$router.push({ path:'/my'})
    }
    searchDynamic({uid:this.uid,zp_id:zp_id}).then((res)=>{
      this.getInfos=res.data.data;
    })
  },
  methods: {
 
  },
  computed: {

  },
  components: {
   Chead,Item
  }
}

</script>


<style scoped>
.main{padding-top:1.1rem;}
</style>