<template>
  <div class="FeatureList">
    <el-card body-style="height: 100%;padding: 0" class="feature-article-list-box">
      <div class="shadow-md">
        <h2>
          <p>EDITOR'S SELECTION</p>
          <span>
             <SvgIcon name="baozi"></SvgIcon>
              <p>{{ $t('message.tag') }}</p>
          </span>
        </h2>
      </div>
    </el-card>
    <template v-for="(item,key) in list" :key="key">
      <Article :data="item" type="1" :loading="Object.keys(item).length === 0"/>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {Article} from "@/components";
import SvgIcon from "@/components/SvgIcon/index.vue";
import {ArticleInterface} from "@/interface";

const name = 'FeatureList'

defineProps<{list:ArticleInterface[]}>()
</script>

<style lang="scss" scoped>
.FeatureList {
  display: grid;
  grid-template-rows: repeat(1, 20% 39% 39%);
  grid-gap: 1% 0;
  min-height: auto;

  .feature-article-list-box {
    overflow: hidden;
    height: 100%;
    position: relative;
    z-index: 20;
    border-radius: 1rem;
    --el-card-border-color: none;
    background: $body-Background;

    &:hover {
      transform: scale(1.015);
    }

    .shadow-md {
      width: calc(100% - 0.5rem);
      height: calc(100% - 0.5rem);
      z-index: 40;
      margin: .25rem;
      @include background_color('background-color');
      border: #00000000 solid 1px;
      border-radius: 1rem;
      opacity: 0.9;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      h2 {
        padding: 1.5rem;
        line-height: 2rem;

        & > p {
          font-weight: lighter;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        span {
          width: 100%;
          position: relative;
          color: white;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          float: right;
          margin: 0 auto;
          overflow: hidden;
          text-overflow: ellipsis;

          svg {
            width: 2rem;
            height: 2rem;
          }

          p {
            font-size: 1.5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            @include font_color('text-color')
          }
        }
      }
    }
  }
}

@media (min-width: 1024px) {
  .FeatureList {
    width: calc(100% - 2%);
    height: 24rem;
    grid-template-columns: repeat(1, 18% 40% 40%);
    grid-gap: 0 2%;
    grid-template-rows: repeat(1, minmax(0, 1fr));

    .feature-article-list-box {
      height: 100%;

      .shadow-md {
        h2 {
          padding: 2rem;
          font-size: 1.875rem;
          line-height: 2.25rem;
          @include font_color('text-color')
        }
      }
    }
  }
}
</style>
