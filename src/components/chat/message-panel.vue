<template>
  <el-row class="session-name">
    <el-col :span="24">
      <el-text tag="b">{{ activeSession.name }}</el-text>
    </el-col>
  </el-row>
  <el-row class="session-messages">
    <el-col :span="24">
      <div class="message-box">
        <message-item :messages="messages" :sessionChange="sessionChange"/>
      </div>
    </el-col>
  </el-row>
  <el-row class="session-input">
    <el-col>
      <div class="input-box">
        <el-input
          id="msgInput"
          :show-word-limit="true"
          :maxlength="maxtextNum"
          type="textarea"
          v-model="intputMsg"
          placeholder="Please input"
          resize="none"
          style="width: 600px; display: flex"
        />
        <el-button :icon="Promotion" style="height: 52px" @click="send" />
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount, watch } from "vue";
import messageItem from "./message-item.vue";
import { getGroupUsers, getMessageHistory } from "../../api/user-chat-api";
import { Promotion } from "@element-plus/icons-vue";
import { useUserStore } from "../../store/useUserStore";
const userStore = useUserStore();
const props = defineProps(["activeSession"]);
const maxtextNum = 300;
const intputMsg = ref("");
//当前会话中的消息
const messages = reactive([{}]);

const activeSession = computed(() => {
  return props.activeSession;
});
//群用户
const groupUsers = reactive([{}]);

const sessionChange = reactive({flag:false})
//切换会话框刷新用户和消息
watch(props.activeSession, async (currentSession)=>{
  sessionChange.flag = !sessionChange.flag;
  const sessionType = currentSession.sessionType === "group" ? 2 : 1; 
  if(sessionType === 2 ){
    //拉取群用户信息
    await getGroupUsers({groupId:currentSession.id}).then(res => {
      groupUsers.length = 0;
      for(let i =0;i<res.data.length;i++){
        groupUsers.push(res.data[i]);
      }
    });
  }
  await getMessageHistory({userId:userStore.getUser.id,receiverId:currentSession.id,receiverType:sessionType }).then(res =>{
      messages.length = 0;
      for(let i =0;i<res.data.length;i++){
        messages.push(res.data[i]);
      }
    });
})


let socket;
onMounted(() => {

  socket = new WebSocket(
    "ws://localhost:8080/satori-service-api/websocket/message/" + userStore.getUser.id
  );
  //  socket = io('ws://localhost:8080/websocket/message');
  // 查询自己的聊天会话
  socket.onmessage = function (msg) {
    const msgBody = JSON.parse(msg.data)
    if(msgBody.id != undefined){
      messages.push({
      id:msgBody.id,
      createTime: new Date(),
      messageContent: msgBody.content,
      parentMessageId: 0,
      receiverId: msgBody.receiverId,
      senderId: msgBody.senderId,
      receiverType: msgBody.messageType
    })
    }
  };
  socket.onclose = function () {
    console.log("websocket已关闭");
  };
  //发生了错误事件
  socket.onerror = function () {
    console.log("websocket发生了错误");
  };
});


onBeforeUnmount(() => {
  socket.close();
  socket = null;
  console.log("退出聊天界面");
});

const send = () => {
  let msgBody = {
    content: intputMsg.value,
    userId: userStore.getUser.id,
    receiverId: activeSession.value.id,
    sendType: activeSession.value.sessionType === "group" ? 2 : 1
  };
  socket.send(JSON.stringify(msgBody));
  intputMsg.value = '';
};
</script>
<style scoped lang="scss">
.el-row:last-child {
  margin-bottom: 3px;
}
.el-col {
  .message-box {
    // border: ridge salmon;
    // min-height: 100%;
    height: 570px;
    width: 98%;
    overflow-y: scroll;
  }
}
.session-name {
  margin-top: 10px;
  margin-bottom: 10px;
}
.session-messages {
  height: 90%;
  margin-bottom: 2px;
}
.session-input {
  margin-top: 20px;
  .input-box {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr; /* 将容器分为两列 */
    grid-gap: 0; /* 列之间的间隙 */
    align-items: center; /* 垂直居中对齐 */
    #msgInput {
      overflow: hidden;
    }
  }
}
</style>
