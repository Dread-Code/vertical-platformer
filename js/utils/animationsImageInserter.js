const animationsImageInserter = (animationsMap) => {
  for (let key in animationsMap) {
    const image = new Image();
    image.src = animationsMap[key].imageSrc;
    animationsMap[key].image = image;
  }
  return animationsMap;
};
