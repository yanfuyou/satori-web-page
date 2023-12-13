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
      <div class="flex-grow" />
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/sky-hole">树洞</el-menu-item>
      <el-menu-item v-if="userStore.needSignin" index="/user/login">登录</el-menu-item>
      <el-menu-item v-else index="/" @click="bye">再见</el-menu-item>
      <el-sub-menu index="/wonder">
        <template #title v-if="signIned">更多</template>
        <template #title v-else>登录查看</template>
        <el-menu-item index="/user-detail" v-if="signIned">主页</el-menu-item>
        <!-- <el-menu-item index="/worker">工作坑</el-menu-item> -->
        <el-menu-item index="/chat" v-if="signIned">聊天室</el-menu-item>
        <!-- <el-menu-item index="/stander">吾道坑</el-menu-item> -->
        <!-- <el-menu-item index="/test">测试</el-menu-item> -->
        <el-menu-item index="/write" v-if="signIned">写点啥</el-menu-item>
        <el-menu-item index="/search">开发中</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/useUserStore";
import { signOut } from "../../api/user-api";

const userStore = useUserStore();
const router = useRouter();

const logoName = ref("Satori");
const activeIndex = ref("/logo");

const signIned = computed(() => !userStore.needSignin);

const handleSelect = (key: string, keyPath: string[]) => {
  router.push(key);
};

const bye = () => {
  console.log("byebye");
  signOut(userStore.getUser.id).then((res) => {
    userStore.signOut();
  });
};
</script>
<style scoped>
#nav {
  #logo {
    clear: both;
    float: left !important;
  }
}

.flex-grow {
  width: 100vh;
  flex-grow: 1;
}
</style>
