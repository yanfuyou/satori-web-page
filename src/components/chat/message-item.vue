<template>
  <div>
    <el-avatar shape="square" :src="message.userAvatar" />
    {{ message.name }}
    <el-input :v-model="message.content" :rows="2" type="textarea" :autosize="{'min':5,'max':15}"/>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  message:Object,
});
console.log(props.message)
const message = computed(() => {
  return props.message;
});
</script>

<style scoped lang="scss"></style>
