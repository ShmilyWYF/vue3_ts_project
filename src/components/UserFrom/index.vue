<template>
  <el-card>
    <el-form v-if="!isEdit" :model="userData" ref="fromRef" :rules="rules">
      <el-form-item label="头像" prop="avatar">
        <label for="upload" class="ui-upload">
          <el-image style="width: 100px; height: 100px" :src="userData.avatar" fit="fill"/>
        </label>
        <input id="upload" type="file" name="file" multiple="multiple" @change="updateImg"
               style="display: none"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="userData.nickname" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userData.password"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :disabled="true">
        <el-input v-model="userData.email"/>
      </el-form-item>
      <el-form-item label="个人网址" prop="website">
        <el-input v-model="userData.website"/>
      </el-form-item>
      <el-form-item label="简介" prop="intro">
        <el-input v-model="userData.intro" type="textarea"/>
      </el-form-item>
      <el-form-item label="是否订阅" prop="isSubscribe">
        <el-radio-group v-model="userData.isSubscribe">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <slot name="content" :row="userData"/>
      <el-button v-once v-show="isEdit == isEditBtn" type="success" @click="updateUserInfo">添加用户</el-button>
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
      <el-button v-once v-show="!isEditBtn" type="primary" @click="isEditBtn = true;emit('updateEditOrAdd',false)">编辑用户信息</el-button>
    </div>
    <div class="btn-box" v-once v-show="isEditBtn">
      <el-button type="success" @click="updateUserInfo">保存</el-button>
      <el-button type="warning" @click="isEditBtn = false;emit('updateEditOrAdd',true)">取消编辑</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {inject, reactive, ref, toRefs} from "vue";
import {ElMessage, FormRules} from "element-plus";
import {nameRule, pwdRule, UrlRule} from "@/utils/validate";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {UserInfointerface} from "@/interface";

const reloadV: any = inject('reload')

const props = defineProps<{ fromData: UserInfointerface ,isEdit:boolean}>()

const emit = defineEmits(['updateCall','updateEditOrAdd'])
let { fromData,isEdit } = toRefs(props);
const fromRef = ref<HTMLElement | any>()
const rules = reactive<FormRules>({
  avatar: {required: true, message: '必填项', trigger: 'change'},
  email: {required: true, message: '请输入你的邮箱', trigger: 'blur'},
  intro: {required: true, message: '请输入你的简介', trigger: 'blur'},
  nickname: {required: true, validator: nameRule},
  password: {required: true, trigger: 'blur', validator: pwdRule},
  website: {required: false, validator: UrlRule},
})

const userData = ref<UserInfointerface>(fromData.value)

const isEditBtn = ref(false)

const updateImg = async (file: any) => {
  let formdata = new FormData();
  formdata.append('file', file.target.files[0]);
  // axios在接收formdata类型参数时会强制删除content-type浏览器识别空设置为默认false
  api.imgApi.uploadImg(formdata).then((res: any) => {
    const {data} = res.data
    userData.value.avatar = data
  })
}

const updateUserInfo = () =>{
  fromRef.value.validate(async (bl: boolean) => {
    if (bl) {
      try {
        await api.userApi.updateUserinfo(userData.value).then((res: AxiosResponse) => {
          const {code,message} = res.data
          if (code !== 200) {
            throw new Error(message)
          }
          ElMessage.success(message)
        })
      } catch (e: any) {
        ElMessage.error(e)
      } finally {
        reloadV()
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

.btn-box{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
