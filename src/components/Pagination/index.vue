<template>
  <el-pagination
      v-model:page-size="pageNum"
      :current-page="currentPage"
      :next-icon="svg(<string>nextSvg)"
      :page-size="pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :prev-icon="svg(<string>prevSvg)"
      :total="total!==undefined?total.length:0"
      layout="sizes,prev, pager, next"
      @size-change="updatePageSize"
      @current-change="getCurrentChange"
  />
</template>

<script lang="ts" setup>
import {svg} from "@/icons";
import {onMounted, PropType, ref, toRefs, watch} from "vue";

const props = defineProps({
  data:{
    type: Object as PropType<any>,
    required: true,
  },
  nextSvg:{
    type: String,
    default: 'moon',
  },
  prevSvg:{
    type: String,
    default: 'moon',
  },
  pageSize:{
    type: Number,
    default: 15,
  }
})
const emit = defineEmits(["paginationResults"])
const {data,nextSvg,prevSvg,pageSize} = toRefs(props)

watch(() => props.data, () => {
      emit("paginationResults", result());
    }
);

onMounted(() => {
  emit("paginationResults", result());
})

// 初始化数据
const currentPage = ref<number>(1)
const total = ref(data)
const pageNum = ref(pageSize?.value);
// 手动分页改变内存标记
const sizeChange = ref<number>(0)
const result = () => total.value !== undefined ? total.value.slice((currentPage.value - 1) * (sizeChange.value != 0 ?pageNum.value:pageSize.value), currentPage.value * (sizeChange.value != 0 ?pageNum.value:pageSize.value)) : []

/**
 * @author WangYaFeng
 * @date 2023/10/19 23:15
 * @description 分页触发事件
 * @return null
 * @param Pages
 */
const getCurrentChange = (Pages: number) => {
  currentPage.value = Pages;
  emit("paginationResults", total.value !== undefined ? total.value.slice((Pages - 1) * pageNum.value, Pages * pageNum.value) : []);
}

const updatePageSize = (pageSize: number) => {
  sizeChange.value = 1
  emit("paginationResults", total.value !== undefined ? total.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize) : []);
}

</script>

<style lang="scss" scoped>
.el-pagination {
  font-size: larger;
  position: relative;
  justify-content: center;
  padding: 1rem;
  z-index: 15;

  button {
    background: #00000000;
    @include font_color('text-color');

    &:disabled {
      display: none;
    }
  }

  .el-pager li {
    font-weight: 800;
    background: #00000000;
  }

  :deep(.el-select) {
    .el-input {
      width: 5rem;

      .el-input__wrapper {
        padding: 0;

        .el-select__icon {
          padding: 0 .25rem;
          margin: 0;
        }
      }
    }
  }
}
</style>
