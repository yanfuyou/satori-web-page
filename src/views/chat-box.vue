<script lang="ts" setup>
import {onMounted, ref} from "vue"
import sessionItem from '../components/chat/session-item.vue'
import { Promotion,CirclePlus } from '@element-plus/icons-vue'
const intputMsg = ref('')
const ChatSession = [{}]

const isEdit = ref(false);

const activeSession = ref({
  id: 1,
  topic: '会话1',
  updatedAt: '2023-08-20',
  messages: [{sendUser: 'cat', content: '消息内容', createBy: '2023-08-09'}]
});

const sessionList = ref([])


onMounted(() => {
  // 查询自己的聊天会话
  console.log("查询会话")

  sessionList.value.push({id: 1, topic: '会话1', updatedAt: '2023-08-20', messages: ['123']})
  sessionList.value.push({id: 2, topic: '会话2', updatedAt: '2023-08-20', messages: [{}]})
  sessionList.value.push({id: 3, topic: '会话3', updatedAt: '2023-08-20', messages: [{}]})
  activeSession.value = sessionList.value[0];
  // queryChatSession({ pageSize: 1000, pageNum: 1, query: {} }).then((res) => {
  //   // 讲会话添加到列表中
  //   sessionList.value.push(...res.result.list);
  //   // 默认选中的聊天会话是第一个
  //   if (sessionList.value.length > 0) {
  //     activeSession.value = sessionList.value[0];
  //   }
  // });
});
// 切换会话
const handleSessionSwitch = (session) => {
  activeSession.value = session;
};
// 从会话列表中删除会话
const handleDeleteSession = (session) => {
  console.log('删除会话')
  const index = sessionList.value.findIndex((value) => {
    return value.id === session.id;
  });
  sessionList.value.splice(index, 1);
};
// 新增会话
const handleCreateSession = async () => {
  console.log('新建聊天')
  // const res = await saveChatSession({ topic: "新的聊天" });
  // sessionList.value.unshift((await findChatSessionById(res.result)).result);
  sessionList.value.unshift({id: 5, topic: '会话5', updatedAt: '2023-08-20', messages: [{}]});
};
const maxtextNum = 300;

</script>

<template>
  <div>
    <!-- 最外层页面于窗口同宽，使聊天面板居中 -->
    <div class="home-view">
      <!-- 整个聊天面板 -->
      <div class="chat-panel">
        <!-- 左侧的会话列表 -->
        <div class="session-panel">
          <div class="title">坑坑聊天室</div>
          <div class="description">请友善发言</div>
          <div class="session-list">
            <session-item
                v-for="(session, index) in sessionList"
                :key="session.id"
                :active="session.id === activeSession.id"
                :session="sessionList[index]"
                class="session"
                @click="handleSessionSwitch(session)"
                @delete="handleDeleteSession(session)"
            />
          </div>
          <div class="button-wrapper">
            <div class="new-session">
              <el-button @click="handleCreateSession">
                <el-icon :size="15" class="el-icon--left">
                  <CirclePlus/>
                </el-icon>
                新的聊天
              </el-button>
            </div>
          </div>
        </div>
        <!-- 右侧的消息记录 -->
        <div class="message-panel">
          <div class="msg-list">
            this is messge-panel
          </div>
          <div class="input-box">
            <el-input id="msgInput" :show-word-limit="true" :maxlength="maxtextNum" type="textarea" v-model="intputMsg" placeholder="Please input" resize="none" style="width: 600px;display: flex;" />
            <el-button  :icon="Promotion" style="height:52px;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.home-view {
  display: flex;
  max-height: 700px;
  /* 与窗口同宽 */
  width: 100vw;
  /* 水平方向上剧中 */
  justify-content: center;

  .chat-panel {
    /* 聊天面板flex布局，让会话列表和聊天记录左右展示 */
    display: flex;
    /* 让聊天面板圆润一些 */
    border-radius: 20px;
    background-color: white;
    /* 给一些阴影 */
    box-shadow: 0 0 20px 20px rgba(black, 0.05);
    /* 与上方增加一些间距 */
    margin-top: 30px;
    /* 左侧聊天会话面板*/

    .session-panel {
      background-color: rgb(231, 248, 255);
      width: 300px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      padding: 20px;
      position: relative;
      border-right: 1px solid rgba(black, 0.07);
      /* 标题*/

      .title {
        margin-top: 20px;
        font-size: 20px;
      }

      /* 描述*/

      .description {
        color: rgba(black, 0.7);
        font-size: 10px;
        margin-top: 10px;
      }
    }

    /* 右侧消息记录面板*/

    .message-panel {
      width: 700px;
      height: 800px;
      position: relative;
      .msg-list{
        height: 620px;
      }
      .input-box {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr; /* 将容器分为两列 */
        grid-gap: 0; /* 列之间的间隙 */
        align-items: center; /* 垂直居中对齐 */
        #msgInput{
          overflow: hidden;
        }
      }

    }

    .session-list {
      .session {
        /* 每个会话之间留一些间距 */
        margin-top: 20px;
      }
    }

    .button-wrapper {
      /* session-panel是相对布局，这边的button-wrapper是相对它绝对布局 */
      position: absolute;
      bottom: 20px;
      left: 0;
      display: flex;
      /* 让内部的按钮显示在右侧 */
      justify-content: flex-end;
      /* 宽度和session-panel一样宽*/
      width: 100%;

      /* 按钮于右侧边界留一些距离 */
      .new-session {
        margin-right: 20px;
      }
    }
  }
}
</style>