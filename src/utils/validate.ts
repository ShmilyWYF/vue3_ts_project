/* 合法uri*/

export function validateURL(textval:string) {
  // const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  const urlregex = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
  return urlregex.test(textval)
}


export function nameRule(rules: any,value:string,callback:Function){
  let reg=/^(?:[\u4e00-\u9fa5·_a-zA-Z]{4,16})$/;
  if(value===''){
    callback(new Error("请输入用户名"))
  }else if(!reg.test(value)){
    callback(new Error("请输入4-10位用户名"))
  }else {
    callback();
  }
}

export function pwdRule(rules: any,value:string,callback:Function){
  let reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/
  if(value===''){
    callback(new Error("请输入密码"))
  }else if(!reg.test(value)){
    callback(new Error("请输入6-12位密码需要包含大小写字母"))
  }else {
    callback()
  }
}

export function UrlRule(rules: any,value:string,callback:Function){
  if(!validateURL(value)){
    callback(new Error("网址非法"))
  }else {
    callback()
  }
}

export function validateEmail(email:string){
  let reg = /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/
  return  reg.test(email);
}
