<template>
  <div class="tags-List-box">
    <div class="option-box">
      <el-button size="small" type="primary" @click="openModel(null)">新增</el-button>
      <el-button :disabled="tagIds.length === 0" size="small" type="danger" @click="isDelete = true">
        批量删除
      </el-button>
      <el-input v-model="searchInput" placeholder="输入标签名" @input="SearchInputEvnt"/>
    </div>
    <!-- 表格展示 -->
    <el-table v-loading="loading" :data="data" border @selection-change="selectionChange">
      <!-- 表格列 -->
      <el-table-column type="selection" width="55" :selectable="checkSelectable"/>
      <!-- 标签名 -->
      <el-table-column align="center" label="标签名" prop="tagName">
        <template #default="slotProp">
          <el-tag>
            {{ slotProp.row.tagName }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 文章量 -->
      <el-table-column align="center" label="文章量" prop="articleCount"/>
      <!-- 标签创建时间 -->
      <el-table-column align="center" label="创建时间" prop="createTime">
        <template #default="slotProp">
          <i class="el-icon-time" style="margin-right: 5px"/>
          {{ slotProp.row.createTime }}
        </template>
      </el-table-column>
      <!-- 列操作 -->
      <el-table-column align="center" label="操作" width="200">
        <template #default="slotProp">
          <el-button size="large" type="primary" @click="openModel(slotProp.row)">编辑</el-button>
          <el-popconfirm style="margin-left: 1rem" title="确定删除吗？" @confirm="deleteTag(slotProp.row)">
            <template #reference>
              <el-button size="large" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :data="tags" :ishide="false" next-svg="kaoyu" prev-svg="jitui"
                @pagination-results="paginationResultsEvnt"/>
    <!-- 批量删除对话框 -->
    <el-dialog v-model="isDelete" width="30%">
      <template #header>
        <i class="el-icon-warning" style="color: #ff9900"/>提示
      </template>
      <div style="font-size: 1rem">是否删除选中项？</div>
      <template #footer>
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteTag({id:null})"> 确 定</el-button>
      </template>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog v-model="isViewAddOrEdit" width="30%">
      <div ref="tagTitle" slot="title" class="dialog-title-container"/>
      <el-form :model="tagForm" label-width="80px" size="small">
        <el-form-item label="标签名">
          <el-input v-model="tagForm.tagName" style="width: 220px"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isViewAddOrEdit = false">取 消</el-button>
        <el-button type="primary" @click="addOrEditTag"> 确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {Tagsinterface} from "@/interface";
import {Pagination} from "@/components";
import qs from "qs";

const isDelete = ref<boolean>(false)

// 加载状态
const loading = ref<boolean>(true)
// 编辑框
const isViewAddOrEdit = ref<boolean>(false)
const isAddOrEdit = ref<boolean>(false)
// 搜索输入框双向绑定
const searchInput = ref<string>('')

// tags列表
const tags = ref([])
// 接收数据
const data = ref()
// 批量tagid
const tagIds = ref<any[]>([])

const tagForm = reactive({
  id: null,
  tagName: '',
})

onBeforeMount(() => {
  listTags()
})

// 设置选择框可选择条件
const checkSelectable = (row: { articleCount: number }) => {
  return row.articleCount <= 0
}

// 分页结果
const paginationResultsEvnt = (result: any) => {
  data.value = result
}
// 获取tags列表
const listTags = () => {
  api.tagsApi.getTags().then((res: AxiosResponse) => {
    const {data} = res.data
    if (!data) {
      ElMessage("获取tag列表失败")
    }
    tags.value = data
    loading.value = false
  })
}

// 搜索tag
const SearchInputEvnt = () => {
  loading.value = true
  if (searchInput.value.length !== 0) {
    data.value = tags.value.filter((item: Tagsinterface) => {
      return item.tagName.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())
    })
  } else {
    data.value = tags.value
  }
  loading.value = false
}

// 编辑和新增共享
const openModel = (tag: string | null) => {
  if (tag != null) {
    isAddOrEdit.value = false
    tagForm.id = JSON.parse(JSON.stringify(tag)).id
    tagForm.tagName = JSON.parse(JSON.stringify(tag)).tagName
  } else {
    tagForm.tagName = ''
    isAddOrEdit.value = true
  }
  isViewAddOrEdit.value = true
}

// 添加或编辑方法
const addOrEditTag = async () => {
  if (tagForm.tagName.trim() == '') {
    ElMessage.error('标签名不能为空')
    return false
  }
  try {
    if (isAddOrEdit.value) {
      await api.tagsApi.addTags(tagForm).then(({data}: AxiosResponse) => {
        ElMessage({message: data.message, type: data.type})
      })
    } else {
      await api.tagsApi.updateTags(tagForm).then(({data}: AxiosResponse) => {
        ElMessage({message: data.message, type: data.type})
      })
    }
    listTags()
  } catch (error: any) {
    ElMessage.error(error)
  }
  isViewAddOrEdit.value = false
}


//  遍历多选
const selectionChange = (tags: []) => {
  let arr: any = []
  tags.forEach((item: {id:number}) => {
    arr.push(item.id);
  })
  tagIds.value = arr
}

const deleteTag = async (row: { id: number | null, articleCount?: number }) => {
  const id = row.id;
  let param: {id:number[]};
  if (id == null) {
    param = {id: tagIds.value}
  } else {
    param = {id: [id]}
    if (row.articleCount! > 0) {
      ElMessage.warning("存在文章绑定，解绑后再试~")
      return
    }
  }
  await api.tagsApi.deleteTags(param).then((res: AxiosResponse) => {
    const {message, type} = res.data
    ElMessage({message: message, type: type})
  })
  listTags()
  isDelete.value = false
}
</script>

<style lang="scss" scoped>
.tags-List-box {
  padding: 1rem;
  height: 0 !important;
  flex: 1;

  .option-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: .25rem;

    .el-input {
      width: 10rem !important;
    }

    .el-button {
      margin: 0;
      height: 100%;
    }
  }
}
</style>
