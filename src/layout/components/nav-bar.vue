<script lang="ts" setup>
import {ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

const logoName = ref('Satori')
const activeIndex = ref('/logo')

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push(key)
}
</script>

<template>
  <div id="nav">
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        active-text-color="blue"
        @select="handleSelect"
    >
      <el-menu-item index="/logo" id="logo">
        <div>
          {{ logoName }}
        </div>
      </el-menu-item>
      <div class="flex-grow"/>
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/user/login">登录</el-menu-item>
      <el-sub-menu index="/wonder">
        <template #title>奇妙地</template>
        <el-menu-item index="/worker">工作坑</el-menu-item>
        <el-menu-item index="/chat">聊天室</el-menu-item>
        <el-menu-item index="/stander">吾道坑</el-menu-item>
        <el-menu-item index="/old">过来人</el-menu-item>
        <el-menu-item index="/write">写</el-menu-item>
        <el-menu-item index="/search">让我加点儿坑</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
#nav {
  height: 5%;
  width: 100%;
  text-align: center;
  //border-style: dashed;
  //border-color: black;
  #logo{
    clear: both;
    float: left !important;
    //padding-left: 10px;
  }
}

.flex-grow {
  width: 100vh;
  flex-grow: 1;
}
</style>