<template>
  <mavon-editor
      ref="markdownRef"
      v-model="reactiveData.content"
      :codeStyle="codeStyle"
      :defaultOpen="editMode?'edit':'preview'"
      :editable="editMode"
      :html="true"
      :ishljs="true"
      :navigation="editMode"
      :style="{'--show-content-bg':editMode?'transparent':''}"
      :subfield="false"
      :toolbarsFlag="editMode"
      class="mark"
      @fullScreen="fullScreenEvnt"
      @imgAdd="imgAdd"
      @save="cacheDrafts"
      @navigationToggle="console.log('输出',$event)"
      >
    <template #left-toolbar-after v-if="isExitBtn&&editMode">
      <!--自定义退出按钮-->
        <el-button type="primary" aria-hidden="true" color="op-icon fa" title="退出编辑" @click="emit('exitEvnt')" style="padding: .3rem;margin: 0;height: inherit;border: none">
            <svg-icon name="exit" color="#c62459" size="1.15"/>
        </el-button>
    </template>
  </mavon-editor>
</template>
<script lang="ts" setup>
import {mavonEditor} from 'mavon-Editor'
import 'mavon-editor/dist/css/index.css'
// import markdownItMermaid from '@liradb2000/markdown-it-mermaid'
// mavonEditor.getMarkdownIt(markdownItMermaid)
import {computed, nextTick, onUnmounted, reactive, ref, toRefs, watch} from "vue";
import api from "@/axios";
import SvgIcon from "@/components/SvgIcon/index.vue";

const emit = defineEmits(['markTocEvnt', 'saveCache', 'fullScreen', 'unMarkbefor','exitEvnt','update:modelValue'])
const props: any = withDefaults(defineProps<{editMode?:boolean,isExitBtn?:boolean,modelValue:string}>(),{
  editMode: false,
  isExitBtn: true,
  modelValue: ''
})
const {editMode,modelValue} = toRefs(props);

const reactiveData = reactive({
  content: modelValue.value
})

watch(()=>modelValue.value,(value) => {
  reactiveData.content = value
})

// 获取编辑器Vue实例子
const markdownRef = ref<any>({})

// 配色方案
const codeStyle = ref<string>('code-github')

nextTick(() => {
  document.documentElement.scrollIntoView({behavior: "smooth"})
  // 渲染后需要延迟1s
  setTimeout(() => {
    // 给元素添加id
    const element = <Element>document.querySelector('.v-show-content');
    let reg = /^H[1-4]$/
    for (let i = 0; i < element.children.length; i++) {
      if (reg.test(element.children[i].tagName)) {
        element.children[i].id = String(i)
      }
    }
    emit('markTocEvnt', '.v-show-content')
  }, 1500)
})

/**
 * @author WangYaFeng
 * @date 2023/11/3 1:24
 * @description 缓存草稿
 * @param centent
 */
const cacheDrafts = (centent: string) => {
  emit('saveCache', centent)
}

// 切换全屏
const fullScreenEvnt = (bl: boolean) => {
  emit('fullScreen', bl)
}

// 上传图片
const imgAdd = (index: any, file: any) => {
  let formdata = new FormData();
  formdata.append('image', file);
  // axios在接收formdata类型参数时会强制删除content-type浏览器识别空设置为默认false
  api.imgApi.uploadImg(formdata).then((res: any) => {
    const {data} = res.data
    // 第二步.将返回的url替换到文本原位置!
    markdownRef.value.$img2Url(index, data);
  })
}

//在页面销毁之前先销保存内容
onUnmounted(() => {
  emit('unMarkbefor', reactiveData.content)
})
</script>

<style lang="scss" scoped>
.mark {
  height: 100%;
  width: 100%;
  min-height: 5rem;
  border-radius: 1rem;
  word-wrap: break-word;
  word-break: break-all;
  @include background_color('background-color');
  @include box_shadow('box-card-shadow-sidebar-card');

  :deep(.v-note-op) {
    border: none;
    @include background_color('background-color');

    div {
      button {
        @include font_color('text-color');

        &:hover {
          background-color: $text-color-secondary !important;
        }
      }

      .selected {
        @include background_color('background-deputy')
      }
    }
  }

  :deep(.v-show-content) {
    @include background_color('background-color');
    color: #bebebe;
    border-radius: 1rem;
    padding: 2rem;

    h1, h2, h3, h4, h5, h6 {
      border-bottom: none !important;
      position: relative;
      @include font_color('text-color');

      &:after {
        width: 3rem;
        position: absolute;
        left: 0;
        height: .25rem;
        border-radius: 1rem;
        content: '';
        background: $body-Background;
      }
    }

    h1 {
      &:after {
        bottom: 0;
      }
    }

    h2 {
      &:after {
        bottom: -.1rem;
      }
    }

    h3 {
      &:after {
        bottom: -.45rem;
      }
    }

    h4 {
      &:after {
        bottom: -.55rem;
      }
    }

    h5 {
      &:after {
        bottom: -.65rem;
      }
    }

    h6 {
      &:after {
        bottom: -.75rem;
      }
    }

    p {
      margin-top: .75rem;
      margin-bottom: .75rem;
      line-height: 2;
      @include font_color('text-color');

      strong, code {
        margin: 0;
        color: #24c6dc;
        padding: .1rem .3rem;
        border-radius: .3rem;
        word-wrap: break-word;
        background-color: rgba(14, 210, 247, .05);
      }
    }

    pre {
      border-radius: 1rem;
      @include background_color('background-primary');

      code {
        @include font_color('text-color-primary');
        white-space: normal;
      }

      div {
        background-color: transparent;

        code {
          color: #bebebe;
          white-space: pre-wrap;
        }
      }

      &:hover {
        @include box_shadow('box-card-shadow-sidebar')
      }
    }

    ul {
      li {
        @include font_color('text-color-primary');
      }
    }
  }

  :deep(.v-note-panel) {
    .v-note-edit {
      overflow: auto;

      .content-input-wrapper {
        min-height: 100%;
        @include background_color('background-secondary');

        .content-input {
          min-height: 50rem;
          @include background_color('background-color');
          border-radius: 1rem;

          .no-border {
            padding: 1.25rem;
            background-color: transparent;
            @include font_color('text-color');
            @include box_shadow('box-card-shadow-tabs')
          }
        }
      }
    }

    .single-edit {
      flex: 1 !important;
    }

    .v-note-navigation-wrapper {
      border: none;
      padding: .75rem;
      @include background_color('background-secondary');

      .v-note-navigation-title {
        font-weight: 800;
        border-top-left-radius: .75rem;
        border-top-right-radius: .75rem;
        border-bottom: 1px solid #808080;
        @include font_color('text-color');
        @include background_color('background-color');
      }

      .v-note-navigation-content {
        border-bottom-left-radius: .75rem;
        border-bottom-right-radius: .75rem;
        @include background_color('background-color');
      }
    }
  }

}

</style>
