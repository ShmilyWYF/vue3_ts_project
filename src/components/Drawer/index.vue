<template>
  <div id="drawer" ref="drawer">
    <el-drawer v-model="drawerPanel" :with-header="false" direction="ttb" class="el-drawer-box" @close="closeDrawer">
      <template #default>
        <drop-down>
          <template #default>
            <el-switch v-model="action" @change="switchEvnt" :active-action-icon="svg('sun')"
                       :inactive-action-icon="svg('moon')"/>
            <el-button type="info" :icon="svg('background')" circle @click="switchBackgroundButton"
                       :loading="isLoading"/>
            <div>search</div>
            <el-button v-if="!isLoginState" text @click="dialogFormVisible = true">
              登陆
            </el-button>
            <span v-else>
               <el-dropdown>
                 <el-avatar :size="35" src="https://static.linhaojun.top/aurora/avatar/52a81cd2772167b645569342e81ce312.jpg"/>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="UserDialogFormVisible = true">个人中心</el-dropdown-item>
                      <el-dropdown-item @click="userExit">退出</el-dropdown-item>
                      <el-dropdown-item v-if="userinfo?.type === 1" @click="switchPageEvnt">{{switchPage?'blog':'后台管理'}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
            </span>
          </template>
        </drop-down>
      </template>
    </el-drawer>
    <el-affix target=".main">
      <DrawerstringGraphics ref="sliders" :DOMRange="drawer" @drawerPanelEvnt="drawerPanelEvnt"/>
    </el-affix>
    <el-dialog v-model="dialogFormVisible" title="登陆">
      <Login @dialogCall="dialogcall"/>
    </el-dialog>
    <el-dialog v-model="UserDialogFormVisible" title="个人中心">
      <el-card>123</el-card>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, toRefs} from "vue";
import {svg} from "@/icons";
import {DrawerstringGraphics, DropDown, Login} from "@/components";
import router from "@/router";
import store from "@/store";
import {getCookie} from "@/utils/cookie";
import api from "@/axios";
import {AxiosResponse} from "axios";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
  isSwitchBgButton: {
    type: <any>Boolean,
    required: true,
    default: false,
  },
  container: {
    type: <any>null,
    required: true,
  }
})
const {isSwitchBgButton, container} = toRefs(props)

const emit = defineEmits(['SwitchTheme', 'IsSwitchBg']);

// 控制抽屉是否打开
const drawerPanel = ref<boolean>(false)
// 开关默认状态
const action = ref(JSON.parse(String(localStorage.getItem('isbg'))) || false)
emit('SwitchTheme', action.value)
const drawer = ref<any>()
const sliders = ref<any>();

/**
 * @author WangYaFeng
 * @date 2023/10/17 0:33
 * @description 拉绳打开抽屉事件
 * @return null
 * @param even
 */
const drawerPanelEvnt = (even: boolean) => {
  drawerPanel.value = even
  // 解决与导航栏叠层层级问题
  drawer.value.style.zIndex = 20;
  container.value.$el.style.zIndex = '15'
}

/**
 * @author WangYaFeng
 * @date 2023/10/11 1:50
 * @description 抽屉关闭时回调
 * @return null
 */
const closeDrawer = () => {
  const {endPoint, slider}: any = sliders.value
  // 获取css表
  const styleSheet = document.styleSheets[5];
  // css表注入动画
  styleSheet.insertRule(`@keyframes shake {from{ transform: translateY(${endPoint}%) } to { transform: translateY(-50%); }`, 0);
  // 挂载动画
  slider.style.animation = `shake 200ms linear`;
  // 添加延时
  setTimeout(() => {
    slider.style.transform = "translateY(-50%)"
  }, 190)
  // 卸载动画
  slider.addEventListener('animationend', () => {
    slider.style.animation = '';
  })
  // 解决与导航栏叠层层级问题
  drawer.value.style.zIndex = 0;
  container.value.$el.style.zIndex = '10'
}

/**
 * @author WangYaFeng
 * @date 2023/10/28 2:17
 * @description switch开关事件，用于控制主题
 * @return null
 * @param args 布尔类型，
 */
const switchEvnt = (args: boolean) => {
  localStorage.setItem('isbg', String(args))
  emit('SwitchTheme', args);
};

/**
 * @author WangYaFeng
 * @date 2023/10/16 1:58
 * @description 切换背景
 * @return null
 */
const switchBackgroundButton = () => {
  isLoading.value = true
  setTimeout(() => {
    emit('IsSwitchBg', !isSwitchBgButton.value);
    isLoading.value = false
  }, 1000)
  // 本地缓存
  localStorage.setItem('IsSwitchBg', String(!isSwitchBgButton.value))
}

// 切换背景按钮加载状态
const isLoading = ref<boolean>(false)

// 登陆对话弹窗
const dialogFormVisible = ref<boolean>(false)
// 用户个人中心对话弹窗
const UserDialogFormVisible = ref<boolean>(false)
// 控制状态栏组件
const isLoginState = ref<any>(getCookie()?true:JSON.parse(String(localStorage.getItem('isLoginState'))))
// 储存用户信息 为0就是管理员
const userinfo = ref<any>(store.getters.userinfo)
// blog/后台切换
const switchPage = ref(JSON.parse(String(localStorage.getItem('IsSwitchPage'))))
/**
 * @author WangYaFeng
 * @date 2023/10/31 3:05
 * @description login组件登陆回调事件，切换展示组件,对if组件状态进行本地缓存
 * @param token string类型，login组件登陆返回
 * @return null
 */
const dialogcall = (token: string) => {
  dialogFormVisible.value = !dialogFormVisible.value
  isLoginState.value = !isLoginState.value
  localStorage.setItem('isLoginState', JSON.stringify(isLoginState.value))
  api.userApi.getInfo(token).then((res:AxiosResponse)=>{
    const {data} = res.data;
    userinfo.value = data
  })
}

// 退出当前账户
const userExit = () =>{
  store.dispatch('userStore/logout', getCookie()).then(()=>{
    isLoginState.value = false
    switchPage.value = false
    isLoginState.value = false
    localStorage.setItem('isLoginState',String(isLoginState.value))
    localStorage.setItem('IsSwitchPage', String(switchPage.value))
    router.push({path: '/'})
  })
}

const switchPageEvnt = () =>{
  switchPage.value = !switchPage.value;
  switchPage.value?router.push({path: '/Dashboard'}):router.push({path: '/'})
  // 缓存
  localStorage.setItem('IsSwitchPage', String(switchPage.value))
}
</script>

<style scoped lang="scss">
@media (max-width: 1024px) {
  #drawer {
    display: none !important;
  }
}

#drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;

  :deep(.el-overlay) {
    width: 95% !important;
    margin: 0 auto;
    background: #00000000 !important;
    z-index: 10 !important;

    .el-drawer-box {
      width: 20% !important;
      height: 10% !important;
      opacity: 0.9;
      border: 0 solid;
      position: absolute !important;
      left: auto !important;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;

      .el-drawer__body {
        display: flex;
        position: relative;
        justify-content: flex-start;
        z-index: 10 !important;
        align-items: center;
        gap: 1rem;
        background-color: $background-color-drawer;

        .el-switch {
          .el-switch__core {
            --el-color-white: none;

            .el-switch__action {
              width: 1rem;
              height: 1rem;
              @include background_color('border-color');

              .el-icon {
                height: auto;
                width: auto;

                svg {
                  height: 1rem !important;
                  width: 1rem !important;
                }
              }
            }
          }
        }
      }
    }

    @media (max-width: 1200px) {
      .el-drawer-box {
        width: 35% !important;
      }
    }
  }
}
</style>
