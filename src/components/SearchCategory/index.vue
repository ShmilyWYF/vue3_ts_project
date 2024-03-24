<template>
  <div>
    <el-select
        v-model="reactiveDate.value"
        :loading="categoryloading"
        :multiple="false"
        :remote-method="searchCategories"
        allow-create
        default-first-option
        filterable
        :placeholder="$t('backstage.inputDescription')"
        remote
        reserve-keyword
        value-key="id"
        @change="change"
    >
      <template #prefix>
        <el-tag
            v-show="modelValue"
            :closable="true"
            :style="tagClass"
            type="success"
            @close="change('')">
          {{ modelValue }}
        </el-tag>
      </template>
      <el-option v-for="item in categorylist" :key="item.id" :label="item.categoryName" :value="item.categoryName"/>
    </el-select>
  </div>
  <slot name="default" :value="modelValue"/>
</template>

<script lang="ts" setup>
import api from "@/axios";
import {AxiosResponse} from "axios";
import {PropType, reactive, ref, toRefs} from "vue";

const props = defineProps({
  modelValue: {
    type: String as PropType<any>,
    required:false,
    default: '',
  },
  tagClass: {
    type: String as PropType<any>,
    required:false,
    default: '',
  }
})
const {modelValue} = toRefs(props)

const reactiveDate = reactive({
  value: modelValue?.value
})

const emit = defineEmits(['update:modelValue','vChange'])
// category选择器加载
const categoryloading = ref<boolean>(false)
// category列表
const categorylist = ref<any>([])

// 远程搜索
const searchCategories = (query: any) => {
  if (query !== '') {
    categoryloading.value = true
    api.categoryApi.getCategorys().then((res: AxiosResponse) => {
      const {data} = res.data
      categorylist.value = data.filter((item: any) => {
        return item.categoryName.toLowerCase().includes(query.toLowerCase())
      });
      categoryloading.value = false
    })
  } else {
    categorylist.value = []
  }
}
const change = (value:string)=>{
  emit('update:modelValue',value)
}
</script>

<style scoped lang="scss">
</style>
