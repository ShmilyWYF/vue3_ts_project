<template>
  <el-card>
    <template #default>
      <!-- 登录表单 -->
      <el-form ref="loginRef" v-if="isRegister === 1" :model="loginForm" :rules="rules" status-icon>
        <!-- 用户名输入框 -->
        <el-form-item label="邮箱" prop="username">
          <el-input
              v-model="loginForm.username"
              placeholder="邮箱"
              prefix-icon="el-icon-user-solid"
              @keyup.enter.native="login"/>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="loginForm.password"
              placeholder="密码"
              prefix-icon="el-icon-user-solid"
              show-password
              @keyup.enter.native="login"/>
        </el-form-item>
      </el-form>
      <el-form ref="registerOrRestPwdRef" v-else :model="registerForm" :rules="rules" status-icon>
        <!-- 用户名输入框 -->
        <el-form-item label="邮箱" prop="username">
          <el-input
              v-model="registerForm.username"
              placeholder="邮箱"
              prefix-icon="el-icon-user-solid"
              @keyup.enter.native="login"/>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha" style="display: flex;flex-direction: row">
          <el-input
              v-model="registerForm.captcha"
              placeholder="验证码"
              prefix-icon="el-icon-user-solid"
              @keyup.enter.native="login"
              style="flex: .9"
          />
          <el-button v-if="countdown === 0" @click="send" style="flex: .1">发送</el-button>
          <span style="padding-left: .5rem" v-else>{{ countdown }}</span>
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input
              v-model="registerForm.password"
              placeholder="密码"
              prefix-icon="el-icon-user-solid"
              show-password
              @keyup.enter.native="login"/>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button v-if="isRegister === 1" type="primary" @click="login">登录</el-button>
        <el-button v-if="isRegister === 2" type="success" @click="registerOrRestPwd">注册</el-button>
        <el-button v-if="isRegister === 3" type="warning" @click="registerOrRestPwd">重置密码</el-button>
      </div>
      <div style="display: flex" class="option-box">
        <el-button v-if="isRegister === 1" link @click="clearForm(3)">找回密码!</el-button>
        <el-button v-if="isRegister === 1" link @click="clearForm(2)">没有账号？去注册~</el-button>
        <el-button v-else type="text" @click="clearForm(1)">已有账号，去登陆！</el-button>
      </div>
    </template>
  </el-card>
  <el-dialog
      v-model="isToLoginOrCancel"
      title="通知"
      width="30%"
      destroy-on-close
      center
  >
    <el-button @click="clearForm(1)">跳转登陆</el-button>
    <el-button type="primary" @click="isToLoginOrCancel = false">取消</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import {nextTick, reactive, ref} from "vue";
import store from "@/store";
import {ElMessage} from "element-plus";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {validateEmail} from "@/utils/validate";

const emit = defineEmits(['dialogCall'])

const isRegister = ref<number>(1)
const countdown = ref<number>(0)
const isToLoginOrCancel = ref<boolean>(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  captcha: '',
  password: ''
})

const rules = reactive({
  username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
  password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
  captcha: [{required: true, message: '验证码不能为空', trigger: 'blur'}],
})

const loginRef = ref<HTMLElement | any>()
const registerOrRestPwdRef = ref<any>()

const login = () => {
  loginRef.value.validate((bl: boolean) => {
    if (bl) {
      const user = {username: loginForm.username, password: loginForm.password}
      store.dispatch('userStore/login', user).then((): void => {
        emit('dialogCall')
      }, ((e:Error) => {
        ElMessage.error(e.message)
      }))
    } else {
      ElMessage.success('请输入~')
    }
  })
}

/**
 * @author WangYaFeng
 * @date 2023/12/5 1:11
 * @description 发送验证码
 */
const send = () => {
  if (!validateEmail(registerForm.username)) {
    ElMessage.warning('请输入正确邮箱~')
    return
  }
  const email = {
    "toEmail": registerForm.username,
    "subject": "注册密码"
  }
  api.mailApi.getCaptchaByEmail(email).then((res: AxiosResponse) => {
    const {code,message} = res.data
    if (code != 200) {
      throw new Error(message)
    }
    ElMessage.success(message)
    countdown.value = 60;
    let interval = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(interval)
        countdown.value = 0
      }
    }, 1000);
  }, ((e: string) => {
    ElMessage.error('错误,请联系管理员:' + e)
  }))
}

/**
 * @author WangYaFeng
 * @date 2023/12/5 1:09
 * @description 注册或者找回密码函数
 * @return null
 */
const registerOrRestPwd = () => {
  registerOrRestPwdRef.value.validate((bl: boolean) => {
    if (bl) {
      const registerinfo = {
        username: registerForm.username,
        captcha: registerForm.captcha,
        password: registerForm.password
      }
      try {
        if (isRegister.value == 2) {
          api.userApi.registerUser(registerinfo).then((res: AxiosResponse) => {
                const {code,messages} = res.data
                if (code != 200) {
                  throw new Error(messages)
                }
                ElMessage.success(messages)
                isToLoginOrCancel.value = true;
              }
          )
        }
        if (isRegister.value == 3) {
          api.userApi.restUser(registerinfo).then((res: AxiosResponse) => {
            const {code,messages} = res.data
                if (code != 200) {
                  throw new Error(messages)
                }
                // 做个弹窗 提示信息传入
                ElMessage.success(messages)
              }
          )
        }
      } catch (e: any) {
        ElMessage.error('错误,请联系管理员', e)
      }
    } else {
      ElMessage.warning('请输入~')
    }
  })
}

const clearForm = async (num: number) => {
  countdown.value = 0;
  isRegister.value = num
  await nextTick(() => {
    registerForm.captcha = ''
    registerForm.username = ''
    registerForm.password = ''
    loginForm.password = ''
    loginForm.username = ''
  })
}
</script>

<style lang="scss" scoped>
.el-card {
  .btn {
    display: flex;
    justify-content: center
  }

  .option-box {
    display: flex;
    margin-top: 3rem;
    justify-content: space-between;
  }
}

.el-form {
  background: #fff;
  border-radius: 1rem;

  :deep(.el-form-item) {
    display: flex;
    flex-direction: row;

    .el-form-item__label {
      flex-basis: 20%;
      color: inherit;
      font-weight: 600;
    }
  }
}
</style>
