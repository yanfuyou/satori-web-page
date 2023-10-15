<script setup>
import { AppMian, NavBar, Footer } from "./components";
</script>

<template>
  <div class="app-wrapper">
    <div id="nav">
      <NavBar />
    </div>
    <div id="main">
      <AppMian />
    </div>
    <div id="footer">
      <Footer />
    </div>
  </div>
</template>

<style scoped>
#main {
  flex: 1;
  margin-top: 61px;
}

#nav {
  width: 100%;
  height: 60px;
  z-index: 100;
  top: 0;
  position: fixed;
}
#footer {
  width: 100%;
  height: 20px;
  text-align: center;
  bottom: 2px;
  position: fixed;
  z-index: 50;
}
</style>
