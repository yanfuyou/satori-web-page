<script setup>
import {AppMian, NavBar, Footer} from './components'
</script>

<template>
  <div class="app-wrapper">
    <div id="nav">
      <NavBar/>
    </div>
    <div id="main">
      <AppMian/>
    </div>
    <div id="footer">
      <Footer/>
    </div>
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
}
/* #nav,#main,#footer{
  display: flex;
  justify-content: center;
} */
#nav{
  width: 100%;
  top: 0;
  height: 60px;
  position: fixed;
  background-color: black;
  z-index: 1;
  box-sizing: border-box;
}
#main{
  height: 80%;
  margin-top: 65px;
  justify-content: center;
  box-sizing: border-box;
}
#footer{
  /* height: 10%; */
  bottom: 0;
  box-sizing: border-box;
}
</style>