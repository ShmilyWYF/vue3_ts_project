<template>
  <div class="login-drop">
    <el-button v-if="!isLoginState" text @click="dialogFormVisible = true">
      登陆
    </el-button>
    <el-dropdown v-else>
      <el-avatar :size="35" :src="userinfo.avatar"/>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="UserDialogFormVisible = true">个人中心</el-dropdown-item>
          <el-dropdown-item @click="userExit">退出</el-dropdown-item>
          <el-dropdown-item v-if="userinfo.type != 1" @click="switchPageEvnt">
            {{ status ? '后台管理' : 'blog' }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog v-model="dialogFormVisible" :lock-scroll="false" title="登陆" class="login-box">
      <Login @dialogCall="dialogcall"/>
    </el-dialog>
    <el-dialog v-model="UserDialogFormVisible" :lock-scroll="false" title="个人中心" class="personal-center-box">
      <UserFrom :from-data="userinfo" :is-edit-or-preview="isEditorAdd" @update-edit-or-add="(args)=>isEditorAdd = args" add-or-edit-type="1"/>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 登陆对话弹窗
import {Login, UserFrom} from "@/components";
import {computed, ref, toRefs} from "vue";
import {getCookie} from "@/utils/cookie";
import store from "@/store";
import {AxiosResponse} from "axios";
import api from "@/axios";
import {ElMessage} from "element-plus";
import {UserInfointerface} from "@/interface";
import router from "@/router";

const props = defineProps<{ status: boolean }>()
const {status} = toRefs(props)

// 登陆弹窗
const dialogFormVisible = ref<boolean>(false)
// 用户个人中心对话弹窗
const UserDialogFormVisible = ref<boolean>(false)
// 控制状态栏组件
const isLoginState = ref<any>(getCookie())
// 储存用户信息 为0就是管理员
const userinfo = computed(() => store.getters.userinfo)
// 个人中心控制
const isEditorAdd = ref<number>(1)
/**
 * @author WangYaFeng
 * @date 2023/10/31 3:05
 * @description login组件登陆回调事件，切换展示组件,对if组件状态进行本地缓存
 * @return null
 */
const dialogcall = () => {
  dialogFormVisible.value = !dialogFormVisible.value
  isLoginState.value = !isLoginState.value
  api.userApi.getInfo().then((res: AxiosResponse) => {
    const {data, code, message, type}: { data: UserInfointerface, code: number, message: string, type: any } = res.data;
    ElMessage({message: message, type: type})
    if (code == 200) {
      store.commit('userStore/SET_USER_INFO', data)
    }
  })
}

// 退出当前账户
const userExit = () => {
  store.dispatch('userStore/logout', getCookie()).then((message) => {
    ElMessage.success(message)
    isLoginState.value = false
    localStorage.setItem('isLoginState', String(isLoginState.value))
    router.push({path: '/'})
  }, (error: Error) => {
    ElMessage.success(error.message)
  })
}

// 切换前后台
const switchPageEvnt = () => {
  if (status.value) {
    router.push({path: '/Dashboard'})
  } else {
    router.push({path: '/'})
  }
}
</script>

<style lang="scss" scoped>
.login-drop {

  :deep(.login-box) {
    width: 25%;
    border-radius: 1rem;
  }

  .personal-center-box {
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include font_color('text-color');
    @include background_color('background-primary');

    .el-dialog__header {
      .el-dialog__title {
        color: inherit;
      }
    }

    .el-dialog__body {
      width: calc(100% - 40px);
    }
  }

}
</style>
