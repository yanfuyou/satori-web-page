<template>
  <div>
    <!-- 我的宠物 -->
    <el-row :gutter="20" class="pet">
      <div class="pet-title">宠物纪</div>
      <div class="pet-content">
        <div class="demo-fit">
          <div v-for="fit in fits" :key="fit" class="block">
            <span class="title">{{ fit }}</span>
            <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
          </div>
        </div>
        <div class="demo-fit">
          <div v-for="fit in fits" :key="fit" class="block">
            <span class="title">{{ fit }}</span>
            <el-avatar shape="square" :size="100" :fit="fit" :src="url" />
          </div>
        </div>
        <!-- <el-scrollbar class="content-item">
          <div class="scrollbar-flex-content">
            <div class="scrollbar-demo-item" v-for="item in 10" :key="item">
              {{ item }}
            </div>
          </div>
        </el-scrollbar> -->
      </div>
    </el-row>
    <!-- 内容信息 -->
    <el-row :gutter="20" class="history">
      {{ "my wontent" }}
    </el-row>
  </div>
</template>

<script setup>
import petCategory from "@/components/user/pet-category.vue";
import { reactive, toRefs } from "vue";

const state = reactive({
  fits: ["fill", "contain", "cover", "none", "scale-down"],
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const { fits, url } = toRefs(state);
</script>
<style lang="scss" scoped>
.pet {
  height: 400px;

  .pet-title {
    height: 50px;
    font-family: "liuJianMaoCao";
    font-size: 40px;
    margin: 0 auto;
  }
  .pet-content {
    width: 100%;
    margin-top: 0;
    .content-item {
      width: 300px;
    }
  }
}

.scrollbar-flex-content {
  display: flex;
}

.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 40px;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}

.demo-fit {
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.demo-fit .block {
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
}

.demo-fit .title {
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
</style>
