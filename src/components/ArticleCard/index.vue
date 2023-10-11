<template>
  <div class="Article">
    <el-card style="height: 100%" body-style="padding: 0;height: 100%;">
      <div :class="{'feature-article-horizontal':type ==='0','feature-article-Vertical':type === '1'}">
        <div class="feature-thumbnail">
          <img class="ob-hz-thumbnail"
               :src="data.bgimg" alt="背景图片">
          <span class="thumbnail-screen" style="background: linear-gradient(130deg, rgb(36, 198, 220), rgb(84, 51, 255) 41.07%, rgb(255, 0, 153) 76.05%);"/>
        </div>
        <div class="feature-content">
          <span>
            <b>{{ data.type }}</b>
            <ul>
              <li>
                <em>{{ data.index }}</em>
              </li>
            </ul>
          </span>
          <h1 class="article-title">
            <a>
              <router-link :to="data.to">
                <span>{{ data.title }}</span>
              </router-link>
            </a>
          </h1>
          <p>
            {{ data.desc }}
          </p>
          <div class="article-footer">
            <div class="flex flex-row items-center">
              <img class="cursor-pointer" :src="data.avatar" alt="头像">
              <span class="text-ob">
                <strong class="text-ob-normal pr-1.5 cursor-pointer">
                    {{ data.author }}
                </strong>
                <strong class="text-ob-normal pr-1.5 cursor-pointer" style="margin: 0 0 0 5px;">
                  发布于 {{ timeZh(data.datatime) }}
              </strong>
            </span>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import {ArticleInterface} from "@/interface";

const name: string = 'HorizontalArticle';
import {timeZh} from "@/utils/timeZH";

defineProps({
  data: {
    types: {} as  ArticleInterface,
    required: true
  },
  type: {
    default: 0,
    types: Number||String,
    required: true,
  },
})

</script>
<style scoped lang="scss">
.Article {
  width: 100%;
  height: 100%;
  margin: var(--margin);
  border-radius: 1rem;
  border: 0 solid #FFFFFF00;
  position: relative;
  z-index: 10;
  --feature-box-card-shadow-light: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  --el-border-color-light: #ffffff00 !important;
  --el-fill-color-blank: #ffffff00 !important;

  @media (min-width: 1024px) {
    .feature-article-horizontal {
      grid-template-columns: repeat(2, 50%) !important;
      grid-template-rows: 100% !important;

      .feature-thumbnail {
        img {
          height: 100% !important;
          width: 120% !important;
        }
        &:after {
          left: 70% !important;
          top: 0 !important;
          width: 55% !important;
          @include background_color('gradient-cover');
        }
      }
      .thumbnail-screen {
        height: 100%!important;
      }
      .feature-content {
        padding: 3rem !important;
        grid-row: auto !important;
        p {
          font-size: 1.125rem !important;
          //line-height: 140% !important;
          line-height: 1.75rem !important;
        }
        h1 {
          font-size: 2.25rem !important;
          line-height: 2.5rem !important;
          margin-top: 1rem !important;
          margin-bottom: 2rem !important;
        }
      }
    }
  }
  .feature-article-horizontal {
    height: 100%;
    z-index: 10;
    display: grid;
    position: relative;
    top: 0;
    @include background_color('background-color');
    grid-template-rows: repeat(1, 30% 70%);
  }

  .feature-article-Vertical {
    height: 100%;
    z-index: 10;
    display: grid;
    position: relative;
    top: 0;
    @include background_color('background-color');
    grid-template-rows: repeat(1,minmax(0,1fr)) !important;
    .feature-content {
      p{
        font-size: 1rem;
        line-height: 1.5rem;
        margin-bottom: .5rem;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
    @media (min-width: 1024px){
      .feature-content {
        h1 {
          margin-top: 1rem;
          margin-bottom: 1.25rem;
        }
      }
    }
    .thumbnail-screen {
      width: 100%!important;
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
      @include font_color('text-color-p');
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
    blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
      margin: 0;
    }

    @media (min-width: 1024px) {
      b {
        font-size: 1rem !important;
        line-height: 1.5rem !important;
      }
    }

    b {
      font-size: .75rem;
      line-height: 1rem;
      color: #24c6dc;
      text-transform: uppercase;
    }

    b, strong {
      font-weight: bolder;
    }

    @media (min-width: 1024px) {
      ul {
        font-size: 1rem !important;
        line-height: 1.5rem !important;
      }
    }

    ul {
      display: inline-flex;
      font-size: .75rem;
      line-height: 1rem;
      padding-left: 1rem;

      li {
        margin-right: .75rem;
      }
    }

    ol, ul {
      list-style: none;
    }

    h1 {
      font-weight: 800;
      font-size: 1.5rem;
      line-height: 2rem;
      margin-bottom: 1.5rem;
      @include font_color('text-color-H1');

      a {
        background-color: transparent;
        color: inherit;
        text-decoration: inherit;
        transition-property: all;
        transition-timing-function: cubic-bezier(.4, 0, .2, 1);
        transition-duration: .15s;
        &:hover{
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
        align-items: center;

        .text-ob {
          color: #6d6d6d;

          .text-ob-normal {
            @include font_color('text-color-p')
          }

          .pr-1\.5 {
            padding-right: .375rem;
          }

          .cursor-pointer {
            cursor: pointer;
          }

          b, strong {
            font-weight: bolder;
          }
        }
      }

      .flex-row {
        flex-direction: row;
      }

      .flex {
        display: flex;
      }

      img {
        border-radius: 9999px;
        margin-right: .5rem;
        height: 28px !important;
        width: 28px;
      }

      .cursor-pointer {
        cursor: pointer;
      }

      img, video {
        max-width: 100%;
        height: auto;
      }

      audio, canvas, embed, iframe, img, object, svg, video {
        display: block;
        vertical-align: middle;
      }

      img {
        border-style: solid !important;
      }

      img {
        border-style: none;
      }
    }
  }

}
</style>
