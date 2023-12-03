<template>
  <el-card>
    <el-form v-if="isEdit" :model="userData" ref="fromRef" :rules="rules">
      <el-form-item label="头像" prop="avatar">
        <label for="upload" class="ui-upload">
          <el-image style="width: 100px; height: 100px" :src="userData.avatar" fit="fill"/>
        </label>
        <input id="upload" type="file" name="file" multiple="multiple" @change="updateImg"
               style="display: none" :disabled="!isEdit"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userData.nickname" :disabled="!isEdit"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userData.password"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :disabled="true">
        <el-input v-model="userData.email" :disabled="!isEdit"/>
      </el-form-item>
      <el-form-item label="个人网址" prop="website">
        <el-input v-model="userData.website" :disabled="!isEdit"/>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="userData.intro" type="textarea"/>
      </el-form-item>
      <el-form-item label="是否订阅" prop="isSubscribe">
        <el-radio-group v-model="userData.isSubscribe" :disabled="!isEdit">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div v-else class="card-View-box">
      <div class="header-box">
        <span>
              <el-avatar :size="50" :src="userData.avatar"/>
              {{ userData.nickname }}
        </span>
        <p>邮箱：{{ userData.email }}</p>
        <p>网址：{{ userData.website }}</p>
        <p>订阅：{{ userData.isSubscribe == 0?'x':'√' }}</p>
      </div>
      <hr/>
      <div class="content-box">
        <span>简介：</span>
        <p>{{ userData.intro }}</p>
      </div>
    </div>
    <el-button v-show="!isEdit" type="primary" @click="isEdit = true">编辑用户信息</el-button>
    <el-button v-show="isEdit" type="success" @click="updateUserInfo">保存</el-button>
    <el-button v-show="isEdit" type="warning" @click="isEdit = !isEdit">取消编辑</el-button>
  </el-card>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import {ElMessage, FormRules} from "element-plus";
import {nameRule, pwdRule, UrlRule} from "@/utils/validate";
import api from "@/axios";
import {AxiosResponse} from "axios";

interface userInfoVo {
  id: number,
  password: string,
  nickname: string,
  avatar: string,
  createTime: Date,
  email: string,
  intro: string,
  isDisable: number,
  isSubscribe: number,
  updateTime: Date | null,
  website: string,
  type: number,
  last_login_time: Date,
}

const props = defineProps<{ fromData: userInfoVo }>()
let { fromData } = toRefs(props);
const fromRef = ref<HTMLElement | any>()
const rules = reactive<FormRules>({
  avatar: {required: true, message: '必填项', trigger: 'change'},
  email: {required: true, message: '请输入你的邮箱', trigger: 'blur'},
  intro: {required: true, message: '请输入你的简介', trigger: 'blur'},
  nickname: {required: true, validator: nameRule},
  password: {required: true, trigger: 'blur', validator: pwdRule},
  website: {required: false, validator: UrlRule},
})

const userData = reactive<userInfoVo>({
      avatar: fromData.value.avatar,
      email: fromData.value.email,
      id: fromData.value.id,
      intro: fromData.value.intro,
      isDisable: fromData.value.isDisable,
      isSubscribe: fromData.value.isSubscribe,
      last_login_time: fromData.value.last_login_time,
      nickname: fromData.value.nickname,
      password: fromData.value.password,
      type: fromData.value.type,
      createTime: fromData.value.createTime,
      updateTime: fromData.value.updateTime,
      website: fromData.value.website
})

const isEdit = ref<boolean>(false)

const updateImg = (file: any) => {
  let formdata = new FormData();
  formdata.append('image', file.target.files[0]);
  // axios在接收formdata类型参数时会强制删除content-type浏览器识别空设置为默认false
  api.imgApi.uploadImg(formdata).then((res: any) => {
    const {data} = res.data
    userData.avatar = data
  })
}

const updateUserInfo = () =>{
  fromRef.value.validate(async (bl: boolean) => {
    if (bl) {
      try {
        await api.userApi.updateUserinfo(userData).then((res: AxiosResponse) => {
          const {data} = res.data
          if (data.code != 200) {
            throw new Error(data.messages)
          }
          ElMessage.success(data.messages)
        })
      } catch (e: any) {
        ElMessage.error(e)
      } finally {
        isEdit.value = false
      }
    } else {
      ElMessage.warning("请输入~")
    }
  })
}
</script>

<style scoped lang="scss">
.el-card{
  //width: fit-content;
  border: none;
  @include background_color('background-color');
  @include font_color('text-color');

  .card-View-box{
    display: flex;
    flex-direction: column;
    font-weight: 800;
    font-size: larger;
    color: inherit;
    .header-box {
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

    hr{
      width: 100%;
    }

    .content-box{
      display: flex;
      flex-direction: column;
      gap: .5rem;

      p{
        color: inherit;
        font-size: small;
        font-weight: 600;
        min-height: 5rem;
        padding: .75rem;
        border-radius: 1rem;
        border-color: transparent;
        word-wrap: normal;
        margin-bottom: .5rem;
        @include background_color('background-primary');
      }
    }
  }
}

.el-form {
  border-radius: 1rem;

  :deep(.el-form-item) {
    display: flex;
    flex-direction: row;

    .el-form-item__label {
      flex-basis: 30%;
      color: inherit;
      font-weight: 600;
    }
  }
}
</style>
