let script = document.currentScript;

window.addEventListener("DOMContentLoaded", () => {
  let iDiv = document.createElement("div");
  iDiv.id = "cursor";
  iDiv.className = "custom-cursor cursor-difference";

  document.getElementsByTagName("body")[0].appendChild(iDiv);

  let innerDiv = document.createElement("div");
  iDiv.style.backgroundColor = "white";
  innerDiv.className = "cursor-circle new";

  iDiv.appendChild(innerDiv);

  let size = 30;

  for (let i = 0; i < size; i++) {
    let innerDiv = document.createElement("div");
    innerDiv.className = "cursor-circle cursor-border-transform";
    innerDiv.style.backgroundColor = "white";
    iDiv.appendChild(innerDiv);
  }

  const coords = { x: 0, y: 0 };
  let timeout;

  const circles = document.querySelectorAll(".cursor-circle");
  const cursor = document.querySelector(".custom-cursor");

  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
  });

  const addClass = (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  };

  window.addEventListener("mousemove", (e) => addClass(e));
  window.addEventListener("touchmove", (e) => addClass(e.touches[0]));

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    cursor.style.top = x;
    cursor.style.left = y;

    circles.forEach(function (circle, index) {
      circle.style.left = x - 12 + "px";
      circle.style.top = y - 12 + "px";

      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
});
