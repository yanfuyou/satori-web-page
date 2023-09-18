<template>
  <el-form>
    <el-form-item label="群聊名称">
      <el-input v-model="groupBody.name" />
    </el-form-item>
    <el-form-item label="入群需审核">
      <el-switch v-model="groupBody.process" />
    </el-form-item>
    <el-form-item label="标签">
      <el-checkbox-group v-model="groupBody.type">
        <el-checkbox label="社交" name="1" />
        <el-checkbox label="闲谈" name="2" />
        <el-checkbox label="计算机" name="3" />
        <el-checkbox label="学习" name="4" />
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="groupBody.desc" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const groupBody = ref({
    name:'',
    process:false,
    type:[],
    desc:''
})

const onSubmit = ()=>{
    console.log(groupBody.value)
}
</script>

<style scoped></style>
