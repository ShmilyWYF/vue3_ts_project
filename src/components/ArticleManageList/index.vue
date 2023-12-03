<template>
  <el-table ref="tableRef" v-loading="loading" :cell-style="cellstyle" :data="data" border
            header-row-class-name="articleTable" row-class-name="articleTable" @selection-change="selectionChange">
    <el-table-column type="selection" width="55"/>
    <el-table-column :label="$t('backstage.articleTable.id')" prop="id" type="index" width="80"/>
    <el-table-column :label="$t('backstage.articleTable.articleCover')" prop="articleCover">
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
    <el-table-column :label="$t('backstage.articleTable.articleTitle')" prop="articleTitle">
      <template
          #default="slotProp:{row:{isEditPropertyShowTitle:boolean,inputTitle:string,id:string,articleTitle:string},$index:number}">
        <span v-if="slotProp.row.isEditPropertyShowTitle">
          <el-input v-model="slotProp.row.inputTitle"
                    @keyup.enter.native="updateProperty(slotProp.row.id,slotProp.row.inputTitle,'articleTitle',slotProp.$index)"/>
          <p>
            <el-button size='small'
                       @click="updateProperty(slotProp.row.id,slotProp.row.inputTitle,'articleTitle',slotProp.$index)">确定</el-button>
            <el-button size='small' @click="data[slotProp.$index].isEditPropertyShowTitle = false;">取消</el-button>
          </p>
        </span>
        <el-tooltip v-else effect="dark" content="双击编辑" placement="top-start">
          <p @dblclick="onTitleDbEvnt(slotProp)">
            {{ slotProp.row.articleTitle }}
          </p>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.isTop')" prop="isTop">
      <template #default="slotProp:{row:{id:number,isTop:number,isDelete:number,isloadingTop:boolean},$index:any}">
        <el-switch v-model="slotProp.row.isTop" :key="slotProp.row.id" :active-value="1"
                   :disabled="slotProp.row.isDelete == 1" :inactive-value="0" :loading="slotProp.row.isloadingTop"
                   @click="slotProp.row.isloadingTop=true;updateProperty(slotProp.row.id,slotProp.row.isTop,'isTop',slotProp.$index)"/>
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.isFeatured')" prop="isFeatured">
      <template
          #default="slotProp:{row:{id:number,isFeatured:number,isDelete:number,isloadingFeatured:boolean},$index:any}">
        <el-switch v-model="slotProp.row.isFeatured" :key="slotProp.row.id" :active-value="1"
                   :disabled="slotProp.row.isDelete == 1" :inactive-value="0" :loading="slotProp.row.isloadingFeatured"
                   @click="slotProp.row.isloadingFeatured=true;updateProperty(slotProp.row.id,slotProp.row.isFeatured,'isFeatured',slotProp.$index)"/>
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.author')" prop="author">
      <template #default="slotProp">
        <el-button link size="small" type="primary" @click="viewAuthor(slotProp.row.author)">
          查看作者
        </el-button>
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.categoryName')" prop="categoryName" width="100">
      <template
          #default="slotProp:{row:{isEditPropertyShowCategory:boolean,inputCategory:string,id:string,categoryName:string,isDelete:boolean,isloadingCategory},$index:number}">
        <el-popover :visible="slotProp.row.isEditPropertyShowCategory" placement="bottom" trigger="focus">
          <template #reference>
            <el-tag color="tab-tag" class="tooltiptext" effect="dark" style="float: none;"
                    disabled="slotProp.row.isDelete == 1" @dblclick="onCategoryDbEvnt(slotProp)">
              <el-tooltip effect="dark" content="双击编辑" placement="top">
                {{ slotProp.row.categoryName }}
              </el-tooltip>
            </el-tag>
          </template>
          <SearchCategory :model-value="slotProp.row.inputCategory" @update:modelValue="slotProp.row.inputCategory = ''"
                          @v-change="(value:any)=>{slotProp.row.inputCategory = value}">
            <template #default="slotCategory">
              <el-button size='small' type="success"
                         @click="addOrEditCategory(slotProp.row.inputCategory,slotProp.row.id,slotProp.$index)">确定
              </el-button>
              <el-button size='small' type="info" @click="data[slotProp.$index].isEditPropertyShowCategory = false;">
                取消
              </el-button>
            </template>
          </SearchCategory>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.tags')" prop="tags" width="180" @close="handleClose">
      <template #default="slotProp">
        <transition-group name="tags">
          <el-tag v-for="(item,key) in slotProp.row.tags" :key='key' :closable="!slotProp.row.isDelete == 1"
                  color="tab-tag" effect="dark"
                  style="margin: .1rem;"
                  @close="closeTagEvent({articleid:slotProp.row.id,tagid:item.id},slotProp.$index)">
            {{ item.tagName }}
          </el-tag>
        </transition-group>
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <el-button v-if="!slotProp.row.isDelete == 1" size="small" style="float: left;">
              +Tag
            </el-button>
          </template>
          <el-input
              ref="InputRef"
              v-model="inputTag"
              size="small"
              @keyup.enter.native="addArticleTagEvnt(slotProp.row.id,slotProp.$index)"
          />
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.status')" prop="status" width="80">
      <template #default="slotProp">
        <el-dropdown :disabled="slotProp.row.isDelete == 1">
          <span class="el-dropdown-link">
            <el-button :disabled="slotProp.row.isDelete == 1" type="primary" link>{{
                statusVoid(slotProp.row.status)
              }}</el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="slotProp.row.status !== 1"
                                @click="updateProperty(slotProp.row.id,1,'status',slotProp.$index)">
                公开
              </el-dropdown-item>
              <el-dropdown-item v-if="slotProp.row.status !== 2"
                                @click="updateProperty(slotProp.row.id,2,'status',slotProp.$index)">
                私密
              </el-dropdown-item>
              <el-dropdown-item v-if="slotProp.row.status !== 3"
                                @click="updateProperty(slotProp.row.id,3,'status',slotProp.$index)">
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

    <el-table-column :label="$t('backstage.articleTable.createTime')" prop="createTime" width="100">
      <template #default="slotProp">
        {{ new Date(slotProp.row.updateTime).toLocaleDateString() }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.updateTime')" prop="updateTime" width="100">
      <template #default="slotProp">
        {{ new Date(slotProp.row.updateTime).toLocaleDateString() }}
      </template>
    </el-table-column>
    <el-table-column :label="$t('backstage.articleTable.option')" fixed="right" width="180">
      <template #header="slotProp">
        <div style="display: flex;justify-content: flex-end;">
          <p style="flex: 1;">操作</p>
          <el-tooltip effect="dark" content="切换编辑" placement="top">
            <svg-icon name="expand" style="padding-right: 1rem;" @click="isExpandEdit = !isExpandEdit"/>
          </el-tooltip>
        </div>
      </template>
      <template #default="slotProp" style="display: flex;gap: 0.25rem">
        <div v-if="!slotProp.row.isDelete == 1">
          <transition name="fadeOption">
            <div v-if="!isExpandEdit">
              <router-link :to="'/Dashboard/mark/edit?id='+slotProp.row.id">
                <el-button :disabled="slotProp.row.isDelete == 1" type="primary">{{
                    $t('backstage.writing')
                  }}
                </el-button>
              </router-link>
              <el-popconfirm :title="$t('backstage.deleteDescription')" @confirm="deleteArticle(slotProp.row.id)">
                <template #reference>
                  <el-button type="danger">{{ $t('backstage.delete') }}</el-button>
                </template>
              </el-popconfirm>
            </div>
          </transition>
          <transition name="fadeOption">
            <el-button v-if="isExpandEdit" :disabled="slotProp.row.isDelete == 1" type="primary"
                       @click="emit('editCallback',slotProp.row)">{{ $t('backstage.edit') }}
            </el-button>
          </transition>
        </div>

        <el-popconfirm v-else :title="$t('backstage.withdrawalDescription')"
                       @confirm="withdrawalArticle(slotProp.row.id)">
          <template #reference>
            <el-button type="warning">{{ $t('backstage.withdrawal') }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>

    <template #append>
      <el-dialog v-model="iSviewAuthor" class="authordialog" title="作者信息">
        <el-card>
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
import {ElInput, ElMessage, ElNotification} from "element-plus";
import store from "@/store";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {ArticleInterface, UserInfoInterface} from "@/interface";
import {Pagination, SearchCategory, SvgIcon} from "@/components";

const reloadV = inject<any>('reload');
const props = defineProps<{ tableData: ArticleInterface[] | undefined, loading: boolean, articleIds: [] }>()

const emit = defineEmits(['switchCall', 'modifyArray', 'editCallback'])
const {tableData} = toRefs(props)
const data = ref()
const tableRef = ref<HTMLTableElement>()


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

const inputTag = ref<string>('')
const inputDisabled = ref<boolean>(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const isExpandEdit = ref<boolean>(false)

const onTitleDbEvnt = (slotProp: any): boolean => {
  if (slotProp.row.isDelete == 1) {
    return false
  }
  let key = slotProp.$index
  // 给对象添加新的属性
  data.value[key].isEditPropertyShowTitle = true;
  data.value[key].inputTitle = data.value[key].articleTitle
  return true
}
const onCategoryDbEvnt = (slotProp: any): boolean => {
  if (slotProp.row.isDelete == 1) {
    return false
  }
  let key = slotProp.$index
  // 给对象添加新的属性
  data.value[key].isEditPropertyShowCategory = true;
  data.value[key].inputCategory = data.value[key].categoryName
  return true
}

const handleClose = (tag: string) => {
}

const updateProperty = async (id: string | number, value: number | string | {} | [], attributeName: string, currHtmlIndex: number) => {
  // 是否存在编辑展示属性
  if (data.value[currHtmlIndex].hasOwnProperty('isEditPropertyShow')) {
    // 关闭编辑框
    data.value[currHtmlIndex].isEditPropertyShow = false;
  }
  // 排除
  let exclude = ['isTop', 'isFeatured']
  if (!exclude.includes(attributeName)) {
    // 判断是否进行了修改
    if (value == data.value[currHtmlIndex][attributeName]) {
      ElNotification({
        title: '通知',
        message: '没有任何更改~',
        type: 'warning'
      })
      return
    }
  }
  await store.dispatch('articleStore/updateArticleAttributeById', {id, value, attributeName}).then(res => {
    data.value[currHtmlIndex] = res
    ElNotification({
      title: '通知',
      message: '更新成功',
      type: 'success'
    })
  }, (e => {
    ElNotification({
      title: '通知',
      message: e,
      type: 'error'
    })
  }))
  // 是否存在加载属性
  if (data.value[currHtmlIndex].hasOwnProperty('isloadingTop' || 'isloadingFeatured')) {
    // 关闭加载
    data.value[currHtmlIndex].isloadingTop = false;
    data.value[currHtmlIndex].isloadingFeatured = false;
  }
}

const selectionChange = (Ids: []) => {
  let arr: any[] = []
  Ids.forEach((item: any) => {
    arr.push(item.id);
  })
  emit('modifyArray', arr)
}
const addOrEditCategory = async (categoryName: string, id: number | string, index: number) => {
  if (categoryName == '' || categoryName.length == 0) {
    ElNotification({
      title: '通知',
      message: '请输入分类名~',
      type: 'warning'
    })
    return
  }
  if (categoryName == data.value[index].categoryName) {
    ElNotification({
      title: '通知',
      message: '没有任何更改~',
      type: 'warning'
    })
    return
  }
  try {
    api.articleApi.updateCategorytoArticle({categoryName: categoryName, id: id}).then((res: AxiosResponse) => {
      const categoryName = res.data
      if (!data) {
        throw new Error('修改出错')
      }
      data.value[index].categoryName = categoryName.data
    })
    ElMessage.success('修改成功')
    data.value[index].isEditPropertyShowCategory = false
  } catch (e: any) {
    ElMessage.error(e)
  }
}

const addArticleTagEvnt = async (id: number, index: number) => {
  if (inputTag.value !== '' && inputTag.value !== null) {

    inputDisabled.value = true
    try {
      api.articleApi.addTagstoArticle({tagName: inputTag.value, id: id}).then((res: AxiosResponse) => {
        const tags = res.data
        if (!tags) {
          throw new Error('文章已存在该标签')
        }
        data.value[index].tags = tags.data
        ElNotification({
          title: '通知',
          message: '添加标签成功',
          type: 'success'
        })
      })
    } catch (e: any) {
      ElMessage.error(e)
    }
    inputTag.value = ''
    inputDisabled.value = false
    // reloadV()
  } else {
    ElNotification({
      title: '通知',
      message: '请输入要添加的标签',
      type: 'warning'
    })
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

const closeTagEvent = (parameters: { articleid: string, tagid: number }, index: number) => {
  try {
    if (data.value[index].tags.length == 1) {
      ElNotification({
        title: '通知',
        message: '最后一条标签无法删除',
        type: 'warning'
      })
      return
    }
    api.articleApi.deleteTagById(parameters).then((res: any) => {
      const tags = res.data
      if (!tags) {
        throw new Error('标签删除出错')
      }
      data.value[index].tags = tags.data
      ElNotification({
        title: '通知',
        message: '清除一条标签',
        type: 'success'
      })
    })
  } catch (e: any) {
    ElNotification({
      title: '通知',
      message: e,
      type: 'error'
    })
  }
}

const paginationResultsEvnt = (result: any) => {
  data.value = result
}

// 修改x行的样式
const cellstyle = ({row, column, rowIndex, columnIndex}: any) => {
  if (columnIndex === 7) {
    return {}
  } else {
    return {}
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


.fadeOption-enter-active {
  animation: axisX 1.5s reverse;
}

.fadeOption-leave-active {
  animation: axisX 1.5s;
}

@keyframes axisX {
  0% {
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
