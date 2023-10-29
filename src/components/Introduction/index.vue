<template>
  <el-card class="introduction" v-if="data.value !== {}">
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
          <a :href="data.url"><svg-icon name="github"/></a>
        </li>
        <ul>
          <li v-for="(item,key) in data.childer" :key="key">
            <span>{{ item.count }}</span>
            <p>{{ item.title }}</p>
          </li>
        </ul>
      </ul>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon/index.vue";
defineProps({
  data:{
    required:true,
  }
})
</script>
<style lang="scss" scoped>

.introduction{
  height: 100%;
  width: calc(95% - 3%)!important;
  padding: 1.5% 1.5% 2% 1.5% !important;
  display: flex;
  align-items: flex-end;
  background: $body-Background-Anti;
  border: 0 #00000000;
  border-radius: .75rem;
  position: relative;
  margin: 0 auto;
  :deep(.el-card__body){
    height: 90% !important;
    width: 100%;
    border: 0 #00000000;
    padding: .25rem !important;
    border-radius: .75rem;
    @include background_color('background-primary');
    opacity: 0.9;
    div{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 15;
      display: flex;
      flex-direction: column;
      justify-content: center;
      ul{
        padding-inline-start: 0;
        li{
          @include font_color('text-color');
          h2{
            margin-top: 5%;
            font-weight: 600;
            font-size: xx-large;
          }
          hr{
            height: 5%;
            width: 50%;
            border: 0 solid;
            border-radius: 1rem;
            background: $body-Background;
          }
        }
      }
      .introduction-top{
        height: 65%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        list-style-type: none;
        flex: 1 1 0;
        li{
          position: relative;
          flex: 1 1 0;
          img{
            height: 5rem;
            width: 5rem;
            outline: 5px white solid;
            border-radius: 50%;
            min-width: 100%;
            min-height: auto;
          }
        }
      }
      .introduction-footer{
        height: 35%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        list-style-type: none;
        ul{
          margin-top: 5%;
          width: 90%;
          display: grid;
          font-size: 1.125rem;
          line-height: 1.75rem;
          padding-top: 1rem;
          grid-template-columns: repeat(4,minmax(0,1fr));
          li{
            text-align: center;
            list-style-type: none;
            grid-column: span 1/span 1;
            p{
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
