<template>
  <div id="drawer" ref="drawer">
    <el-drawer v-model="drawerPanel" :with-header="false" direction="ttb" class="el-drawer-box" @close="closeDrawer">
      <template #default>
        <drop-down>
          <template #default>
            <el-switch v-model="action" @change="switchEvnt" :active-action-icon="svg('sun')" :inactive-action-icon="svg('moon')"/>
            <el-button type="info" :icon="svg('background')" circle @click="switchBackgroundButton" :loading="isLocal"/>
            <div>search</div>
            <div>Login</div>
          </template>
        </drop-down>
      </template>
    </el-drawer>
    <el-affix target=".main">
      <DrawerstringGraphics ref="sliders" :DOMRange="drawer" @drawerPanelEvnt="drawerPanelEvnt"/>
    </el-affix>
  </div>
</template>

<script lang="ts" setup>
import {ref, toRefs} from "vue";
import {svg} from "@/icons";
import {DropDown, DrawerstringGraphics} from "@/components";
const props = defineProps({
  isSwitchBgButton:{
    type: Boolean,
    required: true,
    default: false,
  },
  container:{
    type: <any>null,
    required: true,
  }
})
const {isSwitchBgButton,container} = toRefs(props)

const emit = defineEmits(['SwitchTheme','IsSwitchBg']);
// 控制抽屉是否打开
const drawerPanel = ref<boolean>(false)
// 开关默认状态
const action = ref(JSON.parse(String(localStorage.getItem('isbg')))||false)
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
  localStorage.setItem('isbg',String(args))
  emit('SwitchTheme', args);
};



const isLocal = ref<boolean>(false)

/**
 * @author WangYaFeng
 * @date 2023/10/16 1:58
 * @description 切换背景
 * @return null
 */
const switchBackgroundButton = () => {
  isLocal.value = true
  setTimeout(()=>{
    emit('IsSwitchBg',!isSwitchBgButton.value);
    isLocal.value = false
  },1000)
  // 本地缓存
  localStorage.setItem('IsSwitchBg',String(!isSwitchBgButton.value))
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
