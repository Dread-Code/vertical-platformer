/**
 * Both eventListener are used for detecting if
 * a key is pressed or not
 */
 window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case Direction.Right:
        keysState[Direction.Right].pressed = true;
        break;
      case Direction.Left:
        keysState[Direction.Left].pressed = true;
        break;
      case Direction.Up:
        keysState[Direction.Up].pressed = true;
        break;
      default:
        break;
    }
  });
  
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case Direction.Right:
        keysState[Direction.Right].pressed = false;
        break;
      case Direction.Left:
        keysState[Direction.Left].pressed = false;
        break;
      case Direction.Up:
        keysState[Direction.Up].pressed = false;
        break;
      default:
        break;
    }
  });
  