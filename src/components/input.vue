<template>
  <div class="input-box">
    <input 
    :type="type" 
    ref="input"
    :placeholder="plc" 
    :value="value"    
    @input="$emit('input', $event.target.value)"
    @keyup="fs('focus')"
    @focus="fs('focus')"
    @blur="fs('blur')"
    >
    <i @click="emptyc" v-if="empty" class="iconfont iconguanbi"></i>
  </div>
</template>
<script>
export default {
   props: {
    type: {
        default:'text',
      },
    value:{},
    plc:{},
  },
  data(){
      return{
        empty:false,
      }
    },
  methods:{
    fs(data){
      if(data=='focus'&&this.value!=''){
        this.empty=true;
      }else if(data=='blur'||this.value==''){
        let that=this;
        setTimeout(()=>{
          that.empty=false;
        },100)
      }
    },
    emptyc(){
      this.$emit('inputs')
    }
  }
}
</script>

<style  scoped>
  .input-box{position: relative;}
  .input-box input{border:1px solid #e4e4e4;width:100%;padding-left:0.2rem;height:1.2rem;box-sizing:border-box;line-height:1.2rem;outline:none; margin-bottom:0.2rem; color:#333;font-size:0.4rem;border-radius: 0.1rem;}
  .input-box i{position: absolute;top:0.28rem;right:0.28rem;color:#c8c8c8;font-size:0.55rem;}
</style>