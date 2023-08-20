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
}
#nav,#main,#footer{
  display: flex;
  justify-content: center;
}
</style>