<template>
  <div class="user-container">
    <el-container class="out-container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside>
          <user-banner :user-id="userId"/>
        </el-aside>
        <el-main> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from "vue";
import userBanner from "@/components/user/user-banner.vue";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const userId = computed(() => {
  return router.currentRoute.value.query.id
    ? router.currentRoute.value.query.id
    : userStore.getUser.id;
});
</script>
<style scoped>
.user-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
}
.out-container {
  flex: 0 0 auto;
  width: 85%;
  /* background-color: aliceblue; */
}
.el-header {
  height: 80px;
  display: flex;
  justify-content: center;
}
.el-aside {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 25%;
}

.el-main {
  border-radius: 2%;
  background-color: aquamarine;
}
</style>
