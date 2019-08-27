<template>
  <i class="iconfont iconshoucang" @click="collect" :class="c_flag ? 'on' : ''"></i>
</template>
<script>
import { addCollect,removeCollect } from '@/api/api.js';
import { Toast} from 'mint-ui';
export default {
  data() {
    return {
      c_flag: this.isCollect,
      uid: JSON.parse(localStorage.getItem('userinfo'))[0].id, //点赞id
    }
  },
  props: ['zp_id','isCollect'],
  methods: {
    collect(){
       if (this.c_flag || this.c_flag == 1) {
          removeCollect({ zp_id: this.zp_id, user_id: this.uid}).then((res) => {
            if (res.data.status != 1) {
              Toast('like error')
            }
           this.c_flag = !this.c_flag;
          })
        } else {
          addCollect({ zp_id: this.zp_id, user_id: this.uid }).then((res) => {
            if (res.data.status != 1) {
              Toast('like error')
            }
            this.c_flag = !this.c_flag;
          })
        }
    }
  },
  mounted() {}
}

</script>
<style scoped>
i.iconshoucang.on{color:#FF9900;}
</style>
