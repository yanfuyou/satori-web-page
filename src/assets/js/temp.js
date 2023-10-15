{/* <template>
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
  if (stop.value) {
    stop.value = false;
    StarrySky.render();
  } else {
    stop.value = true;
  }
};

const getContainerSize = () => {
  const outer = document.getElementById("outer");
  const buttons = document.getElementById("buttons");
  const map = new Map();
  map.set("width", outer.clientWidth);
  map.set("height", outer.clientHeight - buttons.clientHeight);
  return map;
};

const StarrySky = (function () {
  let canvasElement;
  let canvas;
  let starList;
  let starColorList;
  let starRadius;
  let focalDistanceLevel;
  let starCountLevel;
  let starSpeedLevel;
  let focalDistance;
  let starCount;
  let rAF;
  let lastCircle = [];
  return {
    init: function (canvas_element) {
      if (canvas_element && canvas_element.nodeName === "CANVAS") {
        canvasElement = canvas_element;
        const sizeMap = getContainerSize();
        canvas = new fabric.Canvas(canvasElement);
        canvas.setWidth(sizeMap.get("width"));
        canvas.setHeight(sizeMap.get("height"));
        canvas.setBackgroundColor("black");
        starColorList = ["rgb(255, 255, 255)"];
        starRadius = 1;
        focalDistanceLevel = 0.4;
        starCountLevel = 0.2;
        starSpeedLevel = 0.0005;
        focalDistance = canvas.getWidth() * focalDistanceLevel;
        starCount =
          Math.ceil(canvas.getWidth() * starCountLevel) > 100
            ? 100
            : Math.ceil(canvas.getWidth() * starCountLevel);
        starList = [];

        for (let i = 0; i < starCount; i++) {
          const starTemp = {
            left: canvas.getWidth() * (0.1 + 0.8 * Math.random()),
            top: canvas.getHeight() * (0.1 + 0.8 * Math.random()),
            z: focalDistance * Math.random(),
            fill: starColorList[Math.floor(Math.random() * starColorList.length)],
            id: i,
          };
          starList[i] = starTemp;
        }

        window.addEventListener("resize",function () {
          const parentNode = document.getElementById("outer");
          const sizeMap = getContainerSize();
          canvas.setWidth(sizeMap.get("width"));
          canvas.setHeight(sizeMap.get("height"));
          focalDistance = canvas.getWidth() * focalDistanceLevel;

          const starCount2 = Math.ceil(canvas.getWidth() * starCountLevel);
          if (starCount > starCount2) {
            starList.splice(starCount2);
          } else {
            let num = starCount2 - starCount;
            while (num--) {
              starList.push({
                left: canvas.getWidth() * (0.1 + 0.8 * Math.random()),
                top: canvas.getHeight() * (0.1 + 0.8 * Math.random()),
                z: focalDistance * Math.random(),
                fill: starColorList[Math.floor(Math.random() * starColorList.length)],
              });
            }
          }
          starCount = Math.ceil(canvas.getWidth() * starCountLevel);
        });
      } else {
        console.error("初始化失败,必须传入Canvas元素");
      }
    },

    setSkyColor: function (sky_color = "black") {
      canvas.setBackgroundColor(sky_color).renderAll();
    },

    setStarRadius: function (star_radius = 1) {
      starRadius = star_radius;
    },

    setFocalDistanceLevel: function (focal_distance_level = 0.4) {
      focalDistanceLevel = focal_distance_level;
      focalDistance = canvas.getWidth() * focalDistanceLevel;
    },

    setStarCountLevel: function (star_count_level = 0.2) {
      starCountLevel = star_count_level;
      const starCount2 = Math.ceil(canvas.getWidth() * starCountLevel);
      if (starCount > starCount2) {
        starList.splice(starCount2);
      } else {
        let num = starCount2 - starCount;
        while (num--) {
          starList.push({
            left: canvas.getWidth() * (0.1 + 0.8 * Math.random()),
            top: canvas.getHeight() * (0.1 + 0.8 * Math.random()),
            z: focalDistance * Math.random(),
            fill: starColorList[Math.floor(Math.random() * starColorList.length)],
          });
        }
      }
      starCount = Math.ceil(canvas.getWidth() * starCountLevel);
    },
    setStarSpeedLevel: function (star_speed_level = 0.005) {
      starSpeedLevel = star_speed_level;
    },
    setStarColorList: function (color, mode = false) {
      if (typeof color === "object") {
        starColorList = color;
      } else if (typeof color === "string") {
        starColorList.push(color);
      }
      if (mode) {
        for (let i = 0; i < starList.length; i++) {
          starList[i]["fill"] =
            starColorList[Math.floor(Math.random() * starColorList.length)];
        }
        canvas.renderAll();
      }
    },
    render: function () {
      if (!stop.value) {
        const starSpeed = canvas.getWidth() * focalDistanceLevel * starSpeedLevel;
        // 清空画布
        //有卡顿
        // lastCircle.forEach((star) => {
        //   canvas.remove(star);
        // });
        // console.log(canvas)
        // if(!canvas.isEmpty()){
        //   console.log(canvas)
          // canvas = canvas.clearContext(canvas.getContext()).contextContainer;
        //   console.log(canvas)
        //   // return;
        // }
        // 计算位置
        lastCircle.length = 0;
        starList.forEach(function (star) {
          const star_x =
            (star.left - canvas.getWidth() / 2) * (focalDistance / star.z) +
            canvas.getWidth() / 2;
          const star_y =
            (star.top - canvas.getHeight() / 2) * (focalDistance / star.z) +
            canvas.getHeight() / 2;
          star.z -= starSpeed;

          if (
            star.z > 0 &&
            star.z <= focalDistance &&
            star_x >= -20 &&
            star_x <= canvas.getWidth() + 20 &&
            star_y >= -20 &&
            star_y <= canvas.getHeight() + 20
          ) {
            const star_radius = starRadius * ((focalDistance / star.z) * 0.8);
            // 把半径也保存起来
            star.radius = star_radius;
            const star_opacity = 1 - 0.8 * (star.z / focalDistance);
            const star_fill = star.fill
              .replace("rgb", "rgba")
              .replace(")", `, ${star_opacity})`);

            // 创建星星对象及设置属性
            const starCircle = new fabric.Circle({
              left: star_x,
              top: star_y,
              radius: star_radius,
              fill: star_fill,
              shadow: `0 0 10px ${star.fill}`,
              hasBorders: false, // 显示边框
              hasControls: false //显示控制点
            });
            // 添加星星对象到canvas
            lastCircle.push(starCircle);
            starCircle.id = star.id;
            starCircle.on('mousedown',(options)=>{
              console.log(options.target.id)
            })
            // console.log(starCircle);
            canvas.add(starCircle);
          } else {
            const z = focalDistance * Math.random();
            star.left = canvas.getWidth() * (0.1 + 0.8 * Math.random());
            star.top = canvas.getHeight() * (0.1 + 0.8 * Math.random());
            star.z = z;
            star.fill = starColorList[Math.floor(Math.random() * starColorList.length)];
          }
        });

        // 动画循环
        const self = this;
        rAF = fabric.util.requestAnimFrame(function () {
          self.render();
        });
      }
    },
    destroy: function () {
      fabric.util.cancelAnimFrame(rAF);
      starList = [];
      canvas.clear();
      canvas.setWidth(0);
      canvas.setHeight(0);
      canvas.dispose();
    },

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
  StarrySky.setStarSpeedLevel(0.005);
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
</style> */}
