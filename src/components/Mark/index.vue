<template>
    <mavon-editor
        v-model="articleContext"
        :navigation="navigation"
        :ishljs="true"
        :defaultOpen="isEdit?'edit':'preview'"
        :toolbarsFlag="toolbarsFlag"
        :editable="iseditable"
        :subfield="issubfield"
        :codeStyle="codeStyle"
        @change="markCall"
        :html="true"
        class="mark"
        ref="markdownRef"
    />
</template>
<script setup lang="ts">
import { mavonEditor } from 'mavon-Editor'
import 'mavon-editor/dist/css/index.css'
// import markdownItMermaid from '@liradb2000/markdown-it-mermaid'
// mavonEditor.getMarkdownIt(markdownItMermaid)
import {nextTick, ref, toRefs, computed} from "vue";
const props:any = defineProps({
  editMode:{
    type: Boolean,
    required: true,
    default:false
  },
  content:{
    type: String,
  }
})

// const markdownRef:any = ref<Element>()
const emit = defineEmits(['markTocEvnt'])
const {editMode,content} = toRefs(props);

//prop为只读属性,需要深拷贝
const deepValue = JSON.stringify(content.value)
const articleContext = ref(JSON.parse(deepValue))

// 默认值为空，允许设置为 edit编辑模式和preview预览模式
const isEdit = ref<boolean>(<ReturnType<boolean|any>>editMode)
// 默认开启分栏模式，也就是左侧编辑，右侧实时预览。
const issubfield = ref<boolean>(<ReturnType<boolean|any>>editMode)
// 是否可以编辑内容，默认为true
const iseditable = ref<boolean>(<ReturnType<boolean|any>>editMode)
// 设置工具栏目是否显示，默认为true
const toolbarsFlag = ref<boolean>(<ReturnType<boolean|any>>editMode)
// 编辑器的侧边导航栏，默认为false
const navigation = ref<boolean>(<ReturnType<boolean|any>>editMode)
// 配色方案
const codeStyle = ref<string>('code-github')

const markCall = () =>{
  nextTick(()=>{
    // 渲染后需要延迟1s
    setTimeout(()=>{
      // 给元素添加id
      const element = <Element>document.querySelector('.v-show-content');
      let reg = /^H[1-4]$/
      for (let i = 0; i < element.children.length; i++) {
        if(reg.test(element.children[i].tagName)){
          element.children[i].id = String(i)
        }
      }
      emit('markTocEvnt','.v-show-content')
    },1000)
  })
}
</script>

<style scoped lang="scss">
.mark{
  width: 95%;
  min-height: 5rem;
  border-radius: 1rem;
  word-wrap: break-word;
  word-break: break-all;
  @include background_color('background-color');
  @include box_shadow('box-card-shadow-sidebar-card');
  :deep(.v-show-content){
    background: transparent !important;
    color: #bebebe;
    h1,h2,h3,h4,h5,h6 {
      border-bottom: none !important;
      position: relative;
      @include font_color('text-color');
      &:after{
        width: 3rem;
        position: absolute;
        left: 0;
        height: .25rem;
        border-radius: 1rem;
        content: '';
        background: $body-Background;
      }
    }
    h1{
      &:after{
        bottom: 0;
      }
    }
    h2{
      &:after{
        bottom: -.1rem;
      }
    }
    h3{
      &:after{
        bottom: -.45rem;
      }
    }
    h4{
      &:after{
        bottom: -.55rem;
      }
    }
    h5{
      &:after{
        bottom: -.65rem;
      }
    }
    h6{
      &:after{
        bottom: -.75rem;
      }
    }
    p{
      margin-top: .75rem;
      margin-bottom: .75rem;
      line-height: 2;
      @include font_color('text-color');
      strong,code{
        margin: 0;
        color: #24c6dc;
        padding: .1rem .3rem;
        border-radius: .3rem;
        word-wrap: break-word;
        background-color: rgba(14,210,247,.05);
      }
    }
    pre{
      border-radius: 1rem;
      @include background_color('background-primary');
      code{
        @include font_color('text-color-primary');
      }
      div{
        background-color: transparent;
        code{
          color: #bebebe;
          white-space: pre-wrap;
        }
      }
      &:hover{
        @include box_shadow('box-card-shadow-sidebar')
      }
    }
    ul{
      li{
        @include font_color('text-color-primary');
      }
    }
  }
}

</style>
