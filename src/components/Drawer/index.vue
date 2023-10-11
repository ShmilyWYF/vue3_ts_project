<template>
  <div id="drawer" @mouseup="svgMouseup">
    <el-drawer v-model="drawerPanel" :with-header="false" direction="ttb" class="el-drawer-box" @close="closeDrawer">
      <template #default>
        <span>
          <el-dropdown :hide-on-click="true" :show-timeout="sleep" @command="switchLang">
            <span class="el-dropdown-link">{{ $t('message.lang') }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="cn">{{ $t('message.cn') }}</el-dropdown-item>
                <el-dropdown-item command="en">{{ $t('message.en') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
        <el-switch v-model="action" @change="switchEvnt" :active-action-icon="svg('sun')" :inactive-action-icon="svg('moon')"/>
      </template>
    </el-drawer>
    <div class="drawerstring-Graphics" ref="slider" @mousemove="svgMousemove">
      <div class="drawerstring"/>
      <div class="drawerbutton">
        <svg-icon href="#" name="circle" @mousedown="svgMousedown"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {svg} from "@/icons";
import SvgIcon from "@/components/SvgIcon/index.vue";

const {locale} = useI18n();
const sleep = ref(500)
const emit = defineEmits(['bg']);
const action = ref(localStorage.getItem('isbg'));
// 控制抽屉是否打开
const drawerPanel = ref<boolean>(false)

onMounted(() => {
  slider.value.style.transform = `translateY(${-50}%)`
});

const switchLang = (command: string) => {
  locale.value = command
  localStorage.setItem('lang', command)
};

const switchEvnt = (args: boolean) => {
  emit('bg', args);
};

// 储存开始地址
const startPoint = ref<number>(0)
// 储存结束地址
const endPoint = ref<number>(0)
// 鼠标按压/弹起
const isDom = ref<boolean>(false)
//  ref绑定drawerstring-Graphics
const slider = ref<any>();
// 获取页面高
const clientHeight = ref(document.documentElement.clientHeight)

const svgMousedown = (evnt: MouseEvent) => {
  isDom.value = true
  const {clientY} = evnt;
  startPoint.value = clientY / clientHeight.value;
}

/**
 * @author WangYaFeng
 * @date 2023/10/11 1:50
 * @description 抽屉关闭时回调
 * @return null
 */
const closeDrawer= ()=>{
  // 获取css表
  const styleSheet = document.styleSheets[5];
  // css表注入动画
  styleSheet.insertRule(`@keyframes shake {from{ transform: translateY(${endPoint.value}%) } to { transform: translateY(-50%); }`,0);
  // 挂载动画
  slider.value.style.animation = `shake 200ms linear`;
  setTimeout(()=>{
    slider.value.style.transform = "translateY(-50%)"
  },190)
  // 卸载动画
  slider.value.addEventListener('animationend',()=>{
    slider.value.style.animation = '';
  })
}

/**
 * @author WangYaFeng
 * @date 2023/10/11 1:49
 * @description
 * @return null
 * @param evnt
 */
const svgMousemove = (evnt: MouseEvent) => {
  if (!isDom.value) return
  const {clientY} = evnt;
  endPoint.value = Number((((clientY / clientHeight.value) - startPoint.value) * 100 - 50).toFixed(2))
  if(endPoint.value < -50) return;
  slider.value.style.transform = `translateY(${endPoint.value}%)`
  endPoint.value > -45 ? drawerPanel.value = true:drawerPanel.value = false
}

const svgMouseup = (even: MouseEvent) => {
  isDom.value = false
}


</script>

<style scoped lang="scss">
@media (max-width: 1024px) {
  #drawer {
    display: none !important;
  }
}

#drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .drawerstring-Graphics {
    width: 2.5%;
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    z-index: 15;
    .drawerstring {
      position: relative;
      width: 4.25%;
      height: 70%;
      background: rgb(51, 51, 51);
    }

    .drawerbutton {
      height: 30%;

      svg {
        position: relative;
        top: 0;

        &:hover {

        }
      }
    }
  }
}

:global(.el-overlay) {
  width: 95% !important;
  margin: 0 auto;
  background: #00000000 !important;
  z-index: 10 !important;
}

:global(.el-drawer-box) {
  width: 20% !important;
  height: 10% !important;
  opacity: 0.9;
  border: 0 solid;
  position: absolute !important;
  left: auto !important;
  @include background_color('background-color');
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  span {
    font-size: 90%;
    line-height: 2.2rem;
  }
}
:global(.el-drawer__body){
  z-index: 10 !important;
}
</style>
