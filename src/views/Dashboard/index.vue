<template>
  <div class="el-tree">
    <el-tree
        ref="treeRef"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1]"
        :default-checked-keys="[13]"
        :props="mappingProps"/>

    <div class="buttons">
      <el-button @click="getCheckedNodes">设置导航</el-button>
      <el-button @click="setCheckedKeys">set by key</el-button>
      <el-button @click="resetChecked">reset</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {asyncRouterMap} from "@/router";
import { ref, toRaw} from 'vue'
import store from "@/store";

const data = ref<[]>([])
const treeRef = ref()

// 限定接口
interface Tree {
  path: string
  title: string,
  id: number,
  children: [{
    title: string,
    path: string,
    id: number,
  }]
}

// 映射props属性
const mappingProps = {
  children: 'children',
  label: 'title',
};

// 获取异步树节点方法
const asyncTree = (tree: any[]):[] => {
  const treeData: any = []
  let i = 0;
  tree.forEach((res: any) => {
    i++;
    const tem: Tree = {
      path: res.path,
      title: res.meta?.title,
      id: i,
      children: [] as any
    };
    if (res.children) {
      let j = 0;
      res.children.forEach((key:{ meta: { title: string; }; path: string; }) => {
        j++;
        tem.children.push({
          title: key.meta.title,
          path: key.path,
          id: parseInt(i + '' + j),
        })
      })
    }
    treeData.push(tem)
  })
  return treeData
}
// 赋值
data.value = asyncTree(asyncRouterMap)
console.log('构建tree树：', data)

// 获取当前选中+半选中的值
const getCheckedNodes = () => {
   const data = treeRef.value!.getHalfCheckedNodes().map((res: any) => {
    let tempTerr: any = [];
    // 获得入栈对象
    Object.assign(tempTerr, res)
    // 获得选中节点id
    let listID = toRaw(tempTerr.children).map((res: { id: number }) => {
      return res.id
    })
    // 获得子id
    let tempChildren = [] as any[]
    treeRef.value!.getCheckedNodes(false, false).forEach((res: any) => {
      let raw = toRaw(res);
      if (listID.includes(raw.id)) {
        tempChildren.push(raw)
      }
    })
    // 合并对象属性
    tempTerr.children = tempChildren
    return tempTerr
  })
  store.commit('routerStore/SET_MENU_TREE',data)
  // store.commit('routerStore/SET_MENU_LIST',data)  改为JDBC
  console.log(data, 'get节点对象组')
}

const setCheckedKeys = () => {
  treeRef.value!.setCheckedKeys([13, 14, 15], false)
}
const resetChecked = () => {
  treeRef.value!.setCheckedKeys([], false)
}
</script>

<style scoped>

</style>
