export default {
    // 上传图片
    uploadImg: {
        method: 'post',
        url: '/image/uploadImg',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
}
