<template>
  <div class="article-List-box">
    <div class="option-box">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-button>查看状态:{{ currStatus }}-{{ tableData?.length }}</el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="viewStatus('All')">全部</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('Public')">公开</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('Private')">私有</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('Draft')">草稿箱</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('RecycleBin')">回收站</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button :disabled="articleIds.length === 0" size="small" type="danger" @click="isDelete = true">
        批量删除
      </el-button>
      <el-input v-model="searchInput" placeholder="输入标题查找文章" @change="" @input="SearchInputEvnt"/>
      <el-button style="width: 5rem;" type="primary" @click="articleAddDialog">添加文章</el-button>
    </div>
    <ArticleManageList :article-ids="articleIds"
                       :loading="loading"
                       :tableData="tableData"
                       @switch-call="CallEvnt"
                       @modify-array="articleIdsEvnt"
                       @edit-callback="articleEditDialog"/>
    <el-dialog v-model="isEditOrAddDialog" class="authordialog" :title="isAddOrEdit == 1?'编辑文章信息':'添加文章'">
      <el-form ref="articleFormRef" :model="articleinfo" :rules="rules" label-width="120px">
        <el-form-item label="标题" prop="articleTitle">
          <el-input v-model="articleinfo.articleTitle" clearable/>
        </el-form-item>
        <el-form-item label="封面" prop="articleCover">
          <p style="display: flex;gap:.25rem">
            <el-input v-model="articleinfo.articleCover" clearable :clear="()=>{}"/>
            <label for="upload" class="ui-upload">upload</label>
            <input id="upload" type="file" name="file" multiple="multiple" @change="imgAdd" style="display: none"/>
          </p>
        </el-form-item>
        <el-form-item label="分类" prop="categoryName" required>
          <el-select
              v-model="articleinfo.categoryName"
              :loading="categoryloading"
              :multiple="false"
              :remote-method="searchCategories"
              allow-create
              default-first-option
              filterable
              placeholder="输入搜索/回车添加自定义"
              remote
              reserve-keyword
              value-key="id"
          >
            <template #prefix>
              <el-tag
                  v-show="articleinfo.categoryName"
                  :closable="true"
                  style="margin: 0 1rem 0 0"
                  type="success"
                  @close="articleinfo.categoryName = ''">
                {{ articleinfo.categoryName }}
              </el-tag>
            </template>
            <el-option v-for="item in categorylist" :key="item.id" :label="item.categoryName"
                       :value="item.categoryName"/>
          </el-select>
        </el-form-item>
        <el-form-item label="置顶/推荐">
          <el-switch v-model="articleinfo.isTop" :active-value="1" :inactive-value="0"/>
          <el-switch v-model="articleinfo.isFeatured" :active-value="1" :inactive-value="0"/>
        </el-form-item>
        <el-form-item label="标签" prop="tags" required>
          <el-select
              v-model="articleinfo.tags"
              :multiple="true"
              allow-create
              default-first-option
              filterable
              placeholder="输入搜索/可添加自定义"
              remote
              reserve-keyword
              value-key="id"
          >
            <el-option v-for="item in tagslist" :key="item.id" :label="item.tagName" :value="item.tagName"/>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="addArticle(articleinfo)">{{ isAddOrEdit == 1 ? '提交编辑' : '添加' }}
        </el-button>
      </el-form>
    </el-dialog>
    <!-- 批量删除对话框 -->
    <el-dialog v-model="isDelete" width="30%">
      <template #header>
        <i class="el-icon-warning" style="color: #ff9900"/>提示
      </template>
      <div style="font-size: 1rem">是否删除选中项？</div>
      <template #footer>
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteArticle()"> 确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {ArticleManageList} from "@/components";
import {inject, nextTick, onMounted, reactive, ref,} from "vue";
import store from "@/store";
import {ElMessage, ElNotification, FormRules} from "element-plus";
import {ArticleInterface} from "@/interface";
import api from "@/axios";
import {AxiosResponse} from "axios";

//获取所有文章列表
const tableData = ref<ArticleInterface[]>([])
const loading = ref(true)
const reloadV: any = inject('reload')

onMounted(async () => {
  await getAllArticleList()
  loading.value = false
})

const viewStatus = (status: string) => {
  searchInput.value = ''
  currStatus.value = status
  localStorage.setItem('currStatus', status)
  store.dispatch('articleStore/getArticleListByStatus', status).then(res => {
    tableData.value = res;
  })
}

//添加文章
const isEditOrAddDialog = ref<boolean>(false)
// category选择器加载
const categoryloading = ref<boolean>(false)
// category列表
const categorylist = ref<any>([])
// 当前查看状态
const currStatus = ref<string>(localStorage.getItem('currStatus') || 'All')
// 表单ref
const articleFormRef = ref<any>()
// 文章搜索输入框双向绑定
const searchInput = ref<string>('')
// tag列表
const tagslist = ref<any[]>()
// 储存多选文章id
const articleIds = ref<[]>([])
// 控制删除弹窗
const isDelete = ref<boolean>()
// 控制是添加还是编辑 0添加 1编辑
const isAddOrEdit = ref<number>(0)
// 初始化
const articleinfo: ArticleInterface = reactive({
  id: 0,
  articleCover: '',
  articleTitle: '',
  isTop: 0,
  isFeatured: 0,
  articleContent: '',
  categoryName: [],
  tags: [],
  isDelete: 0,
  status: 0,
  author: store.getters.userinfo,
})
// 校验
const rules = reactive<FormRules>({
  articleCover: [{required: true, message: '请输入封面url或上传图片', trigger: 'blur'}],
  articleTitle: [{required: true, message: '请输入标题名', trigger: 'blur'}],
  categoryName: [{required: true, message: '请选择分类', trigger: 'change'}],
  tags: [{required: true, message: '请选择标签', trigger: 'change'}],
})

// 获取所有文章列表
const getAllArticleList = async () => {
  await store.dispatch('articleStore/getAllArticle').then(res => {
    if (currStatus.value === 'All') {
      tableData.value = res;
      tableData.value?.sort((a, b) => {
        return b.status - a.status
      })
    } else {
      viewStatus(currStatus.value)
    }
  })
}

// 子调父方法 修改articleids
const articleIdsEvnt = (args: []) => {
  articleIds.value = args
}

// 打开添加对话框回调
const articleAddDialog = async () => {
  isAddOrEdit.value = 0
  await api.tagsApi.getTags().then((res: AxiosResponse) => {
    const {data} = res.data
    tagslist.value = data;
  })
  articleinfo.status = 3
  isEditOrAddDialog.value = true;
  await nextTick(() => {
    articleFormRef.value!.resetFields();
  })
}

// 打开编辑对话框回调
const articleEditDialog = async (row: ArticleInterface) => {
  isAddOrEdit.value = 1
  await api.tagsApi.getTags().then((res: AxiosResponse) => {
    const {data} = res.data
    tagslist.value = data;
  })
  let arr: any = []
  row.tags?.forEach(item => {
    arr.push(item.tagName)
  })
  isEditOrAddDialog.value = true;
  await nextTick(() => {
    Object.assign(articleinfo, row)
    articleinfo.tags = arr
  })
}

// 添加or编辑文章事件
const addArticle = async (articleinfo: ArticleInterface) => {
  articleFormRef.value!.validate((res: boolean) => {
    if (res) {
      if (isAddOrEdit.value != 1) {
        store.dispatch('articleStore/addArticle', articleinfo).then(res => {
          tableData.value = res
        }, ((e: string) => {
          ElNotification({
            title: '通知',
            message: e,
            type: 'warning'
          })
          return
        }))
      } else {
        store.dispatch('articleStore/updateArticle', articleinfo).then(() => {
          getAllArticleList()
        }, ((e: string) => {
          ElNotification({
            title: '通知',
            message: e,
            type: 'warning'
          })
          return
        }))
      }
      ElNotification({
        title: '通知',
        message: '操作完成',
        type: 'success'
      })
      isEditOrAddDialog.value = false;
      if (articleFormRef.value != undefined) {
        articleFormRef.value.resetFields();
      }
    } else {
      ElNotification({
        title: '通知',
        message: '请检查必填项',
        type: 'warning'
      })
    }
  })
}

// 远程搜索
const searchCategories = (query: any) => {
  if (query !== '') {
    categoryloading.value = true
    api.categoryApi.getCategorys().then((res: AxiosResponse) => {
      const {data} = res.data
      categorylist.value = data.filter((item: any) => {
        return item.categoryName.toLowerCase().includes(query.toLowerCase())
      });
      categoryloading.value = false
    })
  } else {
    categorylist.value = []
  }
}

// 根据文章标题在缓存中搜索文章
const SearchInputEvnt = () => {
  loading.value = true
  // 深拷贝
  if (currStatus.value === "All") {
    if (searchInput.value.length !== 0) {
      tableData.value = tableData.value.filter((item: ArticleInterface) => {
        return item.articleTitle.includes(searchInput.value)
      })
    } else {
      tableData.value = store.getters.allArticle
    }
  } else {
    if (searchInput.value.length !== 0) {
      tableData.value = store.getters.articleByStatusList[currStatus.value].filter((item: ArticleInterface) => {
        return item.articleTitle.includes(searchInput.value)
      })
    } else {
      tableData.value = store.getters.articleByStatusList[currStatus.value]
    }
  }
  loading.value = false
}

const deleteArticle = () => {
  try {
    api.articleApi.deleteArticle(articleIds.value).then((res: AxiosResponse) => {
      const {data} = res.data
      if (!data) {
        throw new Error('删除失败')
      }
      ElMessage.success("删除成功")
    })
  } catch (e: any) {
    ElMessage.success(e)
  } finally {
    isDelete.value = false
    reloadV()
  }
}

// statusCallEvnt
const CallEvnt = (call: []) => {
  if (searchInput.value !== '' && searchInput.value.length !== 0) {
    tableData.value = call
    SearchInputEvnt()
  } else {
    tableData.value = call
  }
}

// 上传图片
const imgAdd = (file: any) => {
  let formdata = new FormData();
  formdata.append('image', file.target.files[0]);
  // axios在接收formdata类型参数时会强制删除content-type浏览器识别空设置为默认false
  api.imgApi.uploadImg(formdata).then((res: any) => {
    const {data} = res.data
    articleinfo.articleCover = data
  })
}
</script>

<style lang="scss" scoped>
.article-List-box {
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

  :deep(.authordialog) {
    width: 25rem;

    .el-dialog__body {
      .el-card {
        .el-card__header {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          span {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: 800;
            font-size: larger;
          }

          p {
            font-weight: 500;
          }
        }
      }
    }
  }
}

.ui-upload {
  height: 30px;
  width: 80px;
  background-color: #00abff;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  color: #fff;
  border-radius: 3px;
}
</style>
