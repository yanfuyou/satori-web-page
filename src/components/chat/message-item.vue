<template>
  <div>
    <el-avatar shape="square" :src="message.userAvatar" />
    {{ message.senderName }}
    <el-text>{{ message.messageContent }}</el-text>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps(['message']);
console.log(props.message)
const message = computed(() => {
  return props.message;
});
</script>

<style scoped lang="scss"></style>
