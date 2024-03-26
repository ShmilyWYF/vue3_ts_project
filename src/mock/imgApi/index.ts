import {
    uploadImg,
} from "@/mock/imgApi/template";

const imgApi = [
    {
        url: '/image/uploadImg',
        type: 'post',
        template: uploadImg,
        code: Number(200),
        status: true,
        condition: true
    },
]


export default imgApi
