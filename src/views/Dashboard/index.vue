<template>
  <div>
    <el-button type="primary" @click="ok()" text="text">调用API</el-button>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'index',
  setup () {
    return {}
  },
  methods: {
    ok () {
      store.dispatch('user/login', '123').then((res) => {
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
