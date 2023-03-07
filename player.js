$(".plyr_component").each(function (index) {
  let thisComponent = $(this);

  // create plyr settings
  let player = new Plyr(thisComponent.find(".plyr_video")[0], {
    resetOnEnd: true
  });

  // custom video cover
  thisComponent.find(".plyr_cover").on("click", function () {
    player.play();
  });
  player.on("ended", (event) => {
    thisComponent.removeClass("hide-cover");
  });
});
