<template>
  <div id="drawer" ref="drawer">
    <el-drawer v-model="drawerPanel" :lock-scroll="false" :with-header="false" class="el-drawer-box" direction="ttb"
               @close="closeDrawer">
      <template #default>
        <ul>
          <li>
            <lang-drop-down/>
          </li>
          <li>
            <el-switch v-model="themeAction" :active-value="'light'" :inactive-value="'dark'"
                       :active-action-icon="svg('sun')" :inactive-action-icon="svg('moon')" @change="switchThemeEvnt"/>
          </li>
          <li>
            <div v-if="ShowComponent">search</div>
          </li>
          <li>
            <el-button v-if="ShowComponent" :icon="svg('background')" :loading="isBgLoading" circle type="info"
                       @click="switchBackgroundButton"/>
          </li>
          <li>
            <LoginDrop :status="ShowComponent"/>
          </li>
        </ul>
      </template>
    </el-drawer>

    <el-affix target=".main">
      <DrawerstringGraphics ref="sliders" :DOMRange="drawer" @drawerPanelEvnt="drawerPanelEvnt"
                            @animationEvents="closeDrawer"/>
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {svg} from "@/icons";
import {DrawerstringGraphics, LangDropDown, LoginDrop} from "./index"
import store from "@/store";
import {useRouter} from "vue-router";

onMounted(() => {
  excludeComponents(['home', 'articles', 'tags'])
  switchThemeEvnt(themeAction.value)
})

// 主题switch默认
const themeAction = ref(localStorage.getItem('theme') || 'dark')
// 组件容器ref
const drawer = ref<HTMLDivElement>()
// 滑块ref
const sliders = ref<HTMLDivElement>()
// 控制抽屉模组是否打开
const drawerPanel = ref<boolean>(false)
// 背景板
const bgPlate = ref<any>(JSON.parse(String(localStorage.getItem('bgPlate'))) || false)
// 切换背景按钮加载状态
const isBgLoading = ref<boolean>(false)
// 路由实例
const router = useRouter()


/**
 * @author WangYaFeng
 * @date 2023/10/28 2:17
 * @description switch开关事件,控制主题
 * @return null
 * @param args 布尔类型，
 */
const switchThemeEvnt = (args: string) => {
  localStorage.setItem('theme', args)
  const theme = {'theme': args}
  document.documentElement.setAttribute("data-theme", theme.theme);
  store.dispatch('useAppStore/themeConfig', theme);
}

/**
 * @author WangYaFeng
 * @date 2023/10/17 0:33
 * @description 拉绳打开抽屉事件
 * @return null
 * @param even
 */
const drawerPanelEvnt = (even: boolean) => {
  drawerPanel.value = even
}

/**
 * @author WangYaFeng
 * @date 2023/10/11 1:50
 * @description 抽屉关闭时回调
 * @return null
 */
const closeDrawer = () => {
  const {endPoint, slider, elHeight}: any = sliders.value
  // 获取css表
  /**
   * @author WangYaFeng
   * @date 2023/11/30 1:40
   * @description 根据id查找css表位置
   * @param null
   * @return null
   */
      // Object.keys(styleSheets).forEach((res:any)=>{
      //   let arr = styleSheets[res].cssRules;
      //   Object.keys(arr).forEach((item:any)=>{
      //     let text = styleSheets[res].cssRules[item].cssText;
      //     if(text.includes('#drawer')){
      //       key = res;
      //     }
      //   })
      // })
  const styleSheet = document.styleSheets[0];
  // css表注入动画
  // styleSheet.insertRule(`@keyframes shake {from{ transform: translateY(${endPoint}%) } to { transform: translateY(-50%); }`, 0);
  styleSheet.insertRule(`@keyframes shake {from{ height: ${endPoint}% } to { height: ${elHeight}% }`, 0);
  // 挂载动画
  slider.style.animation = `shake 200ms linear`;
  // 添加延时
  setTimeout(() => {
    slider.style.height = `${elHeight}%`
  }, 190)
  // 卸载动画
  slider.addEventListener('animationend', () => {
    slider.style.animation = '';
  })
}


// 组件是否在后台显示
const ShowComponent = computed(() => {
  return excludeComponents(['Dashboard'])
})
const excludeComponents = (arr: string[]) => {
  let matcheds = router.currentRoute.value.matched
  if (arr.includes(String(matcheds[0].name))) {
    let el = <HTMLElement>document.getElementById('mainbg');
    el.style.display = `none`
  }
  return !arr.includes(String(matcheds[0].name))
}

/**
 * @author WangYaFeng
 * @date 2023/10/16 1:58
 * @description 切换背景
 * @return null
 */
const switchBackgroundButton = () => {
  isBgLoading.value = true
  setTimeout(() => {
    bgPlate.value = !bgPlate.value
    isBgLoading.value = false
    let el = <HTMLElement>document.getElementById('mainbg');
    el.style.display = bgPlate.value ? `none` : `block`
  }, 1000)
  // 本地缓存
  localStorage.setItem('bgPlate', String(bgPlate.value))
}

</script>

<style lang="scss" scoped>
@media (max-width: 1024px) {
  #drawer {
    display: none !important;
  }
}

#drawer {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 50;

  :deep(.el-overlay) {
    background: #00000000 !important;

    .el-drawer.ttb {
      left: unset;
      right: 2.25rem;
    }

    .el-drawer-box {
      opacity: 0.9;
      border: 0 solid;
      width: fit-content !important;
      height: 5rem !important;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      background-color: $background-color-drawer;

      ul {
        display: flex;
        flex-direction: row;
        position: relative;
        gap: 1rem;
        align-items: center;
        justify-content: center;

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

  }
}
</style>
