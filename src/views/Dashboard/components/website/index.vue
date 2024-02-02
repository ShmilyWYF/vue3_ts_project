<template>
  <el-card class="website-box">
    <el-tabs v-model="websiteActive" @tab-click="getListByLabel">
      <el-tab-pane label="网站设置" name="info">
        <el-form :model="websiteConfigForm" label-position="left" label-width="100px" ref="websiteRef" :rules="webSiteRule">
          <el-form-item label="网站logo" prop="webSiteLog">
            <label for="upload" class="ui-upload">
              <el-image style="width: 100px; height: 100px" :src="websiteConfigForm.webSiteLog" fit="fill"/>
            </label>
            <input id="upload" type="file" name="file" multiple="multiple" @change="updateImg"
                   style="display: none"/>
          </el-form-item>
          <el-form-item label="网站名称" prop="siteName">
            <el-input v-model="websiteConfigForm.siteName" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="网站英文名称" prop="englishName">
            <el-input v-model="websiteConfigForm.englishName" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="评论需要审核" prop="isCommentReview">
            <el-radio-group v-model="websiteConfigForm.isCommentReview">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="多语言" prop="multiLanguage">
            <el-radio-group v-model="websiteConfigForm.multiLanguage">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="网站创建日期" prop="websiteCreateTime">
            <el-date-picker
                v-model="websiteConfigForm.websiteCreateTime"
                placeholder="选择日期"
                style="width: 400px"
                type="date"
                value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="网站公告" prop="notice">
            <el-input
                v-model="websiteConfigForm.notice"
                :rows="5"
                placeholder="请输入公告内容"
                style="width: 400px"
                type="textarea"/>
          </el-form-item>
          <el-form-item label="qq登录" prop="qqLogin">
            <el-radio-group v-model="websiteConfigForm.qqLogin">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备案号" prop="beianNumber">
            <el-input v-model="websiteConfigForm.beianNumber" size="small" style="width: 400px"/>
          </el-form-item>
          <el-button size="small" style="margin-left: 6.3rem" type="primary" @click="updateWebsiteConfig">
            修改
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="用户设置" name="user">
        <el-form :model="userConfigForm" label-position="left" label-width="120px" ref="userRef" :rules="userRule">
          <el-row style="width: 600px">
            <el-col :md="12">
              <el-form-item label="游客头像" prop="avatar">
                <label for="upload" class="ui-upload">
                  <el-image style="width: 100px; height: 100px" :src="userConfigForm.avatar" fit="fill"/>
                </label>
                <input id="upload" type="file" name="file" multiple="multiple" @change="updateImg"
                       style="display: none"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="邮箱通知" prop="isEmailNotice">
            <el-radio-group v-model="userConfigForm.isEmailNotice">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button size="small" style="margin-left: 6.3rem" type="primary" @click="updateUserConfig">
            保存
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="超级管理员设置" name="admin">
        <el-form :model="userConfigForm" label-position="left" label-width="120px" ref="userRef" :rules="userRule">
          <el-row style="width: 600px">
            <el-col :md="12">
              <el-form-item label="游客头像" prop="avatar">
                <label for="upload" class="ui-upload">
                  <el-image style="width: 100px; height: 100px" :src="userConfigForm.avatar" fit="fill"/>
                </label>
                <input id="upload" type="file" name="file" multiple="multiple" @change="updateImg"
                       style="display: none"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="邮箱通知" prop="isEmailNotice">
            <el-radio-group v-model="userConfigForm.isEmailNotice">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button size="small" style="margin-left: 6.3rem" type="primary" @click="updateUserConfig">
            保存
          </el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="管理员路由设置" name="routers">

      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref} from "vue";
import api from "@/axios";
import {ElNotification, FormRules} from "element-plus";
import {AxiosResponse} from "axios";

const websiteActive = ref('info')
const websiteRef = ref<HTMLElement | any>()
const userRef = ref<HTMLElement | any>()

const websiteConfigForm = reactive({
  webSiteLog: '',
  siteName: '',
  englishName: '',
  multiLanguage: 0,
  isCommentReview: 0,
  websiteCreateTime: '',
  notice: '',
  beianNumber: '',
  qqLogin: '',
})

const userConfigForm = reactive({
  avatar: 'https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg',
  isEmailNotice: 0,
})

const webSiteRule = reactive<FormRules>({
  webSiteLog: {required: true, message: '请上传图片', trigger: 'change'},
  siteName: {required: true, message: '请设置网站名称', trigger: 'blur'},
  englishName: {required: true, message: '请设置网站英文名称', trigger: 'blur'},
  multiLanguage: {required: true, message: '请选择是否开启多语言', trigger: 'blur'},
  isCommentReview: {required: true, message: '请选择是否开启评论审核', trigger: 'blur'},
  websiteCreateTime: {required: true, message: '请选择网站创建时间', trigger: 'blur'},
  notice: {required: true, message: '网站公告不能为空', trigger: 'blur'},
  beianNumber: {required: true, message: '备案号不能为空', trigger: 'blur'},
  qqLogin: {required: true, message: '请选择是否启用qq登陆', trigger: 'blur'},
})

const userRule = reactive<FormRules>({
  avatar: {required: true, message: '请上传图片', trigger: 'change'},
  isEmailNotice: {required: true, message: '请选择是否开启电子邮件通知', trigger: 'blur'},
})

onMounted(()=>{
  getListByLabel({paneName: websiteActive.value})
})

const getListByLabel = (pane: any) => {
  switch (pane.paneName) {
    case 'info': getWebSiteInfoConfig();break;
    case 'user': getUserConfig();break;
  }
}

const updateImg = (file: any) => {
  let formdata = new FormData();
  formdata.append('image', file.target.files[0]);
  // axios在接收formdata类型参数时会强制删除content-type浏览器识别空设置为默认false
  api.imgApi.uploadImg(formdata).then((res: any) => {
    const {data} = res.data
    if (websiteActive.value == 'info'){
      websiteConfigForm.webSiteLog = data
    }
    if (websiteActive.value == 'user'){
      userConfigForm.avatar = data
    }
  })
}

const getWebSiteConfig = () => {
  api.useAppApi.getUseAppConfig().then((res: AxiosResponse) => {
    const {data} = res.data
    Object.assign(websiteConfigForm, data)
  })
}

const getUserConfig = () =>{
  api.useAppApi.getUserConfig().then((res: AxiosResponse) => {
    const {data} = res.data
    Object.assign(userConfigForm, data)
  })
}

// 更新网站配置
const updateWebsiteConfig = () => {
  websiteRef.value.validate((is: boolean) => {
    if (is) {
      api.useAppApi.updateWebSiteConfig(websiteConfigForm).then((res: AxiosResponse) => {
        const {data} = res.data
        if (!data) {
          throw new Error('更新出现错误')
        }
        Object.assign(websiteConfigForm, data)
        ElNotification({
          title: '通知',
          message: '更新完成',
          type: 'success'
        })
      }, (error: string) => {
        ElNotification({
          title: '通知',
          message: error,
          type: 'warning'
        })
      })
    } else {
      ElNotification({
        title: '通知',
        message: '请检查表单后再试',
        type: 'warning'
      })
    }
  })
}

// 更新用户配置
const updateUserConfig = () => {
  userRef.value.validate((is: boolean) => {
    if (is) {
      api.useAppApi.updateUserConfig(userConfigForm).then((res: AxiosResponse) => {
        const {data} = res.data
        if (!data) {
          throw new Error('更新出现错误')
        }
        Object.assign(userConfigForm, data)
        ElNotification({
          title: '通知',
          message: '更新完成',
          type: 'success'
        })
      }, (error: string) => {
        ElNotification({
          title: '通知',
          message: error,
          type: 'warning'
        })
      })
    } else {
      ElNotification({
        title: '通知',
        message: '请检查表单后再试',
        type: 'warning'
      })
    }
  })
}
</script>

<style scoped lang="scss">
.website-box {
  padding: 1rem;
  height: 0 !important;
  flex: 1;

  .el-form {
    flex: 1;
    padding: 1rem;
    background: #fff;
    border-radius: 1rem;

    :deep(.el-form-item) {
      .el-form-item__label {
        width: 120px !important;
        color: inherit;
        font-weight: 600;
      }
    }
  }
}
</style>
