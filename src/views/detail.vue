<template>
  <div class="container">
    <el-container>
      <el-aside v-if="isDetail">
        <userBanner :user-id="currentUserId" />
      </el-aside>
      <el-main>
        <write :is-detail="isDetail" :content-id="contentId" />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import write from "@/components/editor/write.vue";
import userBanner from "@/components/user/user-banner.vue";

const router = useRouter();

const queryStr = window.location.search;
const params = new URLSearchParams(queryStr);
const contentId = ref(null);
const currentUserId = ref(null);

const isDetail = computed(() => {
  return router.currentRoute.value.path === "/detail";
});

onBeforeMount(() => {
  contentId.value = params.get("contentId");
  currentUserId.value = params.get("uid");
});
</script>

<style lang="scss" scoped>
.el-aside {
  margin-left: 100px;
  width: 20%;
}
</style>
