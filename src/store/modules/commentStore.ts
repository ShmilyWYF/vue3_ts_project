const commentState = {
    recentComment: '',
    commentType: ''
}

const mutations = {
    SET_RECENT_COMMENT(commentStore: any, option: any) {
        commentStore.recentComment = option
    },
    SET_COMMENT_TYPE(commentStore: any, option: any) {
        commentStore.commentType = option
    }
}

const actions: any = {}

export default {
    namespaced: true,
    commentState,
    mutations,
    actions
}

