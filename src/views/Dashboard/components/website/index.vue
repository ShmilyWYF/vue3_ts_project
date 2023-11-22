<template>
  <el-card class="main-card">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- 修改信息 -->
      <el-tab-pane label="网站信息" name="info">
        <el-form :model="websiteConfigForm" label-position="left" label-width="100px">
          <el-form-item label="作者头像">
            <el-upload
                :headers="headers"
                :on-success="handleAuthorAvatarSuccess"
                :show-file-list="false"
                action="/api/admin/config/images"
                class="avatar-uploader">
              <img v-if="websiteConfigForm.authorAvatar" :src="websiteConfigForm.authorAvatar" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item label="网站logo">
            <el-upload
                :headers="headers"
                :on-success="handleLogoSuccess"
                :show-file-list="false"
                action="/api/admin/config/images"
                class="avatar-uploader">
              <img v-if="websiteConfigForm.logo" :src="websiteConfigForm.logo" class="avatar"/>
              <i v-else class="el-icon-plus avatar-uploader-icon"/>
            </el-upload>
          </el-form-item>
          <el-form-item label="网站名称">
            <el-input v-model="websiteConfigForm.name" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="网站英文名称">
            <el-input v-model="websiteConfigForm.englishName" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="网站作者">
            <el-input v-model="websiteConfigForm.author" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="作者介绍">
            <el-input v-model="websiteConfigForm.authorIntro" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="多语言">
            <el-radio-group v-model="websiteConfigForm.multiLanguage">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="网站创建日期">
            <el-date-picker
                v-model="websiteConfigForm.websiteCreateTime"
                placeholder="选择日期"
                style="width: 400px"
                type="date"
                value-format="yyyy-MM-dd"/>
          </el-form-item>
          <el-form-item label="网站公告">
            <el-input
                v-model="websiteConfigForm.notice"
                :rows="5"
                placeholder="请输入公告内容"
                style="width: 400px"
                type="textarea"/>
          </el-form-item>
          <el-form-item label="备案号">
            <el-input v-model="websiteConfigForm.beianNumber" size="small" style="width: 400px"/>
          </el-form-item>
          <el-form-item label="qq登录">
            <el-radio-group v-model="websiteConfigForm.qqLogin">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button size="medium" style="margin-left: 6.3rem" type="primary" @click="updateWebsiteConfig">
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
      <!-- 网站公告 -->
      <el-tab-pane label="社交信息" name="notice">
        tip:空白默认不显示
        <el-form :model="websiteConfigForm" label-width="70px">
          <el-form-item label="Github">
            <el-input v-model="websiteConfigForm.github" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="Gitee">
            <el-input v-model="websiteConfigForm.gitee" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="websiteConfigForm.qq" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="WeChat">
            <el-input v-model="websiteConfigForm.weChat" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="微博">
            <el-input v-model="websiteConfigForm.weibo" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="CSDN">
            <el-input v-model="websiteConfigForm.csdn" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="知乎">
            <el-input v-model="websiteConfigForm.zhihu" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="掘金">
            <el-input v-model="websiteConfigForm.juejin" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="twitter">
            <el-input v-model="websiteConfigForm.twitter" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-form-item label="stackoverflow">
            <el-input v-model="websiteConfigForm.stackoverflow" size="small" style="width: 400px; margin-right: 1rem"/>
          </el-form-item>
          <el-button size="medium" style="margin-left: 4.375rem" type="primary" @click="updateWebsiteConfig">
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
      <!-- 修改密码 -->
      <el-tab-pane label="其他设置" name="password">
        <el-form :model="websiteConfigForm" label-position="left" label-width="120px">
          <el-row style="width: 600px">
            <el-col :md="12">
              <el-form-item label="用户头像">
                <el-upload
                    :headers="headers"
                    :on-success="handleUserAvatarSuccess"
                    :show-file-list="false"
                    action="/api/admin/config/images"
                    class="avatar-uploader">
                  <img v-if="websiteConfigForm.userAvatar" :src="websiteConfigForm.userAvatar" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="游客头像">
                <el-upload
                    :headers="headers"
                    :on-success="handleTouristAvatarSuccess"
                    :show-file-list="false"
                    action="/api/admin/config/images"
                    class="avatar-uploader">
                  <img v-if="websiteConfigForm.touristAvatar" :src="websiteConfigForm.touristAvatar" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="邮箱通知">
            <el-radio-group v-model="websiteConfigForm.isEmailNotice">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="评论审核">
            <el-radio-group v-model="websiteConfigForm.isCommentReview">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="打赏状态">
            <el-radio-group v-model="websiteConfigForm.isReward">
              <el-radio :label="0">关闭</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row v-show="websiteConfigForm.isReward == 1" style="width: 600px">
            <el-col :md="12">
              <el-form-item label="微信收款码">
                <el-upload
                    :on-success="handleWeiXinSuccess"
                    :show-file-list="false"
                    action="/api/admin/config/images"
                    class="avatar-uploader">
                  <img v-if="websiteConfigForm.weiXinQRCode" :src="websiteConfigForm.weiXinQRCode" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :md="12">
              <el-form-item label="支付宝收款码">
                <el-upload
                    :on-success="handleAlipaySuccess"
                    :show-file-list="false"
                    action="/api/admin/config/images"
                    class="avatar-uploader">
                  <img v-if="websiteConfigForm.alipayQRCode" :src="websiteConfigForm.alipayQRCode" class="avatar"/>
                  <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button size="medium" style="margin-left: 6.3rem" type="primary" @click="updateWebsiteConfig">
            修改
          </el-button>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  created() {
    // this.getWebsiteConfig()
  },
  data: function () {
    return {
      websiteConfigForm: {},
      activeName: 'info',
      headers: {token: sessionStorage.getItem('token')}
    }
  },
  methods: {
    getWebsiteConfig() {
      this.axios.get('/api/admin/website/config').then(({data}) => {
        this.websiteConfigForm = data.data
      })
    },
    handleClick(tab) {
    },
    handleAuthorAvatarSuccess(response) {
      this.websiteConfigForm.authorAvatar = response.data
    },
    handleLogoSuccess(response) {
      this.websiteConfigForm.logo = response.data
    },
    handleUserAvatarSuccess(response) {
      this.websiteConfigForm.userAvatar = response.data
    },
    handleTouristAvatarSuccess(response) {
      this.websiteConfigForm.touristAvatar = response.data
    },
    handleWeiXinSuccess(response) {
      this.websiteConfigForm.weiXinQRCode = response.data
    },
    handleAlipaySuccess(response) {
      this.websiteConfigForm.alipayQRCode = response.data
    },
    updateWebsiteConfig() {
      this.axios.put('/api/admin/website/config', this.websiteConfigForm).then(({data}) => {
        if (data.flag) {
          this.$notify.success({
            title: '成功',
            message: data.message
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: data.message
          })
        }
      })
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>