<template>
  <i class="iconfont" @click="like" :class="like_flag ? 'icondianzan love' : 'icondianzan1 loves'"></i>
</template>
<script>
import { addLike, removeLike,addLikepl,ulikes } from '@/api/api.js';
import { Toast} from 'mint-ui';
export default {
  data() {
    return {
      like_flag: this.isLike,
      uid: JSON.parse(localStorage.getItem('userinfo'))[0].id, //点赞id
    }
  },
  props: ['type', 'zp_id', 'isLike','comment_id','zp_uid'],
  methods: {
    like(e) {
      if (this.type == 0) {
        if (this.like_flag || this.like_flag == 1) {
          removeLike({ zp_id: this.zp_id,user_id: this.uid}).then((res) => {
            if (res.data.status != 1) {
              Toast('like error')
            }
            this.like_flag = !this.like_flag;
            this.$emit('likesNum',0)
          })
        } else {
          addLike({ zp_id: this.zp_id,zp_uid:this.zp_uid,user_id: this.uid }).then((res) => {
            if (res.data.status != 1) {
              Toast('like error')
            }
            this.like_flag = !this.like_flag;
            this.$emit('likesNum',1)
          })
        }
      }else if(this.type==1){
        if (this.like_flag || this.like_flag == 1) {
          ulikes({ comment_id: this.comment_id, user_id: this.uid}).then((res) => {
            if (res.data.status != 1) {
              Toast('like error')
            }
            this.$emit('likesNum',0, this.comment_id)
            this.like_flag = !this.like_flag;
          })
        } else {
          addLikepl({ comment_id: this.comment_id, user_id: this.uid }).then((res) => {
            if (res.data.status != 1) {
              Toast('like error')
            }
            this.$emit('likesNum',1, this.comment_id)
            this.like_flag = !this.like_flag;
          })
        }
      }
      e.stopPropagation();
    },
  },
  mounted() {}
}

</script>
<style scoped>
i {
  font-size: 0.35rem;
  color: #262626;
  display: inline-block;
}

i.icondianzan {
  color: #ea5f5f;
}

i.big {
  font-size: 0.75rem;
}

</style>
