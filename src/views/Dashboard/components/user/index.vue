<template>
  <div class="user-List-box">
    <div class="option-box">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-button>查看状态:{{ currStatus }}-{{ data ? data.length : users.length }}</el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="viewStatus('null')">全部</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('1')">已禁用</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('0')">正常</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('2')">管理员</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('3')">普通用户</el-dropdown-item>
            <el-dropdown-item @click="viewStatus('4')">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button size="small" type="primary" @click="openModel()">新增</el-button>
      <el-button :disabled="userIds.length === 0" size="small" type="danger" @click="isDelete = true">
        {{ currStatus == '删除' ? '批量恢复' : '批量删除' }}
      </el-button>
      <el-button :disabled="userIds.length === 0" v-if="!['全部','管理员','普通用户'].includes(currStatus)" size="small"
                 type="danger" @click="isDisable = true">
        {{ currStatus == '正常' ? '批量禁用' : '批量解除' }}
      </el-button>
      <el-input v-model="searchInput" placeholder="输入用户名或邮箱" @input="SearchInputEvnt"/>
      <el-checkbox v-model="allCheck" @change="allCheckEvent(data)">全选所有</el-checkbox>
    </div>
    <!-- 表格展示 -->
    <el-table v-loading="loading" ref="multipleTable" :data="data" border @selection-change="selectionChange"
              :row-key="getRowKeys">
      <!-- 表格列 -->
      <el-table-column type="selection" width="55" :selectable="checkSelectable" reserve-selection/>
      <!-- 用户头像 -->
      <el-table-column label="头像" prop="avatar">
        <template #default="slotProp">
          <el-image
              :preview-src-list="[String(slotProp.row.avatar)]"
              :preview-teleported="true"
              :src="slotProp.row.avatar"
              fit="cover"
              style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <!-- 邮箱 -->
      <el-table-column align="center" label="邮箱" prop="email"/>
      <!-- 用户名 -->
      <el-table-column align="center" label="用户名" prop="nickname"/>
      <!-- 密码 -->
      <!--      <el-table-column align="center" label="密码" prop="password"/>-->
      <!-- 用户类型 -->
      <el-table-column align="center" label="用户类型" prop="type">
        <template #default="slotProp">
          <span>{{ slotProp.row.type === 1 ? '管理员' : '普通用户' }}</span>
        </template>
      </el-table-column>
      <!-- 网址 -->
      <el-table-column align="center" label="网址" prop="website"/>
      <!-- 简介 -->
      <el-table-column align="center" label="简介" prop="intro"/>
      <!-- 订阅 -->
      <el-table-column align="center" label="订阅" prop="isSubscribe">
        <template #default="slotProp">
          <span>{{ slotProp.row.isSubscribe !== 1 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <!-- 禁用 -->
      <el-table-column align="center" label="禁用" prop="isDisable">
        <template #default="slotProp">
          <span>{{ slotProp.row.isDisable !== 1 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <!-- 订阅 -->
      <el-table-column align="center" label="删除" prop="isDelete">
        <template #default="slotProp">
          <span>{{ slotProp.row.isDelete !== 1 ? '否' : '是' }}</span>
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column align="center" label="创建时间" prop="createTime"/>
      <!-- 更新时间 -->
      <el-table-column align="center" label="更新时间" prop="updateTime"/>
      <!-- 最后登录时间 -->
      <el-table-column align="center" label="最后登录时间" prop="last_login_time"/>
      <!-- 列操作 -->
      <el-table-column align="center" label="操作" width="200">
        <template #default="slotProp">
          <div v-if="slotProp.row.isDisable != 1&&slotProp.row.isDelete != 1">
            <el-button size="large" type="primary" @click="openModel(slotProp.row)">编辑</el-button>
            <el-button size="large" type="warning" @click="UpdatePropertyUserById(slotProp.row.id,'disable')">禁用
            </el-button>
          </div>
          <div v-else>
            <div v-if="slotProp.row.isDelete != 1">
              <el-button size="large" type="warning" @click="UpdatePropertyUserById(slotProp.row.id,'undisable')">解禁
              </el-button>
              <el-popconfirm style="margin-left: 1rem" title="确定删除吗？"
                             @confirm="UpdatePropertyUserById(slotProp.row.id,'remove')">
                <template #reference>
                  <el-button size="large" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
            <el-popconfirm v-else style="margin-left: 1rem" title="确定恢复吗？"
                           @confirm="UpdatePropertyUserById(slotProp.row.id,'recovery')">
              <template #reference>
                <el-button size="large" type="danger">恢复用户</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination :data="users" :ishide="false" next-svg="kaoyu" prev-svg="jitui"
                @pagination-results="paginationResultsEvnt"/>
    <!-- 批量删除对话框 -->
    <el-dialog v-model="isDelete" width="30%">
      <template #header>
        <i class="el-icon-warning" style="color: #ff9900"/>提示
      </template>
      <div style="font-size: 1rem">是否{{ currStatus == '删除' ? '恢复' : '删除' }}选中项？</div>
      <template #footer>
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="UpdatePropertyUserById(null,currStatus == '删除'?'remove':'recovery')"> 确
          定
        </el-button>
      </template>
    </el-dialog>
    <!--批量禁用或解除-->
    <el-dialog v-model="isDisable" width="30%">
      <template #header>
        <i class="el-icon-warning" style="color: #ff9900"/>提示
      </template>
      <div style="font-size: 1rem">是否{{ currStatus == '正常' ? '禁用' : '解禁' }}选中项？</div>
      <template #footer>
        <el-button @click="isDisable = false">取 消</el-button>
        <el-button type="primary" @click="UpdatePropertyUserById(null,currStatus == '正常'?'disable':'undisable')"> 确
          定
        </el-button>
      </template>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog v-model="isEditView" width="" class="dialog-box" @close="Object.assign(userForm, state())">
        <UserFrom :from-data="userForm" :is-edit-or-preview="currViewStatus" @update-call="listUser"
                  @update-edit-or-add="(args)=>currViewStatus = args" :add-or-edit-type="addOrEdit">
          <template #content="slotProp">
            <!--超级管理员显示管理员设置-->
            <el-form-item v-if="store.getters.userinfo.type === 999"
                          label="是否为管理员" prop="isSubscribe">
              <el-radio-group v-model="slotProp.row.type">
                <el-radio :label="1">否</el-radio>
                <el-radio :label="2">是</el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
        </UserFrom>
      <shiro v-show="shiroShow" v-model="menuRoleFrom.menuTree" ref="shiroRef">
        <template #header>
          <el-select
              v-model="menuRoleFrom.treeName"
              placeholder="权限组"
              value-key="id"
              remote-show-suffix
          >
            <el-option v-for="value in userShiroGroupList" :key="value.id" :label="value.shiroGroupName"
                       :value="value.shiroGroupName" @click="shiroRef.setCheckedKeys(value.groupTree);"/>
          </el-select>
        </template>
        <template #append>
          <el-button @click="setUserShiro(userForm.id,menuRoleFrom.menuTree)">修改权限</el-button>
        </template>
      </shiro>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, reactive, ref} from "vue";
import {ElNotification} from "element-plus";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {UserInfointerface} from "@/interface";
import {Pagination, SvgIcon, UserFrom} from "@/components";
import store from "@/store";
import {shiro} from "@/views/Dashboard/components";

const isDelete = ref<boolean>(false)
const isDisable = ref<boolean>(false)
// 加载状态
const loading = ref<boolean>(true)
// 编辑框
const isEditView = ref<boolean>(false)
// 当前视图状态 添加还是编辑
const currViewStatus = ref<number>(0)
// 编辑or新增
const addOrEdit = ref<number>(0)
// 搜索输入框双向绑定
const searchInput = ref<string>('')
// 当前查看状态
const currStatus = ref<string>('全部')
// user列表
const users = ref([])
// 接收数据
const data = ref()
// 批量id
const userIds = ref<any[]>([])
// 绑定表格
const multipleTable = ref()
// 全选按钮
const allCheck = ref<boolean>(false)
// 用户编辑表单
const state = (): UserInfointerface => ({
  avatar: "",
  createTime: new Date(),
  email: "",
  id: 0,
  intro: "",
  isDisable: 0,
  isDelete: 0,
  isSubscribe: 0,
  last_login_time: new Date(),
  nickname: "",
  password: "",
  type: 1,
  updateTime: new Date(),
  website: ""
})
const userForm = reactive<UserInfointerface>(state())
// 权限表组件Ref
const shiroRef = ref()
// 用户权限 接收
const menuRoleFrom = reactive<{treeName:string,menuTree:[]}>({
  treeName: '',
  menuTree: [],
})
// 用户权限组远程搜索结果接收
const userShiroGroupList = ref<{ id: number, shiroGroupName: string, groupTree: [] }[]>()
// 加载状态控制
const shiroShow = ref(false)
onBeforeMount(() => {
  listUser()
})

// 获取用户路由
const getUserShiro = async (id:number) => {
  await api.menuApi.getUserRoles({id:id}).then((res:AxiosResponse)=>{
    const roles = <{data:[]}>res.data
    menuRoleFrom.menuTree = <[]>roles.data
    shiroRef.value.setCheckedKeys(menuRoleFrom.menuTree)
  })
}

// 设置用户权限
const setUserShiro = async (id: number, shiro: []) => {
  let shiroId = shiro.map((i: { id: number }) => i.id);
  const param = {id: id, shiroGroupId: shiroId}
  // updateUserRoles
  await api.menuApi.updateUserRoles(param).then(({data: {message}}: AxiosResponse) => {
    ElNotification.info(message)
  })
}

// 设置选择框可选择条件
const checkSelectable = (row: any) => {
  if (currStatus.value == '全部') {
    return row.isDisable === 3
  }
  if (currStatus.value == '已禁用') {
    return row.isDisable == 1
  }
  if (currStatus.value == '正常') {
    return row.isDisable == 0
  }
}

// 全选事件
const getRowKeys = (row: any) => {
  return row.id
}

const allCheckEvent = (data: {}[]) => {
  // 禁用默认的全选框
  let el = multipleTable.value.$el.children[0];
  if (allCheck.value) {
    el.children[1].children[0].children[1].children[0].children[0].children[0].children[0].style.visibility = `hidden`
    data.forEach((row: any) => {
      multipleTable.value.toggleRowSelection(row, true)
    })
  } else {
    el.children[1].children[0].children[1].children[0].children[0].children[0].children[0].style.visibility = `visible`
    multipleTable.value.clearSelection()
  }
}

// 分页结果
const paginationResultsEvnt = (result: any) => {
  data.value = result
}

// 根据状态查看数据列表
const viewStatus = (status: string) => {
  if (status != 'null') {
    switch (status) {
      case '0':
        currStatus.value = '正常';
        data.value = users.value.filter((item: {
          isDisable: number,
          isDelete: number
        }) => item.isDelete !== 1 && item.isDisable !== 1);
        break;
      case '1':
        currStatus.value = '已禁用';
        data.value = users.value.filter((item: {
          isDisable: number,
          isDelete: number
        }) => item.isDelete !== 1 && item.isDisable === 1);
        break;
      case '2':
        currStatus.value = '管理员';
        data.value = users.value.filter((item: {
          type: number,
          isDelete: number
        }) => item.isDelete !== 1 && item.type === 1);
        break;
      case '3':
        currStatus.value = '普通用户';
        data.value = users.value.filter((item: {
          type: number,
          isDelete: number
        }) => item.isDelete !== 1 && item.type === 0);
        break;
      case '4':
        currStatus.value = '删除';
        data.value = users.value.filter((item: { isDelete: number }) => item.isDelete !== 0);
        return;
    }
  } else {
    currStatus.value = '全部'
  }
  searchInput.value = ''
  if (status == 'null') {
    listUser()
    return
  }
}

// 按Id禁用用户
const UpdatePropertyUserById = async (id: number | null, property: string) => {
  let param: {};
  if (id == null) {
    param = {id: userIds.value}
  } else {
    param = {id: id}
  }
  await api.userApi[property](param).then((res: AxiosResponse) => {
    const {type, message} = res.data
    ElNotification({message: message, type: type})
    listUser()
    isDisable.value = false
  })
}

// 获取users列表
const listUser = (Parameters?: any) => {
  try {
    api.userApi.getAlluser(Parameters).then((res: AxiosResponse) => {
      const {data, code, message} = res.data
      if (code !== 200) {
        throw new Error(message)
      }
      users.value = data
      loading.value = false
    })
  } catch (e: any) {
    ElNotification.error(e)
  }
}

// 搜索user
const SearchInputEvnt = () => {
  loading.value = true
  if (searchInput.value.length !== 0) {
    data.value = users.value.filter((item: UserInfointerface) => {
      return item.email.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase()) || item.nickname.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase())
    })
  } else {
    data.value = users.value
  }
  loading.value = false
}

// 编辑
const openModel = async (user?: UserInfointerface) => {
  // 展开视图
  isEditView.value = true
  // 判断是编辑还是添加
  if(user != undefined){
    // 编辑状态
    currViewStatus.value = 1;
    addOrEdit.value = 1;
    Object.assign(userForm, user)
    if (user.type != 1){
      // 获取权限树
      await api.menuApi.getGroupMenu().then(({data: {data}}: AxiosResponse) => {
        userShiroGroupList.value = data
      })
      // 当前用户是否为管理员，显示权限视图树
      shiroShow.value = true
      // 设置权限视图
      await getUserShiro(<number>user?.id)
    }else {
      shiroShow.value = false
    }
  }else {
    // 添加
    currViewStatus.value = 0;
    addOrEdit.value = 0;
    shiroShow.value = false
    Object.assign(userForm, state())
  }
}

//  遍历多选
const selectionChange = (users: []) => {
  let arr: any[] = []
  users.forEach((item: any) => {
    arr.push(item.id);
  })
  userIds.value = arr
}
</script>

<style lang="scss" scoped>
.user-List-box {
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

  :deep(.dialog-box) {
    width: fit-content;
    border-radius: .375rem;
    @include background_color('background-color');

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      display: flex;
      flex-direction: row;

      .shiro,.userFrom {
        width: 300px;
      }
    }
  }
}

.circular {
  display: inline;
  height: 30px;
  width: 30px;
  animation: loading-rotate 2s linear infinite;
}

.path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: var(--el-color-primary);
  stroke-linecap: round;
}
</style>
