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
import { beforeRenderingHTML,renderMessageHtml } from "../../assets/js/render.js";
import { useUserStore } from "../../store/useUserStore";
const itemStyle = reactive({
  margin: "auto auto 0 auto",
});

const userStore = useUserStore();

const props = defineProps(["messages"]);

let htmls = [];
// const messages = computed(()=>{
//   const htmls = [];
//   props.messages.forEach((item) => {
//     const msg = {};
//     msg.messageType = "text";
//     msg.headIcon = "https://s2.loli.net/2023/10/11/zLcrbPQnNuHRv6U.png";
//     msg.name = item.senderId + "";
//     msg.position = item.senderId == userStore.getUser.id ? "right" : "left";
//     msg.html = item.messageContent;
//     htmls.push(msg);
//   });
//   return htmls;
// })

watch(props.messages, (newMessages) => {
  //刷新消息
  htmls.length = 0;
  console.log('收到新消息')
  newMessages.forEach((item) => {
    const msg = {};
    msg.messageType = "text";
    msg.headIcon = "https://s2.loli.net/2023/10/11/zLcrbPQnNuHRv6U.png";
    msg.name = item.senderId + "";
    msg.position = item.senderId == userStore.getUser.id ? "right" : "left";
    msg.html = item.messageContent;
    htmls.push(msg)
  });
  htmls = beforeRenderingHTML(htmls, ".lite-chatbox");
    console.log(htmls)
});

// const htmls = [
//   {
//     messageType: "tipsDanger",
//     html:
//       "从我做过的类聊天需求来看，聊天消息要么是纯文本，要么是富文本。所以我抽离出来的消息渲染组件默认了消息是富文本。如果想发送HTML请自行魔改。",
//   },
//   {
//     messageType: "raw",
//     headIcon: "https://s2.loli.net/2023/10/11/zLcrbPQnNuHRv6U.png",
//     name: "图片消息2",
//     position: "left",
//     html: `<img src="./img/img.png"><br>图片带文字是可以的 <del>（废话）</del>`,
//   },
//   {
//     messageType: "text",
//     headIcon: "./img/A.jpg",
//     name: "全符号测试",
//     position: "right",
//     html: "。，；？：！‘’“”@ˆ.,;?:!'\"〝〞﹫ˇ",
//   },
// ];
// onMounted(() => {
//   props.messages.forEach((item) => {
//     const msg = {};
//     msg.messageType = "text";
//     msg.headIcon = "https://s2.loli.net/2023/10/11/zLcrbPQnNuHRv6U.png";
//     msg.name = item.senderId + "";
//     msg.position = item.senderId == userStore.getUser.id ? "right" : "left";
//     msg.html = item.messageContent;
//     htmls.push(msg);
//   });
//   beforeRenderingHTML(htmls, ".lite-chatbox");
// });
</script>

<style scoped lang="scss"></style>
