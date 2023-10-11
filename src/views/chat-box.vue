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
              v-for="session in sessionList"
              :key="session.id"
              :active="session.id === activeSession.id"
              :session="session"
              class="session"
              @click="handleSessionSwitch(session)"
              @deleteSession="deleteSession"
            />
          </div>
          <div class="button-wrapper">
            <div class="new-session">
              <el-button @click="changeFriendList">
                <el-icon :size="15" class="el-icon--left">
                  <ChatLineSquare />
                </el-icon>
                <span v-if="listFlag === 'user'">群聊</span>
                <span v-else>好友</span>
              </el-button>
            </div>
            <div class="new-session">
              <el-button @click="handleCreateSession">
                <el-icon :size="15" class="el-icon--left">
                  <CirclePlus />
                </el-icon>
                新的聊天
              </el-button>
            </div>
          </div>
        </div>
        <!-- 右侧的消息记录 -->
        <div class="message-panel">
          <div class="msg-list">
            <message-panel :active-session="activeSession" />
          </div>
        </div>
      </div>
    </div>
    <el-dialog :model-value="visible" width="30%" :show-close="showClose">
      <el-tabs type="border-card">
        <el-tab-pane label="查找">
          <div>
            <el-input
              v-model="searchForm.searchKeyword"
              placeholder="Please input"
              class="input-with-select"
            >
              <template #prepend>
                <el-select
                  v-model="searchForm.searchType"
                  placeholder="Select"
                  style="width: 115px"
                >
                  <el-option label="综合" value="0" />
                  <el-option label="用户" value="1" />
                  <el-option label="用户组" value="2" />
                </el-select>
              </template>
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
            <!-- 搜索结果 -->
            <div class="search-result">
              <search-result-item
                v-for="item in searchResult"
                :key="item.id"
                :result="item"
              />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新建">
          <new-group @refresh-session-list="refreshSessionList" />
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <!-- <el-button type="primary" @click="visible = false"> 确认 </el-button> -->
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref, reactive, computed } from "vue";
import sessionItem from "../components/chat/session-item.vue";
import searchResultItem from "../components/chat/search-result-item.vue";
import newGroup from "../components/chat/new-group.vue";
import messagePanel from "../components/chat/message-panel.vue";
import { Promotion, CirclePlus, Search } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { io } from "socket.io-client";
import { useUserStore } from "../store/useUserStore";
import { getGroupList } from "../api/user-chat-api";

const receiverId = ref("");

const activeSession = reactive({});
const ChatSession = {};
const isEdit = ref(false);
const userStore = useUserStore();
const visible = ref(false);
const showClose = false;
const searchForm = ref({
  searchType: "0",
  searchKeyword: "",
});

const searchResult = reactive([{}]);

searchResult.push({
  id: 1,
  name: "helloWorld1",
  category: "group",
  desc: "这是一个群",
  picture: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
});

//切换列表
let listFlag = ref("user");

//会话列表
const sessionList = reactive([{}]);
sessionList.length = 0;
//socket相关
let socket;
onMounted(async () => {
  await refreshSessionList();
  handleSessionSwitch(sessionList[0]);
});
// 切换会话
const handleSessionSwitch = (session) => {
  activeSession.id = session.id;
  activeSession.avatar = session.avatar;
  activeSession.name = session.name;
  activeSession.createUserId = session.createUserId;
  activeSession.process = session.process;
  activeSession.type = session.type;
  activeSession.createTime = session.createTime;
  activeSession.joinTime = session.joinTime;
};

const deleteSession = (session) => {
  console.log("移除会话", searchForm);
  const index = sessionList.findIndex((value) => {
    return value.id === session.id;
  });
  sessionList.splice(index, 1);
};

const refreshSessionList = async () => {
  await getGroupList({ userId: userStore.getUser.id }).then((res) => {
    for (const session of res.data) {
      sessionList.push({
        id: session.id,
        name: session.groupName,
        avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        createUserId: session.createUserId,
        process: session.process,
        type: session.type,
        createTime: new Date(session.createTime).toLocaleDateString(),
        joinTime: new Date(session.joinTime).toLocaleDateString(),
      });
    }
  });
};

// 新增会话
const handleCreateSession = () => {
  visible.value = true;
  // const res = await saveChatSession({ name: "新的聊天" });
  // sessionList.value.unshift((await findChatSessionById(res.result)).result);
  // sessionList.value.unshift({id: 5, name: '会话5', updatedAt: '2023-08-20', messages: ['123']});
};

// 切换好友列表
const changeFriendList = () => {
  //去后台拉取对应的列表
  if (listFlag.value === "user") {
    // sessionList.value=
    listFlag.value = "group";
  } else {
    listFlag.value = "user";
  }
};

const handleClose = () => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
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

      .msg-list {
        height: 620px;
      }
    }

    .session-list {
      .session {
        /* 每个会话之间留一些间距 */
        margin-top: 10px;
      }
      height: 80%;
      overflow-y: scroll;
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
.search-result {
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  opacity: 0;
}
</style>
