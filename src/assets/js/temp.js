
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
  
    return {
      init: function (canvas_element) {
        if (canvas_element && canvas_element.nodeName === "CANVAS") {
          canvasElement = canvas_element;
          canvas = new fabric.Canvas(canvasElement);
          canvas.setWidth(document.body.clientWidth);
          canvas.setHeight(document.body.clientHeight);
          canvas.setBackgroundColor("black");
  
          starColorList = ["rgb(255, 255, 255)"];
          starRadius = 1;
          focalDistanceLevel = 0.4;
          starCountLevel = 0.2;
          starSpeedLevel = 0.0005;
          focalDistance = canvas.getWidth() * focalDistanceLevel;
          starCount = Math.ceil(canvas.getWidth() * starCountLevel);
          starCount = 15;
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
  
          window.addEventListener("resize", function () {
            canvas.setWidth(document.body.clientWidth);
            canvas.setHeight(document.body.clientHeight);
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
                  fill: starColorList[Math.floor(Math.random() * starColorList.length)]
                });
              }
            }
            starCount = Math.ceil(canvas.getWidth() * starCountLevel);
          });
        } else {
          console.error("初始化失败，必须传入Canvas元素");
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
              fill: starColorList[Math.floor(Math.random() * starColorList.length)]
            });
          }
        }
        starCount = Math.ceil(canvas.getWidth() * starCountLevel);
      },
  
      setStarSpeedLevel: function (star_speed_level = 0.0005) {
        starSpeedLevel = star_speed_level;
      },
  
      setStarColorList: function (color, mode = false) {
        if (typeof color === "object") {
          starColorList = color;
        } else if (typeof color === "string") {
          starColorList.push(color)
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
          canvas.clear();
      
          // 计算位置
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
              const star_fill = star.fill.replace("rgb", "rgba").replace(")", `, ${star_opacity})`);
              
              // 创建星星对象及设置属性
              const starCircle = new fabric.Circle({
                left: star_x,
                top: star_y,
                radius: star_radius,
                fill: star_fill,
                shadow: `0 0 10px ${star.fill}`,
              });
              console.log(star);
              // 添加星星对象到canvas
              canvas.add(starCircle);
            } else {
              const z = focalDistance * Math.random();
              star.left = canvas.getWidth() * (0.1 + 0.8 * Math.random());
              star.top = canvas.getHeight() * (0.1 + 0.8 * Math.random());
              star.z = z;
              star.fill =
                starColorList[Math.floor(Math.random() * starColorList.length)];
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
        window.cancelAnimFrame(rAF);
        starList = [];
        canvas.clear();
        canvas.setWidth(0);
        canvas.setHeight(0);
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
  
  


const StarrySky2 = (function () {
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

  return {
    init: function (canvas_element) {
      if (canvas_element && canvas_element.nodeName === "CANVAS") {
        canvasElement = canvas_element;
        canvas = new fabric.Canvas(canvasElement);
        canvas.setWidth(document.body.clientWidth);
        canvas.setHeight(document.body.clientHeight);
        canvas.setBackgroundColor("black");

        starColorList = ["rgb(255, 255, 255)"];
        starRadius = 1;
        focalDistanceLevel = 0.4;
        starCountLevel = 0.2;
        starSpeedLevel = 0.0005;
        focalDistance = canvas.getWidth() * focalDistanceLevel;
        starCount = Math.ceil(canvas.getWidth() * starCountLevel);
        starCount = 15;
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

        window.addEventListener("resize", function () {
          canvas.setWidth(document.body.clientWidth);
          canvas.setHeight(document.body.clientHeight);
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
                fill: starColorList[Math.floor(Math.random() * starColorList.length)]
              });
            }
          }
          starCount = Math.ceil(canvas.getWidth() * starCountLevel);
        });
      } else {
        console.error("初始化失败，必须传入Canvas元素");
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
            fill: starColorList[Math.floor(Math.random() * starColorList.length)]
          });
        }
      }
      starCount = Math.ceil(canvas.getWidth() * starCountLevel);
    },

    setStarSpeedLevel: function (star_speed_level = 0.0005) {
      starSpeedLevel = star_speed_level;
    },

    setStarColorList: function (color, mode = false) {
      if (typeof color === "object") {
        starColorList = color;
      } else if (typeof color === "string") {
        starColorList.push(color)
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
        starList.forEach(star=>{
          canvas.remove(starList);
        })
        
        // canvas.setBackgroundColor("black");
    
        // 计算位置
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
            const star_fill = star.fill.replace("rgb", "rgba").replace(")", `, ${star_opacity})`);
            
            // 创建星星对象及设置属性
            const starCircle = new fabric.Circle({
              left: star_x,
              top: star_y,
              radius: star_radius,
              fill: star_fill,
              // shadow: `0 0 10px ${star.fill}`,
            });
            console.log(starCircle);
            console.log('canvas',canvas)
            // 添加星星对象到canvas
            canvas.add(starCircle);
          } else {
            const z = focalDistance * Math.random();
            star.left = canvas.getWidth() * (0.1 + 0.8 * Math.random());
            star.top = canvas.getHeight() * (0.1 + 0.8 * Math.random());
            star.z = z;
            star.fill =
              starColorList[Math.floor(Math.random() * starColorList.length)];
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

