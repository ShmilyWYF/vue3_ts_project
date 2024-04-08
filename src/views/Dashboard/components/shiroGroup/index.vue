<script setup lang="ts">
import {nextTick, onBeforeMount, reactive, ref, toRaw} from "vue";
import {shiro} from "@/views/Dashboard/components";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {ElNotification, FormInstance, FormRules} from "element-plus";

const initData = ref<{ id: number, shiroGroupName: string, groupCount: any[] }[]>([])

const cellStyle = ({row, column, rowIndex, columnIndex}: any) => {
  if (columnIndex === 0) {
    return {'float': 'left'}
  }
}

const formRef = ref<FormInstance>()
const shiroRef = ref()

const isShow = ref(false)
const isAddOrEdit = ref(0)
const isLoading = ref(true)
const shiroGroupData = reactive({
  id: 0,
  shiroGroupName: '',
  groupTree: []
})

onBeforeMount(() => {
  getGroup()
})

const valiTree = (rule: any, value: any, callback: any) => {
  if (value == undefined) {
    callback(new Error('至少选中一项'))
  }
  callback()
}

const rules = reactive<FormRules<{ shiroGroupName: string, groupTree: {}[] }>>({
  shiroGroupName: [{required: true, message: '必填项', trigger: 'blur'}, {min: 3, max: 28, message: '字符范围5-28', trigger: 'blur'}],
  groupTree: [{required: true, message: '必填项', trigger: 'blur'}, {validator: valiTree, trigger: 'blur'},]
})

const model = async (row: any = undefined) => {
  isShow.value = true;
  isAddOrEdit.value = 0
  if (row) {
    isAddOrEdit.value = 1
    let raw = toRaw(row);
    await nextTick(() => {
      Object.assign(shiroGroupData, raw)
      shiroRef.value.setCheckedKeys(raw.groupTree)
    })
  }
}

const closeEvent = () => {
  isShow.value = false;
  shiroRef.value.resetChecked()
  formRef.value!.resetFields();
  shiroGroupData.shiroGroupName = ''
  shiroGroupData.groupTree = []
}

// 新增
const addOrUpdateShiroGroup = async () => {
  await formRef.value?.validate((bl: boolean) => {
    if (bl) {
      api.menuApi[isAddOrEdit.value != 0 ? 'updateGroupMenu' : 'addGroupMenu'](shiroGroupData).then(({data: {message}}: AxiosResponse) => {
        ElNotification.info(message)
        closeEvent()
        getGroup()
      })
    } else {
      ElNotification.error("有必填项,请检查")
    }
  })
}

const removeGroup = (id: number) => {
  api.menuApi.removeGroupMenu({id: id}).then(({data: {message}}: AxiosResponse) => {
    ElNotification.info(message)
    getGroup()
  })
}

const getGroup = () => {
  api.menuApi.getGroupMenu().then(({data: {message, data}}: AxiosResponse) => {
    initData.value = data
    ElNotification.info(message)
    isLoading.value = false
  })
}

</script>

<template>
  <div>
    <el-button @click="model()">add</el-button>
    <el-table :data="initData" header-row-class-name="el-table-box" row-class-name="el-table-box"
              :cell-style="cellStyle" v-loading="isLoading">
      <el-table-column prop="shiroGroupName" label="权限组名"/>
      <el-table-column prop="groupCount" label="组用户数量" width="120"/>
      <el-table-column label="操作" width="200" #default="slot:{row:{id:number}}">
        <el-button @click="model(slot.row)">编辑</el-button>
        <el-popconfirm title="确定要删除此权限组吗？" @confirm="removeGroup(slot.row.id)">
          <template #reference>
            <el-button>删除</el-button>
          </template>
        </el-popconfirm>
      </el-table-column>
    </el-table>
    <el-dialog v-model="isShow" width="fit-content">
      <div>
        <el-form :model="shiroGroupData" label-width="6rem" ref="formRef" :rules="rules">
          <el-form-item label="分组名:" prop="shiroGroupName">
            <el-input type="text" placeholder="输入权限分组名" v-model="shiroGroupData.shiroGroupName"/>
          </el-form-item>
          <el-form-item label="权限列表:" prop="groupTree">
            <el-card>
              <template #default>
                <shiro v-model="shiroGroupData.groupTree" ref="shiroRef" :is-hidd-rest-btn="true"/>
              </template>
            </el-card>
          </el-form-item>
        </el-form>
        <el-button type="info" link @click="addOrUpdateShiroGroup">提交</el-button>
        <el-button type="info" link @click="closeEvent">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-table-box) {
  th, div {
    text-align: center;
  }

  td {
    text-align: center;
  }
}
</style>
