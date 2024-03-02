<template>
  <div :style="{'height': h,'width': w}" class="sidebar">
    <el-card>
      <template #header>
        <p>
          <svg-icon :name="icon"/>
          <span>{{ title }}</span>
          <hr/>
        </p>
      </template>
      <template v-show="showContext" #default>
        <ul :class="{'sidebar-ul':defaultClass}" :style="data != ''?{display: ulDisplay }:{display: 'none'}">
          <li v-for="(item,key) in data" :key="item.id||key" :style="ulLiStyle" :class="ulLiClass">
            <slot :item="item" :$index="item.id||key" name="content" :afterRender="afterRender"/>
          </li>
        </ul>
        <slot name="defulet" :afterRender="afterRender"/>
      </template>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import {nextTick, onMounted, ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: '未定义',
  },
  icon: {
    type: String,
    required: true,
  },
  data: {
    type: [Array],
    required: false,
    default: [''],
  },
  h: {
    type: String,
    required: false,
    default: '10.5rem',
  },
  w: {
    type: String,
    required: false,
    default: '100%',
  },
  ulDisplay: {
    type: String,
    required: false,
    default: 'block',
  },
  ulLiStyle: {
    required: false,
    default: '',
  },
  ulLiClass: {
    required: false,
    default: '',
  },
  showContext: {
    type: Boolean,
    required: false,
    default: true,
  },
  defaultClass: {
    type: Boolean,
    required: false,
    default: true,
  }
})
const afterRender = ref<boolean>(false)
onMounted(()=>{
  nextTick(()=>{
    afterRender.value = true
  })
})
</script>
<style lang="scss" scoped>
.sidebar {
  min-height: 10.5rem;
  min-width: 10.5rem;
  margin: 0 auto;
  padding-bottom: .5rem;

  .el-card {
    height: calc(100% - 2.5rem);
    width: calc(100% - 2.5rem);
    border: 0 #00000000;
    border-radius: 1.25rem;
    position: relative;
    padding: 1.25rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-rows: minmax(2.5rem, 0fr);
    @include background_color('background-color');
    @include box_shadow('box-card-shadow-sidebar-card');
    @include font_color('text-color');

    :deep(.el-card__header) {
      height: 100%;
      padding: 0;
      border-bottom: none;
      position: relative;

      p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.5rem;
        @include font_color('text-color');

        span {
          font-weight: 600;
          font-size: larger;
        }

        hr {
          height: 0.2rem;
          width: 3.5rem;
          border: 0 solid;
          border-radius: 1rem;
          background: $body-Background;
          position: absolute;
          bottom: 0;
        }
      }
    }

    :deep(.el-card__body) {
      height: 100%;
      width: 100%;
      padding: 0;
      background: #00000000;
      position: relative;

      .sidebar-ul {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;

        li {
          box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, .05);
          padding: .75rem .5rem;
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-items: center;
          flex-wrap: wrap;
          column-gap: 5%;
          row-gap: 1rem;
          margin-bottom: .375rem;
          border-radius: .5rem;
          @include background_color('background-primary');
          transition-property: box-shadow;
          transition-timing-function: cubic-bezier(.4, 0, .2, 1);
          transition-duration: .15s;

          &:hover {
            @include box_shadow('box-card-shadow-sidebar');
          }

        }
      }
    }
  }
}


</style>
