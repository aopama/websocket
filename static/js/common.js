(function(num){
	function remFn() {
      var c = document.documentElement.clientWidth / num;
      if(c<64){
        document.documentElement.style.fontSize =  c + 'px';
      }else{
        document.documentElement.style.fontSize =  '75px';
      }
	}
	window.addEventListener('resize',remFn,false);
	remFn();
})(10);

// 错误图片处理










