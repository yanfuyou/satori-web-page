<template>
  <div id="outer">
    <button @click="change">stop</button>
    <button @click="quick">quick</button>
    <button @click="slow">slow</button>
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const stop = ref(false);
onMounted(() => {
  const canvasEl = document.getElementById("bg");
  StarrySky.init(canvasEl);
  StarrySky.render();
  StarrySky.setStarSpeedLevel(0.0005);

  //点击事件
  canvasEl.addEventListener(
    "click",
    (e) => {
      const position = getEventPosition(e, canvasEl);
      StarrySky.findStar(position);
    },
    false
  );
});

const getEventPosition = (ev, canvas) => {
  const canvasRect = canvas.getBoundingClientRect();
  let x, y;
//   if (ev.layerX || ev.layerX == 0) {
//     x = ev.layerX;
//     y = ev.layerY;
//   } else if (ev.offsetX || ev.offsetX == 0) {
//     // Opera
//     x = ev.offsetX;
//     y = ev.offsetY;
//   }
  x = ev.clientX - canvasRect.left;
  y = ev.clientY - canvasRect.top;
  return { x: x, y: y };
};

const change = () => {
  if (stop.value) {
    stop.value = false;
    StarrySky.render();
  } else {
    stop.value = true;
  }
};
const StarrySky = (function () {
  //Canvas元素
  let canvasElement;
  //Canvas 2D对象
  let canvasContext;
  //Canvas 宽度
  let canvasWidth;
  //Canvas 高度
  let canvasHeight;
  //星星列表
  let starList;
  //星星颜色列表，rgb格式："255, 255, 255"
  let starColorList;
  //星星半径大小
  let starRadius;
  //焦距等级，与canvasWidth相乘，必须大于0
  let focalDistanceLevel;
  //星星数量等级，与canvasWidth相乘，必须大于0
  let starCountLevel;
  //星星速度等级，与焦距相乘，必须大于0
  let starSpeedLevel;
  //焦距
  let focalDistance;
  //星星数量
  let starCount;
  //执行动画
  let rAF;
  return {
    //初始化
    init: function (canvas_element) {
      if (canvas_element && canvas_element.nodeName === "CANVAS") {
        canvasElement = canvas_element;
        // canvasElement.width = canvasElement.clientWidth;
        canvasElement.width = document.body.clientWidth;
        // canvasElement.height = canvasElement.clientHeight;
        canvasElement.height = document.body.clientHeight;
        canvasElement.style.backgroundColor = "black";
        canvasContext = canvasElement.getContext("2d");
        canvasWidth = canvasElement.clientWidth;
        canvasHeight = canvasElement.clientHeight;
        starColorList = ["255, 255, 255"];
        starRadius = 1;
        focalDistanceLevel = 0.4;
        starCountLevel = 0.2;
        starSpeedLevel = 0.0005;
        focalDistance = canvasWidth * focalDistanceLevel;
        starCount = Math.ceil(canvasWidth * starCountLevel);
        starCount = 1;
        starList = [];
        for (let i = 0; i < starCount; i++) {
          const starTemp = {
            x: canvasWidth * (0.1 + 0.8 * Math.random()),
            y: canvasHeight * (0.1 + 0.8 * Math.random()),
            z: focalDistance * Math.random(),
            color: starColorList[Math.ceil(Math.random() * 1000) % starColorList.length],
            id: i,
          };
          starList[i] = starTemp;
        }
        const self = this;
        window.addEventListener(
          "resize",
          self.throttle(function () {
            canvasElement.width = document.body.clientWidth;
            canvasElement.height = document.body.clientHeight;
            canvasWidth = canvasElement.clientWidth;
            canvasHeight = canvasElement.clientHeight;
            focalDistance = canvasWidth * focalDistanceLevel;

            const starCount2 = Math.ceil(canvasWidth * starCountLevel);
            if (starCount > starCount2) {
              starList.splice(starCount2);
            } else {
              let num = starCount2 - starCount;
              while (num--) {
                starList.push({
                  x: canvasWidth * (0.1 + 0.8 * Math.random()),
                  y: canvasHeight * (0.1 + 0.8 * Math.random()),
                  z: focalDistance * Math.random(),
                  color:
                    starColorList[Math.ceil(Math.random() * 1000) % starColorList.length],
                });
              }
            }
            starCount = Math.ceil(canvasWidth * starCountLevel);
          }, 200)
        );
      } else {
        console.error("初始化失败,必须传入Canvas元素");
      }
    },
    findStar(p) {
      for (let i = 0; i < starList.length; i++) {
        const star = starList[i];
        const flag = this.isPointIn(p.x, p.y, star.x, star.y, star.radius);
        if (flag) {
          console.log("找到了,id:", star.id);
          break;
        }
      }
    },
    isPointIn: (x, y, cx, cy, r) => {
      x = Math.ceil(x);
      y = Math.ceil(y);
      cx = Math.ceil(cx);
      cy = Math.ceil(cy);
      const temp2 = Math.pow(x - cx, 2) + Math.pow(y - cy, 2);
      console.log(x,',',y);
      console.log(cx,',',cy);
      const distance = Math.sqrt(temp2);
      // console.log(distance,'---',r)
      return distance < r;
    },
    //设置星空背景颜色
    setSkyColor: function (sky_color = "black") {
      canvasElement.style.backgroundColor = sky_color;
    },
    //设置星星半径大小
    setStarRadius: function (star_radius = 1) {
      starRadius = star_radius;
    },
    //设置焦距等级
    setFocalDistanceLevel: function (focal_distance_level = 0.4) {
      focalDistanceLevel = focal_distance_level;
      focalDistance = canvasWidth * focalDistanceLevel;
    },
    //设置星星数量等级
    setStarCountLevel: function (star_count_level = 0.2) {
      starCountLevel = star_count_level;
      //   const starCount2 = Math.ceil(canvasWidth * starCountLevel);
      const starCount2 = 3;
      if (starCount > starCount2) {
        starList.splice(starCount2);
      } else {
        let num = starCount2 - starCount;
        while (num--) {
          starList.push({
            x: canvasWidth * (0.1 + 0.8 * Math.random()),
            y: canvasHeight * (0.1 + 0.8 * Math.random()),
            z: focalDistance * Math.random(),
            color: starColorList[Math.ceil(Math.random() * 1000) % starColorList.length],
          });
        }
      }
      starCount = Math.ceil(canvasWidth * starCountLevel);
    },
    //设置星星速度等级
    setStarSpeedLevel: function (star_speed_level = 0.0005) {
      starSpeedLevel = star_speed_level;
    },
    /**
     * 设置星星颜色
     * @param {Array|String} color 星星颜色
     * @param {Boolean} mode 是否立刻同步颜色
     */
    setStarColorList: function (color, mode = false) {
      if (typeof color === "object") {
        starColorList = color;
      } else if (typeof color === "string") {
        starColorList.push(color);
      }
      if (mode) {
        for (let i = 0; i < starList.length; i++) {
          starList[i]["color"] =
            starColorList[Math.ceil(Math.random() * 1000) % starColorList.length];
        }
      }
    },
    //渲染
    render: function () {
      if (!stop.value) {
        const starSpeed = canvasWidth * focalDistanceLevel * starSpeedLevel;
        //清空画布
        canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
        //计算位置
        for (let i = 0; i < starList.length; i++) {
          const star = starList[i];
          const star_x =
            (star["x"] - canvasWidth / 2) * (focalDistance / star["z"]) + canvasWidth / 2;
          const star_y =
            (star["y"] - canvasHeight / 2) * (focalDistance / star["z"]) +
            canvasHeight / 2;
          star["z"] -= starSpeed;
          if (
            star["z"] > 0 &&
            star["z"] <= focalDistance &&
            star_x >= -20 &&
            star_x <= canvasWidth + 20 &&
            star_y >= -20 &&
            star_y <= canvasHeight + 20
          ) {
            const star_radius = starRadius * ((focalDistance / star["z"]) * 0.8);
            //把半径也保存起来
            star.radius = star_radius;
            const star_opacity = 1 - 0.8 * (star["z"] / focalDistance);
            canvasContext.fillStyle = "rgba(" + star["color"] + ", " + star_opacity + ")";
            canvasContext.shadowOffsetX = 0;
            canvasContext.shadowOffsetY = 0;
            canvasContext.shadowColor = "rgb(" + star["color"] + ")";
            canvasContext.shadowBlur = 10;
            canvasContext.beginPath();
            canvasContext.arc(star_x, star_y, star_radius, 0, 2 * Math.PI);
            canvasContext.fill();
          } else {
            const z = focalDistance * Math.random();
            star["x"] = canvasWidth * (0.1 + 0.8 * Math.random());
            star["y"] = canvasHeight * (0.1 + 0.8 * Math.random());
            star["z"] = z;
            star["color"] =
              starColorList[Math.ceil(Math.random() * 1000) % starColorList.length];
          }
        }
        const self = this;
        rAF = window.requestAnimationFrame(function () {
          self.render();
        });
      }
    },
    //销毁
    destroy: function () {
      window.cancelAnimationFrame(rAF);
      starList = [];
      canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
      canvasElement.width = 0;
      canvasElement.height = 0;
    },
    //防抖
    debounce: function (func, time = 200) {
      let timeId;
      return function () {
        if (timeId) {
          clearTimeout(timeId);
        }
        timeId = setTimeout(function () {
          func();
        }, time);
      };
    },
    //节流
    throttle: function (func, time = 200) {
      let timeId = null;
      let pre = 0;
      return function () {
        if (Date.now() - pre > time) {
          clearTimeout(timeId);
          pre = Date.now();
          func();
        } else {
          timeId = setTimeout(func, time);
        }
      };
    },
  };
})();
const quick = () => {
  StarrySky.setStarSpeedLevel(0.008);
};

const slow = () => {
  StarrySky.setStarSpeedLevel(0.001);
};
//鼠标移入，粒子加速
// const avatar = document.querySelector(".avatar");
// avatar.addEventListener("mouseover", function () {
//   StarrySky.setStarSpeedLevel(0.008);
// });
// //鼠标移出，粒子恢复
// avatar.addEventListener("mouseout", function () {
//   StarrySky.setStarSpeedLevel(0.0005);
// });
</script>

<style lang="scss" scoped>
#id {
  top: 0;
  bottom: 0;
}
</style>
