<template>
  <div class="user-container">
    <el-container class="out-container">
      <el-header>
        <div id="header">
          <div class="city1">
            <img src="../assets/img/city.png" alt="" class="city" />
            <!-- <img src="../assets/img/moon.png" alt="" id="moon" /> -->
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <user-banner :user-id="userId" />
        </el-aside>
        <el-main>
          <user-home />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import "@/assets/css/modal.css";

import { computed, onMounted } from "vue";
import userBanner from "@/components/user/user-banner.vue";
import userHome from "@/components/user/user-home.vue";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userId = computed(() => {
  return router.currentRoute.value.query.id
    ? router.currentRoute.value.query.id
    : userStore.getUser.id;
});
onMounted(() => {});
</script>
<style scoped>
#header {
  width: 100%;
  background-color: black;
  .city {
    width: 100%;
    margin-bottom: 0;
    /* height: 20px; */
  }
  #moon {
    margin-top: 0;
    height: 30px;
  }
}

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
  height: 180px;
  display: flex;
  justify-content: center;
}
.el-aside {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 30%;
}

.el-main {
  border-radius: 2%;
  background-color: aquamarine;
}
</style>
