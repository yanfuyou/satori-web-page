<template>
  <el-row class="session-name">
    <el-col :span="24">
      <el-text tag="b">{{ activeSession.name }}</el-text>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24">
      <div class="message-box">
        <message-item v-for="msg in activeSession.messages" :key="msg.id" :message="msg"/>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { computed } from "vue";
import messageItem from "./message-item.vue";

const props = defineProps(['activeSession']);
const activeSession = computed(() => {
  return props.activeSession;
});

const refreshMessges = ()=>{
  
}
</script>
<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  min-height: 90%;
  display: right;
  margin-bottom: 0;
}
.el-col{
  .message-box{
    border: ridge salmon ;
    min-height: 100%;
    width: 98%;
  }
}
.session-name {
  margin-top: 10px;
}
</style>
