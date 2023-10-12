<template>
  <div class="lite-chatbox"></div>
  <!-- <el-row :gutter="10" class="item" :style="itemStyle">
    <el-avatar shape="square" :src="message.userAvatar" />
    {{ message.receiverId }}
    <el-text>{{ message.messageContent }}</el-text>
  </el-row> -->
</template>

<script setup>
import { computed, reactive, onMounted, watch } from "vue";
import "../../assets/css/litewebchat.min.css";
import { beforeRenderingHTML, renderMessageHtml } from "../../assets/js/render.js";
import { useUserStore } from "../../store/useUserStore";
const itemStyle = reactive({
  margin: "auto auto 0 auto",
});

const userStore = useUserStore();

const props = defineProps(["messages","sessionChange"]);

let htmls = [];
watch(props.sessionChange,(flag) => {
  htmls = beforeRenderingHTML([], ".lite-chatbox");
})
watch(props.messages, (newMessages) => {
  // //刷新消息
  // if(newMessages.length ==0 ){
  //   htmls.length = 0;
  //   htmls = beforeRenderingHTML([], ".lite-chatbox");
  //   return;
  // }
  newMessages.forEach((item) => {
    if (htmls.length ==0 || item.id > htmls[htmls.length - 1].id) {
      const msg = {};
      msg.id = item.id;
      msg.messageType = "text";
      msg.headIcon = "https://s2.loli.net/2023/10/11/zLcrbPQnNuHRv6U.png";
      msg.name = item.senderId + "";
      msg.position = item.senderId == userStore.getUser.id ? "right" : "left";
      msg.html = item.messageContent;
      htmls.push(msg);
    }
  });
  htmls = beforeRenderingHTML(htmls, ".lite-chatbox");
});
</script>

<style scoped lang="scss"></style>
