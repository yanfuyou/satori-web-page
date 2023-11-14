<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="content">
          {{ content }}
        </div>
      </el-col>

      <el-col :span="14">
        <div>
          {{ "data" }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { toRefs, computed } from "vue";
const props = defineProps(["content", "data"]);

const content = computed(() => {
  return props.content ? props.content : "内容为空";
});
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  .content {
    border: 1px solid #eee;
  }
}
</style>
