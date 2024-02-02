<template>
  <div :style="{'--use-height': h}" class="Article">
    <el-card body-style="padding: 0;height: 100%;" style="height: 100%">
      <el-skeleton :loading="loading" style="height: 100%;" animated>
        <template #template>
          <div :class="{'feature-article-horizontal':type ==='0','feature-article-Vertical':type === '1'}">
            <el-skeleton-item variant="image" style="background: none" class="feature-thumbnail"/>
            <el-skeleton class="feature-content" style="width: unset;z-index: 50" animated>
              <template #template>
                <div style="display: flex;gap: 1rem;margin-bottom: 1rem">
                  <el-skeleton-item variant="h1" style="width: 20%"/>
                  <el-skeleton-item variant="h1" style="width: 20%"/>
                </div>
                <el-skeleton :rows="3" style="width: 75%;" animated/>
                <div class="article-footer">
                  <div style="display: flex;align-items: center;flex: 1;gap: 1rem;">
                    <el-skeleton-item variant="circle" style="width: 1.5rem;height: 1.5rem;"/>
                    <el-skeleton-item variant="p" style="width: 50%"/>
                  </div>
                </div>
              </template>
            </el-skeleton>
          </div>
        </template>
        <template #default>
          <div :class="{'feature-article-horizontal':type ==='0','feature-article-Vertical':type === '1'}">
            <div class="feature-thumbnail">
              <img :src="data.articleCover"
                   alt="背景图片">
              <span class="thumbnail-screen"
                    style="background: linear-gradient(130deg, rgb(36, 198, 220), rgb(84, 51, 255) 41.07%, rgb(255, 0, 153) 76.05%);"/>
            </div>
            <div class="feature-content">
            <span>
              <b>{{ data.categoryName }}</b>
              <ul>
                <li v-for="(item,key) in data.tags" :key="key">
                  <em># {{ item.tagName }}</em>
                </li>
              </ul>
            </span>
              <h1 class="article-title">
                <router-link :to="/articles/+data.id">
                  <span>{{ data.articleTitle }}</span>
                </router-link>
              </h1>
              <p>
                {{ data.articleContent }}
              </p>
              <div class="article-footer">
                <div class="items-center">
                  <img :src="data.author.avatar" alt="头像">
                  <span class="text-ob">
                  <strong class="text-ob-normal">
                      {{ data.author.nickname }}
                  </strong>
                  <strong class="text-ob-normal" style="margin: 0 0 0 5px;">
                    发布于 {{ timeZh(data.createTime) }}
                  </strong>
                </span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import {ArticleInterface} from "@/interface";
import {timeZh} from "@/utils/timeZH";

const name: string = 'HorizontalArticle';

const props = withDefaults(defineProps<{ data: ArticleInterface, type?: string, h?: string, loading?: boolean }>(), {
  type: '0',
  h: '100%',
  loading: false
})
</script>
<style lang="scss" scoped>
.Article {
  width: 100%;
  min-height: 20rem;
  border-radius: 1rem;
  border: 0 solid #FFFFFF00;
  position: relative;
  z-index: 10;
  --feature-box-card-shadow-light: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  --el-border-color-light: #ffffff00 !important;
  --el-fill-color-blank: #ffffff00 !important;

  .feature-article-horizontal {
    height: 100%;
    z-index: 10;
    display: grid;
    position: relative;
    top: 0;
    @include background_color('background-color');
    grid-template-rows: repeat(1, 30% 70%);
  }

  @media (min-width: 1024px) {
    .feature-article-horizontal {
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: 100%;

      .feature-thumbnail {
        img {
          height: 100%;
          width: 120%;
        }

        &:after {
          left: 70%;
          top: 0;
          width: 55%;
          @include background_color('gradient-cover');
        }
      }

      .thumbnail-screen {
        height: 100%;
      }

      .feature-content {
        padding: 3rem;
        grid-row: auto;

        p {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }

        h1 {
          font-size: 2.25rem;
          line-height: 2.5rem;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }
      }
    }
  }

  .feature-article-Vertical {
    height: 100%;
    z-index: 10;
    display: grid;
    position: relative;
    top: 0;
    @include background_color('background-color');
    grid-template-rows: repeat(1, minmax(0, 1fr)) !important;

    .feature-content {
      p {
        font-size: 1rem;
        line-height: 1.5rem;
        margin-bottom: .5rem;
        word-wrap: break-word;
        word-break: break-all;
      }
    }

    @media (min-width: 1024px) {
      .feature-content {
        h1 {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
        }
      }
    }

    .thumbnail-screen {
      width: 100% !important;
    }
  }

  // 共享属性
  .el-card {
    border-radius: 1rem;
  }

  .el-card:hover {
    transform: scale(1.015);
  }

  .feature-thumbnail {
    height: 100%;
    position: relative;
    grid-row: span 1/span 1;

    &:after {
      pointer-events: none;
      content: '';
      position: absolute;
      z-index: 35;
      left: 0;
      top: 0;
      height: 125%;
      width: 100%;
      @include background_color('article-cover-cred');
    }

    img {
      background-repeat: no-repeat;
      background-size: cover;
      display: block;
      height: 120%;
      -o-object-fit: cover;
      object-fit: cover;
      position: absolute;
      left: 0;
      width: 100%;
      z-index: 20;
    }
  }

  .thumbnail-screen {
    height: 120%;
    opacity: .4;
    pointer-events: none;
    position: absolute;
    left: 0;
    width: 120%;
    z-index: 30;
    max-width: 120%;
    mix-blend-mode: screen;
  }

  span {
    z-index: 30;
    display: flex;
    flex-direction: row;
  }

  .feature-content {
    background-color: transparent;
    display: flex;
    flex-direction: column;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1.5rem;
    position: relative;
    z-index: 40;
    grid-row: span 2/span 2;

    p {
      @include font_color('text-color');
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }

    b {
      font-size: .75rem;
      line-height: 1rem;
      color: #24c6dc;
      text-transform: uppercase;
    }

    @media (min-width: 1024px) {
      b {
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }

    b, strong {
      font-weight: bolder;
    }

    ul {
      display: inline-flex;
      font-size: .75rem;
      line-height: 1rem;
      padding-left: 1rem;

      li {
        margin-right: .75rem;

        em {
          @include font_color('text-color-primary')
        }
      }
    }

    @media (min-width: 1024px) {
      ul {
        flex: 1;
        width: 0;
        font-size: 1rem;
        line-height: 1.5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    h1 {
      font-weight: 800;
      font-size: 1.5rem;
      line-height: 2rem;
      margin-bottom: 1.5rem;
      @include font_color('text-color');

      a {
        display: inline-block;
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
        transition-property: all;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        transition-duration: .15s;

        &:hover {
          @include font_color('text-color-a-hover')
        }
      }
    }

    .article-footer {
      margin-top: 13px;
      display: flex;
      align-items: flex-end;
      align-content: flex-end;
      justify-content: flex-start;
      flex: 1 1 0;
      font-size: .875rem;
      line-height: 1.25rem;
      width: 100%;

      .items-center {
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
          border-radius: 9999px;
          margin-right: .5rem;
          height: 28px;
          width: 28px;
          max-width: 100%;
          cursor: pointer;
        }

        .text-ob {
          color: #6d6d6d;

          .text-ob-normal {
            padding-right: .375rem;
            @include font_color('text-color');
          }
        }
      }
    }
  }

}

@media screen and (min-width: 1024px) {
  .Article {
    height: var(--use-height);
  }
}

.el-skeleton {
  @include skeleton();
}
</style>
