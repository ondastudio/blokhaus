document.addEventListener("DOMContentLoaded", () => {
  const canvasParent = document.querySelector(".collections-wrapper");
  const vids = document.querySelectorAll(".blokhaus_collab_video");
  const canvasVids = [];
  vids.forEach((vid) => {
    const video = document.createElement("video");
    video.autoPlay = false;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.hidden = true;
    const source = document.createElement("source");
    video.appendChild(source);
    source.src = vid.dataset.src;
    source.setAttribute("type", "video/mp4");
    canvasParent.appendChild(video);
    canvasVids.push(video);
    video.oncanplay = () => {
      video.play();
    };
  });
  let vidIndex = 4;
  let cells;
  cells = document
    .querySelector(".collabs-col-logos-desk")
    .querySelectorAll(".grid-click-item");
  const hoverCells = [];

  cells.forEach((cell) => {
    const c = cell.querySelector(".filhotes-div");
    if (!c.classList.contains("w-condition-invisible"))
      hoverCells.push(c.parentElement);
  });
  hoverCells.forEach((cell, i) => {
    cell.addEventListener("mouseenter", () => {
      vidIndex = i;
    });
    cell.addEventListener("mouseleave", () => {
      vidIndex = 4;
    });
  });

  const canvas = document.createElement("canvas");
  canvasParent.appendChild(canvas);

  let gridCell;
  gridCell = document
    .querySelector(".collabs-col-logos-desk")
    .querySelectorAll(".grid-click-item")[0];

  const vidSpecs = {
    x: gridCell.getBoundingClientRect().x,
    y: gridCell.getBoundingClientRect().y,
    w: gridCell.getBoundingClientRect().width,
    h: gridCell.getBoundingClientRect().height
  };

  let ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  let width = canvasParent.getBoundingClientRect().width;
  canvas.width = width;
  let height = canvasParent.getBoundingClientRect().height;
  canvas.height = height;
  canvasParent.style.position = "relative";
  canvas.style.position = "absolute";
  canvas.style.top = 0;
  canvas.style.left = 0;

  window.addEventListener("resize", () => {
    width = canvasParent.getBoundingClientRect().width;
    canvas.width = width;
    height = canvasParent.getBoundingClientRect().height;
    canvas.height = height;
    vidSpecs.x = gridCell.getBoundingClientRect().x;
    vidSpecs.y = gridCell.getBoundingClientRect().y;
    vidSpecs.w = Math.round(gridCell.getBoundingClientRect().width);
    vidSpecs.h = Math.round(gridCell.getBoundingClientRect().height);
  });

  loop();

  function loop() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(
      canvasVids[vidIndex],
      vidSpecs.w * 2,
      0,
      vidSpecs.w,
      vidSpecs.h
    );
    ctx.drawImage(
      canvasVids[vidIndex],
      vidSpecs.w,
      vidSpecs.h,
      vidSpecs.w,
      vidSpecs.h
    );
    ctx.drawImage(
      canvasVids[vidIndex],
      vidSpecs.w * 3,
      vidSpecs.h * 2,
      vidSpecs.w,
      vidSpecs.h
    );
    requestAnimationFrame(loop);
  }
});
