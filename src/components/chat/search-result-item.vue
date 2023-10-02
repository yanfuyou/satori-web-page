<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="3">
        <div class="grid-content ep-bg-purple">
            <el-avatar shape="square" fit="container" :size="50" :src="result.picture" />
        </div>
      </el-col>
      <el-col :span="20" :offset="1">
        <div class="grid-content ep-bg-purple result-text">
            <div class="name" >{{ result.name }}</div>
            <dic class="category">{{ result.category}}</dic>
            <div class="desc">{{ result.desc }}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps(['result'])

const result = computed(()=> {
  return props.result;
})

</script>

<style scoped>
.el-row {
  margin-top: 5px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  .result-text{
    text-align: left;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  .name{
    font-weight: bold;
  }
  .category,.desc{
    font-weight: 20;
  }
}
</style>
