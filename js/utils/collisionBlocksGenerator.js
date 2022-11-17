const collisionBlocksGenerator = (collisions, height = 16) => {
  const collisions2D = [];
  for (let i = 0; i < collisions.length; i += 36) {
    collisions2D.push(collisions.slice(i, i + 36));
  }
  const collisionBlocks = [];
  collisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 202) {
        collisionBlocks.push(
          new CollisionBlock({
            position: {
              x: x * 16,
              y: y * 16,
            },
            height
          })
        );
      }
    });
  });

  return collisionBlocks;
};
