<template>
    <div>
    <!-- 我的宠物 -->
      <el-row :gutter="20" class="pet">
      {{ 'my pet' }}
      </el-row>
      <!-- 内容信息 -->
      <el-row :gutter="20" class="history">
      {{ 'my wontent' }}
      </el-row>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  </script>
  <style scoped>
  .pet{
    height: 200px;
  }
  </style>