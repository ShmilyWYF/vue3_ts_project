<template>
  <el-card class="introduction">
    <el-skeleton animated :loading="Object.keys(data).length === 0">
      <template #template>
        <div style="display: flex;flex-direction: column;justify-content: flex-start;align-items: center;">
          <ul style="padding-top: 1rem;gap: 1rem" class="introduction-top">
            <li>
              <el-skeleton-item variant="circle" style="width: 6.5rem;height: 6.5rem;position: relative;"/>
            </li>
            <li>
              <el-skeleton-item variant="h1" style="height: 2.5rem;position: relative;"/>
              <hr style="width: 5rem;height: .25rem;"/>
            </li>
            <li>
              <el-skeleton-item variant="p" style="height: 1.25rem;width: 10rem;position: relative;"/>
            </li>
          </ul>
          <ul class="introduction-footer">
            <li>
              <el-skeleton-item variant="image" style="width: 2.5rem;height: 2.5rem;position: relative;"/>
            </li>
            <ul style="gap:1rem">
              <li v-for="index in 4" style="display: flex;flex-direction: column;align-items: center;gap: 1rem">
                <el-skeleton-item variant="p" style="height: 2rem;width: 3rem;position: relative;"/>
                <el-skeleton-item variant="p" style="height: 1rem;width: 1.5rem;position: relative;"/>
              </li>
            </ul>
          </ul>
        </div>
      </template>
      <template #default>
        <div>
          <ul class="introduction-top">
            <li style="padding-top: 1rem">
              <img :src="data.img" alt="头像"/>
            </li>
            <li>
              <h2>{{ data.nickname }}</h2>
              <hr/>
            </li>
            <li>
              <p>{{ data.description }}</p>
            </li>
          </ul>
          <ul class="introduction-footer">
            <li>
              <a :href="data.url">
                <svg-icon name="github"/>
              </a>
            </li>
            <ul>
              <li v-for="(item,key) in data.childer" :key="key">
                <span>{{ item.articleCount }}</span>
                <p>{{ item.title }}</p>
              </li>
            </ul>
          </ul>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>
<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
import {IntroductionInterface} from "@/interface";

defineProps<{ data: IntroductionInterface }>()
</script>
<style lang="scss" scoped>
.introduction {
  height: 100%;
  width: calc(95% - 3%) !important;
  padding: 1.5% 1.5% 2% 1.5% !important;
  display: flex;
  align-items: flex-end;
  background: $body-Background-Anti;
  border: 0 #00000000;
  border-radius: .75rem;
  position: relative;
  margin: 0 auto;

  :deep(.el-card__body) {
    height: 90% !important;
    width: 100%;
    border: 0 #00000000;
    padding: .25rem !important;
    border-radius: .75rem;
    @include background_color('background-primary');
    opacity: 0.9;

    div {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 15;
      display: flex;
      flex-direction: column;
      justify-content: center;

      ul {
        padding-inline-start: 0;

        li {
          @include font_color('text-color');

          h2 {
            margin-top: 5%;
            font-weight: 600;
            font-size: xx-large;
          }

          hr {
            height: 5%;
            width: 50%;
            border: 0 solid;
            border-radius: 1rem;
            background: $body-Background;
          }
        }
      }

      .introduction-top {
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        list-style-type: none;
        flex: 1 1 0;

        li {
          position: relative;
          flex: 1 1 0;

          img {
            height: 5rem;
            width: 5rem;
            position: relative;
            outline: 5px white solid;
            border-radius: 50%;
            min-width: 100%;
            min-height: auto;
          }
        }
      }

      .introduction-footer {
        height: 35%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        list-style-type: none;

        ul {
          margin-top: 5%;
          width: 90%;
          display: grid;
          font-size: 1.125rem;
          line-height: 1.75rem;
          padding-top: 1rem;
          grid-template-columns: repeat(4, minmax(0, 1fr));

          li {
            text-align: center;
            list-style-type: none;
            grid-column: span 1/span 1;

            p {
              font-size: 1rem;
              line-height: 1.5rem;
            }
          }
        }
      }
    }
  }
}
</style>
