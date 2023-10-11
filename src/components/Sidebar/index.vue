<template>
  <div class="sidebar">
    <el-card>
      <template #header>
        <p>
          <svg-icon :name="icon"/>
          <span>{{ title }}</span>
          <hr/>
        </p>
      </template>
      <template #default>
        <ul class="sidebar-ul">
          <li>
            <slot name="default"/>
          </li>
        </ul>
      </template>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon/index.vue";

defineProps({
  title: {
    type: String,
    default: '未定义',
  },
  icon: {
    type: String,
    required: true,
  },
})

</script>
<style lang="scss" scoped>
.sidebar {
  height: 100%;
  min-height: 10rem;
  width: 95%;
  margin: 0 auto;

  .el-card {
    height: calc(100% - 2.5rem);
    width: calc(100% - 2.5rem);
    border: 0 #00000000;
    border-radius: 1.25rem;
    position: relative;
    padding: 1.25rem;
    display: grid;
    grid-template-rows: minmax(15%, 0fr);
    @include background_color('background-color');
    box-shadow: $box-shadow;

    :deep(.el-card__header) {
      height: 100%;
      padding: 0;
      border-bottom: none;
      position: relative;

      p {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 0;

        span {
          margin-bottom: 0;
          font-weight: 600;
          font-size: larger;
        }

        hr {
          height: 5%;
          width: 25%;
          border: 0 solid;
          border-radius: 1rem;
          background: $body-Background;
          position: absolute;
          bottom: 0;
        }
      }
    }

    :deep(.el-card__body) {
      height: 100%;
      width: 100%;
      padding: 0;
      background: #00000000;
      position: relative;
      .sidebar-ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          transition-property: box-shadow;
          transition-timing-function: cubic-bezier(.4, 0, .2, 1);
          transition-duration: .15s;
          box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(0, 0, 0, .05);
          padding: .75rem .5rem;
          display: flex;
          flex-direction: row;
          justify-items: center;
          align-items: center;
          column-gap: 5%;
          margin-bottom: .375rem;
          border-radius: .5rem;
          background: #1a1a1a;

          .imageFrame {
            width: 2.25rem;
            height: 2.25rem;;
            overflow: hidden;
            border-radius: 99rem;
            flex-shrink: 0;

            img {
              transition-property: transform;
              transition-timing-function: cubic-bezier(.4, 0, .2, 1);
              transition-duration: .8s;
              transform: rotate(-1turn);
              max-width: 100%;
              height: auto;
              display: block;
              vertical-align: middle;
            }
          }

          .comments {
            width: 70%;
            font-size: .75rem;
            line-height: 1rem;
            flex: 1 1 0;

            span {
              color: #24c6dc;
              padding-right: .5rem;
            }

            p {
              margin: 0;
              color: rgba(107, 114, 128, 1);
            }

            .commentContent {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              color: #fff;
              font-size: .75rem;
              line-height: 1rem;
            }
          }
        }
      }
    }
  }
}


</style>
