<template>
  <el-form>
    <el-form-item label="群聊名称">
      <el-input v-model="groupBody.name" />
    </el-form-item>
    <el-form-item label="入群需审核">
      <el-switch v-model="groupBody.process" />
    </el-form-item>
    <el-form-item label="标签">
      <el-radio-group v-model="groupBody.type">
        <el-radio :label="1">社交</el-radio>
        <el-radio :label="2">闲谈</el-radio>
        <el-radio :label="3">计算机</el-radio>
        <el-radio :label="4">学习</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="groupBody.description" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { createGroup } from "../../api/user-chat-api.js";
import { reactive } from "vue";
import { useUserStore } from "../../store/useUserStore";
const userStore = useUserStore();
const emit = defineEmits(["refreshSessionList"]);

const groupBody = reactive({
  name: "",
  process: false,
  type: 2,
  description: "",
});

const onSubmit = () => {
  createGroup({
    createUserId: userStore.getUser.id,
    groupName: groupBody.name,
    process: groupBody.process == true ? 1 : 0,
    type: groupBody.type,
    description: groupBody.description,
  }).then((res) => {
    emit('refreshSessionList')
  });
};
</script>

<style scoped></style>
