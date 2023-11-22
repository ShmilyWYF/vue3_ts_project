<template>
  <svg aria-hidden="true" :style="{'--size': size+'rem'}">
    <use :fill="color" :href="symbolId"/>
  </svg>
</template>

<script lang="ts" setup>
import {computed, toRefs} from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#333',
  },
  size: {
    type: String,
    required: false,
    default: '1.5',
  },
})
const {prefix,name} = toRefs(props)
const symbolId = computed(() => `#${prefix?.value}-${name?.value}`)
</script>

<style lang="scss" scoped>
svg {
  width: var(--size);
  height: var(--size);
}
</style>
