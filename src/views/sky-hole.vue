<template>
  <div id="outer">
    <div id="buttons">
      <button @click="change">stop</button>
      <button @click="quick">quick</button>
      <button @click="slow">slow</button>
    </div>
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { fabric } from "fabric";
import { StarrySky } from "../assets/js/StarrySky";
const stop = ref(false);
onMounted(() => {
  const footer = document.getElementById("footer");
  footer.style.color = "#bcd9f3";
  const canvasEl = document.getElementById("bg");
  StarrySky.init(canvasEl);
  StarrySky.render();
  StarrySky.setStarSpeedLevel(0.005);
});

onBeforeUnmount(() => {
  StarrySky.destroy();
});

const change = () => {
  StarrySky.filpStop();
};

const quick = () => {
  StarrySky.setStarSpeedLevel(0.01);
};
    quickly: () => {
      
    }

const slow = () => {
  StarrySky.setStarSpeedLevel(0.0002);
};
</script>

<style lang="scss" scoped>
#outer {
  width: 100%;
  height: 100%;
  #buttons {
    text-align: center;
    height: 20px;
  }
  margin-bottom: 0;
}
</style>
