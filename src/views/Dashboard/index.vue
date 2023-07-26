<template>
  <div>
    <el-button type="primary" @click="ok()" text="text">调用API</el-button>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'index',
  setup() {
    return {}
  },
  methods: {
    ok() {
      const data = {
        a: 1,
        b: 2,
        c: {
          type: "测试"
        }
      }
      store.dispatch('user/login', data).then((res) => {
        console.log(res)
        const op = store.getters.name
        console.log('---->', op)
      })
    }
  }
}
</script>

<style scoped>

</style>
