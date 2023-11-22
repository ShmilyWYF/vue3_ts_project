import Mock from "mockjs";
import {CommentMockinterface} from "@/interface";
import {allUserInfo} from "@/mock/userApi/tempalte/userTemplate";
import {allArticle} from "@/mock/articleApi/tempalte";

export const comments: { data: CommentMockinterface[] } = Mock.mock({
    data: [{
        id: 1853,
        user_id: 54,
        topic_id: 41,
        comment_content: '第一套评论消息',
        reply_user_id: 54,
        parent_id: null,
        type: 1,
        is_delete: 0,
        is_review: 1,
        create_time: new Date(),
        update_time: null,
    },
        {
            id: 1854,
            user_id: 54,
            topic_id: 41,
            comment_content: '回复自己的第一条消息',
            reply_user_id: 54,
            parent_id: 1853,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1855,
            user_id: 54,
            topic_id: 41,
            comment_content: '回复自己的第二条消息',
            reply_user_id: 54,
            parent_id: 1853,
            type: 1,
            is_delete: 0,
            is_review: 0,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1856,
            user_id: 54,
            topic_id: 0,
            comment_content: '回复自己的另一篇第一条消息',
            reply_user_id: 54,
            parent_id: 1853,
            type: 2,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1857,
            user_id: 54,
            topic_id: 41,
            comment_content: '第二条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 0,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1858,
            user_id: 54,
            topic_id: 41,
            comment_content: '第三条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1859,
            user_id: 54,
            topic_id: 41,
            comment_content: '第四条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 0,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1860,
            user_id: 54,
            topic_id: 41,
            comment_content: '第五条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1861,
            user_id: 54,
            topic_id: 41,
            comment_content: '第六条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1864,
            user_id: 54,
            topic_id: 41,
            comment_content: '第七条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1865,
            user_id: 54,
            topic_id: 41,
            comment_content: '第七条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1862,
            user_id: 54,
            topic_id: 41,
            comment_content: '第七条评论消息',
            reply_user_id: 54,
            parent_id: null,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1862,
            user_id: 54,
            topic_id: 41,
            comment_content: '第八条评论消息',
            reply_user_id: 54,
            parent_id: 1861,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1863,
            user_id: 54,
            topic_id: 41,
            comment_content: '第八条评论消息',
            reply_user_id: 54,
            parent_id: 1861,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
        {
            id: 1864,
            user_id: 54,
            topic_id: 41,
            comment_content: '第八条评论消息',
            reply_user_id: 54,
            parent_id: 1861,
            type: 1,
            is_delete: 0,
            is_review: 1,
            create_time: new Date(),
            update_time: null,
        },
    ]
})

// 根据类型和文章id和类型获取当前文章所有评论
export const getCommentListByType = (params: string) => {
    const {type, topicId, current, size} = JSON.parse(params)
    let arr: CommentMockinterface[] = comments.data.filter((item: CommentMockinterface) => {
        return item.type == type && item.topic_id == topicId
    })
    let commentsParent: CommentMockinterface[] = []
    let commentsChild: any = []
    arr.forEach(item => {
        if (item.parent_id != null) {
            let userinfo = allUserInfo.find(value => value.id === item.user_id);
            let replyUser = allUserInfo.find(value => value.id === item.reply_user_id);
            let data = {
                "id": item.id,
                "parentId": item.parent_id,
                "userId": item.user_id,
                "nickname": userinfo!.nickname,
                "avatar": userinfo!.avatar,
                "webSite": userinfo!.website,
                "replyUserId": item.reply_user_id,
                "replyNickname": replyUser!.nickname,
                "replyWebsite": replyUser!.website,
                "commentContent": item.comment_content,
                "createTime": item.create_time
            }
            commentsChild.push(data)
        } else {
            commentsParent.push(item)
        }
    })
    let mergeResults = commentsParent.map((item) => {
        let arr = commentsChild.filter((value: any) => {
            return value.parentId === item.id
        })
        if (arr) {
            Object.assign(item, {replys: arr})
        }
        return item;
    })
    let result: any[] = mergeResults.map(item => {
        let userinfo = allUserInfo.find(value => value.id === item.user_id);
        return {
            id: item.id,
            userId: item.user_id,
            nickname: userinfo?.nickname,
            avatar: userinfo?.avatar,
            webSite: userinfo?.website,
            commentContent: item.comment_content,
            createTime: item.create_time,
            replys: item.replys,
        }
    })
    let count = result.length
    return {list: result.splice((current - 1) * size, size * current), count: count}
}

export const saveComments = (obj: string) => {
    const {type, replyUserId = null, parentId = null, commentContent, topicId, userId} = <{
        type: number,
        replyUserId?: number,
        parentId?: number,
        commentContent: string,
        topicId?: number,
        userId?: number
    }>JSON.parse(obj)
    let tempObj: CommentMockinterface = Mock.mock({
        id: '@increment',
        comment_content: commentContent,
        create_time: new Date,
        is_delete: 0,
        is_review: 0,
        parent_id: parentId,
        reply_user_id: replyUserId,
        replys: null,
        topic_id: topicId,
        type: type,
        update_time: null,
        user_id: null,
    })
    // 判断是回复还是评论
    if (userId) {
        // 评论
        tempObj.user_id = userId
        comments.data.push(tempObj)
    } else {
        // 回复评论
        // 根据父评论id找到父评论index
        let key = comments.data.findIndex(value => value.id == parentId)
        let parentComment = comments.data[key]
        tempObj.user_id = parentComment.user_id
        // 判断找到的父评论是否存在上级父评论id
        if (parentComment?.parent_id != null) {
            //  找到父评论用户信息
            let userinfo = allUserInfo.find(value => value.id === parentComment?.user_id);
            // 为回复添加@用户字符串
            tempObj.comment_content = '@' + userinfo?.nickname + '：' + commentContent
            // 设置父id为根父评论id
            tempObj.parent_id = parentComment.parent_id
            // 将回复评论显示在被回复的评论下方
            comments.data.splice(key, 0, tempObj)
        } else {
            comments.data.push(tempObj)
        }
    }
    return comments
}

// 获取所有type=x的消息
export const getCommentAll = (obj: string) => {
    let objs = JSON.parse(obj)
    let commentsParent: CommentMockinterface[] = []
    let commentsChild: any = []
    let arr: CommentMockinterface[] = []
    let result: any[] = []
    // 参数不为空
    if (objs !== null){
        if(typeof objs == 'string'||typeof objs == 'number'){
            arr = comments.data.filter((item: CommentMockinterface) => {
                return item.is_review == obj
            })
            arr.forEach(item=>{
                let userinfo = allUserInfo.find(value => value.id === item.user_id);
                let replyUserinfo = allUserInfo.find(value => value.id === item.reply_user_id);
                let articleinfo = allArticle.find(value => value.id = item.topic_id)
                let data ={
                    id: item.id,
                    avatar: userinfo?.avatar,
                    nickname: userinfo?.nickname,
                    replyNickname: replyUserinfo?.nickname,
                    articleTitle: articleinfo?articleinfo?.articleTitle:'无',
                    commentContent: item.comment_content,
                    createTime: item.create_time,
                    isReview: item.is_review,
                    type: item.type,
                }
                result.push(data)
            })
        }
        if (objs.hasOwnProperty('type')) {
            const {type} = JSON.parse(obj)
            arr = comments.data.filter((item: CommentMockinterface) => {
                return item.type == type
            })
            arr.forEach(item => {
                if (item.parent_id != null) {
                    let userinfo = allUserInfo.find(value => value.id === item.user_id);
                    let replyUser = allUserInfo.find(value => value.id === item.reply_user_id);
                    let data = {
                        "id": item.id,
                        "parentId": item.parent_id,
                        "userId": item.user_id,
                        "nickname": userinfo!.nickname,
                        "avatar": userinfo!.avatar,
                        "webSite": userinfo!.website,
                        "replyUserId": item.reply_user_id,
                        "replyNickname": replyUser!.nickname,
                        "replyWebsite": replyUser!.website,
                        "commentContent": item.comment_content,
                        "createTime": item.create_time
                    }
                    commentsChild.push(data)
                } else {
                    commentsParent.push(item)
                }
            })
            let mergeResults = commentsParent.map((item) => {
                let arr = commentsChild.filter((value: any) => {
                    return value.parentId == item.id
                })
                Object.assign(item, {replys: arr})
                return item;
            })
            result = mergeResults.map(item => {
                let userinfo = allUserInfo.find(value => value.id === item.user_id);
                return {
                    id: item.id,
                    userId: item.user_id,
                    nickname: userinfo?.nickname,
                    avatar: userinfo?.avatar,
                    webSite: userinfo?.website,
                    commentContent: item.comment_content,
                    createTime: item.create_time,
                    replys: item.replys,
                }
            })
        }
    } else {
        // 获取所有
            arr = comments.data
            arr.forEach(item=>{
                let userinfo = allUserInfo.find(value => value.id === item.user_id);
                let replyUserinfo = allUserInfo.find(value => value.id === item.reply_user_id);
                let articleinfo = allArticle.find(value => value.id == item.topic_id)
                let data ={
                    id: item.id,
                    avatar: userinfo?.avatar,
                    nickname: userinfo?.nickname,
                    replyNickname: replyUserinfo?.nickname,
                    articleTitle: articleinfo?articleinfo?.articleTitle:'无',
                    commentContent: item.comment_content,
                    createTime: item.create_time,
                    isReview: item.is_review,
                    type: item.type,
                }
                result.push(data)
            })
    }
    return result
}
export const commentData = getCommentAll('null')

// 按评论Id获取回复
export const getRepliesByCommentId = (commentId: number) => {
    let commentData = comments.data.find(value => value.id == commentId)
    let data = getCommentAll(JSON.stringify({type: commentData?.type}))
    let key = data.findIndex(value => value.id == commentId)
    return data[key]
}

export const getAllCommentData = (obj:string) =>{
    return getCommentAll(obj);
}

// 删除
export const deleteCommentById = (obj:string) =>{
    const {data} = JSON.parse(obj);
    data.forEach((id:number|string)=>{
        let key = comments.data.findIndex(res=>{
            return res.id == id
        })
        let keys = commentData.findIndex(res=>{
            return res.id == id
        })
        if (key != -1){
            comments.data.splice(key,1)
            commentData.splice(keys,1)
        }
    })
    return true;
}

// 更新
export const releaseCommentById = (obj:string) =>{
    const {data} = JSON.parse(obj);
    data.forEach((id:number|string)=>{
        let key = comments.data.findIndex(res=>{
            return res.id == id
        })
        let keys = commentData.findIndex(res=>{
            return res.id == id
        })
        if (key != -1){
            comments.data[key].is_review = 1
            commentData[keys].isReview = 1
        }
    })
    return true;
}
