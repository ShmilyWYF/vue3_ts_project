import {getCookie} from "@/utils/cookie";
import store from "@/store";

export const RolesMenu = () => {
    let cookie = getCookie('token');
    if (cookie){
        if (store.getters.userinfo.type == 999||store.getters.userinfo.type == 1){
            const result = [{
                "id": "1",
                "pid": "1",
                "title": "后台管理",
                "path": "/Dashboard",
                "value": "@string",
                "icon": [""],
                "children": [
                    {
                        "id": "11",
                        "pid": "11",
                        "title": "首页",
                        "path": "/Dashboard/home",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "12",
                        "pid": "12",
                        "title": "文章管理",
                        "path": "/Dashboard/mark",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "13",
                        "pid": "13",
                        "title": "评论管理",
                        "path": "/Dashboard/comment",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "14",
                        "pid": "14",
                        "title": "用户管理",
                        "path": "/Dashboard/user",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "15",
                        "pid": "15",
                        "title": "网站设置",
                        "path": "/Dashboard/website",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "16",
                        "pid": "16",
                        "title": "关于",
                        "path": "/Dashboard/about",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "18",
                        "pid": "18",
                        "title": "邮件系统",
                        "path": "/Dashboard/mail",
                        "value": "@string",
                        "icon": [""
                        ],
                    },
                    {
                        "id": "17",
                        "pid": "17",
                        "title": "留言",
                        "path": "/Dashboard/message",
                        "value": "@string",
                        "icon": [""
                        ],
                    }
                ]
            }]
            return {message:'ok',data:result[0]}
        }
    }
    return {message:'没有权限'}
}




