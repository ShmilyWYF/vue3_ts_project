<template>
  <el-card>
    <template #default>
      <!-- 登录表单 -->
      <el-form ref="loginRef" :model="loginForm" :rules="rules" status-icon>
        <!-- 用户名输入框 -->
        <el-form-item prop="username">
          <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              prefix-icon="el-icon-user-solid"
              @keyup.enter.native="login"/>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
              v-model="loginForm.password"
              placeholder="密码"
              prefix-icon="el-icon-user-solid"
              show-password
              @keyup.enter.native="login"/>
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <el-button type="primary" @click="login">登录</el-button>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import store from "@/store";
import {ElMessage} from "element-plus";

const emit = defineEmits(['dialogCall'])
const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
})

const loginRef = ref()
const login = () => {
  loginRef.value.validate((bl: boolean) => {
    if (bl) {
      const user = {username: loginForm.username, password: loginForm.password}
      store.dispatch('userStore/login', user).then((token: string): void => {
        ElMessage.success('登陆成功~')
        emit('dialogCall', token)
      })
    } else {
      ElMessage.success('请输入~')
    }
  })
}


</script>

<style scoped>

</style>
