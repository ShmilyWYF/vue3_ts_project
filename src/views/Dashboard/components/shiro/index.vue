<template>
  <div class="shiro">
    <slot name="header"/>
    <el-tree
        ref="treeRef"
        :data="data"
        :props="mappingProps"
        node-key="id"
        show-checkbox
        @change="getCheckedNodes"
        :default-expand-all="true"
        style="width: 100%;"
    />
      <el-button v-if="isHiddRestBtn" :disabled="model?.length == 0" @click="resetChecked" style="float: right">reset</el-button>
      <slot name="append"/>
  </div>
</template>

<script lang="ts" setup>
import {asyncRouterMap} from "@/router";
import {ref, toRaw} from 'vue'
import {ElTree} from 'element-plus'
const props = defineProps<{isHiddRestBtn?:boolean}>()
const model = defineModel({required:true})
const emit = defineEmits(['currSelected'])
const data = ref<Tree[]>([])
const treeRef = ref<InstanceType<typeof ElTree>>()

// 约束类型
interface Tree {
  path: string
  title: string,
  id: number,
  component?: string,
  meta?: {}
  children?: Tree[]
}

// 映射props属性
const mappingProps = {
  children: 'children',
  label: 'title',
};

// 获取异步树节点方法
const asyncTree = (asyncRoutes: any[], k?: number) => {
  let T: Tree[] = []
  let i = 1000
  asyncRoutes.forEach((e,index) => {
    i++
    const node: Tree = {
      path: e.path,
      title: e.meta.title,
      id: k != undefined ? parseInt(k + '' + index) : i,
      meta: e.meta
    };

    if (e.component) {
      let split = String(e.component).split(/\s*=>\s*/).toString();
      const regex = /import\("(\/[^?]+)?/;
      const match = split.match(regex);
      if (!match) {
        throw new Error('正则处理字符串时出现异常，请检查路由对象组件地址')
      }
      node.component = match[1]
    }

    if (Object.prototype.hasOwnProperty.call(e, 'children')) {
      node.children = asyncTree(e.children, node.id)
    }
    T.push(node)
  })
  return T;
}

// 赋值
data.value = asyncTree(asyncRouterMap)
console.log('构建tree树：', data)

interface InterfaceShiro {
  id: number,
  path: string,
  title: string,
}


// 获取当前选中
const getCheckedNodes = () => {
  const Tarray:any[] = JSON.parse(JSON.stringify(treeRef.value!.getCheckedNodes(undefined,true)))
  let T:any[] = [];
  Tarray.map((e)=>{
    if ('children' in e) delete e.children
    T.push(toRaw(e))
  })
  model.value = T
  emit('currSelected',T)
  // store.commit('routerStore/SET_MENU_TREE', data)
  // store.commit('routerStore/SET_MENU_LIST',data)  改为JDBC
}
const setCheckedKeys = (arr:[]) => {
  let nevers = arr.filter((i:{id:number})=>i.id !== 1001&&i.id != 10011).map((i:{id:number})=>i.id);
  treeRef.value!.setCheckedKeys(nevers, true)
  getCheckedNodes()
}
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
  model.value = []
}
defineExpose({
  setCheckedKeys,
  resetChecked
})
</script>

<style scoped>

</style>
