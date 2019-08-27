
//用户名验证
const validname=(user)=>{
	var re = /^[\u4E00-\u9FA5a-zA-Z0-9_]{2,20}$/;
	var msg = "汉字 英文字母 数字 下划线组成，3-20位"; 
	return re.test(user);
}
//密码验证
const validpwd=(pwd)=>{
	var re=/^[\w_-]{3,16}$/;
	return re.test(pwd)
}

export {validname,validpwd}