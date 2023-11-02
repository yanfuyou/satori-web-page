<template>
  <el-row :gutter="20" justify="center">
    <el-col :span="6">
      <div class="grid-content ep-bg-purple">
        <el-image style="width: 100%; height: 100%" :src="seat" />
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content ep-bg-purple">
        <el-form :inline="false" :model="requestBody" class="demo-form-inline">
          <el-form-item>
            <el-input
              v-model="requestBody.userName"
              class="w-50 m-2"
              placeholder="账号"
              autofocus="true"
              @blur="checkUserName"
            />
          </el-form-item>
          <el-form-item v-if="currentEvent === 'signUp'">
            <el-input
              v-model="requestBody.nikeName"
              class="w-50 m-2"
              placeholder="昵称"
              @blur="checkNikeName"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="requestBody.password"
              type="password"
              class="w-50 m-2"
              placeholder="密码"
              @blur="checkPwd"
            />
          </el-form-item>
          <el-form-item v-if="currentEvent === 'signUp'">
            <el-input
              v-model="requestBody.repeatPassword"
              type="password"
              class="w-50 m-2"
              placeholder="重复密码"
              @blur="checkRepeatPwd"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="requestBody.validationCode"
              class="w-50 m-2"
              placeholder="验证码"
              style="width: 50%"
              @blur="checkCode"
            />
            <div @click="changeCode">
              <el-image
                style="width: 150px; height: 60px"
                :src="'data:image/png;base64,' + captCode"
              />
            </div>
          </el-form-item>
          <el-form-item v-if="currentEvent === 'signIn'">
            <el-button type="primary" @click="signInSubmit">登录</el-button>
            <el-text size="small" @click="currentEvent = 'signUp'"
              >没有账号,注册一个</el-text
            >
          </el-form-item>
          <el-form-item v-else>
            <el-button type="primary" @click="signUpSubmit">注册</el-button>
            <el-text size="small" @click="currentEvent = 'signIn'">返回登录</el-text>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script type="ts" setup>
import { ref,reactive,onMounted,getCurrentInstance } from "vue";
import { useUserStore } from "../store/useUserStore";
import router from "../router";
import { signOut, signUp, signIn, getUserInfo} from "../api/user-api.js";
import seat from "@/assets/img/seat.png";
import { getCaptcha } from '../api/system-api';
const { showToast } = getCurrentInstance().appContext.config.globalProperties
const userStore = useUserStore();

const captCode = ref('')
const currentEvent = ref('signIn');
const requestBody = reactive({
  userName: '',
  nikeName: '',
  password: '',
  validationCode: '',
  repeatPassword:''
});
//规则校验函数
const ruleStr = /^[a-zA-Z0-9_]+$/;
const checkUserName = ()=>{
  if(requestBody.userName === ''){
    showToast(false,'error','账号不能为空');
    return false;
  }else if(!ruleStr.test(requestBody.userName)){
    showToast(false,'error','账号只能为数字字母下划线的组合');
    return false;
  }
  return true;
}
const checkNikeName = ()=> {
  if(requestBody.nikeName === ''){
    showToast(false,'error','昵称不能为空')
    return false;
  }
  return true;
}
const checkPwd = ()=>{
  if(requestBody.password === ''){
    showToast(false,'error','密码不能为空')
    return false;
  }else if(!ruleStr.test(requestBody.password)){
    showToast(false,'error','密码只能为数字字母下划线的组合')
    return false;
  }
  return true;
}
const checkRepeatPwd = ()=>{
  if(requestBody.repeatPassword === ''){
    showToast(false,'error','重复密码不能为空')
    return false;
  }else if(requestBody.password !== requestBody.repeatPassword){
    showToast(false,'error','两次输入的密码不一致')
    return false;
  }
  return true;
}
const checkCode = ()=>{
  if(requestBody.validationCode === ''){
    showToast(false,'error','验证码不能为空')
    return false;
  }
  return true;
}
const signUpSubmit = () => {
  if (
    !checkUserName() ||
    !checkNikeName() ||
    !checkPwd() ||
    (currentEvent === 'signUp' && !checkRepeatPwd()) ||
    !checkCode()
  ) {
    return false;
  }
  signUp(requestBody).then(res=>{
    showToast(true,'success','注册成功')
  })
};

const signInSubmit = ()=>{
  signIn(requestBody).then(res => {
    getUserInfo(res.data.loginId).then(userRes =>{
      userStore.saveUser(userRes.data,res.data.tokenValue)
    })
    router.push('/home')
  })

}


const changeCode = () => {
  getCaptcha().then(res => {
    captCode.value = res.data;
  });
}

onMounted(()=>{
  changeCode();
})
</script>

<style scoped>

.el-text {
  margin-top: 10px;
  padding-bottom: 0;
}
.el-row{
  margin-top: 200px;
}
</style>
