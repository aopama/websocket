<template>
  <div class="up">
      <div class="back">
          <i @click="goback()" class="iconfont iconfanhui"></i>
      </div>
     <div class="cropper">
      <vueCropper ref="cropper" 
      :img="option.img" 
      :outputSize="option.outputSize" 
      :outputType="option.outputType" 
      :info="option.info" 
      :original="option.original" 
      :high="option.high"
      :fixedBox="option.fixedBox"
      :autoCrop="option.autoCrop"
      :autoCropWidth="option.autoCropWidth"
      :autoCropHeight="option.autoCropHright"
      :centerBox="option.centerBox"
      :canMoveBox="option.canMoveBox"
      :infoTrue="option.infoTrue"
      :enlarge="option.enlarge"
      :fixed="option.fixed" 
      ></vueCropper>
      <div class="bot">
        <label class="btns btn-orange" for="uploads">选择图片</label>
        <input type="file" name="file" id="uploads" :value="imgFile" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
        <button @click="handleSubmit" class="btns">保存头像</button>
       </div>
    </div>
  </div>
</template>

<script>
import Chead from '@/components/head';
import { VueCropper } from 'vue-cropper'
import { uploadAvatar,getUserByID } from '@/api/api.js'
import { Indicator ,Toast} from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      previews: {},
      imgFile: '',
      uid:JSON.parse(localStorage.getItem('userinfo'))[0].id,
      option: {
        img: '',        //
        outputSize:0.1, // 裁剪生成图片的质量
        full: false,      //是否输出原图比例的截图
        info:true,        //
        fixed:true,       //等比缩放
        outputType: 'png',    //
        original:false,     //上传图片是否显示原始宽高
        high:true,        //是否根据dpr生成适合屏幕的高清图片
        fixedBox:false,     //截图框固定大小
        autoCrop:true,      //是否自动生成截图框
        autoCropWidth:50,   // 
        autoCropHeight:50,    // 
        centerBox:true,   //截图框是否限制在图片里
        canMoveBox:true,    //能否拖动图片
        infoTrue:true,      //截图信息展示是否是真实的输出宽高
        enlarge:1,        //是否按照截图框比例输出 默认为1 
      },
    }
  },
  methods: {
     async handleSubmit() {
      this.$refs.cropper.getCropBlob((data) => {
        Indicator.open('上传中...');
        let files = new window.File([data], this.name, {type: this.type});
            const formdata = new window.FormData();
            formdata.append('file', files);
            formdata.append('uid',this.uid);
            uploadAvatar({data:formdata}).then((res)=>{
              Indicator.close();
              if(res.status==200){
                //更新userinfo表头像
                  getUserByID({ id:this.uid}).then(res => {
                    if(res.data.status==1){
                      localStorage.setItem("userinfo",JSON.stringify(res.data.data));
                    }
                    console.log(res)
                  })
                //更新本地头像
                Toast(res.data.msg);
              }else{
                Toast(res.data.msg);
              }
              this.$router.push({path:'/my'});
            })
        })
     },
    //选择本地图片
    uploadImg(e, num) {
      const file = e.target.files[0];
      if (!/\.(jpg|jpeg|png|webp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是jpeg,jpg,png中的一种!')
        return false;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert('图片大小必须小于3M!')
        return false;
      }
      this.name = file.name;
      this.type = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要 
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
            this.option.img = data;
        }
      }
      reader.readAsArrayBuffer(file);
    },
    goback(){
        this.$router.go(-1);
    }
  },
  components: {
    Chead,
    VueCropper
  }
}
</script>
<style scoped>
.up{height:100%;position: relative;}
.bot{position:absolute;bottom:0;}
.bot input{display: none;}
.bot .btns{padding: 0;width:4.8rem;display:inline-block; text-align: center;line-height:1.5rem;color:#fff;font-size:0.45rem;}
.uploads{display: none;}
.cropper{width:375px;height:100%;}
.vue-cropper{background-image:none!important;background-color:#000;}
.back{position: absolute;top:0.1rem;left:0.2rem;z-index:999;}
.back i{font-size:1rem;color:#fff;opacity:0.78;}
.cropper{width:100%;}
</style>
