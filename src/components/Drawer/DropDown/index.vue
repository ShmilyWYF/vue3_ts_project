<template>
  <el-dropdown :hide-on-click="true" :show-timeout="sleep" @command="switchLang" v-if="isMultiLanguage !== 1">
    <span class="el-dropdown-link"><svg-icon name="lang"/>{{ $t('message.lang') }}</span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="cn">{{ $t('message.cn') }}</el-dropdown-item>
        <el-dropdown-item command="en">{{ $t('message.en') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <slot name="default"/>
</template>

<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";
import store from "@/store";

const {locale} = useI18n();
const isMultiLanguage = computed(()=>store.getters.useState.websiteConfig.multiLanguage)
const sleep = ref(500)

const switchLang = (command: string) => {
  locale.value = command
  localStorage.setItem('lang', command)
};


</script>
<style lang="scss" scoped>
.el-dropdown {
  .el-dropdown-link {
    width: auto;
    outline: #00000000 auto 0;
    border-radius: 0.5rem;
    padding: 0.5rem;
    color: $text-font-color-light;
    display: flex;
    column-gap: .25rem;
    align-items: center;

    &:hover {
      background-color: $background-dark;
    }
  }
}
</style>
