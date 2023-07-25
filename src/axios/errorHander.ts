import { ElMessage } from 'element-plus'

/**
 * axios统一错误处理主要针对HTTP状态码错误
 * @param {Object} err
 */
function errorHandle (err: any) {
  // 判断服务器响应
  if (!err.status) {
    switch (err.code) {
      // 用户无权限访问接口
      case 401:
        ElMessage.error('未授权，请先登录~')
        break
      case 403:
        ElMessage.error('服务器拒绝访问~')
        break
      case 404:
        ElMessage.error('请求的资源不存在~')
        break
      case 500:
        ElMessage.error('服务器异常，请稍后再试~')
        break
    }
  } else if (err.message.includes('timeout')) {
    ElMessage.error('连接超时~')
    return false
  } else if (err.code === 'ECONNABORTED' || err.message === 'Network Error' || !window.navigator.onLine) {
    ElMessage.error('网络已断开，请检查连接~')
    return false
  } else {
    // 放行
    return true
  }
}

export default errorHandle
