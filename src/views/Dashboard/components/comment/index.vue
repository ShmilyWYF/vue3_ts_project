<template>
  <div class="comment-List-box">
    <div class="option-box">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-button>查看状态:{{ currStatus }}-{{ initData.comments.length }}</el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="viewStatus('null')">全部</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('1')">正常</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('0')">审核中</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button :disabled="commentIds.length === 0" size="small" type="danger" @click="isDialogView = true;deleteOrPass = 0">
        批量删除
      </el-button>
      <el-button :disabled="commentIds.length === 0||currStatus!='审核中'" size="small" type="success" @click="isDialogView = true;deleteOrPass = 1">
        批量通过
      </el-button>
      <el-input v-model="searchInput" placeholder="输入来源查找" @change="" @input="SearchInputEvnt"/>
    </div>
    <!--表格展示-->
    <el-table v-loading="initData.loading" :data="data" border @selection-change="selectionChange">
      <!-- 表格列 -->
      <el-table-column type="selection" width="55" :selectable="checkSelectable"/>
      <el-table-column align="center" label="头像" prop="avatar" width="120">
        <template #default="scope">
          <el-avatar :src="scope.row.avatar" size="small"/>
        </template>
      </el-table-column>
      <!-- 评论人昵称 -->
      <el-table-column align="center" label="评论人" prop="nickname" width="120"/>
      <!-- 回复人昵称 -->
      <el-table-column align="center" label="回复人" prop="replyNickname" width="120">
        <template #default="scope">
          <span v-if="scope.row.replyNickname">
            {{ scope.row.replyNickname }}
          </span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <!-- 评论文章标题 -->
      <el-table-column align="center" label="文章标题" prop="articleTitle">
        <template #default="scope">
          <span v-if="scope.row.articleTitle">
            {{ scope.row.articleTitle }}
          </span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <!-- 评论内容 -->
      <el-table-column align="center" label="评论内容" prop="commentContent">
        <template #default="scope">
          <span class="comment-content" v-html="scope.row.commentContent"/>
        </template>
      </el-table-column>
      <!-- 评论时间 -->
      <el-table-column align="center" label="评论时间" prop="createTime" width="150">
        <template #default="scope">
          <i class="el-icon-time" style="margin-right: 5px"/>
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column align="center" label="状态" prop="isReview" width="80">
        <template #default="scope">
          <el-tag v-if="scope.row.isReview == 0" type="warning">审核中</el-tag>
          <el-tag v-if="scope.row.isReview == 1" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <!-- 来源 -->
      <el-table-column align="center" label="来源" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.type == 1">文章</el-tag>
          <el-tag v-if="scope.row.type == 2" type="danger">留言</el-tag>
          <el-tag v-if="scope.row.type == 3" type="success">关于我</el-tag>
          <el-tag v-if="scope.row.type == 4" type="warning">友链</el-tag>
          <el-tag v-if="scope.row.type == 5" type="warning">说说</el-tag>
        </template>
      </el-table-column>
      列操作
      <el-table-column align="center" label="操作" width="160">
        <template #default="scope">
          <el-button v-if="scope.row.isReview == 0" slot="reference" size="small" type="success" @click="releaseComments(scope.row.id)">
            通过
          </el-button>
          <el-popconfirm style="margin-left: 10px" title="确定删除吗？" @confirm="deleteComments(scope.row.id)">
            <template #reference>
              <el-button size="small" type="danger"> 删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :data="initData.comments" :ishide="false" next-svg="kaoyu" prev-svg="jitui" @pagination-results="paginationResultsEvnt" :page-size="10"/>
    <!-- 批量删除对话框 -->
    <el-dialog v-model="isDialogView" width="30%">
      <template #header>
        <i class="el-icon-warning" style="color: #ff9900"/>提示
      </template>
      <div style="font-size: 1rem">{{deleteOrPass == 0?'是否删除选中项？':'是否通过选中项？'}}</div>
      <template #footer>
        <el-button @click="isDialogView = false">取 消</el-button>
        <el-button v-if="deleteOrPass == 0" type="primary" @click="deleteComments()"> 确 定</el-button>
        <el-button v-else type="primary" @click="releaseComments()"> 确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, reactive, ref} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {Pagination} from "@/components";
import {ElNotification} from "element-plus";

onMounted(async () => {
  await api.commentApi.getComments(null).then((res: AxiosResponse) => {
    const {data} = res.data
    initData.comments = data
  })
})

// 初始化数据
const initData = reactive({
  comments: [{
    id: '',
    avatar: '',
    nickname: '',
    replyNickname: '',
    articleTitle: '',
    commentContent: '',
    createTime: '',
    isReview: '',
    type: '',
  }],
  count: 0,
  isReview: false,
  loading: false,
})
const reloadV = inject<any>('reload');
// 接收数据
const data = ref<any[]>()
// 批量选择id
const commentIds = ref<any[]>([])
// 搜索框双向绑定
const searchInput = ref<string>('')
// 当前查看状态
const currStatus = ref<string>('全部')
// 批量删除提示视图
const isDialogView = ref<boolean>(false)
// 批量删除or通过
const deleteOrPass = ref<number>(0)

// 设置选择框可选择条件
const checkSelectable = (row:any)=>{
  if (currStatus.value == '审核中'){
    return row.isReview != 1
  }
  if (currStatus.value == '正常'){
    return row.isReview != 0
  }
  if (currStatus.value == '全部'){
    return row.isReview === 3
  }
}
// 根据状态查看数据列表
const viewStatus = (status: string) => {
  if (status!='null'){
    switch (status) {
      case '1'||1: currStatus.value = '正常';break;
      case '0'||0: currStatus.value = '审核中';break;
    }
  }else {
    currStatus.value = '全部'
  }
  searchInput.value = ''
  if (status == null) {
    listComments()
    return
  }
  listComments(status)
}
// 获取所有评论
const listComments = (Parameters: any = null) => {
  api.commentApi.getCommentsByStatus(Parameters).then((res: AxiosResponse) => {
    const {data} = res.data
    initData.comments = data
  })
}
// 输入事件
const SearchInputEvnt = () => {
  initData.loading = true
  if (searchInput.value.length !== 0) {
    let arr = initData.comments.filter((item:any) => {
      switch (searchInput.value) {
        case '文章': return item.type == 1;
        case '留言': return item.type == 2;
        case '关于我': return item.type == 3;
        case '友链': return item.type == 4;
        case '说说': return item.type == 5;
      }
    })
    data.value = arr
  } else {
    data.value = initData.comments
  }
  initData.loading = false
}
// 批量表单操作事件
const selectionChange = (commentId:[]) => {
  let arr: any[] = []
  commentId.forEach((item:{id:number}):void=>{
    arr.push(item.id)
  })
  commentIds.value = arr
}
// 更新评论审核
const releaseComments = (id?: number) => {
  let param: {}
  if (id == null) {
    param = {data: commentIds.value}
  } else {
    param = {data: [id]}
  }
  try {
    api.commentApi.releaseComments(param).then((res:AxiosResponse)=>{
      const {data} = res.data
      if (!data){
        throw new Error('删除失败')
      }
      ElNotification({
        title: '通知',
        message: '成功！',
        type: 'success'
      })
      reloadV()
    })
  }catch (e:any) {
    ElNotification({
      title: '通知',
      message: e,
      type: 'error'
    })
  }
}
// 删除评论
const deleteComments = (id?: number) => {
  let param: {}
  if (id == null) {
    param = {data: commentIds.value}
  } else {
    param = {data: [id]}
  }
  try {
    api.commentApi.deleteComments(param).then((res:AxiosResponse)=>{
      const {data} = res.data
      if (!data){
        throw new Error('删除失败')
      }
      ElNotification({
        title: '通知',
        message: '成功！',
        type: 'success'
      })
      reloadV()
    })
  }catch (e:any) {
    ElNotification({
      title: '通知',
      message: e,
      type: 'error'
    })
  }

}

// 分页
const paginationResultsEvnt = (result: any) => {
  data.value = result
}
</script>

<style scoped lang="scss">
.comment-List-box {
  padding: 1rem;
  height: 0 !important;
  flex: 1;

  .option-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: .25rem;

    .el-input {
      width: 10rem;
    }

    .el-button {
      margin: 0;
      height: 100%;
    }
  }

}
</style>
