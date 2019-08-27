<template>
  <div class="bswarp">
    <div class="bsmain" ref='bsmain'>
      <div class="bscontent fansList"  >
        <slot name="custom" :data="data"></slot>
        <!-- 上拉加载 -->
        <div class="pullup-wrapper">
          <div  v-if="isPullingup&&flag" class="pulluping">
              <mt-spinner class="spin" type="fading-circle"></mt-spinner>
          </div>
          <div class="finish" v-if="isMore">没有数据了</div>
        </div>
      </div>
      <!-- 下拉刷新 -->
      <div class="pulldown-wrapper" :style="pullDownStyle">
          <div class="before-trigger" v-show="beforePullDown">
            <bubble :y="bubbleY" class="bubble"></bubble>
          </div>
          <div class="after-trigger" v-show="!beforePullDown">
              <div v-show="isPullingDown" class="loading">
                <mt-spinner class="spin" type="fading-circle"></mt-spinner>
              </div>
              <div v-show="!isPullingDown" class="pulldown-loaded">
                <span>加载完成!</span>
              </div>
          </div>  
        </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { Spinner } from 'mint-ui'
import Bubble from '@/components/bubble.vue'
export default {
  props: ["info", "pullDownRefresh","onPullingUp"],
  data() {
    return {
      data: this.info,
      bubbleY: 0,
      pullDownStyle: 0,
      pullDownHeight: 60,
      beforePullDown:true,
      isPullingDown:false,
      isPullingup:false,
      isMore:false,
      flag:true,
    }
  },
  mounted() {
    let options = {
      pullDownRefresh: {
        threshold:60,
        stop:50
      },
      pullUpLoad :{
        threshold: -20,
        stop:50
      },
      click: true,
    }
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.bsmain, options)
      this.$emit('pulling-down', this);
      // 滑动过程中事件
      this.scroll.on('scroll', (pos) => {
        this.bubbleY = Math.max(0, pos.y - this.pullDownHeight)
        this.pullDownStyle = `top:${Math.min(pos.y - this.pullDownHeight, 0)}px`
      })
      //滑动结束松开事件
      this.scroll.on('touchEnd',(pos) =>{
        if (pos.y<60) {
          this.scroll.finishPullDown();
        }else{
          this.beforePullDown=false;
          this.isPullingDown=true;
          this.$emit('pulling-down', this);
        }
      })
      // 在上拉到超过底部 20px 时，触发 pullingUp 事件
      this.scroll.on('pullingUp', () => {
          this.isPullingup = true;
          this.$emit('pulling-up', this);
      })
    })
  },
  methods: {
    finish(){//下拉刷新事件end
        this.flag=true;
        this.isMore=false;
        this.isPullingup=false;
        this.isPullingDown=false;
        setTimeout(() => {
            this.scroll.finishPullDown()
            this.scroll.refresh();
        },200)
        setTimeout(() => {
          this.beforePullDown=true;
        },500)
    },
    upfinish(length,index){
     if (length < index) {
            this.flag=false;
            this.isPullingup = false;
            this.isMore = true; 
          } else {
            this.isPullingup =true;
            this.isMore = false;
          }
      this.scroll.finishPullUp();
      this.scroll.refresh();
    }
  },
  watch: {
    info(val) {
      this.data = val;
    }
  },
  components: {
    Bubble
  }
}

</script>
<style scoped>
.bswarp {
  height: 100%;
  position: relative;
}

.bsmain {
  position: absolute;
  top:1.1rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.bscontent {
  position: relative;
  z-index: 1;
}

.pulldown-wrapper {
  position: absolute;
  top: 0;
  display: flex;
  width: 100%;
  left: 0;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-transition: all;
  transition: all;
}
.after-trigger{top:20px;position: relative;font-size:0.4rem;color:#999;}
.pulluping{margin-top:-0.2rem;height:40px;line-height:40px;text-align:center;}
.pulluping>.spin{display: inline-block;}
.pullup-wrapper .finish{
  text-align: center;
    color: #999;
    line-height: 0.8rem;
    height: 0.8rem;
    font-size: 0.4rem;
}
</style>
