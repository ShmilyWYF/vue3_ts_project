<template>
  <ul id="sidebar-navigator" class="sidebar-navigator">
    <li class="back">
      <div @click="goBack">
        <svg-icon name="back" color="inherit" style="transform: rotateY(180deg)"/>
      </div>
    </li>
    <li class="top">
      <div @click="backToTop">
        <svg-icon name="back-to-top" color="inherit"/>
      </div>
    </li>
    <li class="jumpToComments">
      <div @click="jumpToComments">
        <svg-icon name="quotation-marks" color="inherit"/>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {useRouter} from 'vue-router'
import {ref, toRefs} from "vue";
import {SvgIcon} from "@/components";

const router = useRouter()
const commentOffset = ref(0)
const commentEl = ref()

const svgIconClor = ref<boolean>(false)

const props = defineProps<{ jumpToComponent: any }>()
let {jumpToComponent} = toRefs(props)

const backToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const goBack = () => {
  router.back()
}

const jumpToComments = () => {
  commentEl.value = jumpToComponent.value.$el
  if (commentEl.value) {
    commentOffset.value = commentEl.value && commentEl.value instanceof HTMLElement ? commentEl.value.offsetTop + 330 : 0
  }
  window.scrollTo({
    top: commentOffset.value,
    behavior: 'smooth'
  })
}

</script>

<style lang="scss" scoped>
#sidebar-navigator {
  display: flex;
  flex-direction: row;
  justify-items: center;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  gap: .25rem;

  li {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: .75rem;
    border-radius: .75rem;
    @include background_color('background-color');

    div {
      &:hover {
        svg{
          fill: #5433ff;
        }
      }
      svg {
        pointer-events: none;
      }
    }
  }

  .back {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .top {
    border-radius: 0;
  }

  .jumpToComments {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

}
</style>
