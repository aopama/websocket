const collection = {
  //格式化时间
  fomatDate: (time) => {
    var now = new Date();
    var date = new Date(time);
    //计算时间间隔，单位为分钟
    var inter = parseInt((now.getTime() - date.getTime()) / 1000 / 60);
    if (inter == 0) {
      return "现在";
    }
    //多少分钟前
    else if (inter < 60) {
      return inter.toString() + "分钟";
    }
    //多少小时前
    else if (inter < 60 * 24) {
      return parseInt(inter / 60).toString() + "小时";
    }
    //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
    else if (now.getFullYear() == date.getFullYear()) {
      return (date.getMonth() + 1).toString() + "-" +
        date.getDate().toString() + " " +
        date.getHours() + ":" +
        date.getMinutes();
    } else {
      return date.getFullYear().toString().substring(2, 3) + "-" +
        (date.getMonth() + 1).toString() + "-" +
        date.getDate().toString() + " " +
        date.getHours() + ":" +
        date.getMinutes();
    }
  },
}
module.exports = collection;
