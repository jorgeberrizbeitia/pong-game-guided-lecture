- [Same code but done with canvas for comparisson](https://github.com/jorgeberrizbeitia/FT2301-canvas-intro/tree/main/pong)

- [gist with Intructions. Same as here](https://gist.github.com/jorgeberrizbeitia/30a1a846ca837090423e921bf9d173ac)

# PART 1. Initial Setup

- Create an `index.html` and add the following code:

```html
  <div id="container">
    <div id="game-screen">
      <div id="ball"></div>
      <div id="paddle"></div>
    </div>
  </div>
```

- Create a `style.css`, link to html and add the following code:

```css
body {
  margin: 0;
}

#game-screen {
  display: flex;
  justify-content: center;
  margin: 10px;
}

#game-box {
  background-color: black;
  width: 600px;
  height: 800px;
}

#ball {
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  /* below will set position relative to the gamebox and allow us to specifically locate elements inside our game box using top and left */
  position: relative;
  top: 30px;
  left: 30px;
}

#paddle {
  background-color: white;
  width: 200px;
  height: 30px;
  position: relative;
  top: 700px;
  left: 200px;
}
```

- Create a `script.js`, connect it to html via a `<script>` tag and add a `console.log("testing!")` to see if it works.

- From here on, we will work on `script.js`. 

- Target all DOM elements needed

```js
const gameScreen = document.querySelector("#game-screen");
const ball = document.querySelector("#ball");
const paddle = document.querySelector("#paddle");
```

# PART 2. Game loop and Movement of ball

- Create `gameLoop` function with recursion and sections with comments. Test with `console.log`

```js
function gameLoop() {
  console.log("game running");

  // 1. Here is where Element positions are changed

  // 2. Here is where Element positions are updated

  // 3. Here is where recursion happends
  requestAnimationFrame(gameLoop);
}

gameLoop();
```

- Add a simple `ball.style.top = "10px"` to section 2 and explain that this is where the ball position will be updated, however, to do so, we will need to store the number in a variable

- Create a section before the gameLoop function called `Global variables` and add a variable for `ballY`.

```js
let ballY = 10; // same as top in css
```

- Update the segment where you update ball position

```js
// ball.style.top = "10px"
ball.style.top = `${ballY}px`;
```

- Then in section 1. Update the position Y of the ball.

```js
ballY += 3;
```

- Do the same steps for `ballX`.

- (Optional) Instead of `ballY += 3`, add a `speed` variable that will affect the speed of the ball. For example `let ballSpeed = 3;` and then: `ballY += ballSpeed;`. Same for `ballX`
- (Optional) Create a function `ballMovement` for the two lines that move the ball and another `ballUpdates` for the two that update ball position.

# PART 3. Ball Collision with the walls

- Create variables for the size of `game-box`. Either with offsetHeight or hard coded values.

```js
let wallWidth = 600 // same as css (offsetWidth could work too)
let wallHeight = 800 // same as css (offsetHeight could work too)
```

- Create function called `BallWallCollision` that will check if the value of `ballX` is higher than `wallWidth`. Invoke in section 1 of gameLoop.

```js
function ballWallCollision() {
  if (ballX > wallWidth) {
    console.log("collision right side");
  }
}

// invoke inside gameLoop => 2. Here is where Element positions are updated
ballWallCollision();
```

- Create boolean in `Global Variables` section called `isBallGoingRight` with value `true`.

```js
let isBallGoingRight = true;
```

- Inside `ballWallCollision` when the ball collides, change the value of `isBallGoingRight` to be false.

- update the section (or function) where the ball changes position X to change depending of `isBallGoingRight`.

```js
if (isBallGoingRight === true) {
  ballX += 3;
} else {
  ballX -= 3;
}
```

- Do the same for all 4 sides

```js
let isBallGoingDown = true;
let isBallGoingRight = true;
```

```js
function ballWallCollision() {
  if (ballX > wallWidth) {
    console.log("collision right side");
    isBallGoingRight = false;
  } else if (ballY > wallHeight) {
    console.log("collision bottom side");
    // isBallGoingDown = false;
  } else if (ballX < 0) {
    console.log("collision left side");
    isBallGoingRight = true;
  } else if (ballY < 0) {
    console.log("collision top side");
    isBallGoingDown = true;
  }
}
```

```js
if (isBallGoingRight === true) {
  ballX += 3;
} else {
  ballX -= 3;
}

if (isBallGoingDown === true) {
  ballY += 3;
} else {
  ballY -= 3;
}
```

- (Optional) For a perfect collision, update colision right and bottom to reflect the size of the ball.

# PART 4. Paddle Movement.

- Add variable to update position of paddle on X axis. (should be the same values as left and top from CSS)

```js
let paddleX = 200; // same as left in css
let paddleY = 700; // same as top in css
```

- Create function that updates paddle position

```js
function ballUpdates() {
  paddle.style.left = `${paddleX}px`;
}

// invoke in gameLoop => 2. Here is where Element positions are updated
ballUpdates();
```

- Create an AddEventListener that will move the paddle on `ArrowRight` and `ArrowLeft`;

```js
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    paddleX += 40;
  } else if (event.key === "ArrowLeft") {
    paddleX -= 40;
  }
});
```

- (Optional) Prevent Paddle from moving pass the right and left wall
- (Optional) Instead of hardcoded `40` create a variable for it `paddleSpeed`

# PART 5. Collision between ball and paddle.

- Create a function `ballPaddleCollision` that will check when ball collides with paddle from above. Invoke in `gameLoop`. If it is too complex to determine, you can use the [2d collision docs from MDN](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection).

```js
function ballPaddleCollision() {
  if (ballY > paddleY && ballX > paddleX && ballX < paddleX + 200) {
    console.log("ball collided with paddle");
    isBallGoingDown = false; // to bounce back up
  }
}

// Invoke in gameLoop => 1. Here is where Element positions are changed
ballPaddleCollision();
```

# PART 6. End of game trigger

- Create variable `isGameGoing` with value `true`. This variable will determine if the game is going or if a game over trigger should happen.

```js
let isGameGoing = true;
```

- Create a funtion called `gameOver` and for now, add a simple `console.log`

```js
function gameOver() {
  console.log("The game is over! :(")
  // ... any other effects for the game over.
}
```

- Add a conditional arround your `requestAnimationFrame` that will depend on the value of `isGameGoing`.
  - if `isGameGoing` is `true`: Continue the game with the `requestAnimationFrame` (recursion)
  - if `isGameGoing` is `false`: Recursion will stop and a final function `gameOver` will be invoked.

```js
// 3. Here is where recursion happends
if (isGameGoing === true) {
  requestAnimationFrame(gameLoop);
} else {
  // if above doesn't happen, the recursion effect will end
  gameOver()
}
```

- To cause gameover during the game, go to the `ballWallCollision`, specifically where the ball collides with the bottom side of the game box, and instead of changing `isBallGoingDown` to be `false`, change `isGameGoing` to be `false`, and so, causing the game (the recursion) to end at that point.

```js
// ...
else if (ballY > wallHeight) {
    console.log("collision bottom side");
    // isBallGoingDown = false;
    isGameGoing = false;
  }
// ...
```

- (Optional) You can add more to `gameOver` like making a new text to appear with `Game over` or show and alert, popup or anything you like!

# BONUS. Things to add if time allows it

- Add a score counter that increases everytime the ball hits the paddle.
- Ball increases speed on each hit.
- When a score of 10 is achieved, the ball, paddle and/or background change styles.
- Decrease the size of the paddle on each hit.
- Have a second ball moving in the game.
- Make the movement of the paddle to auto move left or right. pressing left or right on the keyboard simply changes direction.