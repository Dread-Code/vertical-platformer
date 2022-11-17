/**
 * Both eventListener are used for detecting if
 * a key is pressed or not
 */
 window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case Direction.Right:
        keys[Direction.Right].pressed = true;
        break;
      case Direction.Left:
        keys[Direction.Left].pressed = true;
        break;
      case Direction.Up:
        player.velocity.y = -8;
        break;
      default:
        break;
    }
  });
  
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case Direction.Right:
        keys[Direction.Right].pressed = false;
        break;
      case Direction.Left:
        keys[Direction.Left].pressed = false;
        break;
      default:
        break;
    }
  });
  