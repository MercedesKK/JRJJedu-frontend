import { ElNotification,ElMessageBox } from 'element-plus'

export function toast(message,type = "success", dangerouslyUseHTMLString = false){
    ElNotification({
        message,
        type,
        dangerouslyUseHTMLString,
        duration:2500,
        position: 'bottom-right',
    })
}

export function messageBox(content = "提示内容", type = "warning", title = "") {
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: type,
        }
      )
}


export function dateString(time){
  var date =new Date(time);
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  month = month < 10 ?"0"+month:month;
  day = day < 10 ?"0"+day:day;
  return year+"-"+month+"-"+day;
}