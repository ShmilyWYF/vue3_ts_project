<template>
  <el-table v-loading="loading" :cell-style="cellstyle" :data="data" border header-row-class-name="articleTable"
            row-class-name="articleTable" @selection-change="selectionChange">
    <el-table-column type="selection" width="55"/>
    <el-table-column label="序号" prop="id" type="index" width="80"/>
    <el-table-column label="略缩图" prop="articleCover">
      <template #default="slotProp">
        <el-image
            :preview-src-list="[String(slotProp.row.articleCover)]"
            :preview-teleported="true"
            :src="slotProp.row.articleCover"
            fit="cover"
            style="width: 100px; height: 100px"
        />
      </template>
    </el-table-column>
    <el-table-column label="标题" prop="articleTitle"/>
    <el-table-column label="置顶" prop="isTop">
      <template #default="slotProp">
        <el-switch v-model="slotProp.row.isTop" :key="slotProp.row.id" :active-value="1" :disabled="slotProp.row.isDelete == 1"
                   :inactive-value="0" :loading="toploading"
                   @change="toploading = true" @click="updateProperty(slotProp.row.id,slotProp.row.isTop,'isTop')"/>
      </template>
    </el-table-column>
    <el-table-column label="推荐" prop="isFeatured">
      <template #default="slotProp">
        <el-switch v-model="slotProp.row.isFeatured" :key="slotProp.row.id" :active-value="1" :disabled="slotProp.row.isDelete == 1"
                   :inactive-value="0"
                   :loading="featuredloading" @change="featuredloading = true" @click="updateProperty(slotProp.row.id,slotProp.row.isFeatured,'isFeatured')"/>
      </template>
    </el-table-column>
    <el-table-column label="作者" prop="author">
      <template #default="slotProp">
        <el-button link size="small" type="primary" @click="viewAuthor(slotProp.row.author)">
          查看作者
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="分类" prop="categoryName" width="100">
      <template #default="slotProp">
        <el-tag :disabled="slotProp.row.isDelete == 1" color="tab-tag" effect="dark">
          {{ slotProp.row.categoryName }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="标签" prop="tags" width="180" @close="handleClose">
      <template #default="slotProp">
        <el-tag v-for="(item,key) in slotProp.row.tags" :key='key' :closable="!slotProp.row.isDelete == 1" color="tab-tag" effect="dark"
                style="margin: .1rem;"
                @close="closeTagEvent({articleid:slotProp.row.id,tagid:item.id})">
          {{ item.tagName }}
        </el-tag>
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <el-button v-if="!slotProp.row.isDelete == 1" size="small" style="float: left;">
              +Tag
            </el-button>
          </template>
          <el-input
              ref="InputRef"
              v-model="inputValue"
              size="small"
              @keyup.enter.native="addArticleTagEvnt(slotProp.row.id)"
          />
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="状态" prop="status" width="80">
      <template #default="slotProp">
        <el-dropdown :disabled="slotProp.row.isDelete == 1">
          <span class="el-dropdown-link">
            <el-button :disabled="slotProp.row.isDelete == 1">{{ statusVoid(slotProp.row.status) }}</el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="slotProp.row.status !== 1" @click="updateProperty(slotProp.row.id,1,'status')">
                公开
              </el-dropdown-item>
              <el-dropdown-item v-if="slotProp.row.status !== 2" @click="updateProperty(slotProp.row.id,2,'status')">
                私密
              </el-dropdown-item>
              <el-dropdown-item v-if="slotProp.row.status !== 3" @click="updateProperty(slotProp.row.id,3,'status')">
                草稿
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>

    <!--    <el-table-column prop="viewsCount" label="浏览量" width="80">-->
    <!--      <template #default="slotProp">-->
    <!--        <span>{{slotProp.viewsCount}}</span>-->
    <!--      </template>-->
    <!--    </el-table-column>-->

    <el-table-column label="文章发布时间" prop="createTime" width="100">
      <template #default="slotProp">
        {{ new Date(slotProp.row.updateTime).toLocaleDateString() }}
      </template>
    </el-table-column>
    <el-table-column label="更新时间" prop="updateTime" width="100">
      <template #default="slotProp">
        {{ new Date(slotProp.row.updateTime).toLocaleDateString() }}
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="180">
      <template #default="slotProp" style="display: flex;gap: 0.25rem">
        <router-link v-if="!slotProp.row.isDelete == 1" :to="'/Dashboard/mark/edit?id='+slotProp.row.id">
          <el-button :disabled="slotProp.row.isDelete == 1">Edit</el-button>
        </router-link>
        <el-popconfirm v-if="!slotProp.row.isDelete == 1" title="Are you sure to delete this?"
                       @confirm="deleteArticle(slotProp.row.id)">
          <template #reference>
            <el-button>Delete</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm v-else title="Are you sure to withdrawal this?" @confirm="withdrawalArticle(slotProp.row.id)">
          <template #reference>
            <el-button>withdrawal</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>

    <template #append>
      <el-dialog v-model="iSviewAuthor" class="authordialog" title="作者信息">
        <el-card class="box-card">
          <template #header>
            <span>
              <el-avatar :size="50" :src="authorinfo.avatar"/>
              {{ authorinfo.nickname }}
            </span>
            <p>邮箱：{{ authorinfo.email }}</p>
            <p>网址：{{ authorinfo.website }}</p>
          </template>
          <template #default>
            <span>简介：</span>
            <p>{{ authorinfo.intro }}</p>
          </template>
        </el-card>
      </el-dialog>
    </template>
  </el-table>
  <Pagination :data="tableData" :ishide="false" next-svg="kaoyu" prev-svg="jitui"
              @pagination-results="paginationResultsEvnt"/>
</template>

<script lang="ts" setup>
import {inject, reactive, ref, toRefs} from "vue";
import {ElInput, ElMessage} from "element-plus";
import store from "@/store";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {ArticleInterface, UserInfoInterface} from "@/interface";
import {Pagination} from "@/components";

const reloadV = inject<any>('reload');
const props = defineProps<{ tableData: ArticleInterface[] | undefined, loading: boolean, articleIds: [] }>()

const emit = defineEmits(['switchCall', 'modifyArray'])
const {tableData} = toRefs(props)
const data = ref()

const {articleIds} = toRefs(props)
const iSviewAuthor = ref(false);
const authorinfo = reactive({
  avatar: '',
  nickname: '',
  email: '',
  website: '',
  intro: '',
})
const viewAuthor = (author: UserInfoInterface) => {
  iSviewAuthor.value = true
  authorinfo.nickname = author.nickname
  authorinfo.avatar = author.avatar
  authorinfo.email = author.email
  authorinfo.intro = author.intro
  authorinfo.website = author.website
}

const statusVoid = (status: number) => {
  switch (status) {
    case 0:
      return '删除'
    case 1:
      return '公开'
    case 2:
      return '私有'
    case 3:
      return '草稿'
  }
}

const inputValue = ref<string>('')
const inputDisabled = ref<boolean>(false)
const InputRef = ref<InstanceType<typeof ElInput>>()


const handleClose = (tag: string) => {
}

const updateProperty = async (id: string, value: number, attributeName: string) => {
  try {
    await store.dispatch('articleStore/updateArticleAttributeById', {id, value, attributeName}).then(res => {
      ElMessage.success('更新成功')
      reloadV()
    }, (e: any) => {
      ElMessage.error(e)
      throw new Error(e)
    })
  } catch (e: any) {
    console.error(e)
  } finally {
    toploading.value = false
    featuredloading.value = false
  }
}

const toploading = ref(false)
const featuredloading = ref(false)

const selectionChange = (Ids: []) => {
  let arr: any[] = []
  Ids.forEach((item: any) => {
    arr.push(item.id);
  })
  emit('modifyArray', arr)
}

const addArticleTagEvnt = async (id: number) => {
  if (inputValue.value !== '' && inputValue.value !== null) {
    inputDisabled.value = true
    try {
      api.articleApi.addTagstoArticle({categoryName: inputValue.value, id: id}).then((res: AxiosResponse) => {
        const {data} = res.data
        if (!data) {
          throw new Error('文章已存在该标签')
        }
        ElMessage.success('添加成功')
      })
    } catch (e: any) {
      ElMessage.error(e)
    }
    inputValue.value = ''
    inputDisabled.value = false
    reloadV()
  } else {
    ElMessage.error("请输入要添加的标签")
  }
}

const deleteArticle = (id: number) => {
  api.articleApi.deleteArticle([id]).then((res: AxiosResponse) => {
    const {data} = res.data
    if (!data) {
      ElMessage.success("删除失败")
    } else {
      ElMessage.success("删除成功")
      reloadV()
    }
  })
}

const withdrawalArticle = async (id: string) => {
  api.articleApi.withdrawalArticle(id).then((res: AxiosResponse) => {
    const {data} = res.data
    if (!data) {
      ElMessage.success("撤回失败")
    } else {
      ElMessage.success("撤回成功，请在草稿中查看")
      reloadV()
    }
  })
}

const closeTagEvent = (parameters: { articleid: string, tagid: number }) => {
  api.articleApi.deleteTagById(parameters).then((res: any) => {
    const {data} = res.data
    emit('switchCall', data)
  })
}

const paginationResultsEvnt = (result: any) => {
  data.value = result
}

// 修改11行的样式
const cellstyle = ({row, column, rowIndex, columnIndex}: any) => {
  if (columnIndex === 11) {
    return ''
  } else {
    return ''
  }
}
</script>


<style lang="scss" scoped>
.el-table {
  flex: 1;
  @include box_shadow('box-card-shadow-tabs');

  .el-button {
    margin: .25rem;
  }
}

:deep(.articleTable) {
  th, td {
    div {
      text-align: center;
    }
  }

  .el-tag {
    text-align: left;
    float: left;
  }
}

:deep(.authordialog) {
  width: 20rem;

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
</style>
