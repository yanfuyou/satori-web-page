<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Activity zone">
        <el-select
          v-model="formInline.uid"
          placeholder="userId"
          clearable
        >
          <el-option label="u1" value="1" />
          <el-option label="u2" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Query</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import { useUserStore } from '../store/useUserStore';
import router from '../router';
  const formInline = reactive({
    uid: '',
  })
  const user = useUserStore;
  const onSubmit = () => {
    console.log('submit!,'+ formInline.uid)
    user.id=formInline.uid
    router.push('/chat')
  }
  </script>
  
  <style>
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }
  </style>
  