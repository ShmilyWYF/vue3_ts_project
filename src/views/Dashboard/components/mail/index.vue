<template>
  <div class="about-box">
    <el-card>
      <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 15}"
          placeholder="请输入内容"
          v-model="content"/>
      <el-card class="card-input-box">
        <template #header>
          <span>延迟发送:</span>
          <el-checkbox v-model="checkbox" size="large"/>
        </template>
        <div>
          <el-tooltip placement="top" trigger="hover" content="请先勾选选择" :disabled="checkbox">
            <el-input :disabled="!checkbox" v-model="ttl" type="number" placeholder="输入延迟时间"/>
          </el-tooltip>
          <span>单位:h</span>
        </div>
        <ul class="card-ul-box">
          <li>
              <el-popconfirm title="确定发送群组邮件？这将所有订阅者都会收到~" @confirm="sendGroupMail">
                <template #reference>
                  <el-button type="primary">发送群组邮件</el-button>
                </template>
              </el-popconfirm>
          </li>
          <li>
            <el-tooltip placement="top" trigger="hover" content="取消所有未发送的群组邮件">
              <el-button type="primary" @click="clearALLTtlEmail">取消所有定时邮件</el-button>
            </el-tooltip>
          </li>
        </ul>
      </el-card>
    </el-card>
    <Sidebar icon="moon" title="延迟消息列表" :data="ttlEmailReactive" ul-display="flex">
      <template #content="soltProp:{item:{id:number,queue:string,expire:number},$index:number}">
        <el-tag closable @close="clearTtlEmailByEmailId(soltProp.item.queue)" @change="console.log('创建时')">
          {{ soltProp.item.queue }}| 倒计时：{{ soltProp.item.expire }}s
        </el-tag>
      </template>
    </Sidebar>
  </div>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from "vue";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {ElNotification} from "element-plus";
import {Sidebar} from "@/components";
import {Ref} from "@vue/reactivity";

// 上下文
const content = ref<string>('')
// 延时
const ttl = ref<number>(1)
// 接收邮件的用户
const toEmail = ref<string[]>()
// 选中框双向绑定
const checkbox = ref<boolean>(false)
// 延迟邮件列表
const ttlEmailReactive = ref<{ id: number, queue: string, expire: number }[]>()
// 计时器
let timer: any = null;
onMounted(() => {
  getAllTtlEmail();
  monitoring();
})

// 发送邮件事件
const sendGroupMail = () => {
  const param: { toEmail: string[] | string, subject: string, content: string, ttl?: number } = {
    "toEmail": checkbox.value ? "null" : toEmail.value!,
    "subject": "订阅通知",
    "content": content.value,
  }
  // 接口参数为ms
  checkbox.value ? param.ttl = ttl.value * (3600 * 1000) : ttl.value = 0
  api.mailApi.sendGroupMessage(param).then(({data: {message}}: AxiosResponse) => {
    ElNotification.success(message)
    if(ttl.value != 0) getAllTtlEmail();
  }, (e: Error) => {
    ElNotification.error(e.message)
  })
}
// 获取所有延迟邮件
const getAllTtlEmail = async () => {
  await api.mailApi.getAllTtlMessage().then((res: AxiosResponse) => {
    const {data, message} = res.data;
    ttlEmailReactive.value = data
    ElNotification.success(message)
  }, (e: Error) => {
    ElNotification.error(e.message)
  })
}

// 清除所有未发送的邮件
const clearALLTtlEmail = () => {
  api.mailApi.removeAllTtlMail().then((res: AxiosResponse) => {
    const {message} = res.data;
    ElNotification.success(message)
    getAllTtlEmail();
  }, (e: Error) => {
    ElNotification.error(e.message)
  })
}
// 删除指定未发送的定时邮件
const clearTtlEmailByEmailId = (emailId: string) => {
  api.mailApi.removeTtlMailByMail({messageId: emailId}).then((res: AxiosResponse) => {
    const {message} = res.data;
    ElNotification.success(message)
    getAllTtlEmail();
  }, (e: Error) => {
    ElNotification.error(e.message)
  })
}
// 定时监听
const monitoring = () => {
  timer = setInterval(() => {
    if (ttlEmailReactive.value != undefined && ttlEmailReactive.value?.length != 0) {
      let arr = ttlEmailReactive.value!.map(value => {
        value.expire = value.expire - 1
        return value;
      })
      if (ttlEmailReactive.value?.length == 0) {
        clearInterval(timer)
      }
      ttlEmailReactive.value = arr;
    }
  }, 1000)
}
// 卸载前销毁
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.about-box {
  padding: 1rem;
  height: 0 !important;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .el-card {
    height: unset !important;

    :deep(.card-input-box) {
      height: unset;
      position: relative;
      margin-top: 1rem;

      span {
        font-weight: 600;
      }

      .el-card__header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: .25rem;
      }

      .el-card__body {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: .25rem;

        .el-input {
          flex: .1;
          max-width: 5rem;
        }

        .card-ul-box {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          gap: .25rem
        }
      }
    }
  }

  .sidebar {
    flex: .9;
  }
}
</style>
