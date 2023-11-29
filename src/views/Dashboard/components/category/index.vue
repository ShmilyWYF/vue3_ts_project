<template>
  <div class="categorys-List-box">
    <div class="option-box">
      <el-button size="small" type="primary" @click="openModel(null)">新增</el-button>
      <el-button :disabled="categoryIds.length === 0" size="small" type="danger" @click="isDelete = true">
        批量删除
      </el-button>
      <el-input v-model="searchInput" placeholder="输入分类名" @input="SearchInputEvnt"/>
    </div>
    <!-- 表格展示 -->
    <el-table v-loading="loading" :data="data" border @selection-change="selectionChange">
      <!-- 表格列 -->
      <el-table-column type="selection" width="55"/>
      <!-- 标签名 -->
      <el-table-column align="center" label="分类名" prop="categoryName">
        <template #default="slotProp">
          <el-tag>
            {{ slotProp.row.categoryName }}
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
          <el-popconfirm style="margin-left: 1rem" title="确定删除吗？" @confirm="deleteTag(slotProp.row.id)">
            <template #reference>
              <el-button size="large" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :data="categorys" :ishide="false" next-svg="kaoyu" prev-svg="jitui"
                @pagination-results="paginationResultsEvnt"/>
    <!-- 批量删除对话框 -->
    <el-dialog v-model="isDelete" width="30%">
      <template #header>
        <i class="el-icon-warning" style="color: #ff9900"/>提示
      </template>
      <div style="font-size: 1rem">是否删除选中项？</div>
      <template #footer>
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="deleteTag(null)"> 确 定</el-button>
      </template>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog v-model="isViewAddOrEdit" width="30%">
      <div slot="title" class="dialog-title-container"/>
      <el-form :model="categoryForm" label-width="80px" size="small">
        <el-form-item label="分类名">
          <el-input v-model="categoryForm.categoryName" style="width: 220px"/>
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
import {inject, onBeforeMount, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {CategoryInterface} from "@/interface";
import {Pagination} from "@/components";

const reloadV = inject<any>('reload');

const isDelete = ref<boolean>(false)

// 加载状态
const loading = ref<boolean>(true)
// 编辑框
const isViewAddOrEdit = ref<boolean>(false)
const isAddOrEdit = ref<boolean>(false)
// 搜索输入框双向绑定
const searchInput = ref<string>('')

// 分类列表
const categorys = ref([])
// 接收数据
const data = ref()
// 批量分类id
const categoryIds = ref<any[]>([])

const categoryForm = reactive({
  id: null,
  categoryName: '',
})

onBeforeMount(() => {
  listCategory()
})

// 分页结果
const paginationResultsEvnt = (result: any) => {
  data.value = result
}
// 获取标签s列表
const listCategory = () => {
  api.categoryApi.getCategorys().then((res: AxiosResponse) => {
    const {data} = res.data
    if (!data) {
      ElMessage("获取分类列表失败")
    }
    categorys.value = data
    loading.value = false
  })
}

// 搜索Categorys
const SearchInputEvnt = () => {
  loading.value = true
  // 深拷贝
  if (searchInput.value.length !== 0) {
    data.value = categorys.value.filter((item: CategoryInterface) => {
      return item.categoryName.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())
    })
  } else {
    data.value = categorys.value
  }
  loading.value = false
}

// 编辑和新增共享
const openModel = (category: string | null) => {
  if (category != null) {
    isAddOrEdit.value = true
    categoryForm.id = JSON.parse(JSON.stringify(category)).id
    categoryForm.categoryName = JSON.parse(JSON.stringify(category)).categoryName
  } else {
    categoryForm.id = null
    categoryForm.categoryName = ''
    isAddOrEdit.value = false
  }
  isViewAddOrEdit.value = true
}

// 添加或编辑方法
const addOrEditTag = async () => {
  if (categoryForm.categoryName.trim() == '') {
    ElMessage.error('标签名不能为空')
    return false
  }
  try {
    await api.categoryApi.addOrEditCategorys(categoryForm).then((res: AxiosResponse) => {
      const {data} = res.data
      if (!data) {
        throw new Error(categoryForm.id !== '' ? '更新失败' : '添加失败')
      }
      ElMessage.success(categoryForm.id !== '' ? '更新成功' : '添加成功')
      categorys.value = data
    })
  } catch (error: any) {
    ElMessage.error(error)
  }
  isViewAddOrEdit.value = false
}


//  遍历多选
const selectionChange = (categorys: []) => {
  let arr: any[] = []
  categorys.forEach((item: any) => {
    arr.push(item.id);
  })
  categoryIds.value = arr
}

const deleteTag = async (id: number | null) => {
  let param = {};
  if (id == null) {
    param = {data: categoryIds.value}
  } else {
    param = {data: [id]}
  }
  try {
    await api.categoryApi.deleteCategorys(param).then((res: AxiosResponse) => {
      const {data} = res.data
      if (!data) {
        throw new Error('删除失败')
      }
      ElMessage.success('删除成功')
    })
  } catch (e: any) {
    ElMessage.error(e)
  } finally {
    listCategory()
    isDelete.value = false
  }
}
</script>

<style lang="scss" scoped>
.categorys-List-box {
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
