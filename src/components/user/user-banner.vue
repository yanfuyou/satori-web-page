<template>
  <div class="head">
    <el-avatar :size="120" :src="user.userAvatar" />
    <div class="nike-name">
      <el-text tag="b" size="large">{{ user.nikeName }}</el-text>
      <br />
      <el-text tag="i">{{ user.userEmail }}</el-text>
    </div>
    <div class="introduce">
      <el-text tag="p" size="default">{{ userExt.introduction }}</el-text>
    </div>
  </div>
  <div class="one-world">
    <el-space direction="vertical">
      <el-text>
        <el-icon size="20"><Microphone /></el-icon>
        今日一言
      </el-text>
      <el-text>
        {{ userExt.oneWords }}
      </el-text>
    </el-space>
  </div>
  <div class="note">
    <div class="todo">
      <el-input
        v-model="todo.newTodo"
        placeholder="回车保存"
        :suffix-icon="DocumentAdd"
        @keyup.enter="addTodo"
      />
      <div class="todo-list" v-if="todo.todoList.length != 0">
        <dl>
          <dt v-for="(todo, index) in todo.todoList" :key="index">
            <el-text class="mx-1" type="warning" size="large" v-if="todo.state == 0">
              <el-icon class="up" size="15" color="blue" @click="changeState(todo.id, 1)">
                <CircleCheck />
              </el-icon>
              <el-icon class="del" size="15" color="red" @click="changeState(todo.id, 2)">
                <CircleClose />
              </el-icon>
              {{ todo.content }}</el-text
            >
            <el-text class="mx-1" type="success" v-if="todo.state == 1">{{
              todo.content
            }}</el-text>
          </dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onBeforeMount } from "vue";
import { DocumentAdd } from "@element-plus/icons-vue";

//api
import { getUserExtInfo, getUserInfo } from "@/api/user-api";
import { saveTodo, changeTodoState, getTodoList } from "@/api/todo-api";

const { showToast } = getCurrentInstance().appContext.config.globalProperties;
const user = ref({
  id: null,
  nikeName: null,
  userAvatar: null,
  userEmail: null,
});
const userExt = ref({
  userId: null,
  userPhone: null,
  introduction: null,
  oneWords: null,
});
const props = defineProps(["userId"]);

const todo = ref({
  newTodo: "",
  todoList: [],
});
const addTodo = () => {
  if (todo.value.todoList.length == 5) {
    showToast(false, "warning", "不要过于劳累哦");
    return;
  }
  if (todo.value.newTodo.trim().length > 16) {
    showToast(false, "warning", "简短一点吧");
    return;
  }
  const todoData = {
    createUserId: props.userId,
    content: todo.value.newTodo
  }
  saveTodo(todoData).then((res) => {
    showToast(false,'success','添加成功')
  });

  todo.value.todoList.unshift({
    id: 1,
    content: todo.value.newTodo,
    state: 0,
  });
  todo.value.newTodo = "";
};
const changeState = (id, state) => {
  for (let i = 0; i < todo.value.todoList.length; i++) {
    const now = todo.value.todoList[i];
    if (now.id == id) {
      if (state == 1) {
        now.state = state;
        break;
      } else {
        todo.value.todoList.splice(i, 1);
        now.state = state;
        break;
      }
    }
  }
  changeTodoState({id:id,state:state})
};

onBeforeMount(() => {
  getUserInfo(props.userId).then((res) => {
    user.value = res.data;
  });
  getUserExtInfo(props.userId).then((res) => {
    userExt.value = res.data;
  });
  getTodoList({userId:props.userId,createTime:new Date()}).then(res => {
    todo.value.todoList = res.data;
  })
});
</script>
<style lang="scss" scoped>
.head {
  margin-top: 10px;
  text-align: center;
  height: 45%;
  width: 98%;
  border-radius: 5%;
  background-color: #ccffcc;
  .nike-name {
    margin-top: 20px;
    text-align: center;
  }
  .introduce {
    margin-top: 16px;
    width: 90%;
    text-align: center;
  }
}
.one-world {
  text-align: center;
  height: 20%;
  width: 98%;
  border-radius: 5%;
  background-color: #ffcccc;
}
.note {
  text-align: center;
  height: 30%;
  width: 98%;
  border-radius: 5%;
  background-color: #ccffff;
  .el-input {
    padding-top: 2px;
    width: 98%;
    border-radius: 10%;
  }
  dt {
    float: flex;
    height: 25px;
    width: 95%;
    margin-top: 1px;
    background-color: rgb(215, 230, 218);
    border-top-right-radius: 45%;
    border-bottom-right-radius: 45%;
    border: 1px solid black;
    text-align: center;
    .up,
    .del {
      margin-top: 4px;
      float: left;
      margin-left: 10px;
    }
  }
}
</style>
