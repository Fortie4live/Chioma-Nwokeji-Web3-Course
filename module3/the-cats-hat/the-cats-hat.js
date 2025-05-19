const cat = document.querySelector("#cat");
const hat = document.querySelector("#hat");

let angle = 0;
let lastTime = null;

function animate(time) {
  if (lastTime !== null) {
    angle += (time - lastTime) * 0.001; // increase angle over time
  }
  lastTime = time;

  // Calculate cat's circular path
  const catX = Math.cos(angle) * 200 + 230;
  const catY = Math.sin(angle) * 40 + 100;
  cat.style.left = catX + "px";
  cat.style.top = catY + "px";

  // Hat stays above the cat's head (slightly offset Y)
  hat.style.left = (catX + 20) + "px";
  hat.style.top = (catY - 40) + "px";

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);